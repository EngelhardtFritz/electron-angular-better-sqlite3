import { mkdir, readFile, readdir, stat, unlink } from 'fs-extra';
import config from './forge.config';
import { join } from 'path';
import { MSICreator } from 'electron-wix-msi';

interface IPartialPackageJson {
  version: string;
  description: string;
  author: {
    name: string;
  };
}

/**
 * This module creates an unsigned msi installer
 * Requires the Wix toolkit v3 command line tools (http://wixtoolset.org/releases/) (explicitly the light.exe and candle.exe)
 * Has more options than the 'electron-winstaller' package
 */
class MsiWizardProvider {
  // Default output path for the msi installer
  private static MSI_OUTPUT_PATH = join(process.cwd(), 'out/msi');

  private appPath: string;
  private packageVersion: string;
  private packageDescription: string;
  private packageAuthorName: string;

  constructor() {
    this.appPath = join(
      process.cwd(),
      `out/${MsiInfoProvider.getAppName()}-win32-x64`
    );
  }

  public async createInstaller() {
    await this.readPackageJson();
    await this.prepare();

    console.log(`[MsiProvider] Start creating the installer...`);
    const msiCreator = this.getMsiCreator();
    await msiCreator.create();
    await msiCreator.compile();
    console.log(`[MsiProvider] Finished creating the installer.`);
  }

  private getMsiCreator() {
    return new MSICreator({
      appDirectory: this.appPath,
      outputDirectory: MsiWizardProvider.MSI_OUTPUT_PATH,
      exe: MsiInfoProvider.getExecutableName(),
      name: MsiInfoProvider.getAppName(),
      icon: MsiInfoProvider.getIconPath(),
      manufacturer: this.packageAuthorName,
      description: this.packageDescription,
      version: this.packageVersion,
      ui: {
        chooseDirectory: true,
      },
    });
  }

  private async prepare() {
    let appPathStats;
    try {
      appPathStats = await stat(this.appPath);
    } catch (err) {
      console.log(
        `[MsiProvider] Cannot create msi installer as the app has not been packaged yet.`
      );
      throw err;
    }

    if (!appPathStats?.isDirectory()) {
      console.log(`[MsiProvider] App path is not a directory.`);
      return;
    }

    let msiOutputPathStats;
    try {
      msiOutputPathStats = await stat(MsiWizardProvider.MSI_OUTPUT_PATH);
    } catch (err) {
      console.log(`[MsiProvider] Output path is not available.`);
    }

    if (!msiOutputPathStats?.isDirectory()) {
      console.log(`[MsiProvider] Creating output folders.`);
      await mkdir(MsiWizardProvider.MSI_OUTPUT_PATH, { recursive: true });
    } else {
      console.log(`[MsiProvider] Cleanup old files.`);
      const filesToRemove = await readdir(MsiWizardProvider.MSI_OUTPUT_PATH);
      for (const file of filesToRemove) {
        await unlink(join(MsiWizardProvider.MSI_OUTPUT_PATH, file));
      }
    }
  }

  private async readPackageJson() {
    try {
      const packageJsonString = await readFile('./package.json', 'utf-8');
      const packageJson: IPartialPackageJson = JSON.parse(
        packageJsonString
      ) as IPartialPackageJson;

      this.packageVersion = packageJson.version;
      this.packageDescription = packageJson.description;
      this.packageAuthorName = packageJson.author.name;
    } catch (error) {
      console.log(`[MsiProvider] Could not read package json information.`);
      throw error;
    }
  }
}

class MsiInfoProvider {
  public static getAppName(): string {
    const appName = config.packagerConfig?.name;
    if (appName !== undefined) {
      return appName;
    }

    throw Error(
      `[MsiInfoProvider] No app name has been set in the forge config.`
    );
  }

  public static getExecutableName(isInstaller = false): string {
    const executableName = config.packagerConfig?.executableName;
    if (executableName !== undefined) {
      return isInstaller
        ? `${executableName}Installer.exe`
        : `${executableName}.exe`;
    }

    throw Error(
      `[MsiInfoProvider] No executable name has been set in the forge config.`
    );
  }

  public static getIconPath(): string {
    const iconPath = config.packagerConfig?.icon;
    if (iconPath !== undefined) {
      return join(process.cwd(), `${iconPath}.ico`);
    }

    throw Error(
      `[MsiInfoProvider] No iconPath has been set in the forge config.`
    );
  }
}

/**
 * Instantiate the classes and try to create the installer
 */
try {
  const msiProvider = new MsiWizardProvider();
  msiProvider.createInstaller().catch((error: Error) => {
    console.error(`[MsiWizardProvider#createInstaller] Failed: `, error);
  });
} catch (error) {
  console.log(`Creating the installer failed: ${error}`);
}
