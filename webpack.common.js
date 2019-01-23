const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/js/index.js'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      favicon: "./src/favicon.ico",
      filename: 'index.html',
      template: './src/index.pug'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'pages/my-games.html',
      template: './src/pages/my-games.pug'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: 'pages/about-me.html',
      template: './src/pages/about-me.pug'
    })
  ],
  output: {
    filename: 'js/index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { 
        test: /\.pug?$/,
        loader: 'pug-loader',
        options: {
          pretty: true
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]',
              publicPath: '../'
            }
          }
        ]
      },
      {
        test: /\.mp3$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'audio/[name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
              publicPath: '../'
            }
          }
        ]
      }
    ]
  }
};
