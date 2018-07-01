<template>
    <div>
        <el-row>
            <el-col :span="6"><el-input v-model="name" placeholder="姓名"></el-input>
            <span style="color:red;" v-show="invalidName">姓名不能为空</span>
            </el-col>
            <el-col :span="6">
            <el-input v-model="phone" placeholder="手机号码"></el-input>
            <span style="color:red;" v-show="isDuplicatedUser">号码已经存在</span>
            <span style="color:red;" v-show="invalidPhone">号码不能为空</span>
            </el-col>
            <el-col :span="6"><el-input v-model="points" placeholder="分数"></el-input></el-col>
        </el-row>
        <el-row style="margin-top:2px;">
            <el-col :span="6"><el-input v-model="sex" placeholder="性别"></el-input></el-col>
            <el-col :span="6"><el-input v-model="birth" placeholder="生日"></el-input></el-col>
            <el-col :span="6"><el-input v-model="previous.name" placeholder="上家姓名"></el-input>
            </el-col>
        </el-row>

         <el-row v-show="isShowUserList" style="margin-top:40px;">
         <h3>
            有多个重复姓名的上家，请挑选其中一个
         </h3>
          <el-table
          :data="sameUserNameList"
          style="width: 100%"
           highlight-current-row
          @current-change="handleCurrentChange"
           >
          <el-table-column
          type="index"
          width="50">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
              prop="sex"
              label="性别"
              width="180">
          </el-table-column>
          <el-table-column
              prop="phone"
              label="手机号"
              width="180">
          </el-table-column>
          </el-table>
         </el-row>


    </div>
</template>
<script>
import axiosProxy from '../util/axiosProxy'
import transferURL from '../../common/transferURL'
import axios from 'axios'
import { Message } from 'element-ui'
export default {
    created(){
    },
    computed:{
    },
    data(){
        return{
            isDuplicatedUser:false,
            sameUserNameList:[],
            isShowUserList:false,
            phone:'',
            name:'',
            points:'',
            previousName:'',
            previousUsers:[],
            rightPreviousUser:'',
            previous:{name:'', phone:''},
            sex:'',
            birth:'',
            invalidName:false,
            invalidPhone:false
        }
    },
    methods:{
        create(){
            this.isDuplicatedUser = false
            if(!this.validateInput()){
              this.save()
            }
        },
        checkUserList(){
            let self = this
            axiosProxy({
                method:'get',
                url:transferURL.SEARCH+"?name="+this.previous.name
            }).then((res)=>{
                if(res.data){
                    if(res.data.length == 1){
                        self.rightPreviousUser = res.data[0]
                        self.save()
                    }else if(res.data.length > 1){
                      // ToDo: open user list to choose
                        self.isDuplicatedUser = true
                    }else{
                      // ToDo: display previous is not existed.
                        self.previous = {name:'',phone:''}
                        self.sameUserNameList= res.data
                        self.isShowUserList = true
                    }
                }
            },()=>{

            })
        },
        handleCurrentChange(val){
            this.previous = {name:val.name, phone:val.phone}
            console.log(this.rightPreviousUser)
        },
        validateInput(){
            this.invalidName = !this.name
            this.invalidPhone = !this.phone
            //this.invalidSex = !this.sex
            return this.invalidName || this.invalidPhone
        },
        save(){
            var params = new URLSearchParams()
            params.append('name', this.name);
            params.append('phone', this.phone);
            params.append('score', this.points);
            params.append('previous', JSON.stringify(this.previous));
            params.append('sex', this.sex);
            params.append('birth', this.birth)
                Message.success({
                    message:'处理中，请稍后',
                    duration:1000,
                    center:true
                })
              axios({
                method:'post',
                url:transferURL.CREATE,
                data:params
            }).then((res)=>{
                 Message.closeAll()
                if(!res.data.success){
                    if(res.data.msg == 'user existed'){
                        // ToDo 显示用户已存在
                         this.isDuplicatedUser = true
                    }else if(res.data.msg == 'duplicate previous'){
                        this.isShowUserList = true
                        this.sameUserNameList = res.data.data
                    }
                }else{
                     Message.success({
                    message:'操作成功',
                    duration:1000,
                    center:true
                })
                    this.$emit('success')
                }
            },(res)=>{
                    Message.closeAll()
                         Message.success({
                    message:'操作失败',
                    duration:1000,
                    center:true
                })
            })

        }
    }

}
</script>

