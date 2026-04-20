import { capitalize } from '@utils/string';

declare const __APP_VERSION__: string;
declare const __PLATFORM__: string;

export function getAppVersion(): string {
  return __APP_VERSION__;
}

export function getPlatform(): string {
  return __PLATFORM__;
}

export function getAppName(): string {
  return process.env.APP_NAME || 'unknown';
}

export function formatAppInfo(): string {
  return `${capitalize(getAppName())} v${getAppVersion()} (${getPlatform()})`;
}

export { capitalize } from '@utils/string';
