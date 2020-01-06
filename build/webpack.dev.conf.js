const path = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getPath = function (subpath) {
    return path.posix.resolve(__dirname, '..', subpath)
}
module.exports = merge(baseConfig, {
    entry: {
        app: getPath('src/docs/main.js')
    },
    output: {
        path: getPath('dist-docs'),
        filename: '[name].js',
        chunkFilename: 'js/[id].js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'demo.html',
            template: getPath('src/docs/index.html')          
        }),
        new CleanWebpackPlugin(),
        // new FriendlyErrorsPlugin({
        //     compilationSuccessInfo: {
        //         messages: [`Your application is running here: http://localhost:1127`],
        //     },
        //     onErrors: 'undefined'
        // })
    ]

})