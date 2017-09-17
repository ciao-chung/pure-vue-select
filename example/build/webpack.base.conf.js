var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var webpack = require('webpack')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [
      path.join(__dirname, '../node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'resource': path.resolve(__dirname, '../src/resource'),
    }
  },
  resolveLoader: {
    fallback: [
      path.join(__dirname, '../src/resource'),
      path.join(__dirname, '../node_modules'),
    ]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        // loader: 'vue'
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src'),
          path.join(projectRoot, 'resource'),
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        loader: 'sass',
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        loader: 'sass?indentedSyntax',
        exclude: /node_modules/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.babel$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: [
          "Android >= 2",
          "Firefox >= 2",
          "ios >= 6",
          "ie >= 9"
        ]
      })
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery/dist/jquery",
      jQuery: "jquery/dist/jquery",
      "window.jQuery": "jquery",
      "window.$": "jquery",
      Tether: 'tether',
      "window.Tether": 'tether'
    })
  ]
}
