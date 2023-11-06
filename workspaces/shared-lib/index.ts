import { WindowApi } from './apis/window-api';
export * from './apis/index';
export * from './models/config/app-config';
export * from './models/settings/settings';
export * from './models/settings/theme';

declare global {
  // Global augmentation of the `Window` interface
  interface Window {
    api: WindowApi;
  }
}
