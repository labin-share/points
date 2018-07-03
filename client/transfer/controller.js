var request = require('request')
var utils = require('../common/utils')

const WS_HOST = '192.168.31.207'
const WS_PORT = '5000'
const DOMAIN = `${WS_HOST}:${WS_PORT}`

var search = (req,res)=>{
    let url = `http://${DOMAIN}/users`

    let option = {
        headers:{
        'Content-Type': 'application/json',
//        'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:req.body,
        url:url,
        method:'POST'
    }
    request(option, (error, response, body)=>{
        console.log(body)
        res.send(body)
    })
}

var create = (req,res)=>{
    let url = `http://${DOMAIN}/users/save`
    let option = {
        headers:{
        'Content-Type': 'application/json',
//        'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:req.body,
        url:url,
        method:'POST'
    }
    request(option, (error, response, body)=>{
        console.log('request end')
        res.send(body)
    })

}

var changeScore = (req, res, url) =>{
    console.log('change score')
    let option = {
        headers:{
        'Content-Type': 'application/json',
//        'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:req.body,
        url:url,
        method:'PUT'
    }
    request(option, (error, response, body)=>{
        console.log('request end')
        res.send(body)
    })
}

var increase = (req, res)=>{
    let url = `http://${DOMAIN}/score/increase`
    changeScore(req, res, url)
}

var descrease = (req, res)=>{
    let url = `http://${DOMAIN}/score/decrease`
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
    create:create,
    increase:increase,
    descrease:descrease
}