import { provideStoreDevtools } from '@ngrx/store-devtools';

export const extModules = provideStoreDevtools({
  maxAge: 25,
  connectInZone: true,
});
