import { singleton } from 'tsyringe';
import { isAppReady } from '../../base/utils/ready-state.provider';
import { map } from 'rxjs';

@singleton()
export class MainWindowStarter {
  private started = false;

  start(onReady: () => void) {
    isAppReady
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
