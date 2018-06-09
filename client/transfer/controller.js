var request = require('request')
var utils = require('../common/utils')

const WS_HOST = '192.168.31.207'
const WS_PORT = '5000'
const DOMAIN = `${WS_HOST}:${WS_PORT}`

var search = (req,res)=>{
    let url = `http://${DOMAIN}/users`
    let params = utils.buildParam('', req.query)
    url+= params
    console.log(url)
    request.get(url,(error,response,body)=>{
        res.send(body)
    })
}

var changeScore = (req, res, url) =>{
    request.put(url,req.body, (error, response, body)=>{
        console.log('request end')
        res.send(body)
    })
}

var increase = (req, res)=>{
    let url = `http://${DOMAIN}/score/increase`
    console.log('come in')
    changeScore(req, res, url)
}

var descrease = (req, res)=>{
    let url = `http://${DOMAIN}/score/descrease`
    changeScore(req, res, url)
}

function buildParam(params, argMap){
    for(key in argMap){
        if(argMap[key])
            params += `&${key}=${argMap[key]}`
    }
    return params
} 

module.exports = {
    search:search,
    increase:increase,
    descrease:descrease
}