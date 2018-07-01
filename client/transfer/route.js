const url = require('../common/transferURL')
const controller = require('./controller')


var mountRoute = (app)=>{
    app.post(url.SEARCH, controller.search)
    app.post(url.CREATE, controller.create)
    app.post(url.INCREASE, controller.increase)
    app.post(url.DESCREASE, controller.descrease)
}

module.exports = {
    mountRoute:mountRoute
}




