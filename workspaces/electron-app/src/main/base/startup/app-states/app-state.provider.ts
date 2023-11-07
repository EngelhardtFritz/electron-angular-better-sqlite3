import { BehaviorSubject } from 'rxjs';

export class AppStateProvider {
  public static isReady = new BehaviorSubject(false);
}
