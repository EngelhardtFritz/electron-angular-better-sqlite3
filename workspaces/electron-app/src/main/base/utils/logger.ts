import { app } from 'electron';
import * as os from 'node:os';
import * as path from 'node:path';
import * as winston from 'winston';
import { ConfigProvider } from './config.provider';
import { container } from 'tsyringe';

export class Logger {
  private static singleton: Logger;
  private _logger: winston.Logger;
  private configProvider: ConfigProvider;

  public static error(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.error(message, meta);
  }

  public static warn(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.warn(message, meta);
  }

  public static info(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.info(message, meta);
  }

  public static http(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.http(message, meta);
  }

  public static verbose(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.verbose(message, meta);
  }

  public static debug(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.debug(message, meta);
  }

  public static silly(message: string, ...meta: Array<unknown>): void {
    Logger.initSingleton();
    Logger.singleton._logger.silly(message, meta);
  }

  private static initSingleton(): void {
    if (!Logger.singleton) {
      Logger.singleton = new Logger();
    }
  }

  private constructor() {
    this.configProvider = container.resolve(ConfigProvider);

    this._logger = winston.createLogger({
      level: 'debug',
      format: winston.format.json(),
      defaultMeta: { service: 'user-service' },
      transports: [
        new winston.transports.File({
          filename: this.getLogFilename(),
          level: this.configProvider.appConfig.logLevel,
          maxsize: 10000000, // is equal to 10mb
          maxFiles: 5,
          tailable: true,
          format: winston.format.combine(
            winston.format.timestamp(),
            this.fileFormat
          ),
        }),
      ],
    });

    // If we're not in production then log also to the `console` with the format:
    // `[${info.timestamp}] [${info.level}]: ${info.message} JSON.stringify({ ...rest }) `
    if (!app.isPackaged) {
      this._logger.add(
        new winston.transports.Console({
          stderrLevels: ['error', 'warn'],
          format: winston.format.combine(
            winston.format.timestamp(),
            this.consoleFormat
          ),
        })
      );
    }
  }

  /**
   * Returns log filename with standard path
   * In production, returns absolute standard path depending on platform
   */
  private getLogFilename() {
    let filename = this.configProvider.appConfig.logFileName;
    if (app.isPackaged) {
      const appName = app.getName();
      if (process.platform == 'linux') {
        filename = `.config/${appName}/${filename}`;
      } else if (process.platform == 'darwin') {
        filename = `Library/Logs/${appName}/${filename}`;
      } else if (process.platform == 'win32') {
        filename = `AppData\\Roaming\\${appName}\\${filename}`;
      }

      return path.join(os.homedir(), filename);
    }

    const appLogPath = this.configProvider.appConfig.devPath
      ? this.configProvider.appConfig.devPath
      : os.homedir();
    return path.join(appLogPath, '.dist', filename);
  }

  /**
   * Custom winston file format
   * Write JSON logs with given format :
   * `[${timestamp}] [${level}] [electron] : ${info.message} : ${meta})`
   */
  private fileFormat = winston.format.printf(
    (data: winston.Logform.TransformableInfo) => {
      return JSON.stringify(this.prepareLogData(data));
    }
  );

  /**
   * Custom winston console format
   * Write logs with given format :
   * `[${timestamp}] [${level}] : ${info.message} [electron] : JSON.stringify({ ...meta }) `
   */
  private consoleFormat = winston.format.printf(
    (data: winston.Logform.TransformableInfo) => {
      const preparedData = this.prepareLogData(data);

      let spaces = '';
      const levelSize = preparedData.level.length;
      for (let i = levelSize; i < 7; i++) {
        spaces += ` `;
      }

      return `[${preparedData.timestamp}] [${
        preparedData.level
      }]${spaces} [electron] : ${preparedData.message} : ${JSON.stringify(
        preparedData.meta
      )}`;
    }
  );

  private prepareLogData = (data: winston.Logform.TransformableInfo) => {
    const additionalData: any = { ...data };
    delete additionalData.timestamp;
    delete additionalData.level;
    delete additionalData.message;
    delete additionalData.service;
    return {
      timestamp: data.timestamp,
      level: data.level,
      tag: 'electron',
      message: data.message,
      meta: additionalData,
    };
  };
}
