import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { SettingsAppState } from './shared/state/settings.reducer';
import { SettingsActions } from './shared/state/settings.actions';
import { SettingsComponent } from './modules/settings/components/settings/settings.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SettingsComponent],
})
export class AppComponent {
  title = 'angular-app';

  constructor(private settingsStore: Store<SettingsAppState>) {
    this.settingsStore.dispatch(SettingsActions.loadSettingEntries());
  }
}
