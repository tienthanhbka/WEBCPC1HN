<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-select
        size="small"
        v-model="groups"
        clearable
        placeholder="Chọn chi nhánh"
      >
        <el-option
          v-for="item in groupList"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-input
        size="small"
        style="width: 150px; "
        class="search"
        v-on:keyup.enter="Search"
        placeholder="Tìm kiếm theo tên"
        v-model="search"
      ></el-input>
    </div>
    <div class="inline-block">
      <el-button size="small" class="bt-search" type="infor" @click="fetchData">
        <i class="fas fa-search"></i
      ></el-button>
    </div>
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          size="small"
          placeholder="Ngày bắt đầu"
          v-model="DateStart"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <span>đến</span>
        <el-date-picker
          size="small"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          size="small"
          type="success"
          :loading="downloading"
          icon="el-icon-document"
          @click="exportExcel"
          class="inline-block"
          >Xuất Excel</el-button
        >
      </div>
    </div>

    <div>
      <el-table
        :data="tableData"
        size="small"
        id="tblData"
        @filter-change="filterStatus"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="50px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column
          prop="EmployeeName"
          label="Nhân viên"
        ></el-table-column>
        <el-table-column prop="IDGroup" label="Nhóm"></el-table-column>
        <el-table-column
          prop="Type"
          label="Loại"
          :filters="[
            { text: 'Nghỉ không lương', value: 'Nghỉ không lương' },
            { text: 'Nghỉ làm bù', value: 'Nghỉ làm bù' },
            { text: 'Làm bù', value: 'Làm bù' },
            { text: 'Nghỉ phép có lương', value: 'Nghỉ phép có lương' },
            { text: 'Nghỉ phép', value: 'Nghỉ phép' },
            {
              text: 'Nghỉ việc riêng có hưởng lương',
              value: 'Nghỉ việc riêng có hưởng lương'
            },
            {
              text: 'Nghỉ ốm/ con ốm theo chế độ BHXH',
              value: 'Nghỉ ốm/ con ốm theo chế độ BHXH'
            },
            { text: 'Nghỉ thai sản', value: 'Nghỉ thai sản' },
            { text: 'Nghỉ việc', value: 'Nghỉ việc' }
          ]"
        ></el-table-column>
        <el-table-column prop="Reason" label="Lý do"></el-table-column>
        <el-table-column label="Tạo lúc" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tạo lúc">
              {{ Date.parse(scope.row.TimeCreate).toString("dd-MM-yyyy") }}
            </div></template
          >
        </el-table-column>
        <el-table-column prop="TimeStart" label="Bắt đầu" align="center">
          <template slot-scope="scope" v-if="scope.row.TimeStart">
            <div class="dat-cell" label="Bắt đầu">
              {{ Date.parse(scope.row.TimeStart).toString("dd-MM-yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="TimeEnd" label="Kết thúc" align="center">
          <template slot-scope="scope" v-if="scope.row.TimeEnd">
            <div class="dat-cell" label="Kết thúc">
              {{ Date.parse(scope.row.TimeEnd).toString("dd-MM-yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Note" label="Ghi chú"></el-table-column>
        <el-table-column prop="TimeAccept" label="Duyệt" align="center">
          <template slot-scope="scope" v-if="scope.row.TimeAccept">
            <div class="dat-cell" label="Duyệt">
              {{ Date.parse(scope.row.TimeAccept).toString("dd-MM-yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="NameManager"
          label="Người duyệt"
        ></el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.Status | missionVacationStatusColor">{{
              scope.row.Status | missionVacationStatusText
            }}</el-tag>
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
import { GetBranchMissionVacation } from "@/api/missionVacation";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  components: {},
  data() {
    return {
      tableData: [],
      rowSelect: "",
      search: "",
      groups: "",
      groupList: [
        { idGroup: "CNHN" },
        { idGroup: "CNDN" },
        { idGroup: "CNHCM" },
        { idGroup: "CNHBP" }
      ],
      TextSearch: "",
      typeList: [],
      DateStart: getStartDate(),
      DateEnd: getEndDate(),
      loadingTableData: false,
      downloading: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    filterStatus(filters) {
      var sta = filters[Object.keys(filters)[0]];

      var parsedobj = JSON.parse(JSON.stringify(sta));
      var type = parsedobj.toString();
      var req = {
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        GroupID: this.groups,
        Search: this.search,
        type: type
      };
      this.listLoading = true;
      GetBranchMissionVacation(req).then(res => {
        this.loadingTableData = false;
        this.tableData = res.MissionVacationLst;
      });
    },
    // tabletoExcel(table, name) {
    //   var uri = "data:application/vnd.ms-excel;base64,",
    //     template =
    //       '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
    //     base64 = function(s) {
    //       return window.btoa(unescape(encodeURIComponent(s)));
    //     },
    //     format = function(s, c) {
    //       return s.replace(/{(\w+)}/g, function(m, p) {
    //         return c[p];
    //       });
    //     };
    //   if (!table.nodeType) table = document.getElementById(table);
    //   var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };
    //   window.location.href = uri + base64(format(template, ctx));
    // },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Nhân viên",
        "Nhóm",
        "Loại",
        "Lý do",
        "Tạo lúc",
        "Bắt đầu",
        "Kết thúc",
        "Số buổi",
        "Ghi chú",
        "Duyệt",
        "Người duyệt",
        "Trạng thái"
      ];
      const filterHeader = [
        "EmployeeName",
        "IDGroup",
        "Type",
        "Reason",
        "TimeCreate",
        "TimeStart",
        "TimeEnd",
        "Number",
        "Note",
        "TimeAccept",
        "NameManager",
        "Status"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách đăng kí lịch làm việc " +
              Date.parse(this.DateStart).toString("dd/MM/yyyy") +
              " đến " +
              Date.parse(this.DateEnd).toString("dd/MM/yyyy"), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionVacationStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    fetchData() {
      this.loadingTableData = true;
      var req = {
        DateStart: this.DateStart,
        DateEnd: this.DateEnd,
        IDGroup: this.groups,
        Search: this.search
      };
      GetBranchMissionVacation(req).then(res => {
        this.loadingTableData = false;
        this.tableData = res.MissionVacationLst;
      });
    }
  },
  watch: {
    DateStart: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
  padding: 10px;
  background-color: #f0f2f5;

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
