import { singleton } from 'tsyringe';
import { AbstractInvokeService } from '../abstract-invoke.service';
import { SettingsChannel } from 'shared-lib';
import { Logger } from '../../../utils/logger';
import { LocaleApi } from '../../../database/api/settings/locale.api';

@singleton()
export class SettingLocaleHandler
  implements AbstractInvokeService<string, string>
{
  constructor(private localeApi: LocaleApi) {}

  invokingChannel(): string {
    return SettingsChannel.SAVE_SETTING_LOCALE;
  }

  async process(locale: string): Promise<string> {
    try {
      return this.localeApi.setLocale(locale);
    } catch (error) {
      Logger.error(`[LoadConfigHandler#process] error: ${error?.message}`);
      throw error;
    }
  }
}
