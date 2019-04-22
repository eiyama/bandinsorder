'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://localhost:8098"', // 本地
  // API_ROOT: '"http://partner.elongai.com/"', // 易龙外网
  // API_ROOT: '"http://h5.bandins.com/"', // 邦德外网
  // API_ROOT: '"http://dev-h5.bandins.cn:8888/apis"', // 测试环境
  DIR_NAME: '"/"',
})