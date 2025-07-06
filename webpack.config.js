const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const MODE = {
  development: 'development',
  production: 'production',
};

module.exports = (_env, argv) => {
  const { mode = MODE.development } = argv;
  const isDevMode = mode === MODE.development;

  return {
    mode,
    devtool: isDevMode && 'source-map',
    entry: {
      bundle: path.resolve(__dirname, 'src/app/index.js'),
    },
    output: {
      filename: 'js/[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devServer: {
      static: {
        directory: path.resolve(__dirname, 'dist'),
      },
      port: 'auto',
      watchFiles: path.join(__dirname, 'src'),
      open: true,
      hot: true,
      historyApiFallback: true,
    },
    plugins: [
      new Dotenv(),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'css/style.[contenthash].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
        {
          test: [/\.css$/i],
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.(woff|woff2)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]',
          },
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },
  };
};
