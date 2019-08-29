const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.m?js$/, exclude: /(node_modules)/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader']}
    ]
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GitHub Battle',
      template: './app/index.html'
    })
  ],
  devServer: {
    historyApiFallback: true
  }
}