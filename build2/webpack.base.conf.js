'use strict'
const path = require('path')
const utils = require('./utils')
const vueLoaderConfig = {
  loaders: utils.cssLoaders({
    sourceMap: true,
    // extract: process.env.NODE_ENV === 'production'   // 不需要提取样式 1/3
  }),
  cssSourceMap: true,

  // If you have problems debugging vue-files in devtools,
  // set this to false - it *may* help
  // https://vue-loader.vuejs.org/en/options.html#cachebusting
  cacheBusting: false,
  // 
  // 这是将img的src属性转换成require调用，从而让webpack在后续打包时能识别到
  /**
   * <img :src="myImage">
   * script中：
   *  this.myImage=require('../assets/imgs/img01.png')
   * 
   * 添加这个配置后，可以直接这样：
   * <img src="../assets/imgs/img01.png">
   */
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      // 注意这一句不能去掉，否则会报下面的错误，这是将 import Vue from 'vue' 改为 import Vue from 'vue/dist/vue.esm.js'
      vue$: "vue/dist/vue.esm.js",
      // "@": resolve("src")
    }
    /**You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build. */
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('dev-test'), resolve('node_modules/webpack-dev-server/client')],
        exclude: [resolve('dist')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
