import { singleton } from 'tsyringe';
import { Logger } from '../../../utils/logger';
import { SettingsDao } from '../../dao/settings/setting.dao';

@singleton()
export class AppVersionApi {
  private static KEY_APP_VERSION = 'APP_VERSION';

  constructor(protected configDao: SettingsDao) {}

  async getAppVersion(): Promise<string | null> {
    return this.configDao
      .findOne(AppVersionApi.KEY_APP_VERSION)
      .then((configEntity) => {
        Logger.verbose(
          `[LocaleApi#getAppVersion] configEntity: ${JSON.stringify(
            configEntity
          )}`
        );
        if (configEntity !== null) {
          return configEntity.value;
        } else {
          return null;
        }
      });
  }

  async setAppVersion(locale: string): Promise<string> {
    return await this.configDao
      .save(AppVersionApi.KEY_APP_VERSION, locale)
      .then((configEntity) => configEntity.value);
  }
}
