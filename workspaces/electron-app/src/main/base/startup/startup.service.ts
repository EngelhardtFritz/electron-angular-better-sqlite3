import { singleton } from 'tsyringe';
import { isAppReady } from '../utils/ready-state.provider';
import { DatabaseProvider } from '../database/database.provider';
import { Logger } from '../utils/logger';
import { AppVersionUpgradeWorker } from './app-version/app-version-upgrade.worker';

@singleton()
export class StartupService {
  constructor(
    private databaseProvider: DatabaseProvider,
    private appVersionUpgradeWorker: AppVersionUpgradeWorker
  ) {
    Logger.verbose(`[StartupService] constructor called`);
  }

  async doWork() {
    await this.databaseProvider.initializeDataSource();
    await this.appVersionUpgradeWorker.checkAppVersion();

    Logger.verbose(`[StartupService#doWork] Set app ready.`);
    isAppReady.next(true);
  }
}
