const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');

// Plugins
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');

module.exports = (env) => {
  // Variables
  const isProduction = env === 'production';
  const isDev = env === 'development';

  let envVars;
  if (isProduction) {
    envVars = {
      NODE_ENV: env,
    };
  } else {
    // call dotenv and it will return an Object with a parsed key
    envVars = dotenv.config().parsed || {};
    envVars.NODE_ENV = env;
  }

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(envVars).reduce((prev, next) => {
    // eslint-disable-next-line
    prev[`process.env.${next}`] = JSON.stringify(envVars[next]);
    return prev;
  }, {});

  /* ========= Plugins ========= */
  // Maps environment variables from .env file to the project
  const DefinePlugin = new webpack.DefinePlugin(envKeys);

  // Cleans 'dist' folder everytime before a new build
  const CleanPlugin = new CleanWebpackPlugin({
    root: __dirname,
    verbose: true,
    dry: false,
  });

  // Plugin to generate a bundle map with sizes
  const AnalyzerPlugin = new BundleAnalyzerPlugin({
    analyzerMode: 'disabled',
  });

  const HTMLPlugin = new HtmlWebpackPlugin({
    template: 'template.html',
    chunksSortMode: 'none',
    favicon: './src/assets/static/favicon.ico',
  });

  // Plugin to copy assets/static directory to the build
  const CopyPlugin = new CopyWebpackPlugin({
    patterns: [{ from: './src/assets/static', to: '.' }],
  });

  // Plugin for compression
  const BrotliWebpackPlugin = new BrotliPlugin({
    asset: '[path].br[query]',
    test: /\.(js|css|html|svg)$/,
    threshold: 0,
    minRatio: 0.8,
  });

  // Building Webpack
  const config = {};

  config.entry = ['babel-polyfill', './src/index.js'];

  config.output = {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  };

  config.optimization = {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\]node_modules[\\]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
          ecma: 8,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  };

  config.plugins = [CleanPlugin, AnalyzerPlugin, HTMLPlugin, CopyPlugin, DefinePlugin];

  config.module = {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|cot)$/,
        loader: 'file-loader',
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.(css|scss)$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  };

  config.resolve = {
    extensions: ['.js', '.jsx'],
  };

  if (isProduction) {
    config.output = {
      // publicPath: path.join(__dirname, 'dist', '/'),
      chunkFilename: '[name].[chunkhash].bundle.js',
      filename: '[name].[chunkhash].bundle.js',
      path: path.join(__dirname, 'dist'),
    };

    config.mode = 'production';
    config.devtool = '';

    config.plugins.push(BrotliWebpackPlugin);
  }

  if (isDev) {
    config.output = {
      path: path.join(__dirname, 'dist'),
      chunkFilename: '[name].bundle.js',
      filename: '[name].bundle.js',
    };

    config.mode = 'development';
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      open: true,
    };
  }

  config.resolve = {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
  };

  return config;
};
