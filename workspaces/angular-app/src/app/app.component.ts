import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsAppState } from './shared/state/settings.reducer';
import { SettingsActions } from './shared/state/settings.actions';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-app';

  constructor(private settingsStore: Store<SettingsAppState>) {
    this.settingsStore.dispatch(SettingsActions.loadSettingEntries());
  }
}
