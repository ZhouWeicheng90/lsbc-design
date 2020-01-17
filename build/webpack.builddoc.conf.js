const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const getPath = function (subpath) {
    return path.posix.resolve(__dirname, '..', subpath)
}
module.exports = merge(baseConfig, {
    entry: {
        app: getPath('src/docs/main.js')
    },
    output: {
        path: getPath('dist-docs'),
        filename: 'js/[name].[chunkhash].js',
        chunkFilename: 'js/[name].[chunkhash].js',
    },    
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: '"production"' }
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: getPath('src/docs/index.html')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                let res = module.resource;
                return /node_modules/.test(res) && /\.js$/.test(res)
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
    ]
})