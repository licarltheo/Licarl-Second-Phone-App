import type { NumberType, Provider } from '@licarl/shared';

export interface SearchFilters {
  country?: string;
  city?: string;
  areaCode?: string;
  type?: NumberType;
  smsSupported?: boolean;
  voiceSupported?: boolean;
  whatsappSupported?: boolean;
  limit?: number;
}

export interface ProviderNumber {
  e164: string;
  countryCode: string;
  countryName: string;
  city?: string;
  areaCode?: string;
  type: NumberType;
  providerSid: string;
  smsSupported: boolean;
  voiceSupported: boolean;
  whatsappSupported: boolean;
  monthlyPrice: number;
  setupPrice: number;
  currency: string;
  capabilities?: Record<string, unknown>;
}

export interface ProvisionResult {
  providerSid: string;
  e164: string;
  status: 'ACTIVE' | 'PENDING';
}

export interface SmsResult {
  providerSid: string;
  status: 'QUEUED' | 'SENT' | 'FAILED';
}

export interface CallResult {
  providerSid: string;
  status: string;
}

export interface TelecomProvider {
  readonly name: Provider;
  searchNumbers(filters: SearchFilters): Promise<ProviderNumber[]>;
  purchaseNumber(providerSid: string): Promise<ProvisionResult>;
  releaseNumber(providerSid: string): Promise<void>;
  renewNumber?(providerSid: string): Promise<{ expiresAt: Date }>;
  sendSms?(from: string, to: string, body: string): Promise<SmsResult>;
  makeCall?(from: string, to: string): Promise<CallResult>;
}
