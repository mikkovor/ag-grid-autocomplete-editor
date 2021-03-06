var webpack = require('webpack');
var path = require('path');

var autoprefixer = require('autoprefixer');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
const devMode = true;

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: './ag-grid-autocomplete-editor.ts',

    output: {
        path: path.resolve('dist'),
        publicPath: 'http://localhost:8080/',
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                options: {allowTsInNodeModules: true}
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {loader: 'css-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                    {
                        loader: 'postcss-loader',
                        options: {sourceMap: true, syntax: 'postcss-scss', plugins: [autoprefixer()]}
                    },
                ],
            }
        ]
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: devMode ? '[name].css' : '[name].[hash].css',
            chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
        }),
    ]
};
