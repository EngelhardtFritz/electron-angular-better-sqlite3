import { AppComponent } from './app/app.component';
import { extModules } from './app/build-specifics';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';
import { SettingsStateModule } from './app/shared/state/settings.state.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  if (!isDevMode()) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
  }
  return new TranslateHttpLoader(http);
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(APP_ROUTES),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(
      BrowserModule,
      SettingsStateModule,
      TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
        },
      }),
      StoreModule.forRoot({}, {}),
      EffectsModule.forRoot([]),
      extModules
    ),
  ],
}).catch((err) => console.error(err));
