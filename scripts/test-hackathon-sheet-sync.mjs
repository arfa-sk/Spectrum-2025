/**
 * Local test: POST Hackathon registration to API, then verify row exists in sheet.
 * Usage: node scripts/test-hackathon-sheet-sync.mjs [baseUrl]
 * Default baseUrl: http://localhost:3000
 */

import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const baseUrl = process.argv[2] || "http://localhost:3000";

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) throw new Error(".env.local not found");
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    if (!line || line.startsWith("#")) continue;
    const eq = line.indexOf("=");
    if (eq === -1) continue;
    let val = line.slice(eq + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    process.env[line.slice(0, eq).trim()] = val;
  }
}

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

loadEnvLocal();

const testEmail = `hackathon.sync.test.${Date.now()}@example.com`;
const payload = {
  fullName: "Hackathon Sync Test",
  email: testEmail,
  phoneNumber: "03001234567",
  university: "DSU",
  mainCategory: "Hackathon",
  subCategory: "Competitive Programming",
  termsAccepted: true,
};

console.log("1) POST registration to", `${baseUrl}/api/register`);
console.log("   Email:", testEmail);

const res = await fetch(`${baseUrl}/api/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const bodyText = await res.text();
let body;
try {
  body = JSON.parse(bodyText);
} catch {
  body = { raw: bodyText };
}

console.log("   Status:", res.status);
console.log("   Response:", JSON.stringify(body, null, 2));

if (!res.ok || !body.success) {
  console.error("\nFAIL: Registration API did not succeed.");
  process.exit(1);
}

const regId = body.data?.id;
if (!regId) {
  console.error("\nFAIL: No registration id in response.");
  process.exit(1);
}

console.log("\n2) Wait 3s for sheet sync...");
await new Promise((r) => setTimeout(r, 3000));

const sheetId = process.env.GOOGLE_HACKATHON_SHEET_ID?.replace(/^"|"$/g, "").trim();
const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const sheets = google.sheets({
  version: "v4",
  auth: new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  }),
});

const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
const tab = meta.data.sheets?.[0]?.properties?.title || "Sheet1";

const colA = await sheets.spreadsheets.values.get({
  spreadsheetId: sheetId,
  range: `${tab}!A:A`,
});

const ids = (colA.data.values ?? []).flat();
const found = ids.includes(regId);

console.log("\n3) Check hackathon sheet for registration id:", regId);
console.log("   Sheet:", meta.data.properties?.title);
console.log("   Tab:", tab);
console.log("   Row count (col A):", ids.length);

if (found) {
  const rowNum = ids.indexOf(regId) + 1;
  const row = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    range: `${tab}!A${rowNum}:D${rowNum}`,
  });
  console.log("   Row data:", row.data.values?.[0]?.join(" | "));
  console.log("\nPASS: New Hackathon registration appears on the sheet.");
  process.exit(0);
}

console.error("\nFAIL: Registration id NOT found in sheet column A.");
console.error("   Check dev server logs for 'Hackathon registration appended' or skip/error messages.");
process.exit(1);
