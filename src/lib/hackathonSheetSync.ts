import { appendToSheetTarget, type RegistrationSheetRow } from "@/lib/registrationSheetSync";

export type HackathonRegistrationRow = RegistrationSheetRow;

export async function appendHackathonRegistrationToSheet(
  reg: HackathonRegistrationRow
): Promise<void> {
  return appendToSheetTarget(reg, "hackathon");
}
