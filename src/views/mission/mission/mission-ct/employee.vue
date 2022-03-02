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
     
    
     <el-button type="success" icon="el-icon-document" @click="tabletoExcel('tbldata','Danh sách đăng ký CT')" class="inline-block">Xuat bao cao</el-button>
    </div>

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
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1)  }} <el-tooltip content="Sửa nhiệm vụ" placement="top"><el-button type="text"> <i class="fas fa-edit"></i></el-button></el-tooltip> </template>
        </el-table-column>
        <el-table-column prop="title" label="Tên nhiệm vụ"></el-table-column>
         <el-table-column prop="note" label="Phương tiện"></el-table-column>
        <!-- <el-table-column prop="typeMission" label="Loại nhiệm vụ"></el-table-column>
        <el-table-column label="Hạn chót">
          <template slot-scope="scope">{{ scope.row.deadline.substring(0,10)}}</template>
        </el-table-column> -->
        <!-- <el-table-column prop="target" label="Mục tiêu"></el-table-column> -->
        <el-table-column label="Tạo lúc" width="150" align="center">
          <template slot-scope="scope">{{ scope.row.time.substring(0,10)}}</template>
        </el-table-column>
         <el-table-column prop="evaluate" label="Số call thực hiện"></el-table-column>
          <el-table-column prop="namePlace" label="Địa bàn"></el-table-column>
          <el-table-column prop="date" label="Lịch trình"></el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status | missionStatusColor"
            >{{ scope.row.status | missionStatusText }}</el-tag>
          </template>
        </el-table-column>
        
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


import { parseTime } from "@/utils/index";
import { GetMissionWork, GetPlaceByIDMission } from "@/api/mission";
import { getStartDate, getEndDate} from '@/api/index'
export default {
  components: {
   
  },
  data() {
    return {
      tableData: [],
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    openModal() {
      
      VoerroModal.show('new-mission-modal');
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

    fetchData() {
      this.loadingTableData = true;
      var req = {
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
       
      };
      GetMissionWork(req).then(res => {
        this.loadingTableData = false;
        for (var i in res.Data) {
          res.Data[i].places = null;
          res.Data[i].isLoading = false;
        }
        this.tableData = res.Data;
        //this.total = res.TotalPage * res.RowspPage;
      });
    }
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


