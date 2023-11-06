import { Logger } from '../utils/logger';
import { DataSource } from 'typeorm';
import { AppDataSource } from './data-source';
import { singleton } from 'tsyringe';

@singleton()
export class DatabaseProvider {
  public async initializeDataSource(): Promise<DataSource | undefined> {
    try {
      Logger.info(
        `[DatabaseProvider#initializeDataSource] Initialize DataSource...`
      );
      const dataSource = await AppDataSource.initialize();
      Logger.info(
        `[DatabaseProvider#initializeDataSource] DataSource has been initialized`
      );

      return dataSource;
    } catch (error: any) {
      Logger.error(
        `[DatabaseProvider#initializeDataSource] Could not initialize DataSource, error: ${error?.message}`
      );
      throw error;
    }
  }

  public closeDatabaseConnection() {
    Logger.info(
      `[DatabaseProvider#closeDatabaseConnection] Closing database connection`
    );
    AppDataSource.destroy();
  }
}
