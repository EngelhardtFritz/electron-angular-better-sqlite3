import { singleton } from 'tsyringe';
import { Repository } from 'typeorm';
import { SettingEntity } from '../../entities/settings/setting.entity';
import { AppDataSource } from '../../data-source';

@singleton()
export class SettingsDao {
  private repository: Repository<SettingEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(SettingEntity);
  }

  async save(key: string, value: string): Promise<SettingEntity> {
    const entry = await this.findOne(key);
    if (entry !== null) {
      // Entry already exists in the database
      return this.repository.save({
        id: entry.id,
        key: key,
        value: value,
      } as SettingEntity);
    } else {
      // Entry does not yet exist
      return this.repository.save({
        key: key,
        value: value,
      } as SettingEntity);
    }
  }

  async findAll(): Promise<Array<SettingEntity>> {
    return this.repository.find();
  }

  async findOne(key: string): Promise<SettingEntity | null> {
    return this.repository.findOne({
      where: {
        key: key,
      },
    });
  }

  async removeByKey(key: string) {
    return this.repository.delete({
      key: key,
    });
  }
}
