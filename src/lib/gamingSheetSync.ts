import {
  appendRegistrationToCategorySheet,
  REGISTRATION_SHEET_HEADERS,
  type RegistrationSheetRow,
} from "@/lib/registrationSheetSync";

export const GAMING_SHEET_HEADERS = REGISTRATION_SHEET_HEADERS;
export type GamingRegistrationRow = RegistrationSheetRow;

const GAMING_SHEET_CONFIG = {
  expectedMainCategory: "E-Sports",
  sheetIdEnvKey: "GOOGLE_SHEET_ID",
  tabEnvKey: "GOOGLE_SHEET_TAB",
  logLabel: "Gaming",
} as const;

export async function appendGamingRegistrationToSheet(
  reg: GamingRegistrationRow
): Promise<void> {
  return appendRegistrationToCategorySheet(reg, GAMING_SHEET_CONFIG);
}
