'use client';

import { AppConfig, UserSession } from '@stacks/connect';

let userSessionInstance: UserSession | undefined;

if (typeof window !== 'undefined') {
  const appConfig = new AppConfig(['store_write', 'publish_data']);
  userSessionInstance = new UserSession({ appConfig });
}

export const userSession = userSessionInstance!;
