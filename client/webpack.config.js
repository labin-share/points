var path = require('path');
var webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: ['./main.js', 'babel-polyfill'],
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },
    module: {
       rules: [{
          test: /\.vue$/,
          loader: 'vue-loader'
       }]
    },
    devServer: {
        historyApiFallback: true,
        overlay: true
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': path.resolve(__dirname, 'src'),
        }
    },
    plugins: [
        new VueLoaderPlugin() //作用是什么
    ],
    devtool: '#eval-source-map'
};