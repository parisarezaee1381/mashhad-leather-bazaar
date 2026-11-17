const FA_DIGITS = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

/** Replace Latin digits with Persian digits. */
export function toFa(value: string | number): string {
  return String(value).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** Convert Persian/Arabic digits typed by the customer back to Latin digits. */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

/** 18400000 -> "۱۸,۴۰۰,۰۰۰" */
export function formatNumber(n: number): string {
  return toFa(Math.round(n).toLocaleString("en-US"));
}

/** 18400000 -> "۱۸,۴۰۰,۰۰۰ تومان" */
export function formatToman(n: number): string {
  return `${formatNumber(n)} تومان`;
}

export function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("fa-IR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}
