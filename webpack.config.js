const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const metric100D = require('./src/data/metric-100D.json');
const metricP100D = require('./src/data/metric-P100D.json');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const postHtml = require('posthtml');
const postHtmlInlineSvg = require('posthtml-inline-svg');
const postHtmlInclude = require('posthtml-include');
const config = require('./config.json');

module.exports = {
  // context: path.resolve(__dirname, 'src'),
  entry: {
    index: { import: path.resolve(__dirname, './src/index.ts') },
    styles: { import: path.resolve(__dirname, './src/styles/index.scss') },
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
    port: config.port,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            esModule: false,
            preprocessor: async (content, loaderContext) => {
              try {
                return (
                  await postHtml([
                    postHtmlInclude({ root: loaderContext.context }),
                    postHtmlInlineSvg({ cwd: loaderContext.context, tag: 'icon', attr: 'src' }),
                  ]).process(content)
                ).html;
              } catch (error) {
                loaderContext.emitError(error);
                return content;
              }
            },
          },
        },
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(png|ttf|svg|json|webmanifest|ico)$/,
        oneOf: [
          {
            resourceQuery: /raw/,
            type: 'asset/resource',
            generator: {
              filename: '[name][ext]',
            },
          },
          {
            type: 'asset/resource',
            generator: {
              filename: 'assets/[name][hash:6][ext]',
            },
          },
        ],
      },
    ],
  },
  stats: {
    errorDetails: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/index.ejs'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/pages/no-js.ejs'),
      templateParameters: {
        car100D: metric100D,
        carP100D: metricP100D,
        wheelSizes: [19, 21],
        temps: [-10, 0, 10, 20, 30, 40],
        kmhs: [70, 80, 90, 100, 110, 120, 130, 140],
      },
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
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
