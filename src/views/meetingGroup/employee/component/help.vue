<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
     <el-form-item label="Ghi chú">
        <el-input v-model="form.Note"></el-input>
      </el-form-item>
    
    </el-form>
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">Chọn</el-button>
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import Cookies from 'js-cookie'
import { Note } from '@/api/meetingGroup';
export default {
  props:['row'],
  components:{

  },
  created() {
    GetTeacherLst().then(res => {
      this.teacherLst = res.Data;
     
    });
    //this.initValue();
  },

  methods:{
    modalOK(){
        this.form.RowID = this.$props.row.RowID
        Note(this.form).then(res=>{
            if(res.ResCode == 0){
                this.$notify({
                    title: "Thành công",
                    message: "Ghi chú thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok')
            }
        })
    },
     uploadOk(res,file,fileList) {
      
        //  this.lines.forEach(fun)
        //                  function fun(item, index, arr){
        //                      if(item.ParameterID == res.Data.paraID){
        //                         // console.log(item)
        //                          item.answer.push(res.Data.fileName)
        //                      }
                          
        //                 }
           console.log(res)
        },

    closeModal(){
      this.$emit('closeModal')
    },
    
  },
  watch: {
     
  },
  data() {
    return {
     form:{
         Note:"",
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