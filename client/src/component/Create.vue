<template>
    <el-dialog title="增加客户" :visible.sync="show">
        hello world
    </el-dialog>    
</template>
<script>
export default {
    props: ['visible'],
    data(){
        return{
            show:this.visible
        }
    }
}
</script>

