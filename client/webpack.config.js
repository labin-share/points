const path = require('path') // 引入path模块
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引入html生成插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    mode: 'development',
  "entry": {
        "main":"./src/main.js", // key为文件名，对应出口[name].js 中的name
   },
   "output": {
    "filename": '[name].js', // 出口文件名字，对于入口的key值
    "path": path.resolve(__dirname, "./dist"),
    "publicPath": "/dist"
  },
  "module": { 
    "rules":[{
      "test": /\.css$/, // css文件需要style-loader，css-loader
      "loader": ["style-loader","css-loader"],
      "exclude": '/node_modules' // 不需要编译node_modules
    },{
      "test": /\.js$/,
      "loader": 'babel-loader', // js文件使用babel-loader 转换。
      "exclude": '/node_modules'
    },{
      "test": /\.vue$/, // 遇到vue文件使用vue-loader。vue-loader需要依赖其他loader 下载后会有提示
      "loader": 'vue-loader',
      "exclude": '/node_modules'
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
    historyApiFallback: true,  // 单页应用找不到时回滚到index.html
    inline: true
  },
  plugins: [ 
     new HtmlWebpackPlugin ({ // 这个插件能在打包的时候，自动生成html文件，并且放入出口path中。并且sript src 引入所有打包的js文件。
      filename: 'index.html', // 生产的html文件名字。
      template: './index.html', 
      inject: true
    }),
    new VueLoaderPlugin() //作用是什么
  ]

}