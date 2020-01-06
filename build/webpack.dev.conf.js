const path = require('path')
const rules = require('./webpack-rules')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const getPath = function (subpath) {
    return path.posix.resolve(__dirname, '..', subpath)
}
module.exports = {
    entry: {
        app: getPath('src/main.js')
    },
    output: {
        path: getPath('dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: "vue/dist/vue.esm.js",
        }
    },

    module: {
        rules: rules
    },
    // devServer: {
    //     hot: true,
    //     host: 'localhost',
    //     port: 1127,
    //     publicPath: '/',
    //     quiet: true,
    //     historyApiFallback: {
    //         // 页面404 时的跳转
    //         rewrites: [
    //             { from: /.*/, to: getPath('index.html') },
    //         ],
    //     },
    // },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: getPath('src/index.html'),
            inject: true
        }),
        // new FriendlyErrorsPlugin({
        //     compilationSuccessInfo: {
        //         messages: [`Your application is running here: http://localhost:1127`],
        //     },
        //     onErrors: undefined
        // })
    ]

}