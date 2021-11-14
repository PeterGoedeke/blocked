/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { InjectManifest } = require('workbox-webpack-plugin')
const webpack = require('webpack')

const dotenv = require('dotenv').config({ path: './.env' })

module.exports = {
    entry: ['./src/scripts/game.ts'],
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$|\.jsx?$/,
                include: path.join(__dirname, '../src'),
                loader: 'ts-loader'
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    filename: '[name].bundle.js'
                }
            }
        }
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({ gameName: 'Blocked', template: 'src/index.html' }),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src/assets', to: 'assets' },
                { from: 'pwa', to: '' },
                { from: 'src/favicon.ico', to: '' }
            ]
        }),
        new InjectManifest({
            swSrc: path.resolve(__dirname, '../pwa/sw.js'),
            swDest: 'sw.js'
        }),
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        })
    ]
}
