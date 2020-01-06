const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getPath = function (subpath) {
    return path.posix.resolve(__dirname, '..', subpath)
}
module.exports = merge(baseConfig, {
    entry: {
        index: getPath('src/deploy/index.js'),
        service: getPath('src/deploy/service.js'),
    },
    output: {
        path: getPath('dist'),
        filename: '[name].js',
        
        library: 'LSBCUI',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    plugins: [       
        new CleanWebpackPlugin(),        
    ]

})