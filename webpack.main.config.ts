import { EnvironmentPlugin, type Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import * as path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { rules } from './webpack.rules';

export const mainConfig: Configuration = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './workspaces/electron-app/src/main/index.ts',
  // Put your normal webpack config below here
  module: {
    rules,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.json'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './workspaces/electron-app/src/main/assets',
        },
        {
          from: './workspaces/electron-app/src/windows/splashscreen',
          to: '../renderer/splashscreen_window',
          noErrorOnMissing: true,
        },
        {
          from: './workspaces/angular-app/dist/angular-app',
          to: '../renderer/angular_window',
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};

export const mainConfigProd: Configuration = {
  ...mainConfig,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: mainConfig.plugins?.concat(
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    })
  ),
};
