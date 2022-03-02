<template>
  <modal id="delete-action-modal" ref="delete-action-modal"  v-cloak>
    <template slot="title">Xóa loại công việc</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                
                 <el-form-item label="Mã">
                  <el-input v-model="row.CodeAction" ></el-input>
                </el-form-item>
                 <el-form-item label="Công việc">
                  <el-input v-model="row.Name" ></el-input>
                </el-form-item>
               
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteAction" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOffice,createOrderSend,getService, createServiceDefine, deleteAction } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
        
        optionsService: [{
        }],
         value: '',
         form: {
           KPI: 0,
          Deadline: 0,
           IDService: '',
           Note: '',
          Name:'',
          CodeAction:'',
          IDAction: 0,
         }, 
    }  
  },
  
  methods: {
    
    closeModal() {
      VoerroModal.hide('delete-action-modal');
    },
    deleteAction(){
      this.form.IDAction = this.$props.row.IDAction;
    
      console.log(this.form);
       deleteAction(this.form).then(response => {
        if(response.ResCode == 0){
        this.$notify({
          title: 'Thành công',
          message: 'Xóa công việc thành công',
          type: 'success',
          position: 'top-left',
        });
        this.$emit('click-something', this.form);
         VoerroModal.hide('delete-action-modal');
        this.listLoading = false; 
        }
      });
    }
  },
 
};
</script>

<style>

 .my-autocomplete{
   width: 500px;
 }
  
</style>


