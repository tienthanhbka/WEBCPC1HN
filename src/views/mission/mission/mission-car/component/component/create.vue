<template>
  <modal id="create-plan-car" ref="create-plan-car"  v-cloak>
    <template slot="title">Tạo kế hoạch sử dụng xe</template>
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top"  label-width="130px" size="mini"> 
                   <el-form-item label="Chọn xe">
                  <el-select required="" v-model="form.IDCar" placeholder="Chọn xe" >
                    <el-option
                      v-for="item in car"
                      :key="item.IDCar"
                      :label="item.NameCar + ' (' + item.IDCar + ')'"
                      :value="item.IDCar">
                    </el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="Chọn tài xế">
                  <el-select v-model="form.IDDriver" placeholder="Chọn mã" >
                    <el-option
                      v-for="item in employeeList"
                      :key="item.idEmployee"
                      :label="item.nameEmployee"
                      :value="item.idEmployee">
                    </el-option>
                  </el-select>
                </el-form-item>

                <div>
                  <el-row>
                    <el-col :span="12">
                <el-form-item required=""  label="Điểm đi">
                <el-select v-model="form.PlaceStart" placeholder="Chọn thành phố" >
                    <el-option
                      v-for="item in place"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                       <el-form-item required=""  label="Điểm đến">
                 <el-select v-model="form.PlaceEnd" placeholder="Chọn thành phố" >
                    <el-option
                      v-for="item in place"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                 
                  </el-col>
                </el-row>
                </div>
                <div>
                  <el-row>
                    <el-col :span="12">
                <el-form-item label="Thời gian khởi hành">
                   <el-date-picker
                    v-model="form.TimeStart"
                    type="datetime"
                    placeholder="Chọn ngày">
                    </el-date-picker>
                </el-form-item>
                </el-col>
                <el-col :span="12">
                    <!-- <el-form-item label="Giờ">
                        <el-time-picker
                            v-model="form.TimeStart"
                            :picker-options="{
                            selectableRange: '05:00 - 23:30'
                            }"
                            placeholder="Chọn giờ">
                        </el-time-picker>
                    </el-form-item> -->
                  </el-col>
                </el-row>

                </div>
                 <el-form-item  label="Ghi chú">
                  <el-input v-model="form.Note" ></el-input>
                </el-form-item>

              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createCar" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { CreateCarPlan,GetCity,AddLstMission } from "@/api/mission";
import { GetDriver,getEmployee } from "@/api/getEmployee";
import Cookies from 'js-cookie'
export default {
    props: ['row','car', 'groups', 'employeeList'],
  data() {  
    return {
        tableData:[],
        code: 0,
        place: '',
        autoKPI: false,
        selectedPlace:[],
        CreateCarPlan: [{
        }],
         value: '',
         options: '',
         actionOK:'',
         form: {
         IDCar:'',
         IDMission:'',
         IDDriver: '',
         Note:'',
          DateStart:'',
         TimeStart:'',
         TimeEnd:'',
         PlaceStart: '',
         PlaceEnd: '',
         CN:''
          
         },
          missionLst: [],
         mission: {
                date: [],
                deadline: "",
                idGroup: "LaiXe",
                note: "Đi công tác địa bàn",
                places: [],
                idEmployee: '',
                nameEmployee: '',
                status: 1,
                target: "Đi công tác địa bàn",
                time: "",
                title: "Đi công tác địa bàn",
                typeMission: "Đi công tác địa bàn",
         }  
    }  
  },
  
  methods: {
   
    closeModal() {
      VoerroModal.hide('create-plan-car');
    },
      fetchCity() {
         
      this.listLoading = true;
      GetCity().then(response => {
        this.place = response.Data;
        //console.log(this.options);
        this.listLoading = false; 
      });
    },
    
    createCar(){
      //alert('ok')
      //this.form.TimeStart.setHours(this.form.TimeStart.getHours() + 7)
      this.form.CN = this.$props.groups
      var thu = this.convertDay(this.form.TimeStart)
      //console.log(thu)
      this.mission.date.push(thu)

        var a = this.form.TimeStart
        //var b= a.setDate(this.form.TimeStart.getDate() + 1) 

        this.mission.deadline = new Date(a).toString("yyyy-M-d")
        this.mission.idEmployee = this.form.IDDriver
        this.mission.title = "Đi " + this.form.PlaceEnd
        this.mission.target = "Theo kế hoạch"
        this.mission.note = "Khởi hành " + new Date(this.form.TimeStart).toString("HH:mm d/M/yyyy") + " - " + this.form.Note
        this.missionLst.push(this.mission)
        this.createMission()
    
    },
     createMission(){
        if(this.missionLst){
        AddLstMission({ mission: this.missionLst }).then(res => {
            if(res.ResCode == 0){
                //console.log(res);
                this.form.IDMission = res.Data[0].idMission
                this.CreatePlanCar()
             }
        });
      }
    },
    convertDay (a) {
      var mydate = new Date(a)
      var current_day = mydate.getDay();
      //console.log(a.getDay())
var day_name = '';

            switch (current_day) {
        case 0:
            day_name = "8";
            break;
        case 1:
            day_name = "2";
            break;
        case 2:
            day_name = "3";
            break;
        case 3:
            day_name = "4";
            break;
        case 4:
            day_name = "5";
            break;
        case 5:
            day_name = "6";
            break;
        case 6:
            day_name = "7";
        }

        return day_name 
  },
    CreatePlanCar(){
           CreateCarPlan(this.form).then(response => {
        if(response.ResCode == 0){
        //console.log(response.ResCode);
        this.$notify({
          title: 'Thành công',
          message: 'Tạo kế hoạch thành công',
          type: 'success',
          position: 'top-left',
        });
        this.missionLst = [];
         this.$emit('click-something', 'OK');
          VoerroModal.hide('create-plan-car');
         this.listLoading = false; 
        }
      });
    },
   

  },
  created() {
     this.fetchCity()
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

 

 .el-form-item--mini .el-form-item__content .el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
  
</style>


