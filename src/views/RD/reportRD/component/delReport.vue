<template>
  <div>
    <el-form ref="form" :model="ReportMarketInfo" label-position="top" label-width="200px" size="mini">
       <div style="margin-bottom:20px;">Báo cáo: {{ report.ReportId }} </div>
    <el-form-item size="large">
        <el-button type="danger" @click="onSubmit">Xóa ý tưởng</el-button>
        <el-button @click="cancelde">Hủy</el-button>
    </el-form-item>
    </el-form>
</div>
</template>
<script>
import { RemoveReportMarket  } from '@/api/reportRD'
import Cookies from 'js-cookie'
export default {
    props:['report'],
    created(){
    },
    data(){
        return{
            ActiveElement:[],
            ReportMarketInfo:{
                ReportId: "",
                MoreInfo: "",
            }
        }
    },
    methods:{
        onSubmit(){
            var rep ={
                Token: Cookies.get('token'),
                UserName: Cookies.get('idEmployee'),
                ReportId:  this.report.ReportId
            }
        RemoveReportMarket(rep).then(res=>{
            this.$notify({
                title:'Thành công',
                message:'Xóa báo cáo thành công',
                type: 'success',
                position:'top-left'
            })
            this.$emit('delReportOK',this.ReportMarketInfo)
        })
        },
       cancelde(){
           this.$emit('deletecancelOK')
       }
    }
}
</script>