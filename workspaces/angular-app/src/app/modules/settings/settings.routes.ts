import { Route, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

export const SETTINGS_ROUTES: Routes = new Array<Route>({
  path: '',
  component: SettingsComponent,
});
