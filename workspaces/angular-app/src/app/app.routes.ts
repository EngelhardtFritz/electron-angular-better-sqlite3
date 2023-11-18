import { Route } from '@angular/router';

export const APP_ROUTES: Array<Route> = [
  {
    path: '/',
    loadChildren: () =>
      import('./modules/settings/settings.routes').then(
        (mod) => mod.SETTINGS_ROUTES
      ),
  },
];
