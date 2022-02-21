  const path = require('path');
  const CopyPlugin = require("copy-webpack-plugin");
  const MiniCssExtractPlugin = require('mini-css-extract-plugin');
  const paths = require('./paths');
  const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

  module.exports = {
    entry : './src/index.js',
    devServer: {
      port: 3000,
      compress: true,
      open: true,
      hot: true,
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js','.jsx'],
      alias: {
          '@': path.resolve(__dirname, '../src'),
      },
    },
    output : {
      path : path.resolve(__dirname, '../build') ,
      filename : 'js/bundle.js'
    },
    module : {
      rules : [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          exclude: /node_modules|\.d\.ts$/
        },
        {
          test: /\.d\.ts$/,
          loader: 'ignore-loader'
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: paths.appSrc,
          loader: require.resolve('babel-loader'),
          options: {
            customize: require.resolve(
              'babel-preset-react-app/webpack-overrides'
            ),
            
            plugins: [
              [
                require.resolve('babel-plugin-named-asset-import'),
                {
                  loaderMap: {
                    svg: {
                      ReactComponent:
                        '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                    },
                  },
                },
              ],
            ],
            // This is a feature of `babel-loader` for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true,
            // See #6846 for context on why cacheCompression is disabled
            cacheCompression: false
          },
        },
        {
          test : /.s?css$/,
          use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader']
        },
        // https://stackoverflow.com/questions/69427025/programmatic-webpack-jest-esm-cant-resolve-module-without-js-file-exten
        {
          test: /\.m?js/,
          type: "javascript/auto",
        },
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i, 
          loader: 'file-loader',
          options: {
            name: '/public/icons/[name].[ext]'
          }
      }
      ]
    },
    optimization:{
      minimizer: [
        new CssMinimizerPlugin(),
      ],
    },
    plugins : [
      new MiniCssExtractPlugin({
        filename: 'static/css/[name].css',
          chunkFilename: 'static/css/[name].chunk.css',
      }),
      new CopyPlugin({
        patterns: [
          { from: "public/index.html", to: "index.html" },
          { from: "public/favicon.png", to: "public/favicon.png" },
          { from: "public/manifest.json", to: "public/manifest.json" },
        ],
      }),
    ]
  };

