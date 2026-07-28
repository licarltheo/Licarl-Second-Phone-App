import type { TelecomProvider } from './types';
import { MockProvider } from './mock.provider';
import type { Provider } from '@licarl/shared';

const registry: Record<string, TelecomProvider> = {
  MOCK: new MockProvider(),
  TWILIO: new MockProvider(),
};

let activeKey = process.env.TELECOM_PROVIDER || 'MOCK';

export function getProvider(name?: Provider | string): TelecomProvider {
  const key = (name || activeKey).toUpperCase();
  const provider = registry[key] || registry.MOCK;
  return provider!;
}

export function setActiveProvider(name: string) {
  activeKey = name.toUpperCase();
}

export * from './types';
export { MockProvider };
