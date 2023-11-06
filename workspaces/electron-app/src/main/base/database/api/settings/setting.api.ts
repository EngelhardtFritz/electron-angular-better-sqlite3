import { singleton } from 'tsyringe';
import { SettingsDao } from '../../dao/settings/setting.dao';
import { SettingEntity } from '../../entities/settings/setting.entity';

@singleton()
export class SettingApi {
  constructor(protected configDao: SettingsDao) {}

  async findAll(): Promise<Array<SettingEntity>> {
    return this.configDao.findAll();
  }

  async removeByKey(key: string) {
    return this.configDao.removeByKey(key);
  }
}
