export type SmsDeliveryStatus =
  | 'QUEUED'
  | 'SENDING'
  | 'SENT'
  | 'DELIVERED'
  | 'FAILED'
  | 'UNDELIVERED'
  | 'EXPIRED';

export type SmsProviderName =
  | 'TWILIO'
  | 'VONAGE'
  | 'TELNYX'
  | 'MESSAGEBIRD'
  | 'INFOBIP';

export interface SendSmsParams {
  from: string;
  to: string;
  body: string;
  mediaUrls?: string[];
  statusCallbackUrl?: string;
  clientReference?: string;
}

export interface SendSmsResult {
  providerSid: string;
  status: SmsDeliveryStatus;
  to: string;
  from: string;
  price?: number;
  currency?: string;
  raw?: unknown;
}

export interface InboundSmsPayload {
  providerSid: string;
  from: string;
  to: string;
  body: string;
  mediaUrls?: string[];
  receivedAt: Date;
  raw: unknown;
}

export interface StatusUpdatePayload {
  providerSid: string;
  status: SmsDeliveryStatus;
  errorCode?: string;
  errorMessage?: string;
  raw: unknown;
}

export interface NumberSearchParams {
  country: string;
  areaCode?: string;
  type?: 'local' | 'mobile' | 'tollFree';
  smsEnabled?: boolean;
  voiceEnabled?: boolean;
  limit?: number;
}

export interface AvailableNumber {
  e164: string;
  countryCode: string;
  region?: string;
  locality?: string;
  type: string;
  capabilities: { sms: boolean; voice: boolean; mms?: boolean };
  monthlyPrice?: number;
  currency?: string;
  providerSid: string;
}

export interface PurchasedNumber {
  e164: string;
  providerSid: string;
  capabilities: { sms: boolean; voice: boolean; mms?: boolean };
}

export interface BalanceResult {
  balance: number;
  currency: string;
  raw?: unknown;
}

export interface LookupResult {
  e164: string;
  countryCode?: string;
  carrier?: string;
  lineType?: string;
  valid: boolean;
}

export interface SmsProvider {
  readonly name: SmsProviderName;
  send(params: SendSmsParams): Promise<SendSmsResult>;
  getStatus(providerSid: string): Promise<StatusUpdatePayload>;
  purchaseNumber(providerSid: string): Promise<PurchasedNumber>;
  releaseNumber(providerSid: string): Promise<void>;
  listNumbers(params: NumberSearchParams): Promise<AvailableNumber[]>;
  lookup(e164: string): Promise<LookupResult>;
  balance(): Promise<BalanceResult>;
  validateWebhook(req: {
    headers: Record<string, string | string[] | undefined>;
    rawBody?: string | Buffer;
    body?: unknown;
    url?: string;
  }): boolean;
  parseInboundWebhook(body: unknown, headers?: Record<string, string | undefined>): InboundSmsPayload | null;
  parseStatusWebhook(body: unknown): StatusUpdatePayload | null;
}

export class ProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: SmsProviderName,
    public readonly code?: string,
    public readonly statusCode?: number,
    public readonly retryable = false
  ) {
    super(message);
    this.name = 'ProviderError';
  }
}
