export const APP_NAME = 'Licarl Phone';
export const APP_DESCRIPTION = 'Enterprise Virtual Phone Number Platform';
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://licarl.phone';

export const SUPPORTED_COUNTRIES = [
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'FR', name: 'France', flag: '🇫🇷' },
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
] as const;

export const NUMBER_TYPES = [
  { value: 'LOCAL', label: 'Local' },
  { value: 'MOBILE', label: 'Mobile' },
  { value: 'TOLL_FREE', label: 'Toll Free' },
  { value: 'BUSINESS', label: 'Business' },
  { value: 'PREMIUM', label: 'Premium' },
] as const;

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPPORT: 'SUPPORT',
  SUPER_ADMIN: 'SUPER_ADMIN',
} as const;

export const JWT_ACCESS_EXPIRES = '15m';
export const JWT_REFRESH_EXPIRES = '7d';

export const RATE_LIMITS = {
  AUTH: { windowMs: 15 * 60 * 1000, max: 20 },
  API: { windowMs: 60 * 1000, max: 100 },
  SMS: { windowMs: 60 * 1000, max: 30 },
  CALL: { windowMs: 60 * 1000, max: 10 },
} as const;

export const PROVIDERS = [
  'TWILIO',
  'TELNYX',
  'VONAGE',
  'SINCH',
  'PLIVO',
  'BANDWIDTH',
  'MESSAGEBIRD',
] as const;
