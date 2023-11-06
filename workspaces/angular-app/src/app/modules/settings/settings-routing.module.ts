import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';

const settingsRoutes: Routes = new Array<Route>({
  path: '',
  component: SettingsComponent,
});

@NgModule({
  imports: [RouterModule.forChild(settingsRoutes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
