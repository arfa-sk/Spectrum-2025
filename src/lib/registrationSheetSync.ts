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

export interface CategorySheetConfig {
  expectedMainCategory: string;
  sheetIdEnvKey: string;
  tabEnvKey: string;
  logLabel: string;
}

function stripQuotes(val: string | undefined): string | undefined {
  return val?.replace(/^"|"$/g, "");
}

function parseServiceAccountJson(rawJson: string): { client_email: string; private_key: string } | null {
  try {
    return JSON.parse(rawJson) as { client_email: string; private_key: string };
  } catch {
    logger.error("GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON");
    return null;
  }
}

function getSheetsClient(sheetId: string) {
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!rawJson) return null;

  const credentials = parseServiceAccountJson(rawJson);
  if (!credentials) return null;

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { sheets: google.sheets({ version: "v4", auth }), sheetId };
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
  tabEnvKey: string
): Promise<string> {
  const configured = stripQuotes(process.env[tabEnvKey]);
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

/**
 * Append one registration row to the configured Google Sheet.
 * Failures are logged only — registration is never blocked.
 */
export async function appendRegistrationToCategorySheet(
  reg: RegistrationSheetRow,
  config: CategorySheetConfig
): Promise<void> {
  if (reg.main_category !== config.expectedMainCategory) return;

  const sheetId = stripQuotes(process.env[config.sheetIdEnvKey]);
  if (!sheetId) {
    logger.warn(`${config.logLabel} sheet sync skipped: ${config.sheetIdEnvKey} not set`);
    return;
  }

  const client = getSheetsClient(sheetId);
  if (!client) {
    logger.warn(`${config.logLabel} sheet sync skipped: GOOGLE_SERVICE_ACCOUNT_JSON not set`);
    return;
  }

  const { sheets } = client;

  try {
    const tabName = await resolveTabName(sheets, sheetId, config.tabEnvKey);
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

    logger.info(`${config.logLabel} registration appended to Google Sheet`, {
      registrationId: reg.id,
      subCategory: reg.sub_category,
    });
  } catch (err: unknown) {
    logger.error(`Failed to append ${config.logLabel.toLowerCase()} registration to Google Sheet`, {
      message: googleApiErrorMessage(err),
      registrationId: reg.id,
    });
  }
}
