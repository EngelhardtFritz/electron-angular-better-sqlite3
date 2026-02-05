import { Component, HostListener, OnDestroy, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { SettingsAppState } from '../../../../shared/state/settings.reducer';
import { Store } from '@ngrx/store';
import { SettingsActions } from '../../../../shared/state/settings.actions';

import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [TranslatePipe],
})
export class SettingsComponent implements OnDestroy {
  protected settingsStore = inject<Store<SettingsAppState>>(Store);

  private destroy$ = new Subject();
  protected screenWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(_event?: unknown) {
    this.screenWidth = window.innerWidth;
  }

  constructor() {
    this.onResize();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  requestData(): void {
    this.settingsStore.dispatch(SettingsActions.loadSettingEntries());
  }
}
