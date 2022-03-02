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
      <el-form-item label="Người giám sát" prop="idAccept">
        <el-select v-model="form.idAccept" placeholder="Chọn người giám sát" @change="modalOK" style="width:100%">
          <el-option
            v-for="item in acceptLst"
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
import { GetProductLst,createRole,AddAccept } from '@/api/roleplay';
export default {
  props:['row', 'acceptLst'],
  components:{

  },
  created() {
   
  },

  methods:{
    
    modalOK(){
        this.form.RowID = this.$props.row.RowID
        AddAccept(this.form).then(res=>{
            if(res.ResCode == 0){
                this.$notify({
                    title: "Thành công",
                    message: "Chọn người giám sát thành công",
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
     
      placeModalVisible:false,
     
      proLst:[],
      form: {
        idAccept: "",
        
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