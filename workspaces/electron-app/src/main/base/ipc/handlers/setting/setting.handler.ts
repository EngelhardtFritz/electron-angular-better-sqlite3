import { singleton } from 'tsyringe';
import { AbstractInvokeService } from '../abstract-invoke.service';
import { AppSettings, SettingsChannel } from 'shared-lib';
import { SettingApi } from '../../../database/api/settings/setting.api';
import { Logger } from '../../../utils/logger';
import { ThemeApi } from '../../../database/api/settings/theme.api';
import { LocaleApi } from '../../../database/api/settings/locale.api';

@singleton()
export class SettingHandler
  implements AbstractInvokeService<null, AppSettings>
{
  constructor(
    protected settingApi: SettingApi,
    protected themeApi: ThemeApi,
    protected localeApi: LocaleApi
  ) {}

  invokingChannel(): string {
    return SettingsChannel.LOAD_SETTING_ENTRIES;
  }

  async process(..._input: any[]): Promise<AppSettings> {
    try {
      const locale = await this.localeApi.getLocale();
      const theme = await this.themeApi.getTheme();

      return {
        locale: locale ?? undefined,
        theme: theme ?? undefined,
      } as AppSettings;
    } catch (error) {
      Logger.error(`[LoadConfigHandler#process] error: ${error?.message}`);
      throw error;
    }
  }
}
