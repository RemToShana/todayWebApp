const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'dist');
const serverDistPath = path.resolve(__dirname, '../todayWebAppServer/dist');

module.exports = {
    context: srcPath,
    resolve: {
        alias: {
            states: path.resolve(srcPath, 'states'),
            utilities: path.resolve(srcPath, 'utilities'),
            components: path.resolve(srcPath, 'components'),
            api: path.resolve(srcPath, 'api')
        }
    },
    entry: {
        index: './index.jsx',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: serverDistPath,
        filename: '[name].bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    'es2015', {
                                        modules: false
                                    }
                                ],
                                'react'
                            ],
                            plugins: [
                                'babel-plugin-transform-class-properties',
                                'transform-object-rest-spread'
                            ]
                        }
                    }
                ]
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options : {
                            url: false
                        }
                    }
                ]
            },

            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
            {
                test: /\.mp3$/,
                loader: 'url-loader'
            },
            {
              test: /\.svg$/,
              loaders: [
                {
                  loader: 'babel-loader',
                  query: {
                    presets: ['es2015']
                  }
                },
                {
                  loader: 'react-svg-loader',
                  query: {
                    jsx: true
                  }
                },

              ]
            },
            {
              test: /\.html$/,
              loader: 'html-loader?attrs[]=video:src'
            },
            {
              test: /\.mp4$/,
              loader: 'url?limit=10000&mimetype=video/mp4'
          }
        ]
    },
    plugins: [new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js', minChunks: 2})],
    devServer: {
        contentBase: distPath,
        compress: true,
        port: 8080
    },
    devtool: 'cheap-source-map'
};
