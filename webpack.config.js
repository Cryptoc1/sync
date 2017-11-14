const path = require('path')

const SRC_DIR = path.resolve(__dirname, './src/')
const BUILD_DIR = path.resolve(__dirname, './dist')

const config = {
  devtool: 'source-map',

  entry: {
    sync: `${SRC_DIR}/main.js`
  },

  module: {
    loaders: [{
      exclude: /(node_modules|bower_components)/,
      include: SRC_DIR,
      loader: 'babel-loader',
      options: {
        presets: ['minify'],
        plugins: [ ],
        sourceMaps: true
      },
      test: /\.js?/
    }]
  },

  output: {
    filename: '[name].js',
    path: BUILD_DIR
  },

  plugins: [],

  target: 'async-node'
}

module.exports = config
