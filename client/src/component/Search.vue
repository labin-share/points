<template>
  <div>
    <el-row>
      <el-col :span="4"><el-input v-model="phone" placeholder="输入号码"></el-input></el-col>
      <el-col :span="4"><el-input v-model="name" placeholder="输入姓名"></el-input></el-col>
      <el-col :span="4"><el-button type="primary" @click="search">搜索</el-button></el-col>
    </el-row>
    <el-row>
      <el-table
      :data="tableData"
      style="width: 100%">
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
    </el-table>
    </el-row>
  </div>
</template>

<script>
import transferURL from '../../common/transferURL'
export default {
  data(){
    return{
      phone:'',
      name:''  ,
      tableData:null
    }
  },
  created(){
    // this.tableData = [{
    //   name:'Labin',
    //   phone:'13631225776',
    //   points:'3'
    // }]
  },
  methods:{
    search(){ 
      let self = this
      this.axios.get(transferURL.SEARCH).then((res)=>{
        self.tableData = res.data
      })
    }
  }
}

</script>

<style>
</style>
