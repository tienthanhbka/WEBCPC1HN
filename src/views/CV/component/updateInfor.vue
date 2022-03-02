<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
     <el-form-item label="Cấp độ" prop="Level">
        <el-select v-model="form.Level" placeholder="Chọn cấp độ" style="width:100%">
          <el-option
            v-for="item in lstLevel"
            :key="item.level"
            :label="item.value"
            :value="item.level"
          ></el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="Mô tả">
        <el-input v-model="form.Description"></el-input>
      </el-form-item>

       
    
    </el-form>
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { UpdateEmployeeLevel } from '@/api/employeeLevel';
export default {
  props:['row'],
  components:{

  },
  created() {
    
    //this.initValue();

    this.form.level = this.$props.row.Level
    this.form.Description = this.$props.row.Description
  },

  methods:{
    modalOK(){
        this.form.EmployeeID = this.$props.row.idEmployee
        UpdateEmployeeLevel(this.form).then(res=>{
            if(res.ResCode == 0){
                this.$notify({
                    title: "Thành công",
                    message: "Cập nhật thành công",
                    position: 'top-left',
                     type: 'success',

                })
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
     form:{
         Description:"",
         Level: 0,
         EmployeeID: ""
     },
      placeModalVisible:false,
      teacherLst: [],
      proLst:[],

      lstLevel: [
        {
          level: 0,
          value: "Cấp độ 0"
      },{
          level: 1,
          value: "Cấp độ 1"
      },
      {
          level: 2,
          value: "Cấp độ 2",
      },{
          level: 3,
          value: "Cấp độ 3"
      },{
          level: 4,
          value: "Cấp độ 4"
      }]
     
     
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