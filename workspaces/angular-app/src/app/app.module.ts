import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { extModules } from './build-specifics';
import { SharedModule } from './shared/shared.module';
import { SettingsModule } from './modules/settings/settings.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  if (!isDevMode()) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
  }
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SettingsModule,
    SharedModule,
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
    extModules,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
