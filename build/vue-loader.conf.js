'use strict'
const utils = require('./utils')
const config = require('../config')
const babelOptions = require('./babel-loader-options')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap
module.exports = {
  loaders: {
    ...utils.cssLoaders({
      sourceMap: sourceMapEnabled,
      extract: isProduction
    }),
    js: { // 这里传入babel-loader的目的是，在业务项目中cwd是业务目录，导致tiny-engine内的vue文件，在vue-loader处理完之后，没有传入其它参数，导致找不到babel配置文件，es新语法无法被解析，具体传参参考https://babeljs.io/docs/en/options
      loader: 'babel-loader',
      options: babelOptions
    }
  },
  cssSourceMap: sourceMapEnabled,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
