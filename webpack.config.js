/* eslint-disable */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const index = 'index';

module.exports = {
  entry: `./src/${index}.ts`,
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
    new CopyWebpackPlugin([
      {
        from: `./${index}.html`,
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  performance: {
    maxEntrypointSize: 640000,
    maxAssetSize: 640000,
  },
  devServer: {
    contentBase: 'dist',
    port: 8080,
    // Send API requests on localhost to API server get around CORS.
    proxy: {
      '/api': {
        target: {
          host: '0.0.0.0',
          protocol: 'http:',
          port: 8081,
        },
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
