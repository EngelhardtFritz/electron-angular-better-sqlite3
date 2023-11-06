import { Theme } from 'shared-lib';
import { singleton } from 'tsyringe';
import { SettingsDao } from '../../dao/settings/setting.dao';
import { Logger } from '../../../utils/logger';

@singleton()
export class ThemeApi {
  private static KEY_THEME = 'THEME';

  constructor(protected configDao: SettingsDao) {}

  async getTheme(): Promise<Theme> {
    return this.configDao.findOne(ThemeApi.KEY_THEME).then((configEntity) => {
      Logger.verbose(
        `[LocaleApi#getTheme] configEntity: ${JSON.stringify(configEntity)}`
      );
      if (configEntity !== null) {
        return Theme[configEntity.value as keyof typeof Theme];
      } else {
        return Theme.DARK;
      }
    });
  }

  async setTheme(theme: Theme): Promise<Theme> {
    return await this.configDao
      .save(ThemeApi.KEY_THEME, Theme[theme])
      .then((configEntity) => Theme[configEntity.value as keyof typeof Theme]);
  }
}
