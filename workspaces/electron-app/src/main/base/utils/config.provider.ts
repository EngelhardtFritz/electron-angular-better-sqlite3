import { AppConfig } from 'shared-lib';
import { singleton } from 'tsyringe';
import * as path from 'path';
import * as fs from 'fs-extra';
import _ from 'lodash';

interface IAppConfigs {
  development: AppConfig;
  production: AppConfig;
}

@singleton()
export class ConfigProvider {
  private _appConfig!: AppConfig;

  get appConfig(): AppConfig {
    return this._appConfig;
  }

  private set appConfig(appConfig: AppConfig) {
    this._appConfig = appConfig;
  }

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    let currentEnvironment = process.env.X_NODE_ENV || process.env.NODE_ENV;
    if (currentEnvironment === undefined) {
      currentEnvironment = 'development';
    }

    try {
      const appConfigs = fs.readJsonSync(
        path.join(__dirname, 'config.json')
      ) as IAppConfigs;
      const defaultConfig = appConfigs.development;
      const currentConfig = appConfigs[currentEnvironment as keyof IAppConfigs];

      this._appConfig =
        currentEnvironment === 'development'
          ? defaultConfig
          : _.merge(defaultConfig, currentConfig);
    } catch (_err) {
      // File does not exist, return default prod config
      this._appConfig = {
        id: 'production',
        isIconAvailable: true,
        logFileName: 'main.log',
        openDevTools: false,
        logLevel: 'error',
      } as AppConfig;
    }
  }
}
