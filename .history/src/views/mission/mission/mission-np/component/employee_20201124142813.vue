<template>
  <div class="my-mission-container">
    <div>
      <div class="inline-block">
        <span></span>
        <el-date-picker style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <span>đến</span>
        <el-date-picker style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
     
    
     <el-button type="success" icon="el-icon-document" @click="createMission" class="inline-block">Tạo phiếu nghỉ</el-button>

      <div class="inline-block">
        <span>Số phép đã nghỉ {{NumberNP[0]}}/{{NumberNP[1]}}</span>
        
      </div>
    </div>

  <create :typeList="typeList" @click-something="createOK"></create>
   <edit :typeList="typeList" :row="rowSelect" @click-something="editOK"></edit>
     <upload :typeList="typeList" :row="rowSelect" @click-something="uploadOK"></upload>
    <delete :typeList="typeList" :row="rowSelect" @click-something="deleteOK"></delete>
    <div>
      <el-table
        :data="tableData"
        id="tbldata"
      
        v-loading="loadingTableData"
        border=""
        show-header
      >
      <!-- <el-table-column type="expand">
          <template slot-scope="props">
            <placeTable :tableData="props.row.places" :mission="props.row"></placeTable>
          </template>
        </el-table-column> -->
        <el-table-column align="center" width="160px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1)  }} 
            <el-tooltip content="Upload ảnh" placement="top"><el-button @click="Upload(scope.row)" type="text"> <i class="fas fa-file-upload"></i></el-button></el-tooltip> 
            <el-tooltip content="Sửa" placement="top"><el-button @click="Edit(scope.row)" type="text"> <i class="fas fa-edit"></i></el-button></el-tooltip> 
             <el-tooltip content="Xóa" placement="top"><el-button @click="Delete(scope.row)" type="text"> <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> 
          </template>
          
        </el-table-column>
        <el-table-column prop="Type" label="Loại"></el-table-column>
         <el-table-column prop="Reason" label="Lý do"></el-table-column>
        <!-- <el-table-column prop="typeMission" label="Loại nhiệm vụ"></el-table-column>
        <el-table-column label="Hạn chót">
          <template slot-scope="scope">{{ scope.row.deadline.substring(0,10)}}</template>
        </el-table-column> -->
        <!-- <el-table-column prop="target" label="Mục tiêu"></el-table-column> -->
        <el-table-column label="Tạo lúc" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.TimeCreate.substring(0,10)}}</template>
        </el-table-column>
         <el-table-column prop="TimeStart" label="Bắt đầu"></el-table-column>
          <el-table-column prop="TimeEnd" label="Kết thúc"></el-table-column>
          <el-table-column prop="Note" label="Ghi chú"></el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.Status | missionStatusColor"
            >{{ scope.row.Status | missionStatusText }}</el-tag>
          </template>
        </el-table-column>
        
      </el-table>

          <el-dialog title="Chọn lịch nghỉ" :visible.sync="dialogVisibleDatePick">
                  <pickDate
                    :listDate="listDate"
                  ></pickDate>
                </el-dialog>

      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>


import { parseTime } from "@/utils/index";
import  Create  from "@/views/mission/mission/mission-np/component/component/create";
import  PickDate from "@/views/mission/mission/mission-np/component/component/pickDate";
import  Edit  from "@/views/mission/mission/mission-np/component/component/edit";
import  Delete  from "@/views/mission/mission/mission-np/component/component/delete";
import  Upload  from "@/views/mission/mission/mission-np/component/component/upload";
import { GetMissionVacation,GetTypeMissionVacation,GetNumberMissionNP } from "@/api/mission";
import { getStartDate, getEndDate} from '@/api/index'
import Cookies from 'js-cookie'
export default {
  components: {
   Create,Edit,Delete,Upload,PickDate
  },
  data() {
    return {
          dialogVisibleDatePick: false,
        listDate:[],
      tableData: [],
      rowSelect: '',
      NumberNP:[],
      TextSearch: "",
      typeList: [],
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    createMission() {
      this.fetchType()
      VoerroModal.show('create-mission-vacation');
    },

    // handleExpandChange(row) {
    //   if (row.places == null) {
    //     var IDMission = row.idMission;
    //     row.isLoading = true;
    //     GetPlaceByIDMission({ IDMission: IDMission }).then(res => {
    //       row.isLoading = false;
    //       row.places = res.Data;
    //     });
    //   }
    // },
    
      tabletoExcel(table, name) {
    var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        window.location.href = uri + base64(format(template, ctx));

      },
      createOK(form){
        //this.fetchData()
         VoerroModal.hide('create-mission-vacation');

          var dt1 = new Date(form.TimeStart)
        var dt2 = new Date(form.TimeEnd)

        var day =  Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));

         for (var i = 0; i <= day; i++ ){
             let Day = new Date(
                  form.TimeStart.getFullYear(),
                  form.TimeStart.getMonth(),
                  form.TimeStart.getDate() + i
              )
              let day_convert = Date.parse(Day).toString('dd-MM-yyyy')
              this.listDate.push({day :day_convert, half: '0'})
         }
       console.log(this.listDate)

      // var a = parseInt((this.form.TimeEnd.getSeconds()- this.form.TimeStart.getSeconds())/(24*3600*1000))

       this.dialogVisibleDatePick = true

      },
       editOK(){
        this.fetchData()
      },
       deleteOK(){
        this.fetchData()
      },
      Delete(row){
         this.rowSelect = row
          VoerroModal.show('delete-mission-vacation');
      },
      Edit(row){
         this.fetchType()
        this.rowSelect = row
        VoerroModal.show('edit-mission-vacation');
      },
       Upload(row){
         this.fetchType()
        this.rowSelect = row
        VoerroModal.show('upload-mission-vacation');
      },



    fetchData() {
      this.loadingTableData = true;
      var req = {
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
       
      };
      GetMissionVacation(req).then(res => {
        this.loadingTableData = false;
         //console.log('ok');
        this.tableData = res.Data;
        //this.total = res.TotalPage * res.RowspPage;
      });
    },
     fetchType() {
      //alert('ok')
      //this.loadingTableData = true;
      var req = {
         token: Cookies.get('token')
      }; 
      GetTypeMissionVacation(req).then(response => {
        this.typeList = response.Data;
        //console.log('ok');
        //this.loadingTableData = false; 
      });
    },
  },
  watch: {
   
    DateBegin: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    },
   
  },
  created() {
  
    this.DateBegin = getStartDate();
    this.DateEnd = getEndDate() ;
    GetNumberMissionNP().then(res=>{
      this.NumberNP = res.Data
    })
      //this.fetchData();
  }
}
</script>


<style lang="css" scoped>
.my-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}
</style>


