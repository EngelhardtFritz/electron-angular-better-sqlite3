import { singleton } from 'tsyringe';
import { map } from 'rxjs';
import { AppStateProvider } from '../../base/startup/app-states/app-state.provider';

@singleton()
export class MainWindowStarter {
  private started = false;

  start(onReady: () => Promise<void>) {
    AppStateProvider.isReady
      .pipe(
        map(async (isReady) => {
          if (isReady && !this.started) {
            this.started = true;
            await onReady();
          }
        })
      )
      .subscribe();
  }
}
