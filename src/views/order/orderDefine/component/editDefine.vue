<template>
  <modal id="edit-define-modal" ref="edit-define-modal"  v-cloak>
    <template slot="title">Chỉnh sửa nhóm việc (dịch vụ)</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
               
                 <el-form-item label="Nhóm việc">
                  <el-input v-model="row.Service" ></el-input>
                </el-form-item>
                
                <el-form-item label="Chỉ tiêu KPI">
                  <el-input v-model="row.KPI" ></el-input>
                </el-form-item>

                <!-- <el-form-item label="Mã nhóm việc">
                  <el-input v-model="row.ServiceCode" ></el-input>
                </el-form-item> -->
               
                 <el-form-item label="Ghi chú">
                  <el-input v-model="row.Note" ></el-input>
                </el-form-item>

                  <el-form-item label="Phân loại">
                  <el-radio v-model="row.Public" label="1">Dịch vụ</el-radio>
                  <el-radio v-model="row.Public" label="0">Nội bộ</el-radio>
                </el-form-item>
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="editService" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOffice,createOrderSend,getService, editServiceDefine } from "@/api/order";
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
      VoerroModal.hide('edit-define-modal');
    },
    editService(){
       this.form.IDService = this.$props.row.IDService;
       this.form.KPI = this.$props.row.KPI;
       this.form.Note = this.$props.row.Note;
       this.form.Service = this.$props.row.Service;
        this.form.ServiceCode = this.$props.row.ServiceCode;
        this.form.Public = this.$props.row.Public;
        this.form.IDGroup = this.$props.row.IDGroup;
      console.log(this.form);
       editServiceDefine(this.form).then(response => {
        if(response.ResCode == 0){
         this.$notify({
          title: 'Thành công',
          message: 'Chỉnh sửa nhóm việc thành công',
          type: 'success',
          position: 'top-left',
        });
        this.$emit('click-something', this.form);
         VoerroModal.hide('edit-define-modal');
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


