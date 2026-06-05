/** Qawali Night direct ticket sub-categories (stored in DB as sub_category). */
export const QAWALI_EXTERNAL_PASS = "External Pass - Rs. 700";
export const QAWALI_DSU_STUDENT_TICKET = "DSU Student Ticket - Rs. 500";

export const QAWALI_NIGHT_SUBCATEGORIES = [
  QAWALI_EXTERNAL_PASS,
  QAWALI_DSU_STUDENT_TICKET,
] as const;

/** Parses payable amount from labels like "External Pass - Rs. 700". */
export function getPriceFromSubCategoryLabel(subCategory?: string): number | null {
  if (!subCategory) return null;
  const match = subCategory.match(/Rs\.?\s*(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : null;
}

export function formatTicketPrice(amount: number): string {
  return `Rs. ${amount}`;
}

export function resolveQawaliTicketFromUrlParam(ticket: string | null): string {
  return ticket === "student" ? QAWALI_DSU_STUDENT_TICKET : QAWALI_EXTERNAL_PASS;
}
