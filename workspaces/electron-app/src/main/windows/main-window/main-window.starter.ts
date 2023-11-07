import { singleton } from 'tsyringe';
import { map } from 'rxjs';
import { AppStateProvider } from '../../base/startup/app-states/app-state.provider';

@singleton()
export class MainWindowStarter {
  private started = false;

  start(onReady: () => void) {
    AppStateProvider.isReady
      .pipe(
        map((isReady) => {
          if (isReady && !this.started) {
            onReady();
            this.started = true;
          }
        })
      )
      .subscribe();
  }
}
