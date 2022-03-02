<template>
  <modal id="delete-request-modal-employee" ref="delete-request-modal-employee"  v-cloak>
    <template slot="title">Xóa công việc</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini">
       
                 <el-form-item hidden=true label="ID">
                  <el-input v-model="row.IDOrder" ></el-input>
                </el-form-item>
                <el-form-item label="Yêu cầu">
                  <el-input v-model="row.Title" ></el-input>
                </el-form-item>
             
                 <el-form-item label="Ghi chú">
                  <el-input v-model="row.Note" ></el-input>
                </el-form-item>
                 
                     <el-form-item  label="KPI cơ sở">
                  <el-input  v-model="row.KPIBase" ></el-input>
                </el-form-item>
                  <el-form-item  label="Khối lượng">
                  <el-input   v-model="row.Rate" ></el-input>
                </el-form-item>
                  
                 <el-form-item label="Chi tiết">
                  <el-input v-model="row.Content" ></el-input>
                </el-form-item>
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="sendRequest" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { deleteAdminOrder,getEmployee,getActionByID } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'employee', 'Name', 'Action', 'groups'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
         value: '',
         action:'',
         actionNote:'',
         admin: Cookies.get('admin'),
         form: {
           IDOrder:'',
           Title: '',
           Content: '',
           IDEmployee: '',
           Note: '',
           KPIBase: '',
            Rate: '',
           Deadline: '',
           IDManager: '',
           Error: '',
           LevelError: '',
           PenatyScore: '',
           IDGroup: '',
         }
    }  
  },
  
  methods: {
    fetchActionByID() {
      //alert('ok');
         var req = {
        IDAction: this.action,
      };
      this.listLoading = true;
      getActionByID(req).then(response => {
        this.form.Note = response.Data[0].Note;
        this.form.KPIBase = response.Data[0].KPI;
        this.form.Title = response.Data[0].Name;
        this.form.Error = response.Data[0].Error;
        this.form.LevelError = response.Data[0].LevelError;
        this.form.PenatyScore = response.Data[0].PenatyScore;
        console.log(this.Action);
        this.listLoading = false; 
      });
    },

    closeModal() {
      VoerroModal.hide('delete-request-modal-employee');
    },
    sendRequest(){
      // this.form.IDEmployee = this.value;
      // this.form.IDOrder = this.$props.row.IDOrder;
      //  this.form.Content = this.$props.row.Content;
      //   //this.form.KPIBase = this.$props.row.KPIBase;
      //   //this.form.Note = this.$props.row.Note;
      //    this.form.IDGroup = this.$props.groups;
      //   //this.form.Title = this.action;
      // this.form.IDManager = Cookies.get('idEmployee');
   
      //console.log(this.form);
      //confirm("Bạn có chắc chắn muốn xóa công việc này. Nếu bạn xóa sẽ ko thể khôi phục")
       deleteAdminOrder(this.$props.row).then(response => {
        if(response.ResCode == 0){
          this.$notify({
            title: 'Thành công',
            message: 'Xóa công việc thành công',
            type: 'success',
            position: 'top-left',
          });
          this.$emit('click-something',this.form);
          VoerroModal.hide('delete-request-modal-employee');
        console.log(response);
        this.listLoading = false; 
        }
      });
    }
  },
  watch: {
    action: function(){
      this.fetchActionByID();
    }
  },
  created() {
      //this.fetchEmployee();
      //this.fetchAction();
  },
};
</script>