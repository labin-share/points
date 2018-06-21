const url = require('../common/transferURL')
const controller = require('./controller')


var mountRoute = (app)=>{
    app.get(url.SEARCH, controller.search)
    app.get(url.CREATE, controller.create)
    app.post(url.INCREASE, controller.increase)
    app.put(url.DESCREASE, controller.descrease)
}

module.exports = {
    mountRoute:mountRoute
}




