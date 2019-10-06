const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.ts',
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
              // options...
            },
          },
        ],
        // use: [
        //   // MiniCssExtractPlugin.loader,
        //   // {
        //   //   loader: 'css-loader',
        //   // },
        //   // Creates `style` nodes from JS strings
        //   // 'style-loader',
        //   // Translates CSS into CommonJS
        //   // 'css-loader',

        //   // // Compiles Sass to CSS
        //   // 'sass-loader',
        //   {
        //     loader: 'sass-loader',
        //     options: {
        //       sourceMap: true,
        //       // options...
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].bundle.css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
