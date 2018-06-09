function buildParam(params, argMap){
    for(let key in argMap){
        if(argMap[key]){
            if(params)
                params += '&'
            params = `${params}${key}=${argMap[key]}`
        }
            
    }
    if(params && params.indexOf('?')<0 )
        params = `?${params}`
    return params
} 
module.exports =  {
    buildParam:buildParam
}