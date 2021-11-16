/* eslint-disable @typescript-eslint/no-var-requires */
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const dotenv = require('dotenv').config({ path: './.env' })
const webpack = require('webpack')

const dev = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        open: true
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.parsed)
        })
    ]
}

module.exports = merge(common, dev)
