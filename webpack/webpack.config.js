const path = require('path');
// 在内存中 根据制定的模板页面 生成一份内存中的首页 同时自动把打包好的bundle.js注入到页面底部
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, './src/main.js'),
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
      {test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader']},
      {test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=2048&name=[hash:8]-[name].[ext]'}, // 单位byte
      {test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader'},
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/}
    ]
  }
}