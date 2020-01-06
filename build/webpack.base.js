const path = require('path')
module.exports = {
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            vue$: "vue/dist/vue.esm.js",
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    transformToRequire: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                    },
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.posix.resolve(__dirname, '../src')]  // 意思是只处理src下的吗？（默认是处理所有的吗？）
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    // name: path.posix.resolve(__dirname, '../dist/fonts/[name].[hash:7].[ext]'),  // 这里无需使用全路径，会报错！
                    name: 'fonts/[name].[hash:7].[ext]',
                    // fallback:'file-loader' //这个是默认的，失败了默认使用 file-loader
                }
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',  // 这个必须有 // 所有的样式都必须这样写吗，各自的loader -》 css-loader -> style-loader或者vue-style-loader
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false
                        }
                    }]
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: false
                        }
                    }
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            indentedSyntax: true,
                            sourceMap: false
                        }
                    }
                ]
            },
        ]
    }
}