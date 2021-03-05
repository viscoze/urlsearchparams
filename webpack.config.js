const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  mode: 'production',
  module: {
    rules: [
      {
        use: ['babel-loader'],
        test: /\.ts?$/,
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [new LodashModuleReplacementPlugin()],
}
