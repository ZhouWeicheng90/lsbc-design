'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

module.exports = {
  dev: {
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 1127, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    errorOverlay: true,
    notifyOnErrors: true,
  },

  build: {

    /**
     * Source Maps
     */
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
  }
}
