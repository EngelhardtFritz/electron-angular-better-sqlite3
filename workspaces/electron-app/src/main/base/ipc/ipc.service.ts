import { AppActionHandler } from './handlers/window/app-action.handler';
import { singleton } from 'tsyringe';
import { IpcServiceProvider } from './ipc.service.provider';
import { Logger } from '../utils/logger';
import { SettingHandler } from './handlers/setting/setting.handler';
import { AppSettings } from 'shared-lib';

@singleton()
export class IpcService {
  constructor(
    protected configHandler: SettingHandler,
    protected appActionHandler: AppActionHandler
  ) {}

  public registerIpcServices() {
    this.registerServices();
    this.registerTwoWayServices();
  }

  private registerServices() {
    Logger.verbose(
      `[IpcService#registerServices] Register simple two way services.`
    );
    IpcServiceProvider.registerService<string, void>(this.appActionHandler);
  }

  private registerTwoWayServices() {
    Logger.verbose(
      `[IpcService#registerTwoWayServices] Register Main to Renderer to Main services.`
    );
    IpcServiceProvider.registerTwoWayService<null, AppSettings>(
      this.configHandler
    );
  }
}
