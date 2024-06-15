import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SettingsActions } from './settings.actions';
import { SettingsApiService } from '../../modules/settings/services/settings-api.service';
import { AppSettings } from 'shared-lib';
import { LanguageService } from '../services/language.service';
import { switchMap } from 'rxjs';

@Injectable()
export class SettingsEffects {
  loadConfigEntries$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(SettingsActions.loadSettingEntries),
      switchMap(() =>
        this.settingsApiService
          .loadSettings()
          .then((appSettings: AppSettings) => {
            this.languageService.setLocale(appSettings.locale);
            // TODO: set default theme in case this is required
            return SettingsActions.loadSettingEntriesSuccess({
              appSettings: appSettings,
            });
          })
          .catch((error: Error) =>
            SettingsActions.loadSettingEntriesError({ error: error.message })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private settingsApiService: SettingsApiService,
    private languageService: LanguageService
  ) {}
}
