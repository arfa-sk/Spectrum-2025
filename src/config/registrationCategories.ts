/** Main categories used on the registration form (and admin filters). */
export const REGISTRATION_MAIN_CATEGORIES = [
  "E-Sports",
  "Hackathon",
  "Play To Win",
  "Spectrum Startup Arena",
  "Qawali Night",
  "Special Deals",
] as const;

export type RegistrationMainCategory = (typeof REGISTRATION_MAIN_CATEGORIES)[number];

/** Main categories shown on the public registration form dropdown. */
export const REGISTRATION_FORM_MAIN_CATEGORIES = [
  "Hackathon",
  "E-Sports",
  "Play To Win",
  "Qawali Night",
  "Special Deals",
] as const;

/** Dropdown options: canonical list plus any extra values already in the database. */
export function getRegistrationCategoryFilterOptions(
  existingFromDb: string[]
): string[] {
  const seen = new Set<string>();
  const ordered: string[] = [];

  for (const cat of REGISTRATION_MAIN_CATEGORIES) {
    if (!seen.has(cat)) {
      seen.add(cat);
      ordered.push(cat);
    }
  }

  for (const cat of existingFromDb) {
    if (cat && !seen.has(cat)) {
      seen.add(cat);
      ordered.push(cat);
    }
  }

  return ordered;
}
