import { google } from "googleapis";
import { logger } from "@/lib/logger";

/** Same columns as admin CSV export + Payment Status */
export const REGISTRATION_SHEET_HEADERS = [
  "ID",
  "Full Name",
  "Email",
  "Phone",
  "University",
  "Department",
  "Roll Number",
  "Main Category",
  "Sub Category",
  "Team Name",
  "Team Logo URL",
  "Team Members",
  "Terms Accepted",
  "Created At",
  "Updated At",
  "Payment Status",
] as const;

export interface RegistrationSheetRow {
  id: string;
  full_name: string;
  email: string;
  phone_number: string;
  university: string | null;
  department: string | null;
  roll_number: string | null;
  main_category: string;
  sub_category: string;
  team_name: string | null;
  team_logo_url: string | null;
  team_members: string | null;
  terms_accepted: boolean;
  created_at: string;
  updated_at: string;
}

type SheetTarget = "gaming" | "hackathon";

interface SheetTargetConfig {
  target: SheetTarget;
  logLabel: string;
  expectedMainCategory: string;
}

const SHEET_TARGETS: Record<SheetTarget, SheetTargetConfig> = {
  gaming: {
    target: "gaming",
    logLabel: "Gaming",
    expectedMainCategory: "E-Sports",
  },
  hackathon: {
    target: "hackathon",
    logLabel: "Hackathon",
    expectedMainCategory: "Hackathon",
  },
};

/** Static env reads — required for Next.js/Vercel to expose vars at runtime */
function normalizeEnvValue(raw: string | undefined): string | undefined {
  if (!raw) return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function getSheetId(target: SheetTarget): string | undefined {
  if (target === "gaming") {
    return normalizeEnvValue(process.env.GOOGLE_SHEET_ID);
  }
  return normalizeEnvValue(process.env.GOOGLE_HACKATHON_SHEET_ID);
}

function getTabOverride(target: SheetTarget): string | undefined {
  if (target === "gaming") {
    return normalizeEnvValue(process.env.GOOGLE_SHEET_TAB);
  }
  return normalizeEnvValue(process.env.GOOGLE_HACKATHON_SHEET_TAB);
}

function parseServiceAccountJson(rawJson: string): { client_email: string; private_key: string } | null {
  try {
    return JSON.parse(rawJson) as { client_email: string; private_key: string };
  } catch {
    logger.error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
    return null;
  }
}

function getSheetsClient() {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!rawJson) return null;

  const credentials = parseServiceAccountJson(rawJson);
  if (!credentials) return null;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ version: "v4", auth });
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleString("en-PK", { timeZone: "Asia/Karachi" });
  } catch {
    return iso;
  }
}

function rowToValues(reg: RegistrationSheetRow): string[] {
  return [
    reg.id,
    reg.full_name,
    reg.email,
    reg.phone_number,
    reg.university ?? "",
    reg.department ?? "",
    reg.roll_number ?? "",
    reg.main_category,
    reg.sub_category,
    reg.team_name ?? "",
    reg.team_logo_url ?? "",
    reg.team_members ?? "",
    reg.terms_accepted ? "Yes" : "No",
    formatDate(reg.created_at),
    formatDate(reg.updated_at),
    "Unpaid",
  ];
}

function googleApiErrorMessage(err: unknown): string {
  if (err && typeof err === "object" && "response" in err) {
    const data = (err as { response?: { data?: { error?: { message?: string } } } }).response?.data;
    if (data?.error?.message) return data.error.message;
  }
  return err instanceof Error ? err.message : String(err);
}

async function resolveTabName(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
  target: SheetTarget
): Promise<string> {
  const configured = getTabOverride(target);
  if (configured) return configured;

  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const firstTab = meta.data.sheets?.[0]?.properties?.title;
  if (!firstTab) throw new Error("Spreadsheet has no tabs");
  return firstTab;
}

async function ensureHeaders(
  sheets: ReturnType<typeof google.sheets>,
  sheetId: string,
  tabName: string
): Promise<void> {
  const range = `${tabName}!A1:P1`;
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range });

  const firstCell = existing.data.values?.[0]?.[0];
  if (firstCell === REGISTRATION_SHEET_HEADERS[0]) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [[...REGISTRATION_SHEET_HEADERS]] },
  });
}

export async function appendToSheetTarget(
  reg: RegistrationSheetRow,
  target: SheetTarget
): Promise<void> {
  const { logLabel, expectedMainCategory } = SHEET_TARGETS[target];

  if (reg.main_category !== expectedMainCategory) {
    return;
  }

  const sheetId = getSheetId(target);
  if (!sheetId) {
    logger.warn(`${logLabel} sheet sync skipped: sheet ID env not set`, {
      envKey: target === "gaming" ? "GOOGLE_SHEET_ID" : "GOOGLE_HACKATHON_SHEET_ID",
      registrationId: reg.id,
    });
    return;
  }

  const sheets = getSheetsClient();
  if (!sheets) {
    logger.warn(`${logLabel} sheet sync skipped: GOOGLE_SERVICE_ACCOUNT_JSON not set`, {
      registrationId: reg.id,
    });
    return;
  }

  try {
    const tabName = await resolveTabName(sheets, sheetId, target);
    await ensureHeaders(sheets, sheetId, tabName);

    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:P`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [rowToValues(reg)],
      },
    });

    logger.info(`${logLabel} registration appended to Google Sheet`, {
      registrationId: reg.id,
      subCategory: reg.sub_category,
      sheetIdPrefix: sheetId.slice(0, 8),
    });
  } catch (err: unknown) {
    logger.error(`Failed to append ${logLabel.toLowerCase()} registration to Google Sheet`, {
      message: googleApiErrorMessage(err),
      registrationId: reg.id,
      sheetIdPrefix: sheetId.slice(0, 8),
    });
  }
}

/**
 * Route registration to the correct Google Sheet by main_category.
 */
export async function syncRegistrationToGoogleSheets(reg: RegistrationSheetRow): Promise<void> {
  if (reg.main_category === "E-Sports") {
    await appendToSheetTarget(reg, "gaming");
  } else if (reg.main_category === "Hackathon") {
    await appendToSheetTarget(reg, "hackathon");
  }
}
