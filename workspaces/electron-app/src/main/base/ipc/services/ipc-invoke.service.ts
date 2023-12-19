import { ipcMain } from 'electron';
import { Logger } from '../../utils/logger';
import { AbstractInvokeService } from '../handlers/abstract-invoke.service';
import { singleton } from 'tsyringe';

@singleton()
export class IpcInvokeService {
  /** Registers a two way service from renderer to main */
  register<In, Out>(service: AbstractInvokeService<In, Out>) {
    Logger.debug(
      `[IpcInvokeService#register] Register '${service.invokingChannel()}'`
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
