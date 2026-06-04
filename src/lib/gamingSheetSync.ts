import {
  appendToSheetTarget,
  REGISTRATION_SHEET_HEADERS,
  type RegistrationSheetRow,
} from "@/lib/registrationSheetSync";

export const GAMING_SHEET_HEADERS = REGISTRATION_SHEET_HEADERS;
export type GamingRegistrationRow = RegistrationSheetRow;

export async function appendGamingRegistrationToSheet(
  reg: GamingRegistrationRow
): Promise<void> {
  return appendToSheetTarget(reg, "gaming");
}
