import { singleton } from 'tsyringe';
import { IpcInvokeService } from '../services/ipc-invoke.service';
import { SettingHandler } from '../handlers/setting/setting.handler';
import { AppSettings, Theme } from 'shared-lib';
import { SettingLocaleHandler } from '../handlers/setting/setting-locale.handler';
import { SettingThemeHandler } from '../handlers/setting/setting-theme.handler';

@singleton()
export class SettingIpcProvider {
  constructor(
    private ipcInvokeService: IpcInvokeService,
    private settingHandler: SettingHandler,
    private settingLocaleHandler: SettingLocaleHandler,
    private settingThemeHandler: SettingThemeHandler
  ) {}

  registerAll() {
    /** Register two way services */
    this.ipcInvokeService.register<null, AppSettings>(this.settingHandler);
    this.ipcInvokeService.register<string, string>(this.settingLocaleHandler);
    this.ipcInvokeService.register<Theme, Theme>(this.settingThemeHandler);
  }
}
