const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../webpack.config');
const compiler = webpack(webpackConfig);
var route = require('./route')
var express = require('express')
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({extended:true}))

app.use(middleware(compiler, {
  // webpack-dev-middleware options
}));

app.get('/', function (req, res) {
    res.send('Hello World!');
});

route.mountRoute(app)

app.use(express.static('dist'));

var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});