<template>
  <modal id="pause-KPI" ref="pause-KPI"  v-cloak>
    <template slot="title">Tạm dừng danh mục</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                 <el-form-item label="Mã">
                  <el-input v-model="id" ></el-input>
                </el-form-item>
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="pauseKPI" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { getTypeEmployee } from "@/api/typeEmployee";
import { GetKPIList,CreateKPIList,PauseKPIList } from "@/api/kpiList";
import Cookies from 'js-cookie'
export default {
    name: 'Pause',
    props: ['id'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
        optionsService: [{
        }],
         value: '',
         form: {
           kpiCode: '',
         },
         links: [],
        state: ''
    }  
  },
  
  methods: {
     
    fetchTypeEmployee() {
      this.listLoading = true;
      getTypeEmployee().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false; 
      });
    },
   
     
    closeModal() {
      VoerroModal.hide('pause-KPI');
    },
    pauseKPI(){
      this.form.kpiCode = this.id;
    
      console.log(this.form);
       PauseKPIList(this.form).then(response => {
        if(response.ResCode == 0){
        this.$emit('click-something',this.form.kpiCode);
         VoerroModal.hide('pause-KPI');
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
      this.fetchTypeEmployee();
  },
   mounted() {
     // this.links = this.optionsService();
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


