const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      }
    ]
  }
});
