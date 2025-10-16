// validators.js
export const patterns = {
  description: /^\S(?:.*\S)?$/, // no leading/trailing space
  amount: /^(0|[1-9]\d*)(\.\d{1,2})?$/, // numeric, up to 2 decimals
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  duplicateWord: /\b(\w+)\s+\1\b/i
};

export function validateRecord(r){
  const errors = {};
  if (!patterns.description.test(String(r.description || ''))) errors.description = 'Invalid description (no leading/trailing spaces)';
  if (!patterns.amount.test(String(r.amount))) errors.amount = 'Invalid amount (use 0 or positive, up to 2 decimals)';
  if (!patterns.date.test(String(r.date))) errors.date = 'Invalid date (YYYY-MM-DD)';
  if (!patterns.category.test(String(r.category))) errors.category = 'Invalid category (letters, spaces, hyphens)';
  return errors;
}
