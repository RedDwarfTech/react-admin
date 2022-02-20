  const path = require('path');
  const webpack = require('webpack');
  const MiniCssExtractPlugin = require( 'mini-css-extract-plugin');
  const CopyPlugin = require("copy-webpack-plugin");

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
      filename : '[name].js'
    },
    module : {
      rules : [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          },
          include: [
            path.resolve(__dirname, '../../../node_modules/js-wheel'),
            path.resolve(__dirname, '../../../src')
          ],
          exclude: /node_modules|\.d\.ts$/
        },
        {
          test: /\.d\.ts$/,
          loader: 'ignore-loader'
        },
        {
          test: /\.jsx?$/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test : /\.(scss)$/ ,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
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
    plugins : [
      new CopyPlugin({
        patterns: [
          { from: "public/index.html", to: "index.html" },
          { from: "public/favicon.png", to: "public/favicon.png" },
          { from: "public/manifest.json", to: "public/manifest.json" },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ]
  };

