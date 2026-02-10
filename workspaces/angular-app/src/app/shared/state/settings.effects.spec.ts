import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { SettingsEffects } from './settings.effects';
import { Action } from '@ngrx/store';
import { SettingsApiService } from '../../modules/settings/services/settings-api.service';
import { LanguageService } from '../services/language.service';

describe('SettingsEffects', () => {
  const actions$ = new Observable<Action>();
  let effects: SettingsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SettingsEffects,
        provideMockActions(() => actions$),
        { provide: SettingsApiService, useValue: {} },
        { provide: LanguageService, useValue: {} },
      ],
    });

    effects = TestBed.inject(SettingsEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
