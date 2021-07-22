'use strict'
const utils = require('./utils')
const config = require('../config')
const isProduction = process.env.NODE_ENV === 'production'
const sourceMapEnabled = isProduction
  ? config.build.productionSourceMap
  : config.dev.cssSourceMap


module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMapEnabled,
    extract: isProduction
  }),
  cssSourceMap: sourceMapEnabled,
  transformToRequire: {
    video: 'src',
    source: 'src',
    'img': 'src',
  'image': 'xlink:href',
  'b-img': 'src',
  'b-img-lazy': ['src', 'blank-src'],
  'b-card': 'img-src',
  'b-card-img': 'img-src',
  'b-carousel-slide': 'img-src',
  'b-embed': 'src'
  }
}
