<template>
  <div>
    <el-row>
      <el-col :span="3"><el-input v-model="phone" placeholder="手机号码"></el-input></el-col>
      <el-col :span="3"><el-input v-model="name" placeholder="姓名"></el-input></el-col>
      <el-col :span="2"><el-input v-model="points" placeholder="分数"></el-input></el-col>
      <el-col :span="5">
        <el-button-group style="margin-left:10px;">
          <el-button type="primary" round @click="addOrDesPoints('increase')" :disabled="disabledIncreaseBtn">加分</el-button>
          <el-button type="success" round @click="addOrDesPoints('descrease')" :disabled="disabledDescreaseBtn">减分</el-button>
          <el-button type="primary" round @click="search">搜索</el-button>    
          <el-button type="primary" round @click="openCreate">创建</el-button>    
        </el-button-group>
      </el-col>
      <el-col :span="3" style="margin-top: 9px;">
        <span :style="processClass">{{processText}}</span>
      </el-col>
    </el-row>
    <el-row :gutter="2">
      <el-col :span="18">
          <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="tableLoading">
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="phone"
            label="手机号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="points"
            label="积分">
          </el-table-column>
          <el-table-column
            prop="previous"
            label="上家">
            <template slot-scope="scope">
              <span>{{scope.row.previous.name}}</span>&nbsp;
              <span>{{scope.row.previous.phone}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="next"
            label="下家"
            width="300">
            <template slot-scope="scope">
              <span>{{scope.row.next[0].name}}</span>
              <span>{{scope.row.next[0].phone}}</span>
              <el-popover
                placement="right"
                width="250"
                trigger="click">
                <ul>
                  <li v-for="item in scope.row.next">
                    {{item.name}}
                    &nbsp;
                    {{item.phone}}
                  </li>
                </ul>
                <el-button slot="reference" size="mini" round>更多</el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="5">
        <history></history>
      </el-col>
    </el-row>
    <create :visible="isShowCreateDialog"></create>
  </div>
</template>

<script>
import transferURL from '../../common/transferURL'
import constants from '../../common/constants'
import axiosProxy from '../util/axiosProxy'
import utils from '../../common/utils'
import History from './History'
import Create from './Create'
import { Message } from 'element-ui'

export default {
  components:{History,Create},
  data(){
    return{
      phone:'',
      name:''  ,
      points:'',
      processStatus:constants.processMap.NORMAL,
      tableData:null,
      isShowCreateDialog:false,
      tableLoading:false,
      disabledIncreaseBtn:false,
      disabledDescreaseBtn:false
    }
  },
  created(){
  },
  computed:{
    processClass:function(){
      return constants.processMap.style[this.processStatus]
    },
    processText:function(){
      return constants.processMap.text[this.processStatus]
    }
  },
  methods:{
    search(){ 
      let self = this
      this.tableLoading = true
      let params = utils.buildParam('',{name:this.name,phone:this.phone})
      axiosProxy({
        method:'GET',
        url:transferURL.SEARCH+params
      }).then((res)=>{
        self.tableData = res.data
        self.tableLoading = false
      },(err)=>{
          debugger
        self.tableLoading = false
      })
    },
    test(){
      console.log('test')
    },
    changeBtnStatus(action, disabled){
      if(action == 'increase'){
        this.disabledIncreaseBtn = disabled
      }else{
        this.disabledDescreaseBtn = disabled
      }
    },
    addOrDesPoints(action){
      let self = this
      let url = action == 'increase' ? transferURL.INCREASE : transferURL.DESCREASE
      Message.info({
        message:'处理中，请稍后',
        duration:0,
        center:true
      })
      this.changeBtnStatus(action,true)
      this.axios.put(url,{
        phone:self.phone,
        name:self.name,
        score:self.points
      }).then((res)=>{
        Message.closeAll()
        self.changeBtnStatus(action,false)
        if(res.data){
          Message.success({ 
            message:'操作成功',
            duration:1000,
            center:true
          })
        }else{
          Message.error({
            message:'操作失败',
            duration:1000,
            center:true
          })  
        }
      },(res)=>{
        self.changeBtnStatus(action,false)
        Message.closeAll()
        Message.error({
          message:'操作失败',
          duration:1000,
          center:true
        })       
      })
    },
    openCreate(){
      this.isShowCreateDialog = true
    }
  }
}

</script>

<style>
  processing{
    color:#E6A23C
  }

  process-success{
    color:#67C23A
  }

  process-failed{
     color:#F56C6C
  }
</style>
