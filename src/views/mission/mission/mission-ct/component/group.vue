<template>
  <div class="em-mission-container">
  
    <div>
      <div class="inline-block">
        <el-select v-model="currentGroup" placeholder="Chọn nhóm">
    <el-option
      v-for="item in groupsLst"
      :key="item.idGroup"
      :label="item.idGroup"
      :value="item.idGroup">
    </el-option>
  </el-select>
        <el-date-picker style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      
        <span>đến</span>
        <el-date-picker style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      
      <div class="inline-block">
        <el-input placeholder="Search" v-model="TextSearch" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="fetchData()"></el-button>
        </el-input>
      </div>
      <el-button type="primary" icon="el-icon-refresh" class="inline-block" @click="fetchData"></el-button>
      <el-button type="success" icon="el-icon-document" @click="tabletoExcel('tbldata','Danh sách đăng ký CT')" class="inline-block">Xuat bao cao</el-button>
    </div>
    <addCar :groups="this.currentGroup" :row ="this.rowSelect" :car="this.options"></addCar>
    <div>
      <el-table
        
        :data="tableData"
        id="tbldata"
        :default-sort = "{prop: 'day', order: 'descending'}"
        v-loading="loadingTableData"
        border=""
        show-header
      >
     
        <el-table-column align="center" width="70" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1) + (currentPage - 1)*pageSize }}
             <el-tooltip content="Xếp xe" placement="top"><el-button type="text" @click="addCar(scope.row)"> <i class="fas fa-car-side"></i></el-button></el-tooltip>  </template>
        </el-table-column>
        
        <el-table-column  prop="date"  label="Thứ"></el-table-column>
          <el-table-column sortable prop="day" width="100" label="Ngày"></el-table-column>
         <el-table-column label="Loại NV" width="100">
          <template slot-scope="scope">{{ scope.row.otc | convertETC}}</template>
        </el-table-column>
         <el-table-column label="Nhóm" width="150">
          <template slot-scope="scope">{{ scope.row.idGroup}}</template>
        </el-table-column>
         <el-table-column label="Nhân viên" width="150">
          <template slot-scope="scope">{{ scope.row.nameEmployee}}</template>
        </el-table-column>
        <el-table-column prop="title" width="100" label="Tên nhiệm vụ"></el-table-column>
          <el-table-column prop="note" label="Phương tiện"></el-table-column>
          <el-table-column prop="evaluate" width="100" label="Số call thực hiện"></el-table-column>
          <el-table-column prop="namePlace" label="Địa bàn"></el-table-column>
        
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <el-tag 
              :type="scope.row.status | missionStatusColor"
            >{{ scope.row.status | missionStatusText }}</el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Thứ thực hiện" width="140" align="center">
          <template slot-scope="scope">
            <el-tag 
              
            >{{ scope.row.date?scope.row.date.replace('8','CN'):'' }}</el-tag>
          </template>
        </el-table-column> -->
      </el-table>

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
import  AddCar  from "@/views/mission/mission/mission-ct/component/addCar";
import { parseTime } from "@/utils/index";
import { GetMissionWorkGroup, GetPlaceByIDMission,GetCarPlan,GetCar } from "@/api/mission";
import {GetListGroupAdminByToken} from "@/api/groups";
import { getStartWeek, getEndWeek} from '@/api/index'
export default {
  components: {
   AddCar
  },
  data() {
    return {
      currentMission:null,
      currentGroup:'',
      rowSelect:'',
      options:'',
      groupsLst:[{idGroup: 'CNHN'},{idGroup: 'CNDN'},{idGroup: 'CNHCM'},{idGroup: 'CNHBP'}],
      tableData: [],
      TextSearch: "",
      DateBegin: '',
      DateEnd: '',
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  filters: {
  convertETC: function (a) {
    if(a==1){
        return 'OTC'
      }
      else if(a==14){
        return 'Tài xế'
      }
      else{
        return 'ETC'
      }
  },
  
},
  methods: {
    openModalPlace(){

    },
    addCar(row){
      this.rowSelect = row;
       VoerroModal.show("add-car");
    },
   
    onMissionAdded(missionLst){
  
      missionLst.forEach(e => {
        
        this.tableData.unshift(e)
      });
    
      
    },
     fetchOffice() {
      //this.listLoading = true;
       var req = {
         CN:this.currentGroup,
        DateStart: this.DateBegin,
        DateEnd: this.DateEnd+' 23:59:50',
       
    
      };
      GetCarPlan(req).then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false; 
      });
    },
    editMission(mission){
      this.currentMission = mission;
      VoerroModal.show('new-mission-modal');
    },
    openModal() {
      VoerroModal.show("new-mission-em-modal");
    },
     tabletoExcel(table, name) {
    var uri = 'data:application/vnd.ms-excel;base64,'
          , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
          , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
          , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
        if (!table.nodeType) table = document.getElementById(table);
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
        window.location.href = uri + base64(format(template, ctx));

},
    // handleExpandChange(row) {
    //   if (row.places == null) {
    //     var IDMission = row.idMission;
    //     row.isLoading = true;
    //     GetPlaceByIDMission({ IDMission: IDMission }).then(res => {
          
    //       row.isLoading = false;
    //       row.places = res.Data;
    //     }).finally(function () {
    //         row.isLoading = false;
    //     });
    //   }
    // },
    fetchData() {
      if(this.currentGroup!=''){
      this.loadingTableData = true;
      var req = {
        IdGroup:this.currentGroup,
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd+' 23:59:50',
        Key: this.TextSearch
    
      };
      GetMissionWorkGroup(req).then(res => {
        this.loadingTableData = false;
      
        //this.tableData = res.Data;
        var arr=[]
        //var fruits = ["apple", "orange", "cherry"];
        res.Data.forEach(myFunction);

        function myFunction(item, index) {
         
          if(item.date != '' && item.date.indexOf(':')){
            var splitted = item.date.split(":", 7);
              //console.log(splitted)
            splitted.forEach(myfun);
            function myfun(item2,index2) {
            
               var obj = {
              addrLv1: "",
              date: "",
              evaluate: "",
              idEmployee: "",
              idGroup: "",
              idMission: "",
              nameEmployee: "",
              namePlace: "",
              note: "",
              otc: "",
              status: "",
              time: "",
              title: "",
              day:""
          }
            obj.addrLv1 = item.addrLv1
            obj.evaluate = item.evaluate
            obj.idEmployee = item.idEmployee
            obj.nameEmployee=item.nameEmployee
            obj.note= item.note
            obj.idGroup = item.idGroup
            obj.idMission = item.idMission
            obj.namePlace = item.namePlace
            obj.otc= item.otc
            obj.status=item.status
            obj.time=item.time
            obj.title=item.title
            obj.date = "Thứ "+ item2

            var splitted2 = item.day.split("&&", 7);
            splitted2.forEach(myfun2);
            function myfun2(itemDay,indexDay) {
              if(index2 == indexDay){
                obj.day=itemDay
              }
            }
              arr.push(obj)
            }
          }
          else{

             var obj = {
              addrLv1: "",
              date: "",
              evaluate: "",
              idEmployee: "",
              idGroup: "",
              idMission: "",
              nameEmployee: "",
              namePlace: "",
              note: "",
              otc: "",
              status: "",
              time: "",
              title: "",
              day:""
          }
            obj.addrLv1 = item.addrLv1
            obj.evaluate = item.evaluate
            obj.idEmployee = item.idEmployee
            obj.nameEmployee=item.nameEmployee
            obj.note= item.note
            obj.idGroup = item.idGroup
            obj.idMission = item.idMission
            obj.namePlace = item.namePlace
            obj.otc= item.otc
            obj.status=item.status
            obj.time=item.time
            obj.title=item.title
            obj.day=item.day
            obj.date=item.date
            arr.push(obj)
            //this.tableData.push(obj)
          }

        }
        this.tableData = arr

        //console.log(this.tableData)
       // this.total = res.TotalPage * res.RowspPage;
      });
      }
      
    }
  },
  watch: {
    pageSize: function() {
      if(this.currentGroup!=''){
        this.fetchData();
      }
      
    },
    DateBegin: function() {
      if(this.currentGroup!=''){
        this.fetchData();
      }
    },
    DateEnd: function() {
      if(this.currentGroup!=''){
        this.fetchData();
      }
    },
    currentPage: function() {
      if(this.currentGroup!=''){
        this.fetchData();
      }
    },
    currentGroup: function() {
      if(this.currentGroup!=''){
        this.fetchData();
        this.fetchOffice();
      }
    }
  },
  created() {
    var frt = Date.today().set({ day: 1 });
    this.DateBegin = getStartWeek();
    this.DateEnd = getEndWeek();
    // GetListGroupAdminByToken().then(res=>{
    //   this.groupsLst = res.Data;
    //   this.currentGroup=this.groupsLst[0].idGroup;
    // });
    
  }
}
</script>


<style lang="css" scoped>
.em-mission-container {
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


