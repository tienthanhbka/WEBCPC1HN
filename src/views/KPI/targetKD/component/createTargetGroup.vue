<template size="mini">
  <modal  id="new-target-KPI-group" ref="new-target-KPI-group"  v-cloak>
    <template slot="title">Tạo tiêu chí</template>
    <div></div>
    <div slot="body" >
      <el-form ref="form"  label-width="120px" size="mini"> 
        <div class="chi-tieu">
                   <el-form-item label="Quản lý duyệt">
                  <el-select v-model="groupBase" placeholder="Chọn nhóm">
                    <el-option
                      v-for="item in groupList"
                      :key="item.idGroup"
                      :label="item.idGroup"
                      :value="item.idGroup">
                    </el-option>
                  </el-select>
                </el-form-item>
             </div> 

               
                <div>
                  <div style="float: left;" class="chi-tieu" >
                   <el-form-item label="Chỉ tiêu">
                  <el-select v-model="form.KPICode" placeholder="Chọn chỉ tiêu">
                    <el-option
                      v-for="item in listKPICode"
                      :key="item.IDService"
                      :label="item.Service"
                      :value="item.IDService">
                    </el-option>
                  </el-select>
                </el-form-item>
                 
               </div>
               <div style="float: left; " class="month" >
                   <el-form-item label="Tháng"  >
                  <el-date-picker 
                    v-model="form.month"
                    type="month"
                    placeholder="Pick a month">
                  </el-date-picker>
                </el-form-item>
                 
               </div>
              
               <!-- <div style="width=100px;float: left;" class="inline-block" >
                
                
               </div>
                <div style="width=100px;float: left;" class="inline-block" >
                
                 
               </div> -->
               <div style="clear: both;"></div>
               </div>
                 <div class="detail">
                 <el-form-item label="Mô tả chỉ tiêu">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                  v-model="form.note" ></el-input>
                </el-form-item>
                </div>

               <div>
                  <div style="float: left;" class="chi-tieu" >
                  <el-form-item label="Điểm KPI">
                  <el-input v-model="form.target" type="number" ></el-input>
                </el-form-item>
                 
               </div>

                 <div style="float: left;" class="month" >
                  <el-form-item label="KPI tối đa">
                  <el-input v-model="form.KPImax" type="number" ></el-input>
                </el-form-item>
                 
               </div>
                <div style="clear: both;"></div>
               </div>
             
               <div>
                <div style="float: left;" class="chi-tieu" >
                 <el-form-item label="Khối lượng">
                  <el-input v-model="form.amount" ></el-input>
                </el-form-item>
                </div>
                <div style="float: left;" class="month" >
                 <el-form-item label="Đơn vị">
                  <el-input v-model="form.unit" ></el-input>
                </el-form-item>
                </div>
                <div style="clear: both;"></div>
                </div>

                   <el-form-item style="clear: both" label="Nhân viên">
                  <el-select  v-model="value" placeholder="Select">
                    <el-option
                      v-for="item in employee"
                      :key="item.idEmployee"
                      :label="item.nameEmployee"
                      :value="item.idEmployee">
                    </el-option>
                  </el-select>
                </el-form-item>
          
               

             

              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createTarget" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { getEmployee } from "@/api/getEmployee";
import { GetKPIList,CreateTarget,GetKPIListByGroupEmployee } from "@/api/kpiList";
import Cookies from 'js-cookie'
import { GetGroupEmployee } from "@/api/groups";
export default {
    props: ['id', 'groupList', 'employee'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         listKPICode: [{
        }],
        groups: '',

        groupBase: '',
        listEmployee: [{
        }],
         value: '',
         form: {
          KPICode: '',
          amount: '',
          idGroupBase: '',
          idEmployee: '',
          idCreater: '',
          month: '',
          target: '',
          KPImax: '',
          note: '',
          unit: '',
          status: '',
         },
         links: [],
        state: ''
    }  
  },
  
  methods: {
    querySearch(queryString, cb) {
        var links = this.listEmployee;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [this.listEmployee];
      },
      handleSelect(item) {
        this.state = item.idEmployee;
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
     
    fetchEmployee() {
      var req = {
        idEmployee: Cookies.get('idEmployee'),
        idGroup: Cookies.get('admin')
      }
      console.log(req);
      this.listLoading = true;
      getEmployee(req).then(response => {
        this.listEmployee = response.Data;
        console.log(this.listEmployee);
        this.listLoading = false; 
      });
    },

    fetchKPICode() {
      this.listLoading = true;
     
       var req = {
        admin: this.groupBase,
      }
      
       //alert(req.idEmployee);
      GetKPIListByGroupEmployee(req).then(response => {
        // alert(req.idEmployee);
        this.listKPICode = response.Data;
        console.log(this.listKPICode);
        this.listLoading = false; 
      });
    },
   
     
    closeModal() {
      VoerroModal.hide('new-target-KPI-group');
    },
    createTarget(){
       this.form.month.setDate(this.form.month.getDate() + 1);
       //= addDays(this.form.month,1);
       this.form.idEmployee = this.value;
        this.form.idGroupBase = this.groupBase;
      console.log(this.form);
       CreateTarget(this.form).then(response => {
        if(response.ResCode == 0){
          this.$emit('click-something',this.form);
         //VoerroModal.hide('new-target-KPI-group');
         this.$notify({
          title: 'Thành công',
          message: 'Thêm tiêu chí thành công',
          type: 'success',
          position: 'top-left'
        });
         VoerroModal.hide('new-target-KPI-group');
        
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
      this.fetchEmployee();
      this.fetchKPICode();
  },
     mounted() {
      this.links = this.listEmployee();
    },

  watch: {
    state:function(){
      this.fetchKPICode();
    },
    groupBase:function(){
      this.fetchKPICode();
    }
  },
};
</script>

<style>

 .my-autocomplete{
   width: 500px;
 }
 .el-autocomplete{
   width: 500px;
 }
 .month .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 120px;
}

.kpi .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 80px;
}
.chi-tieu .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 200px;
}

.detail .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 480px;
}


.modal-box {
    /* min-width: 75%; */
    /* width: 80%; */
    max-width: 70%;
}
  
</style>


