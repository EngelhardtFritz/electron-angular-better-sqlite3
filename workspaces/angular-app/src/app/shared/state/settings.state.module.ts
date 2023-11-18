import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import * as fromSettings from './settings.reducer';
import { SettingsEffects } from './settings.effects';
import { EffectsModule } from '@ngrx/effects';

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
