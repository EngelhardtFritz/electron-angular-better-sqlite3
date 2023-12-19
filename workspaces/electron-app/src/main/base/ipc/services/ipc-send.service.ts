import { Logger } from '../../utils/logger';
import { Main } from '../../../windows/main';
import { singleton } from 'tsyringe';
import { BrowserWindow } from 'electron';

@singleton()
export class IpcSendService {
  /** Registers a send only IPC service from main process to MainWindow */
  sendToMainWindow<Out>(channel: string, data: Out) {
    this.sendToWindow<Out>(Main.mainWindow, channel, data);
  }

  private sendToWindow<Out>(window: BrowserWindow, channel: string, data: Out) {
    if (window && channel) {
      Logger.debug(`[${channel}] => `, data);
      window.webContents.send(channel, data);
    }
  }
}
