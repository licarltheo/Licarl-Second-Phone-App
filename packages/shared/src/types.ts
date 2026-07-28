export type Role = 'USER' | 'ADMIN' | 'SUPPORT' | 'SUPER_ADMIN';
export type Theme = 'light' | 'dark' | 'system';
export type NumberType = 'LOCAL' | 'MOBILE' | 'TOLL_FREE' | 'BUSINESS' | 'PREMIUM';
export type NumberStatus = 'AVAILABLE' | 'RESERVED' | 'ACTIVE' | 'EXPIRED' | 'RELEASED' | 'PORTING' | 'SUSPENDED';
export type SubscriptionStatus = 'TRIALING' | 'ACTIVE' | 'PAST_DUE' | 'CANCELED' | 'UNPAID' | 'INCOMPLETE';
export type Provider = 'TWILIO' | 'TELNYX' | 'VONAGE' | 'SINCH' | 'PLIVO' | 'BANDWIDTH' | 'MESSAGEBIRD';
export type MessageDirection = 'INBOUND' | 'OUTBOUND';
export type MessageStatus = 'QUEUED' | 'SENDING' | 'SENT' | 'DELIVERED' | 'FAILED' | 'READ';
export type CallDirection = 'INBOUND' | 'OUTBOUND';
export type CallStatus = 'RINGING' | 'IN_PROGRESS' | 'COMPLETED' | 'BUSY' | 'NO_ANSWER' | 'FAILED' | 'CANCELED';

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: { code: string; message: string; details?: unknown };
  meta?: { page?: number; limit?: number; total?: number; hasMore?: boolean };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PhoneNumberFilter {
  country?: string;
  city?: string;
  areaCode?: string;
  type?: NumberType;
  smsSupported?: boolean;
  voiceSupported?: boolean;
  whatsappSupported?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  country: string | null;
  language: string;
  timezone: string;
  role: Role;
  emailVerified: boolean;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}
