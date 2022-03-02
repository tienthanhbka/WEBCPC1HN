<template>
  <modal id="new-list-KPI" ref="new-list-KPI"  v-cloak>
    <template slot="title">Tạo danh mục KPI</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                 <el-form-item label="Mã">
                  <el-input v-model="form.KPICode" ></el-input>
                </el-form-item>
               
                <el-form-item label="Nhân viên">
                  <el-select v-model="value" placeholder="Select" @change="ChangeGroup">
                    <el-option
                      v-for="item in options"
                      :key="item.TypeCode"
                      :label="item.TypeEmployee"
                      :value="item.TypeCode">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Nhóm chỉ tiêu">
                  <el-select v-model="kpiGroup" placeholder="Select">
                    <el-option
                      v-for="item in groupKPI"
                      :key="item.IDGroupKPI"
                      :label="item.GroupKPI"
                      :value="item.IDGroupKPI">
                    </el-option>
                  </el-select>
                </el-form-item>
                  
                 <el-form-item label="Chỉ tiêu">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                  v-model="form.description" ></el-input>
                </el-form-item>

                <el-form-item label="Điểm tối đa">
                  <el-input v-model="form.maxScore" ></el-input>
                </el-form-item>
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createKPI" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { getTypeEmployee } from "@/api/typeEmployee";
import { GetKPIList,CreateKPIList,getGroupKPI } from "@/api/kpiList";
import Cookies from 'js-cookie'
export default {
    props: ['id'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
         groupKPI: [{
        }],
        optionsService: [{
        }],
         value: '',
          kpiGroup: '',
         form: {
           KPICode: '',
           description: '',
           employeeType: '',
           maxScore: '',
           GroupKPI: '',
           status: 1,
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
    // fetchGroupKPI() {
    //   var req = {
    //     EmployeeType: Cookies.get('otc')
    //   }
    //   //console.log(req);
    //   this.listLoading = true;
    //   getGroupKPI(req).then(response => {
    //     this.groupKPI = response.Data;
    //     //console.log(this.groupKPI);
    //     this.listLoading = false; 
    //   });
    // },
    ChangeGroup(){
       var req = {
        EmployeeType: this.value
      }
      //console.log(req);
      this.listLoading = true;
      getGroupKPI(req).then(response => {
        this.groupKPI = response.Data;
        //console.log(this.groupKPI);
        this.listLoading = false; 
      });
    },
   
     
    closeModal() {
      VoerroModal.hide('new-list-KPI');
    },
    createKPI(){
      this.form.employeeType = this.value;
      this.form.GroupKPI = this.kpiGroup;
    
      //console.log(this.form);
       CreateKPIList(this.form).then(response => {
        if(response.ResCode == 0){
          this.$emit('click-something',this.form);
         VoerroModal.hide('new-list-KPI');
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
     //this.fetchGroupKPI();
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


