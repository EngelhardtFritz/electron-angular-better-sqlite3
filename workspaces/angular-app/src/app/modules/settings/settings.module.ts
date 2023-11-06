import { SharedModule } from 'src/app/shared/shared.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { NgModule } from '@angular/core';
import { SettingsComponent } from './components/settings/settings.component';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './state/settings.reducer';
import { SettingsEffects } from './state/settings.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    SettingsRoutingModule,
    SharedModule,
    StoreModule.forFeature(
      fromSettings.settingsFeatureKey,
      fromSettings.reducer
    ),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
})
export class SettingsModule {}
