import { singleton } from 'tsyringe';
import { SettingsDao } from '../../dao/settings/setting.dao';
import { Logger } from '../../../utils/logger';

@singleton()
export class LocaleApi {
  private static KEY_LOCALE = 'LOCALE';

  constructor(protected configDao: SettingsDao) {}

  async getLocale(): Promise<string | null> {
    return this.configDao.findOne(LocaleApi.KEY_LOCALE).then((configEntity) => {
      Logger.verbose(
        `[LocaleApi#getLocale] configEntity: ${JSON.stringify(configEntity)}`
      );
      if (configEntity !== null) {
        return configEntity.value;
      } else {
        return null;
      }
    });
  }

  async setLocale(locale: string): Promise<string> {
    return await this.configDao
      .save(LocaleApi.KEY_LOCALE, locale)
      .then((configEntity) => configEntity.value);
  }
}
