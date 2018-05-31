const url = require('../common/transferURL')
const controller = require('./controller')


var mountRoute = (app)=>{
    app.get(url.SEARCH, controller.search)
}

module.exports = {
    mountRoute:mountRoute
}




