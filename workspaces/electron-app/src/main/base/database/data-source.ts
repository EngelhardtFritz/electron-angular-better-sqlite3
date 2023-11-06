import { join } from 'path';
import * as os from 'node:os';

import { DataSource, DataSourceOptions } from 'typeorm';
// import { InitDatabase1686242856793 } from './migrations/1686242856793-initDatabase';
import { Logger } from '../utils/logger';
import { container, singleton } from 'tsyringe';
import { ConfigProvider } from '../utils/config.provider';
import { SettingEntity } from './entities/settings/setting.entity';

@singleton()
export class DataSourceProvider {
  public static DATABASE_NAME_DEV = 'test';
  public static DATABASE_NAME_PROD = 'your_app_name';

  constructor(protected configProvider: ConfigProvider) {
    Logger.verbose(`[DataSourceProvider] constructor called`);
  }

  public getDatabaseName(): string {
    return this.isProd()
      ? DataSourceProvider.DATABASE_NAME_PROD
      : DataSourceProvider.DATABASE_NAME_DEV;
  }

  public isProd(): boolean {
    const env = process.env.NODE_ENV || 'development';
    return env === 'production';
  }

  public getDatabasePath(): string {
    const databaseName = this.getDatabaseName();
    const isProd = this.isProd();
    const appDevPath = this.configProvider.appConfig.devPath
      ? this.configProvider.appConfig.devPath
      : os.homedir();
    const databasePath = isProd
      ? join(`./userdata/${databaseName}.db`)
      : join(appDevPath, `.dist/${databaseName}.db`);

    Logger.debug(
      `[DataSourceProvider#getDatabasePath] isProd: ${isProd}, database path: ${databasePath}`
    );

    return databasePath;
  }
}

const dataSourceProvider = container.resolve(DataSourceProvider);
const dataSourceOptions: DataSourceOptions = {
  entities: [SettingEntity],
  // migrations: [InitDatabase1686242856793], // TODO: add migrations in prod builds
  migrationsRun: true,
  database: dataSourceProvider.getDatabasePath(),
  type: 'better-sqlite3',
  synchronize: true, // TODO: Do not set to true in prod build
  logging: false,
};

Logger.info(`[DataSource] Creating DataSource...`);
export const AppDataSource = new DataSource(dataSourceOptions);
