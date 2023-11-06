import { AppConfig } from 'shared-lib';
import { singleton } from 'tsyringe';
import * as path from 'path';
import * as fs from 'fs-extra';
import _ from 'lodash';

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

    const appConfigs = fs.readJsonSync(path.join(__dirname, 'config.json'));
    const defaultConfig = appConfigs.development;
    const currentConfig = appConfigs[currentEnvironment];

    this._appConfig =
      currentEnvironment === 'development'
        ? defaultConfig
        : _.merge(defaultConfig, currentConfig);
  }
}
