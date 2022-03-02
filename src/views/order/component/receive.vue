<template>
  <modal id="new-receive-modal" ref="new-receive-modal"  v-cloak>
    <template slot="title">Nhận nhiệm vụ</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini">
       
                 <el-form-item label="ID" hidden=true>
                  <el-input v-model="form.ID" ></el-input>
                </el-form-item>
                <el-form-item label="Tiêu đề">
                  <el-input v-model="form.title" ></el-input>
                </el-form-item>
                 <el-form-item label="Nội dung">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                  v-model="form.content" ></el-input>
                </el-form-item>
                <el-form-item label="Thời hạn">
                  <el-input type="date" v-model="form.deadline" ></el-input>
                </el-form-item>

                 <el-form-item label="KPI cơ sở">
                  <el-input type="number" v-model="form.KPIBase" ></el-input>
                </el-form-item>
                 <el-form-item label="Ghi chú">
                  <el-input v-model="form.note" ></el-input>
                </el-form-item>
                
                <el-form-item size="large">
                  
                </el-form-item>
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="sendRequest" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getEmployee, receiveOrder } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
         value: '',
         form: {
           ID: '',
           title: '',
           content: '',
           idEmployee: '',
           idManager: '',
           note: '',
           KPIBase: '',
           deadline: '',
           idManager: '',
         }
    }  
  },
  
  methods: {
    // fetchEmployee() {
    //   var req = {
    //     admin: Cookies.get('admin'),
    //   };
    //   this.listLoading = true;
    //   getEmployee(req).then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false; 
    //   });
    // },
    closeModal() {
      VoerroModal.hide('new-receive-modal');
    },
    sendRequest(){
         console.log(this.$props.row);
      this.form.idEmployee = Cookies.get('idEmployee');
      this.form.ID = this.$props.row.ID;
      //this.form.idManager = Cookies.get('idEmployee');
      //console.log(this.$props);
      console.log(this.form);
       receiveOrder(this.form).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
          VoerroModal.hide('new-receive-modal');
        console.log(response.ResCode);
        this.listLoading = false; 
        }
        
      });

    }

  },
  created() {
      //this.fetchEmployee();
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