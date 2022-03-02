<template>
  <modal id="delete-define-modal" ref="delete-define-modal"  v-cloak>
    <template slot="title">Xóa nhóm việc (dịch vụ)</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
               
                 <el-form-item label="Nhóm việc">
                  <el-input v-model="row.Service" ></el-input>
                </el-form-item>
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteService" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOffice,createOrderSend,getService, deleteServiceDefine } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'options'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
        //  options: [{
        // }],
        optionsService: [{
        }],
         value: Cookies.get('idGroup'),
         form: {
           KPI: '',
           Service: '',
           Note: '',
           RowID: 0,
           IDGroup: '',
           IDService: '',
            IDEmployee: Cookies.get('idEmployee'),
            Public: '',
         },
        
    }  
  },
  
  methods: {
    
    // fetchOffice() {
    //   this.listLoading = true;
    //   getOffice().then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false; 
    //   });
    // },
     
    closeModal() {
      VoerroModal.hide('delete-define-modal');
    },
    deleteService(){
       this.form.IDService = this.$props.row.IDService;
        this.form.IDGroup = this.$props.row.IDGroup;
        this.form.RowID = this.$props.row.RowID;
      console.log(this.form);
       deleteServiceDefine(this.form).then(response => {
        if(response.ResCode == 0){
         this.$notify({
          title: 'Thành công',
          message: 'Xóa nhóm việc thành công',
          type: 'success',
          position: 'top-left',
        });
        this.$emit('click-something', this.form);
         VoerroModal.hide('delete-define-modal');
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
      //this.fetchOffice();
  },
   mounted() {
      //this.links = this.optionsService();
    }
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


