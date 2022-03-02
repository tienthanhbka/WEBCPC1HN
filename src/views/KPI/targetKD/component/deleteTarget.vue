<template>
  <modal id="delete-target-KPI" ref="delete-target-KPI"  v-cloak>
    <template slot="title">Xóa tiêu chí</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                
                <!-- <el-form-item label="KPI Code">
                  <el-select v-model="row.KPICode" disabled=true placeholder="Chọn mã KPI">
                    <el-option
                      
                      v-for="item in listKPICode"
                      :key="item.KPICode"
                      :label="item.description"
                      :value="item.KPICode">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                 <div>
               <div style="width=100px;float: left;" class="inline-block" >
                  <el-form-item label="Điểm KPI">
                  <el-input v-model="row.target" type="number" ></el-input>
                </el-form-item>
                 
               </div>
               <div style="width=100px;float: left;" class="inline-block" >
                
                  <el-form-item label="Giá trị">
                  <el-input v-model="row.amount" ></el-input>
                </el-form-item>
               </div>
                <div style="width=100px;float: left;" class="inline-block" >
                
                  <el-form-item label="Đơn vị">
                  <el-input v-model="row.unit" ></el-input>
                </el-form-item>
               </div>
               <div style="clear: both;"></div>
               </div>
                 
              
                 <el-form-item label="Tháng">
                  <el-date-picker
          
                    v-model="row.month"
                    type="month"
                    placeholder="Pick a month">
                  </el-date-picker>
                </el-form-item>
          
                 <el-form-item label="Ghi chú">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                  v-model="row.note" ></el-input>
                </el-form-item>
                 <el-form-item label="Quản lý duyệt">
                  <el-select v-model="row.idGroupBase" placeholder="Chọn nhóm">
                    <el-option
                      v-for="item in groupList"
                      :key="item.idGroup"
                      :label="item.idGroup"
                      :value="item.idGroup">
                    </el-option>
                  </el-select>
                </el-form-item>
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteTarget" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { getEmployee } from "@/api/getEmployee";
import { GetKPIList,DeleteTarget } from "@/api/kpiList";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'groupList'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         listKPICode: [{
        }],
        listEmployee: [{
        }],
         value: '',
         form: {
         
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
        this.row.idEmployee = item.idEmployee;
        //console.log(item);
      },
      handleIconClick(ev) {
        //console.log(ev);
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
        EmployeeType: Cookies.get('otc'),
        idGroup: Cookies.get('admin')
      }
      GetKPIList(req).then(response => {
        this.listKPICode = response.Data;
        //console.log(this.listKPICode);
        this.listLoading = false; 
      });
    },
   
     
    closeModal() {
      VoerroModal.hide('delete-target-KPI');
    },
    deleteTarget(){
      this.form = this.$props.row;
       //this.form.month.setDate(this.form.month.getDate() + 1);
       //= addDays(this.form.month,1);
    
      //console.log(this.form);
       DeleteTarget(this.form).then(response => {
        if(response.ResCode == 0){
          this.$emit('click-something',this.form);
         VoerroModal.hide('delete-target-KPI');
         this.$notify({
          title: 'Thành công',
          message: 'Xóa tiêu chí thành công',
          type: 'success',
          position: 'top-left'
        });
         //alert('Thêm thành công');
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
 .el-autocomplete{
   width: 500px;
 }
  
</style>


