<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      
      label-width="120px"
    >
     <div> Trình dược viên: {{ row.NameEmployee }} - {{ row.IDGroup }}</div>
      <el-form-item label="Người kiểm tra" prop="idTeacher">
        <el-select v-model="form.idTeacher" placeholder="Chọn người kiểm tra" @change="modalOK" style="width:100%">
          <el-option
            v-for="item in teacher"
            :key="item.EmployeeID"
            :label="item.NameEmployee + ' - ' + item.idGroup"
            :value="item.EmployeeID"
          ></el-option>
        </el-select>
      </el-form-item>
    
    </el-form>
   
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import { GetProductLst,createRole,GetTeacherLst,AddTeacher } from '@/api/roleplay';
export default {
  props:['row','teacher','visible'],
  components:{

  },
  created() {

    // GetTeacherLst({idEmployee : this.$props.row.EmployeeID}).then(res => {
    //   this.teacherLst = res.Data;
     
    // });
    //this.initValue();
    //this.fetchTeacher()
  },

  methods:{
     fetchTeacher(){
       var req = {
        idEmployee: this.$props.row.EmployeeStudentID
        
      };
       GetTeacherLst(req).then(response => {
        this.teacherLst = response.Data;
        //console.log(this.teacherLst)
      });
    },
    modalOK(){
        this.form.RowID = this.$props.row.RowID
        AddTeacher(this.form).then(res=>{
            if(res.ResCode == 0){
                this.$notify({
                    title: "Thành công",
                    message: "Chọn người kiểm tra thành công",
                    position: 'top-left',
                     type: 'success',

                })

                //this.$props.visible = false
                this.$emit('click','ok')
            }
        })
    },

    closeModal(){
      this.$emit('closeModal')
    },
    
  },
  watch: {
    
  },
  data() {
    return {
     
      placeModalVisible:false,
      teacherLst: [],
      proLst:[],
      form: {
        idTeacher: "",
        
        RowID: 0
      },
     
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