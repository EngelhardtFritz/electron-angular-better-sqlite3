import { singleton } from 'tsyringe';
import { IAppVersion } from './app-version.interface';
import { Logger } from '../../utils/logger';

/**
 * Provides functions to extract the different app version specifics from the version string
 * An app version consists of the following properties:
 * 	- major version
 *  - minor version
 *  - patch version
 *  - release candidate version
 * An example for the expected string is the following: `1.0.0-rc.1`
 * This version schema is based on semantic versioning
 */
@singleton()
export class AppVersionProvider {
  /**
   * @returns Returns either 1, 0 or -1 depending if the version
   *  1 -> upgrade
   *  0 -> unchanged
   * -1 ->  downgrade
   */
  public getVersionChange(
    oldVersionString: string,
    newVersionString: string
  ): number {
    const oldVersion = this.getAppVersion(oldVersionString);
    const newVersion = this.getAppVersion(newVersionString);

    // Check major version
    if (newVersion.major > oldVersion.major) {
      return 1;
    } else {
      if (newVersion.major === oldVersion.major) {
        // Check minor version
        if (newVersion.minor > oldVersion.minor) {
          return 1;
        } else {
          if (newVersion.minor === oldVersion.minor) {
            // Check patch and rc version
            return this.isRcOrPatchVersionUpgrade(oldVersion, newVersion);
          } else {
            return -1;
          }
        }
      } else {
        return -1;
      }
    }
  }

  /**
   * Extracts the version properties out of the given version string
   */
  private getAppVersion(version: string): IAppVersion {
    Logger.debug(
      `[AppVersionProvider#getAppVersion] Get versions for: '${version}'`
    );
    const appVersionStrings = version.split('-');

    let releaseCandidate: number | null = null;
    if (appVersionStrings.length > 1) {
      // App version includes release candidate
      try {
        releaseCandidate = Number(appVersionStrings[1].replace('rc.', ''));
      } catch (_err) {
        // Ignore error
      }
    }

    const versions = appVersionStrings[0].split('.');
    if (versions.length === 3) {
      return {
        major: Number(versions[0]),
        minor: Number(versions[1]),
        patch: Number(versions[2]),
        releaseCandidate: releaseCandidate ?? undefined,
      };
    } else {
      Logger.debug(
        `[AppVersionProvider#getAppVersion] The provided app version is invalid: '${version}'`
      );
    }

    Logger.debug(
      `[AppVersionProvider#getAppVersion] Fallback app version will be set to default: '0.0.0'`
    );
    return {
      major: 0,
      minor: 0,
      patch: 0,
    };
  }

  /**
   * upgrade:		 1
   * unchanged:	 0
   * downgrade: -1
   */
  private isRcOrPatchVersionUpgrade(
    oldVersion: IAppVersion,
    newVersion: IAppVersion
  ): number {
    // Check patch version
    if (newVersion.patch > oldVersion.patch) {
      return 1;
    } else {
      if (newVersion.patch === oldVersion.patch) {
        // Check rc version
        return this.isRcVersionUpgrade(
          oldVersion.releaseCandidate,
          newVersion.releaseCandidate
        );
      } else {
        return -1;
      }
    }
  }

  /**
   * upgrade:		 1
   * unchanged:	 0
   * downgrade: -1
   */
  private isRcVersionUpgrade(
    oldRcVersion: number | undefined,
    newRcVersion: number | undefined
  ): number {
    if (newRcVersion !== undefined && oldRcVersion !== undefined) {
      if (newRcVersion > oldRcVersion) {
        return 1;
      } else if (newRcVersion < oldRcVersion) {
        return -1;
      } else {
        return 0;
      }
    } else if (newRcVersion === undefined && oldRcVersion !== undefined) {
      return 1;
    } else if (newRcVersion !== undefined && oldRcVersion === undefined) {
      return -1;
    } else {
      return 0;
    }
  }
}
