import { createFeature, createReducer, on } from '@ngrx/store';
import { SettingsActions } from './settings.actions';
import { Theme } from 'shared-lib';

export const settingsFeatureKey = 'settings';

export interface SettingsAppState {
  [settingsFeatureKey]: SettingsState;
}

export interface SettingsState {
  theme: Theme;
  locale: string;
  error: string | null;
}

export const initialState: SettingsState = {
  theme: Theme.DARK,
  locale: 'en',
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(SettingsActions.loadSettingEntriesSuccess, (state, action) => {
    return {
      ...state,
      locale: action.appSettings.locale,
      theme: action.appSettings.theme,
    };
  })
);

export const settingsFeature = createFeature({
  name: settingsFeatureKey,
  reducer,
});
