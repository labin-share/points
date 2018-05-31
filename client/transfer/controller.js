var request = require('request')

const WS_HOST = '127.0.0.1'
const WS_PORT = '5000'

var search = (req,res)=>{
    let phone = req.params.phone
    let name = req.params.name
    let url = `http://${WS_HOST}:${WS_PORT}/users`
    let params = buildParam('', {phone:phone, name:name})
    if(params)
        url+= `?${params}`
    request.get(url,(error,response,body)=>{
        res.send(body)
    })
}

function buildParam(params, argMap){
    for(key in argMap){
        if(argMap[key])
            params += `&${key}=${argMap[key]}`
    }
    return params
} 

module.exports = {
    search:search
}