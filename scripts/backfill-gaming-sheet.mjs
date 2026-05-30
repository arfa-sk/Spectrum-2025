/**
 * One-time backfill: push all E-Sports registrations from Supabase into the Google Sheet.
 * Skips rows whose ID is already in column A. Does not overwrite existing sheet rows.
 *
 * Usage: npm run backfill:gaming-sheet
 */

import { createClient } from "@supabase/supabase-js";
import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const HEADERS = [
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
];

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) {
    throw new Error(".env.local not found");
  }

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString("en-PK", { timeZone: "Asia/Karachi" });
  } catch {
    return iso;
  }
}

function rowToValues(reg) {
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

async function resolveTabName(sheets, sheetId) {
  const configured = process.env.GOOGLE_SHEET_TAB?.replace(/^"|"$/g, "");
  if (configured) return configured;

  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const firstTab = meta.data.sheets?.[0]?.properties?.title;
  if (!firstTab) throw new Error("Spreadsheet has no tabs");
  return firstTab;
}

async function ensureHeaders(sheets, sheetId, tabName) {
  const range = `${tabName}!A1:P1`;
  const existing = await sheets.spreadsheets.values.get({ spreadsheetId: sheetId, range });
  if (existing.data.values?.[0]?.[0] === HEADERS[0]) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId: sheetId,
    range,
    valueInputOption: "RAW",
    requestBody: { values: [HEADERS] },
  });
}

async function main() {
  loadEnvLocal();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const sheetId = process.env.GOOGLE_SHEET_ID?.replace(/^"|"$/g, "");
  const rawJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase env vars in .env.local");
  }
  if (!sheetId || !rawJson) {
    throw new Error("Missing GOOGLE_SHEET_ID or GOOGLE_SERVICE_ACCOUNT_JSON in .env.local");
  }

  const credentials = JSON.parse(rawJson);
  const supabase = createClient(supabaseUrl, supabaseKey);
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });

  console.log("Fetching E-Sports registrations from Supabase...");
  const { data: registrations, error } = await supabase
    .from("registrations")
    .select("*")
    .eq("main_category", "E-Sports")
    .order("created_at", { ascending: true });

  if (error) throw new Error(`Supabase query failed: ${error.message}`);
  console.log(`Found ${registrations.length} E-Sports registration(s) in database.`);

  const tabName = await resolveTabName(sheets, sheetId);
  await ensureHeaders(sheets, sheetId, tabName);

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tabName}!A:A`,
  });
  const existingIds = new Set(
    (existingRes.data.values ?? [])
      .flat()
      .filter((id) => typeof id === "string" && UUID_RE.test(id))
  );

  const toAppend = registrations.filter((reg) => !existingIds.has(reg.id));
  console.log(`${existingIds.size} already in sheet, ${toAppend.length} to append.`);

  if (toAppend.length === 0) {
    console.log("Nothing to backfill.");
    return;
  }

  // Google Sheets batch limit is generous; chunk at 500 to be safe.
  const chunkSize = 500;
  for (let i = 0; i < toAppend.length; i += chunkSize) {
    const chunk = toAppend.slice(i, i + chunkSize);
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: `${tabName}!A:P`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: chunk.map(rowToValues) },
    });
    console.log(`Appended ${Math.min(i + chunkSize, toAppend.length)} / ${toAppend.length}`);
  }

  console.log("Backfill complete.");
}

main().catch((err) => {
  console.error("Backfill failed:", err.message);
  process.exit(1);
});
