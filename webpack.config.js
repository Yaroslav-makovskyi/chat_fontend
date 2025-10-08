const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
      allowEmptyValues: true,
      systemvars: true,
      silent: false,
      defaults: false,
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'build'),
    },
    compress: true,
    port: 8080,
    hot: true,
    open: true,
  },
  mode: 'development',
};
