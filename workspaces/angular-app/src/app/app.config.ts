import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { APP_ROUTES } from './app.routes';
import { StoreModule } from '@ngrx/store';
import {
  provideHttpClient,
  withInterceptorsFromDi,
  HttpClient,
} from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { extModules } from './build-specifics';
import { SettingsStateModule } from './shared/state/settings.state.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  if (!isDevMode()) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
  }
  return new TranslateHttpLoader(http);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(APP_ROUTES),
    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    importProvidersFrom(
      BrowserModule,
      SettingsStateModule,
      StoreModule.forRoot({}, {}),
      EffectsModule.forRoot([])
    ),
    extModules,
  ],
};
