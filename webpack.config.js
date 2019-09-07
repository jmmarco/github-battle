const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
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
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'GitHub Battle',
      template: './app/index.html'
    }),
    new CopyPlugin([
      {
        from: '_redirects'
      }
    ])
  ],
  devServer: {
    historyApiFallback: true
  }
}