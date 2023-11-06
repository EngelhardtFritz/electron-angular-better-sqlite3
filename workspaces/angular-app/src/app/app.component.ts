import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsAppState } from './modules/settings/state/settings.reducer';
import { SettingsActions } from './modules/settings/state/settings.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-app';

  constructor(private settingsStore: Store<SettingsAppState>) {
    this.settingsStore.dispatch(SettingsActions.loadSettingEntries());
  }
}
