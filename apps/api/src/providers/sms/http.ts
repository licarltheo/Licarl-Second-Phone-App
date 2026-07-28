export async function httpRequest(
  url: string,
  options: {
    method?: string;
    headers?: Record<string, string>;
    body?: string | URLSearchParams | object;
    auth?: { user: string; pass: string };
    timeoutMs?: number;
  } = {}
): Promise<{ status: number; data: any; headers: Headers; text: string }> {
  const headers: Record<string, string> = { ...(options.headers || {}) };
  let body: string | undefined;

  if (options.auth) {
    const token = Buffer.from(`${options.auth.user}:${options.auth.pass}`).toString('base64');
    headers['Authorization'] = `Basic ${token}`;
  }

  if (options.body instanceof URLSearchParams) {
    body = options.body.toString();
    headers['Content-Type'] = headers['Content-Type'] || 'application/x-www-form-urlencoded';
  } else if (typeof options.body === 'object' && options.body !== null) {
    body = JSON.stringify(options.body);
    headers['Content-Type'] = headers['Content-Type'] || 'application/json';
  } else if (typeof options.body === 'string') {
    body = options.body;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || 30000);

  try {
    const res = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body,
      signal: controller.signal,
    });
    const text = await res.text();
    let data: any = text;
    try {
      data = text ? JSON.parse(text) : null;
    } catch {
      /* keep text */
    }
    return { status: res.status, data, headers: res.headers, text };
  } finally {
    clearTimeout(timeout);
  }
}

export function mapGenericStatus(s: string): import('./types').SmsDeliveryStatus {
  const v = (s || '').toLowerCase();
  if (['queued', 'accepted', 'created'].includes(v)) return 'QUEUED';
  if (['sending', 'pending', 'buffered'].includes(v)) return 'SENDING';
  if (['sent', 'submitted'].includes(v)) return 'SENT';
  if (['delivered', 'delivery_receipt', 'delivery_successful'].includes(v)) return 'DELIVERED';
  if (['failed', 'rejected', 'rejected_network'].includes(v)) return 'FAILED';
  if (['undelivered', 'delivery_failed', 'not_delivered'].includes(v)) return 'UNDELIVERED';
  if (['expired'].includes(v)) return 'EXPIRED';
  return 'QUEUED';
}
