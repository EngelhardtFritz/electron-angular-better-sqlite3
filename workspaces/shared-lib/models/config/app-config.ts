export interface AppConfig {
  /** The configuration identifier */
  id: string;

  /** The main logger output file path */
  logFileName: string;

  /** The main logger output level */
  logLevel: string;

  /** Tells if we should open dev tools */
  openDevTools: boolean;

  /** Should the window try to load the icon, only relevant for dev mode */
  isIconAvailable: boolean;

  angularPort: number;
  devPath: string | null;
}
