<template>
  <div class="em-mission-container">
    <div>
      <div class="inline-block">
        <el-select v-model="currentGroup" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupsLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <span>đến</span>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      <el-button type="warning" @click="create" class="inline-block"
        >Tạo kế hoạch xe</el-button
      >
      <el-button
        type="success"
        icon="el-icon-document"
        @click="tabletoExcel('tbldata', 'Danh sách đăng ký CT')"
        class="inline-block"
        >Xuat bao cao</el-button
      >
    </div>
    <createPlan
      :groups="this.currentGroup"
      :employeeList="this.employeeList"
      :car="this.options"
      @click-something="addOK"
    ></createPlan>
    <deletePlan :row="this.rowSelect" @click-something="deleteOK"></deletePlan>
    <div>
      <el-table
        :data="tableData"
        id="tbldata"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="70" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="openModalDelete(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Thứ - Ngày">
          <template slot-scope="scope">{{
            scope.row.TimeStart | convertDay
          }}</template>
        </el-table-column>
        <el-table-column label="Xe">
          <template slot-scope="scope">{{ scope.row.NameCar }}</template>
        </el-table-column>
        <el-table-column label="Biển số">
          <template slot-scope="scope">{{ scope.row.IDCar }}</template>
        </el-table-column>
        <el-table-column label="Lái xe" width="150">
          <template slot-scope="scope">{{ scope.row.NameDriver }}</template>
        </el-table-column>
        <el-table-column label="Điểm đi">
          <template slot-scope="scope">{{ scope.row.PlaceStart }}</template>
        </el-table-column>
        <el-table-column label="Khởi hành">
          <template slot-scope="scope">{{ scope.row.TimeStart }}</template>
        </el-table-column>
        <el-table-column label="Điểm đến">
          <template slot-scope="scope">{{ scope.row.PlaceEnd }}</template>
        </el-table-column>

        <el-table-column label="Nhân viên">
          <template slot-scope="scope">{{ scope.row.ListEm }}</template>
        </el-table-column>
        <el-table-column label="Ghi chú">
          <template slot-scope="scope">{{ scope.row.Note }}</template>
        </el-table-column>
        <!-- <el-table-column label="Trạng thái" >
          <template slot-scope="scope">{{ scope.row.Note}}</template>
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
import CreatePlan from "@/views/mission/mission/mission-car/component/component/create";
import DeletePlan from "@/views/mission/mission/mission-car/component/component/delete";
//import { parseTime } from "@/utils/index";
import { GetCarPlan, GetPlaceByIDMission, GetCar } from "@/api/mission";
import { GetListGroupAdminByToken } from "@/api/groups";
import { GetDriver } from "@/api/getEmployee";
import { getStartWeek, getEndWeek } from "@/api/index";
export default {
  components: {
    CreatePlan,
    DeletePlan
  },
  data() {
    return {
      currentMission: null,
      currentGroup: "",
      rowSelect: "",
      employeeList: "",
      options: "",
      groupsLst: [
        { idGroup: "CNHN" },
        { idGroup: "CNDN" },
        { idGroup: "CNHCM" },
        { idGroup: "CNHBP" }
      ],
      tableData: [],
      TextSearch: "",
      DateBegin: "",
      DateEnd: "",
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  filters: {
    convertDay: function(a) {
      var mydate = new Date(a);
      var current_day = mydate.getDay();
      //console.log(a.getDay())
      var day_name = "";

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

      return day_name + " " + new Date(a).toString("d/M/yyyy");
    }
  },
  methods: {
    openModalPlace() {},
    addOK() {
      this.fetchData();
    },
    deleteOK() {
      this.fetchData();
    },
    create(row) {
      this.rowSelect = row;
      VoerroModal.show("create-plan-car");
    },
    openModalDelete(row) {
      this.rowSelect = row;
      VoerroModal.show("delete-CarPlan");
    },

    onMissionAdded(missionLst) {
      missionLst.forEach(e => {
        this.tableData.unshift(e);
      });
      //this.tableData.concat(missionLst);
      //console.log('aaaaaaaa');
    },
    fetchCar() {
      //this.listLoading = true;
      var req = {
        IdGroup: this.currentGroup
      };
      GetCar(req).then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },

    fetchDriver() {
      var rep = {
        idGroup: this.currentGroup
      };
      this.listLoading = true;
      GetDriver().then(response => {
        this.employeeList = response.Data;
        console.log(this.employeeList);
        this.listLoading = false;
      });
    },
    editMission(mission) {
      this.currentMission = mission;
      VoerroModal.show("new-mission-modal");
    },
    openModal() {
      VoerroModal.show("new-mission-em-modal");
    },
    tabletoExcel(table, name) {
      var uri = "data:application/vnd.ms-excel;base64,",
        template =
          '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
        base64 = function(s) {
          return window.btoa(unescape(encodeURIComponent(s)));
        },
        format = function(s, c) {
          return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
          });
        };
      if (!table.nodeType) table = document.getElementById(table);
      var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
      window.location.href = uri + base64(format(template, ctx));
    },

    fetchData() {
      if (this.currentGroup != "") {
        this.loadingTableData = true;
        var req = {
          CN: this.currentGroup,
          DateStart: this.DateBegin,
          DateEnd: this.DateEnd + " 23:59:50"
        };
        GetCarPlan(req).then(res => {
          this.loadingTableData = false;
          this.tableData = res.Data;
          // this.total = res.TotalPage * res.RowspPage;
        });
      }
    }
  },
  watch: {
    pageSize: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    DateBegin: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    DateEnd: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    currentPage: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    currentGroup: function() {
      if (this.currentGroup != "") {
        this.fetchData();
        this.fetchCar();
        this.fetchDriver();
      }
    }
  },
  created() {
    this.currentGroup = this.groupsLst[0].idGroup;
    var frt = Date.today().set({ day: 1 });
    this.DateBegin = getStartWeek();
    this.DateEnd = getEndWeek();
    // GetListGroupAdminByToken().then(res=>{
    //   this.groupsLst = res.Data;
    //   this.currentGroup=this.groupsLst[0].idGroup;
    // });
  }
};
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
