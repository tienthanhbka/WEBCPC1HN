<template>
  <modal id="edit-request-modal-group" ref="edit-request-modal-group"  v-cloak>
    <template slot="title">Chỉnh sửa việc cho nhân viên</template>
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

                 <el-form-item label="KPI cơ sở">
                  <el-input  v-model="row.KPIBase" ></el-input>
                </el-form-item>

                  
                 <el-form-item label="Hệ số nhân">
                  <el-input  v-model="row.Rate"  ></el-input>
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
import { editAdminOrder,getEmployee,getActionByID } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'Name', 'Action', 'groups'],
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
      VoerroModal.hide('edit-request-modal-group');
    },
    sendRequest(){
      
       editAdminOrder(this.$props.row).then(response => {
        if(response.ResCode == 0){
          this.$notify({
            title: 'Thành công',
            message: 'Chỉnh sửa Giao - Nhận công việc thành công',
            type: 'success',
            position: 'top-left',
          });
          this.$emit('click-something',this.form);
          VoerroModal.hide('edit-request-modal-group');
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