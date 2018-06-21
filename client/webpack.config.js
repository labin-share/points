const path = require('path') // 引入path模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入html生成插件
const CleanWebpackPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    // mode: 'production',
    devtool: '#source-map',
    "entry": {
        "main": "./src/main.js", // key为文件名，对应出口[name].js 中的name
    },
    "output": {
        "filename": '[name].js', // 出口文件名字，对于入口的key值
        "path": path.resolve(__dirname, "dist"),
        // "publicPath": "/dist"  // 指定build完的文件放到server_public 目录下   for webpack-dev-server
    },
    "module": {
        "rules": [{
            "test": /\.css$/, // css文件需要style-loader，css-loader
            "loader": ["style-loader", "css-loader"],
            "exclude": '/node_modules' // 不需要编译node_modules
        }, {
            "test": /\.js$/,
            "loader": 'babel-loader', // js文件使用babel-loader 转换。
            "exclude": '/node_modules',
            "query": {"compact": true}
        }, {
            "test": /\.vue$/, // 遇到vue文件使用vue-loader。vue-loader需要依赖其他loader 下载后会有提示
            "loader": ['vue-loader',"source-map-loader"],
            // "exclude": '/node_modules'
        },{ 
            "test": /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            "loader": 'url-loader?limit=100000' 
        }]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: { // 别名设置
            'vue$': 'vue/dist/vue.esm.js', // 运行时构建必用。
            '@': path.resolve('src') // @代表src目录
        }
    },
    devServer: { // 服务器设置
        // contentBase: '', 这个键 主要作用是静态服务器入口文件夹。如果不设置，相当于项目目录。如果有index.html 会直接找到index.html并且打开。
        hot: true, // 热切换
        historyApiFallback: true, // 单页应用找不到时回滚到index.html
        inline: true,
        // publicPath: "/dist"  // 指定生成的html public到server_public目录下（只是存在内存中）  for webpack-dev-server
    },
    plugins: [
        new HtmlWebpackPlugin({ // 这个插件能在打包的时候，自动生成html文件，并且放入出口path中。并且sript src 引入所有打包的js文件。
            filename: 'index.html', // 生产的html文件名字。
            template: './index.html',
            inject: true // 往html文件注入依赖的时候，路径是指向output public path 指定的路径
        }),
        new CleanWebpackPlugin(['dist']),
        // new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin() //作用是什么

    ]

}