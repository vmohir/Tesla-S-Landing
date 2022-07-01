const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const metric100D = require('./src/data/metric-100D.json');
const metricP100D = require('./src/data/metric-P100D.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // context: path.resolve(__dirname, 'src'),
  entry: {
    index: { import: './src/index.js' },
    styles: { import: './src/styles/landing.scss' },
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src/pages'),
    },
    compress: false,
    client: {
      overlay: { errors: true, warnings: false },
    },
    hot: true,
    open: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader', options: { esModule: false } }],
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(svg|png|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name][hash:6][ext]',
        },
        // use: [
        //   {
        //     loader: 'url-loader',
        //     options: {
        //       limit: 10 * 1024,
        //       name: '[name].[hash:6].[ext]',
        //       esModule: false,
        //     },
        //   },
        // ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/index.ejs'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/no-js.ejs'),
      templateParameters: { '100D': metric100D, P100D: metricP100D },
      filename: 'no-js.html',
      chunks: ['styles'],
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all',
  //       },
  //     },
  //   },
  // },
};
