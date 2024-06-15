import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SettingsEffects } from './settings.effects';
import * as fromSettings from './settings.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(
      fromSettings.settingsFeatureKey,
      fromSettings.reducer
    ),
    EffectsModule.forFeature([SettingsEffects]),
  ],
  exports: [],
})
export class SettingsStateModule {}
