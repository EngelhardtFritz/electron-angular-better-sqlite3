import { ipcMain } from 'electron';
import { AbstractService } from './handlers/abstract.service';
import { Logger } from '../utils/logger';
import { Main } from '../../windows/main';
import { AbstractInvokeService } from './handlers/abstract-invoke.service';

export class IpcServiceProvider {
  /** Registers a two way service from main to renderer */
  public static registerService<In, Out>(service: AbstractService<In, Out>) {
    Logger.debug(
      `[IpcServiceProvider#registerService] Register '${service.sendingChannel()}'`
    );
    ipcMain.on(
      service.receptionChannel(),
      async (event: Electron.IpcMainEvent, ...parameters: any[]) => {
        // Handling input
        const input = parameters[0];
        Logger.debug(`[${service.receptionChannel()}] => `, input);
        const output: Out = await service.process(input);

        // Handling output
        const sendingChannel = service.sendingChannel();
        if (sendingChannel) {
          Logger.debug(`[${service.sendingChannel()}] => `, output);
          Main.mainWindow?.webContents?.send(sendingChannel, output);
        }
      }
    );
  }

  /** Registers a two way service from renderer to main */
  public static registerTwoWayService<In, Out>(
    service: AbstractInvokeService<In, Out>
  ) {
    Logger.debug(
      `[IpcServiceProvider#registerTwoWayService] Register '${service.invokingChannel()}'`
    );
    ipcMain.handle(
      service.invokingChannel(),
      async (event: Electron.IpcMainInvokeEvent, ...parameters: any[]) => {
        Logger.debug(`[${service.invokingChannel()}] in  => `, ...parameters);
        const output: Out = await service.process(...parameters);
        Logger.debug(`[${service.invokingChannel()}] out => `, output);
        return output;
      }
    );
  }
}
