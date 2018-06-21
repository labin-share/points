<template>
    <div>
        <el-row>
            <el-col :span="8"><el-input v-model="phone" placeholder="手机号码"></el-input></el-col>
            <el-col :span="4"><el-input v-model="name" placeholder="姓名"></el-input></el-col>
            <el-col :span="4"><el-input v-model="points" placeholder="分数"></el-input></el-col>
            <el-col :span="8"><el-input v-model="previousName" placeholder="上家姓名"></el-input></el-col>
        </el-row>
    </div>
</template>
<script>
import axiosProxy from '../util/axiosProxy'
import transferURL from '../../common/transferURL'
export default {
    created(){
    },
    computed:{
    },
    data(){
        return{
            phone:'',
            name:'',
            points:'',
            previousName:'',
            previousUsers:[],
            rightPreviousUser:''
        }
    },
    methods:{
        create(){
            this.checkUserList()
        },
        checkUserList(){
            let self = this
            axiosProxy({
                method:'get',
                url:transferURL.SEARCH+"?name="+this.name
            }).then((res)=>{
                if(res.data){
                    if(res.data.length == 1){
                        self.rightPreviousUser = res.data[0]
                        self.save()
                    }else{
                      // ToDo: open user list to choose
                        self.previousUsers = res.data
                    }
                }
            },()=>{

            })
        },
        save(){
            axiosProxy({
                method:'post',
                url:transferURL.CREATE,
                data:{
                    phone:self.phone,
                    name:self.name,
                    score:self.points,
                    previous:{
                        name:this.rightPreviousUser.name,
                        phone:this.rightPreviousUser.phone
                    }
                }
            }).then((res)=>{

            },(res)=>{

            })
        }
    }

}
</script>

