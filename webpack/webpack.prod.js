/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const dotenv = require('dotenv').config({ path: './.prod.env' })
// const WebpackObfuscator = require('webpack-obfuscator')
const webpack = require('webpack')

const prod = {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].bundle.js',
        chunkFilename: '[name].[contenthash].chunk.js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    filename: '[name].[contenthash].bundle.js'
                }
            }
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        })
        // disabled by default (uncomment to active)
        // new WebpackObfuscator(
        //   {
        //     rotateStringArray: true,
        //     stringArray: true,
        //     stringArrayThreshold: 0.75
        //   },
        //   ['vendors.*.js', 'sw.js']
        // )
    ]
}

module.exports = merge(common, prod)
