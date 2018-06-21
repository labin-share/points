import { Message } from 'element-ui'
import axios from 'axios'

var axiosProxy = (options)=>{
    processTip()
    debugger
    return new Promise(function(resolve, reject) {
        axios(options).then((res)=>{
            Message.closeAll()
            successTip()
            resolve(res)
        },(error)=>{
            Message.closeAll()
            failedTip()
            reject(error);
        })
    })
}

function failedTip(){
    Message.error({
        message:'操作失败',
        duration:1000,
        center:true
    })
}

function successTip(){
    Message.success({
        message:'操作成功',
        duration:1000,
        center:true
    })
}
function processTip(){
    Message.info({
        message:'处理中，请稍后',
        duration:0,
        center:true
    })
}
export default axiosProxy