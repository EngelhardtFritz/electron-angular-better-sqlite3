import { Component, HostListener, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { SettingsAppState } from '../../../../shared/state/settings.reducer';
import { Store } from '@ngrx/store';
import { SettingsActions } from '../../../../shared/state/settings.actions';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [NgIf, TranslatePipe],
})
export class SettingsComponent implements OnDestroy {
  private destroy$ = new Subject();
  protected screenWidth = 0;

  @HostListener('window:resize', ['$event'])
  onResize(_event?: unknown) {
    this.screenWidth = window.innerWidth;
  }

  constructor(protected settingsStore: Store<SettingsAppState>) {
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
