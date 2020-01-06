const path = require('path')
module.exports = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            transformToRequire: {
                video: ['src', 'poster'],
                source: 'src',
                img: 'src',
                image: 'xlink:href'
            }
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.posix.resolve(__dirname, '../src')],
        // exclude: [path.posix.resolve(__dirname,'../dist'), path.posix.resolve(__dirname,'../node-modules')]
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: path.posix.resolve(__dirname, '../dist/img/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: path.posix.resolve(__dirname, '../dist/media/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
            limit: 10000,
            name: path.posix.resolve(__dirname, '../dist/fonts/[name].[hash:7].[ext]')
        }
    },
    {
        test: /\.css$/,
        use: ['vue-style-loader',
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
        use: ['vue-style-loader',
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
        use: ['vue-style-loader',
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