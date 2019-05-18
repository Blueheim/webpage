//require('dotenv').config();
const withPlugins = require('next-compose-plugins');
const withSass = require('@zeit/next-sass');
const withCSS = require('@zeit/next-css');
const withFonts = require('next-fonts');
const recursiveCopy = require('recursive-copy');
const { join } = require('path');
const webpack = require('webpack');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = withPlugins([withFonts, withSass, withCSS], {
  // Github pages configuration
  //assetPrefix: process.env.NODE_ENV === 'production' ? '/{reponame}' : '',
  // Both server and client config
  publicRuntimeConfig: {
    mailerApi: process.env.MAILER_API || 'https://stark-savannah-63072.herokuapp.com',
    botApi: process.env.BOT_API || 'https://secure-cove-36725.herokuapp.com',
  },
  exportPathMap: async function(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    if (dev) {
      return defaultPathMap;
    }
    await recursiveCopy(join(dir, 'htdocs/'), outDir, { dot: true, overwrite: true });
    return defaultPathMap;
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer || dev) {
      return config;
    }

    // Source Map in production
    if (!dev) {
      config.devtool = 'source-map';
    }

    const isProduction = config.mode === 'production';
    const isClient = config.name === 'client';

    config.plugins.push(
      new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(isProduction),
      })
    );

    if (!isProduction) {
      return config;
    }

    config.plugins.push(new CleanWebpackPlugin());

    config.plugins.push(
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      })
    );

    config.optimization.minimizer.push(new OptimizeCSSAssetsPlugin({}));

    //   // config.plugins.push(
    //   //   new BrotliPlugin({
    //   //     asset: '[path].br[query]',
    //   //     test: /\.(js|css|html|svg)$/,
    //   //     threshold: 10240,
    //   //     minRatio: 0.8,
    //   //   })
    //   // );

    return config;
  },
});
