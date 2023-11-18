import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SettingsAppState,
  SettingsState,
  settingsFeatureKey,
} from './settings.reducer';

export const selectSettingsState =
  createFeatureSelector<SettingsState>(settingsFeatureKey);

export const selectTheme = createSelector(
  (appState: SettingsAppState) => appState[settingsFeatureKey].theme,
  (theme) => theme
);

export const selectLocale = createSelector(
  (appState: SettingsAppState) => appState[settingsFeatureKey].locale,
  (locale) => locale
);
