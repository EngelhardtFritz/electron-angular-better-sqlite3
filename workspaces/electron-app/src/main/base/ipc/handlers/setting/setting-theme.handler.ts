import { singleton } from 'tsyringe';
import { AbstractInvokeService } from '../abstract-invoke.service';
import { SettingsChannel, Theme } from 'shared-lib';
import { Logger } from '../../../utils/logger';
import { ThemeApi } from '../../../database/api/settings/theme.api';

@singleton()
export class SettingThemeHandler
  implements AbstractInvokeService<Theme, Theme>
{
  constructor(private themeApi: ThemeApi) {}

  invokingChannel(): string {
    return SettingsChannel.SAVE_SETTING_THEME;
  }

  async process(theme: Theme): Promise<Theme> {
    try {
      return this.themeApi.setTheme(theme);
    } catch (error) {
      Logger.error(`[LoadConfigHandler#process] error: ${error?.message}`);
      throw error;
    }
  }
}
