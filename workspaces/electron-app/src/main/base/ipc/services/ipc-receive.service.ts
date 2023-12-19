import { Logger } from '../../utils/logger';
import { singleton } from 'tsyringe';
import { ipcMain } from 'electron';
import { AbstractReceiveService } from '../handlers/abstract-receive.service';

@singleton()
export class IpcReceiveService {
  /** Registers a one way service listening to channel/input from Browser to renderer */
  register<In>(service: AbstractReceiveService<In>) {
    Logger.debug(
      `[IpcReceiveService#register] Register '${service.receptionChannel()}'`
    );
    ipcMain.on(
      service.receptionChannel(),
      async (event: Electron.IpcMainEvent, ...parameters: any[]) => {
        // Handling input
        Logger.debug(`[${service.receptionChannel()}] => `, parameters);
        await service.process(...parameters);
      }
    );
  }
}
