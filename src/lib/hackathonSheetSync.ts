import {
  appendRegistrationToCategorySheet,
  type RegistrationSheetRow,
} from "@/lib/registrationSheetSync";

export type HackathonRegistrationRow = RegistrationSheetRow;

const HACKATHON_SHEET_CONFIG = {
  expectedMainCategory: "Hackathon",
  sheetIdEnvKey: "GOOGLE_HACKATHON_SHEET_ID",
  tabEnvKey: "GOOGLE_HACKATHON_SHEET_TAB",
  logLabel: "Hackathon",
} as const;

export async function appendHackathonRegistrationToSheet(
  reg: HackathonRegistrationRow
): Promise<void> {
  return appendRegistrationToCategorySheet(reg, HACKATHON_SHEET_CONFIG);
}
