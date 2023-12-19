import { singleton } from 'tsyringe';
import { SettingIpcProvider } from './provider/setting-ipc.provider';
import { WindowIpcProvider } from './provider/window-ipc.provider';

@singleton()
export class IpcService {
  constructor(
    private settingIpcProvider: SettingIpcProvider,
    private windowIpcProvider: WindowIpcProvider
  ) {}

  public registerIpcServices() {
    this.settingIpcProvider.registerAll();
    this.windowIpcProvider.registerAll();
  }
}
