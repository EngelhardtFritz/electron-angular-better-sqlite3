import { MainWindowProvider } from './main-window/main-window.provider';
import { SplashscreenWindowProvider } from './splashscreen-window/spashscreen-window.provider';
import { BrowserWindow, app, session, shell } from 'electron';
import { Logger } from '../base/utils/logger';
import { injectable } from 'tsyringe';
import { MainWindowStarter } from './main-window/main-window.starter';
import { IpcService } from '../base/ipc/ipc.service';
import { ConfigProvider } from '../base/utils/config.provider';

@injectable()
export class Main {
  private static _mainWindow: BrowserWindow;
  private static _splashscreenWindow: BrowserWindow;

  private _instanceLock = app.requestSingleInstanceLock();

  static get mainWindow() {
    return Main._mainWindow;
  }

  static get splashscreenWindow() {
    return Main._splashscreenWindow;
  }

  constructor(
    protected mainWindowStarter: MainWindowStarter,
    protected mainWindowProvider: MainWindowProvider,
    protected splashscreenWindowProvider: SplashscreenWindowProvider,
    protected ipcService: IpcService,
    protected configProvider: ConfigProvider
  ) {}

  init() {
    this.launch();
    this.setupUserTask();

    app.on('window-all-closed', this.quit);

    // Open external links in default browser
    app.on('web-contents-created', this.openExternalLinksInDefaultBrowser);
  }

  quit() {
    // Quit when all windows are closed, except on macOS. There, it's common
    // for applications and their menu bar to stay active until the user quits
    // explicitly with Cmd + Q.
    if (process.platform !== 'darwin') {
      Logger.debug(`[Main#quit] Shutdown app`);
      app.quit();
    }
  }

  launch() {
    if (!this._instanceLock) {
      app.quit();
    } else {
      app.on('second-instance', this.preventSecondInstance);
      app.whenReady().then(() => this.onReady());
    }
  }

  async onReady() {
    Logger.debug(`[Main#onReady] App isPackaged: ${app.isPackaged}`);
    if (!app.isPackaged) {
      // Absolute path to extension folder
      const pathToReduxDevTools =
        'D:\\Entwicklungsprojekte\\VSCode\\manga-reader\\workspaces\\electron-app\\plugins\\redux_dev_tools_3_1_3';
      await session.defaultSession.loadExtension(pathToReduxDevTools, {
        allowFileAccess: true,
      });
    }

    // Register listeners
    this.ipcService.registerIpcServices();

    // Startup app windows and services
    if (!Main._splashscreenWindow) {
      Logger.debug(`[Main#onReady] Create splashscreen window`);
      Main._splashscreenWindow = await this.splashscreenWindowProvider.init();
    }

    if (!Main._mainWindow) {
      this.mainWindowStarter.start(async () => {
        Main._mainWindow = await this.mainWindowProvider.init();
        Main._splashscreenWindow.close();
      });
    }
  }

  private preventSecondInstance(
    event: Electron.Event,
    commandLine: string[],
    workingDirectory: string,
    additionalData: unknown
  ): void {
    // Print out data received from the second instance.
    Logger.debug(
      `[Main#preventSecondInstance] Received additionalData`,
      additionalData
    );

    // Someone tried to run a second instance, we should focus our window.
    if (Main._mainWindow) {
      if (Main._mainWindow.isMinimized()) Main._mainWindow.restore();
      Main._mainWindow.focus();
    }
  }

  private openExternalLinksInDefaultBrowser(
    event: Electron.Event,
    contents: Electron.WebContents
  ) {
    // Do not create new windows
    contents.setWindowOpenHandler((handler: Electron.HandlerDetails) => {
      // Open in default browser
      shell.openExternal(handler.url);

      return { action: 'deny' };
    });

    // Limit navigation to local navigation only
    contents.on(
      'will-navigate',
      (event: Electron.Event, navigationUrl: string) => {
        const parsedUrl = new URL(navigationUrl);
        if (
          parsedUrl.origin !== `http://localhost:${process.env.ANGULAR_PORT}`
        ) {
          event.preventDefault();
        }
      }
    );
  }

  private setupUserTask(): void {
    // Reset user tasks
    app.setUserTasks([]);
  }
}
