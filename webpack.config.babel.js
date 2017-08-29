import { resolve } from 'path';
import MinifyPlugin from 'babel-minify-webpack-plugin';

export default {
  entry: './src/index.js',
  output: {
    filename: 'wac-allow.min.js',
    path: resolve(__dirname, 'dist'),
    library: 'WacAllow',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new MinifyPlugin(),
  ],
};
