<template>
  <modal id="add-car" ref="add-car"  v-cloak>
    <template slot="title">Xếp nhân viên vào xe</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-position="top" label-width="120px" size="mini"> 
                <el-form-item label="Chọn xe">
                  <el-select v-model="value" placeholder="Chọn xe" >
                    <el-option
                      v-for="item in car"
                      :key="item.RowID"
                      :label="convertDay(item.TimeStart) + ' xe ' + item.NameCar + ' Tài xế: ' + item.NameDriver + ' từ ' + item.PlaceStart + ' đi ' + item.PlaceEnd  "
                      :value="item.RowID">
                    </el-option>
                  </el-select>
                </el-form-item>
                
              </el-form>
             
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="addCar" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { AddCarMission,GetCar } from "@/api/mission";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'groups', 'car'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
        fileList: [],
        optionsService: [{
        }],
         value: '',
         form: {
           RowIDCarPlan: '',
           idEmployee: '',
           idMission: '',
          //  token: Cookies.get('token')
         },
         links: [],
        state: '',
        IDService: '',
    }  
  },
  filters:{
    convertDay: function (a) {
      var mydate = new Date(a)
      var current_day = mydate.getDay();
      //console.log(a.getDay())
var day_name = '';

            switch (current_day) {
        case 0:
            day_name = "Chủ nhật";
            break;
        case 1:
            day_name = "Thứ hai";
            break;
        case 2:
            day_name = "Thứ ba";
            break;
        case 3:
            day_name = "Thứ tư";
            break;
        case 4:
            day_name = "Thứ năm";
            break;
        case 5:
            day_name = "Thứ sáu";
            break;
        case 6:
            day_name = "Thứ bảy";
        }

        return day_name + " " + new Date(a).toString("d/M/yyyy")  
  }
  },
  
  methods: {
    
      convertDay(a) {
      var mydate = new Date(a)
      var current_day = mydate.getDay();
      //console.log(a.getDay())
var day_name = '';

            switch (current_day) {
        case 0:
            day_name = "Chủ nhật";
            break;
        case 1:
            day_name = "Thứ hai";
            break;
        case 2:
            day_name = "Thứ ba";
            break;
        case 3:
            day_name = "Thứ tư";
            break;
        case 4:
            day_name = "Thứ năm";
            break;
        case 5:
            day_name = "Thứ sáu";
            break;
        case 6:
            day_name = "Thứ bảy";
        }

        return day_name + " " + new Date(a).toString("d/M/yyyy")  
  },
    // fetchOffice() {
    //   //this.listLoading = true;
    //   GetCar(this.$props.groups).then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false; 
    //   });
    // },
   
     
    closeModal() {
      VoerroModal.hide('new-order-send-modal');
    },
    addCar(){
    //console.log(this.$props.row);
    this.form.RowIDCarPlan = this.value;
    this.form.idMission = this.$props.row.idMission;
    this.form.idEmployee = this.$props.row.idEmployee;


           AddCarMission(this.form).then(response => {
        if(response.ResCode == 0){
         this.$notify({
          title: 'Thành công',
          message: 'Xếp xe thành công thành công',
          type: 'success',
          position: 'top-left'
        });
        this.$emit('click-something', this.form)
         VoerroModal.hide('add-car');
        this.listLoading = false; 
        }
      }); 
   
    }
  },
  created() {
     // this.fetchOffice();
  },
  
};
</script>

<style>

 .my-autocomplete{
   width: 500px;
 }

 .el-form-item--mini .el-form-item__content .el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
 

  
</style>


