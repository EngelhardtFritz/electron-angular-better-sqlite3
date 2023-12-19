import { SettingsChannel } from './channels/settings.channel';

export class WindowApiConst {
  /** Whitelist of the safe channels to use when sending data to the main process */
  public static readonly SENDING_SAFE_CHANNELS: Array<string> = [];

  /** Whitelist of the safe channels to use when receiving data from the main process */
  public static readonly RECEIVING_SAFE_CHANNELS: Array<string> = [];

  /** Whitelist of the safe channels to use when invoking data to the main process */
  public static readonly INVOKING_SAFE_CHANNELS: Array<string> = [
    SettingsChannel.LOAD_SETTING_ENTRIES,
  ];
}
