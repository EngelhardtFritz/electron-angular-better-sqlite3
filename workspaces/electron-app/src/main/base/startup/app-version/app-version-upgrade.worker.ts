import { singleton } from 'tsyringe';
import { AppVersionApi } from '../../database/api/settings/app-version.api';
import { app } from 'electron';
import { Logger } from '../../utils/logger';
import { AppVersionProvider } from './app-version.provider';

/**
 * This worker logs the app version state changes and should be used to migrate user data in case of breaking changes
 */
@singleton()
export class AppVersionUpgradeWorker {
  constructor(
    private appVersionApi: AppVersionApi,
    private appVersionProvider: AppVersionProvider
  ) {}

  public async checkAppVersion(): Promise<void> {
    const appVersionFromDb = await this.appVersionApi.getAppVersion();
    const newAppVersion = app.getVersion();

    if (!appVersionFromDb) {
      Logger.info(
        `[AppVersionUpgradeWorker#checkAppVersion] No app version set yet. New app version is: '${newAppVersion}'.`
      );
      await this.appVersionApi.setAppVersion(newAppVersion);
      return;
    }

    const versionChange = this.appVersionProvider.getVersionChange(
      appVersionFromDb,
      newAppVersion
    );
    if (versionChange === 1) {
      Logger.info(
        `[AppVersionUpgradeWorker#checkAppVersion] Upgrade app version from: '${appVersionFromDb}' to '${newAppVersion}'.`
      );
    } else if (versionChange === 0) {
      Logger.info(
        `[AppVersionUpgradeWorker#checkAppVersion] App version is still: '${newAppVersion}'.`
      );
    } else if (versionChange === -1) {
      Logger.warn(
        `[AppVersionUpgradeWorker#checkAppVersion] Downgrade app version from: '${appVersionFromDb}' to '${newAppVersion}'.`
      );
    }

    await this.appVersionApi.setAppVersion(newAppVersion);
  }
}
