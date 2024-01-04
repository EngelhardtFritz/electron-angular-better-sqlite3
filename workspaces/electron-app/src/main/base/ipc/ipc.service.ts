import { singleton } from 'tsyringe';
import { SettingIpcProvider } from './provider/setting-ipc.provider';

@singleton()
export class IpcService {
  constructor(private settingIpcProvider: SettingIpcProvider) {}

  public registerIpcServices() {
    this.settingIpcProvider.registerAll();
  }
}
