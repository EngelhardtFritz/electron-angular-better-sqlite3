import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { switchMap } from 'rxjs/operators';
import { SettingsActions } from './settings.actions';
import { LanguageService } from 'src/app/shared/services/language.service';
import { SettingsApiService } from '../services/settings-api.service';
import { AppSettings } from 'shared-lib';

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
          .catch((error) =>
            SettingsActions.loadSettingEntriesError(error?.message)
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
