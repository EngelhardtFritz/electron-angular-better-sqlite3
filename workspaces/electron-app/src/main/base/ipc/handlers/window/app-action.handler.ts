import { WindowChannel } from 'shared-lib';
import { AbstractService } from '../abstract.service';
import { Main } from '../../../../windows/main';

export class AppActionHandler extends AbstractService<string, void> {
  receptionChannel(): string {
    return WindowChannel.WINDOW_TOGGLE_MAXIMIZE;
  }

  sendingChannel(): string | null {
    return null;
  }

  process(input: string): Promise<void> {
    if (input === 'minimize') {
      Main.mainWindow.minimize();
    } else if (input === 'maximize') {
      if (Main.mainWindow.isMaximized()) {
        Main.mainWindow.unmaximize();
      } else {
        Main.mainWindow.maximize();
      }
    } else if (input === 'close') {
      Main.mainWindow.close();
    }

    return Promise.resolve();
  }
}
