<template>
  <div >
      <div >
    <el-row><el-col :span="12"><span style="font-weight: bold;">Role:</span> {{ row.Title }} </el-col> <el-col :span="12"> <span style="font-weight: bold;">Sản phẩm:</span> {{ row.Product }}</el-col></el-row>
    <el-row><el-col :span="12"><span style="font-weight: bold;">TDV:</span> {{ row.NameEmployee }} </el-col> <el-col :span="12"> <span style="font-weight: bold;">Người kiểm tra:</span> {{ row.NameTeacher }}</el-col></el-row>
    <el-row><el-col :span="12"><span style="font-weight: bold;">Thời gian:</span> {{ row.TimeStart }} - {{ row.TimeEnd }} </el-col> <el-col :span="12"><span style="font-weight: bold;"> Ngày: </span> {{ row.Date }} </el-col></el-row>
    </div>
      <iframe width="100%" height="700px" :src="row.Link"></iframe>
       <iframe width="100%" height="700px" :src="row.Link2"></iframe>

       <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
   
    
    </el-form>
 
  
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import Cookies from 'js-cookie'
import { AcceptRole,NoAcceptRole } from '@/api/roleplay';
export default {
  props:['row'],
  components:{

  },
  created() {
   
  },

  methods:{
  
    modalAccept(){
        this.form.RowID = this.$props.row.RowID
        AcceptRole(this.form).then(res=>{
            if(res.ResCode == 0){
                  this.$notify({
                    title: "Thành công",
                    message: "Đánh giá thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok')
            }
        })
    },

    modalNoAccept(){
        this.form.RowID = this.$props.row.RowID
         NoAcceptRole(this.form).then(res=>{
            if(res.ResCode == 0){
                 this.$notify({
                    title: "Thành công",
                    message: "Đánh giá thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok') 
            }
        })
    }

    
  },
  watch: {
     
  },
  data() {
    return {
     form:{
         CommentAccept:"",
         RowID:0
     },
      placeModalVisible:false,
      teacherLst: [],
      proLst:[],
     
     
    };
  }
};
</script>

<style>
@media only screen and ( max-width: 600px) {
    .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
}
}
</style>