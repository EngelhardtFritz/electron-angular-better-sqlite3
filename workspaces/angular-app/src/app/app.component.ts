import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsAppState } from './shared/state/settings.reducer';
import { SettingsActions } from './shared/state/settings.actions';
import { RouterOutlet } from '@angular/router';
import { LanguageService } from './shared/services/language.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private settingsStore = inject<Store<SettingsAppState>>(Store);
  private languageService = inject(LanguageService);

  title = 'angular-app';

  constructor() {
    this.languageService.initLanguageService();
    this.settingsStore.dispatch(SettingsActions.loadSettingEntries());
  }
}
