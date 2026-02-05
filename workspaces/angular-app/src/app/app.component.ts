import { Component } from '@angular/core';
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
  title = 'angular-app';

  constructor(
    private settingsStore: Store<SettingsAppState>,
    private languageService: LanguageService
  ) {
    this.languageService.initLanguageService();
    this.settingsStore.dispatch(SettingsActions.loadSettingEntries());
  }
}
