import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { AppSettings } from 'shared-lib';

export const SettingsActions = createActionGroup({
  source: 'Settings',
  events: {
    'Load Setting Entries': emptyProps(),
    'Load Setting Entries Success': props<{ appSettings: AppSettings }>(),
    'Load Setting Entries Error': props<{ error: string }>(),
    'Save Theme': props<{ test: string }>(),
    'Save Theme Success': props<{ test: string }>(),
    'Save Locale': props<{ test: string }>(),
    'Save Locale Success': props<{ test: string }>(),
    'Save Config Entry Error': props<{ test: string }>(),
  },
});
