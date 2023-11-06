import { singleton } from 'tsyringe';
import { Logger } from '../../base/utils/logger';
import { BrowserWindow, app, nativeImage, ipcMain } from 'electron';
import { ConfigProvider } from '../../base/utils/config.provider';
import * as path from 'node:path';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

@singleton()
export class MainWindowProvider {
  private _window?: BrowserWindow;

  get window() {
    return this._window;
  }

  constructor(protected configProvider: ConfigProvider) {
    Logger.verbose(`[MainWindow] constructor called`);
  }

  init(): BrowserWindow {
    const window = this.configureWindow();
    this.configureRenderer();

    return window;
  }

  private configureWindow(): BrowserWindow {
    this._window = new BrowserWindow({
      height: 720,
      width: 1280,
      minHeight: 360,
      minWidth: 640,
      show: false,
      // frame: false,
      icon: this.loadIcon(),
      backgroundColor: '#FFFFFF',
      webPreferences: {
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    this._window.maximize();
    this._window.show();

    return this._window;
  }

  private configureRenderer(): void {
    if (this.configProvider.appConfig.id === 'development') {
      // Dev mode, take advantage of the live reload by loading local URL
      this._window?.loadURL(
        `http://localhost:${this.configProvider.appConfig.angularPort}`
      );
    } else {
      // Else mode, we simply load angular bundle
      const indexPath = path.join(
        __dirname,
        '../renderer/angular_window/index.html'
      );
      this._window?.loadURL(`file://${indexPath}`);
    }

    Logger.debug(
      `[MainWindow#configureRenderer] openDevTools: ${this.configProvider.appConfig.openDevTools}`
    );
    if (this.configProvider.appConfig.openDevTools) {
      this._window?.on('ready-to-show', () => {
        this.openDevTools();
      });
    }

    // When the window is closed`
    this._window?.on('closed', () => {
      // Remove IPC Main listeners
      ipcMain.removeAllListeners();
      // Delete current reference
      delete this._window;
    });
  }

  private loadIcon(): Electron.NativeImage | undefined {
    let iconObject;
    if (this.configProvider.appConfig.isIconAvailable) {
      const iconPath = path.join(__dirname, 'icons/icon.png');
      Logger.debug('Icon Path', iconPath);
      iconObject = nativeImage.createFromPath(iconPath);
      // Change dock icon on MacOS
      if (iconObject && process.platform === 'darwin') {
        app.dock.setIcon(iconObject);
      }
    }
    return iconObject;
  }

  private openDevTools(): void {
    this._window?.webContents.openDevTools();
    this._window?.webContents.on('devtools-opened', () => {
      this._window?.focus();
      setImmediate(() => {
        this._window?.focus();
      });
    });
  }
}
