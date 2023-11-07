import { singleton } from 'tsyringe';
import { DatabaseProvider } from '../database/database.provider';
import { Logger } from '../utils/logger';
import { AppVersionUpgradeWorker } from './app-version/app-version-upgrade.worker';
import { AppStateProvider } from './app-states/app-state.provider';

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
    AppStateProvider.isReady.next(true);
  }
}
