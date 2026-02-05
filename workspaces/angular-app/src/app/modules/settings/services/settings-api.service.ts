import { Injectable, inject } from '@angular/core';
import { AppSettings, SettingsChannel } from 'shared-lib';
import { ElectronIpcService } from '../../../shared/services/electron-ipc.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsApiService {
  private electronIpcService = inject(ElectronIpcService);


  loadSettings(): Promise<AppSettings> {
    return this.electronIpcService.invoke(SettingsChannel.LOAD_SETTING_ENTRIES);
  }
}
