export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatPhoneNumber(e164: string, format: 'international' | 'national' = 'international'): string {
  if (!e164.startsWith('+')) return e164;
  const digits = e164.slice(1);
  if (digits.startsWith('1') && digits.length === 11) {
    const area = digits.slice(1, 4);
    const mid = digits.slice(4, 7);
    const last = digits.slice(7);
    return format === 'national' ? `(${area}) ${mid}-${last}` : `+1 (${area}) ${mid}-${last}`;
  }
  return e164;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function generateId(prefix = ''): string {
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 16);
  return prefix ? `${prefix}_${id}` : id;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function maskPhone(e164: string): string {
  if (e164.length < 8) return e164;
  return e164.slice(0, 4) + '****' + e164.slice(-4);
}
