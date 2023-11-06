import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig, mainConfigProd } from './webpack.main.config';
import { rendererConfig, rendererConfigProd } from './webpack.renderer.config';

const buildMode = process.argv
  .find((arg) => arg.startsWith('--buildMode='))
  ?.replace('--buildMode=', '');
const isProd = buildMode !== undefined && buildMode === 'prod';

const config: ForgeConfig = {
  packagerConfig: {
    name: 'YourElectronApp',
    executableName: 'YourElectronApp',
    icon: './workspaces/electron-app/src/main/assets/icons/icon',
    asar: true,
  },
  makers: [
    new MakerSquirrel({}),
    new MakerZIP({}, ['darwin']),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig: isProd ? mainConfigProd : mainConfig,
      renderer: {
        config: isProd ? rendererConfigProd : rendererConfig,
        entryPoints: [
          {
            html: './workspaces/electron-app/src/renderer/index.html',
            js: './workspaces/electron-app/src/renderer/renderer.ts',
            name: 'main_window',
            preload: {
              js: './workspaces/electron-app/src/renderer/preload.ts',
            },
          },
        ],
      },
    }),
  ],
};

export default config;
