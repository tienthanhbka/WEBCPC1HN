<template>
  <modal id="delete-order-send-modal" ref="delete-order-send-modal"  v-cloak>
    <template slot="title">Xóa yêu cầu</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                 <el-form-item label="Công việc">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                  v-model="row.Content" ></el-input>
                </el-form-item>
                <el-form-item hidden="true" label="ID">
                  <el-input v-model="row.ID" ></el-input>
                </el-form-item>
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteOrder" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { deleteOrderSend } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'groups'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
        optionsService: [{
        }],
       
         form: {
             ID: '',
           name: '',
           content: '',
           sendToOffice: '',
           note: '',
           deadline: '',
           product: '',
           idEmployee: '',
           idGroup: '',
           IDService: '',
         },
      
    }  
  },
  
  methods: {
    closeModal() {
      VoerroModal.hide('delete-order-send-modal');
    },
    deleteOrder(){
      this.form.ID = this.$props.row.ID;

        deleteOrderSend(this.form).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
        //console.log(response.ResCode);
         this.$notify({
          title: 'Thành công',
          message: 'Xóa yêu cầu thành công',
          type: 'success',
          position: 'top-left'
        });
        this.$emit('click-something', this.form)
         VoerroModal.hide('delete-order-send-modal');
        this.listLoading = false; 
        }
      });
    }
  },
 
 
  // watch: {
  //   employee:function(){
      
  //     GetPlaceByIdEmployee({idEmployee:this.employee.idEmployee}).then(res=>{
  //         console.log(res);
  //         this.tableData = res.Data;
  //     })
  //   }
  // },
};
</script>

<style>

 .my-autocomplete{
   width: 500px;
 }
 

  
</style>


