<template>
   <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>操作成功历史</span>
        </div>
        <div v-for="data in historyData" :key="data.phone" class="text item">
            <span style="color:#F56C6C">
                减分：
            </span>
            <span>
                {{data.phone + ' '+ data.name + ' ' +data.score}}
            </span>
        </div>
    </el-card>
</template>
<script>
export default {
  data(){
    return{
        historyData:[{
            action:'delete',
            phone:'13631225776',
            name:'Labin',
            score:13
        }]
    }
  }
}
</script>

