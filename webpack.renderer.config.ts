import { EnvironmentPlugin, type Configuration } from 'webpack';
import * as path from 'path';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import TerserPlugin from 'terser-webpack-plugin';

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

export const rendererConfig: Configuration = {
  target: 'electron-preload',
  module: {
    rules,
  },
  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    modules: [path.resolve(__dirname, 'node_modules'), 'node_modules'],
  },
};

export const rendererConfigProd: Configuration = {
  ...rendererConfig,
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  plugins: rendererConfig.plugins?.concat(
    new EnvironmentPlugin({
      NODE_ENV: 'production',
      DEBUG_PROD: false,
    })
  ),
};
