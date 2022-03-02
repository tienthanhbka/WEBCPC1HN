<template>
  <div class="group-block">
    <div class="header-block">
      <!-- <div class="inline-block">
        <el-input
          class="input-custom"
          size="small"
          v-model="search"
          placeholder="Tìm kiếm..."
        ></el-input>
      </div>
      <div class="inline-block" style="margin-right:5px">
        <el-button
          icon="el-icon-search"
          @click="fetchData"
          type="primary"
          size="small"
          >Tìm kiếm</el-button
        >
      </div>
      <div class="inline-block">
        <el-button
          icon="fas fa-plus"
          type="primary"
          size="small"
          @click="create"
        >
          Tạo mới</el-button
        >
      </div>
      <div style="float:right">
        <div class="inline-block" style="margin-right:5px">
          <el-button
            type="danger"
            size="small"
            icon="fas fa-file-import"
            @click="importExcel"
          >
            Nhập Excel</el-button
          >
        </div>
        <div class="inline-block">
          <el-button
            type="success"
            :loading="downloading"
            size="small"
            icon="fas fa-file-excel"
          >
            Xuất Excel</el-button
          >
        </div>
      </div>
      <div style="clear:both;"></div> -->
      <el-row :gutter="20">
        <el-col :xs="24" :lg="8">
          <div class="box-item box1">
            <h3>Tổng đăng kí</h3>
            <p>{{ totalRows }}</p>
          </div>
        </el-col>
        <el-col :xs="24" :lg="8">
          <div class="box-item box2">
            <h3>Đã kiểm tra sức khỏe</h3>
            <p class="item1">Thực hiện {{ totalSK }}</p>
            <p class="item2">{{ SK }}%</p>
          </div>
        </el-col>
        <el-col :xs="24" :lg="8">
          <div class="box-item box3">
            <h3>Hoàn thành tiêm</h3>
            <p class="item1">Thực hiện {{ totalOK }}</p>
            <p class="item2">{{ OK }}%</p>
          </div>
        </el-col>
      </el-row>
      <div class="inline-block" style="padding: 10px 0">
        <el-input
          class="input-custom"
          size="small"
          v-model="search"
          placeholder="Tìm kiếm..."
          @keyup.enter.native="fetchData"
        ></el-input>
      </div>
      <div class="inline-block" style="margin-right:5px">
        <el-button
          icon="el-icon-search"
          @click="fetchData"
          type="primary"
          size="small"
          >Tìm kiếm</el-button
        >
      </div>
      <div style="float:right;padding:10px">
        <div class="inline-block">
          <el-button
            type="success"
            :loading="downloading"
            size="small"
            icon="fas fa-file-excel"
            @click="ExportExcel"
          >
            Xuất Excel</el-button
          >
        </div>
      </div>
      <div style="clear:both;"></div>
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="tableData"
      size="small"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="MNV">
        <template slot-scope="scope">
          <div class="dat-cell" label="MNV">
            {{ scope.row.EmployeeCode }}
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="140px;" label="Họ tên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Họ tên">
            {{ scope.row.FullName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="SĐT">
        <template slot-scope="scope">
          <div class="dat-cell" label="SĐT">
            {{ scope.row.PhoneNumber }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Đơn vị công tác">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đơn vị công tác">
            {{ scope.row.Work }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Thời gian tiêm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tiêm">
            {{ scope.row.Time }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px;" label="Cập nhật">
        <template slot-scope="scope" v-if="scope.row.TimeUpdate">
          <div class="dat-cell" label="Cập nhật">
            {{ Date.parse(scope.row.TimeUpdate).toString("HH:mm dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220px" label="Trạng thái" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              style="width:200px"
              effect="plain"
              :type="scope.row.Status | toStatusColor"
              >{{ scope.row.Status | toStatusText }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:5px;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import { GetVaccineInfoLst } from "@/api/vaccine";

export default {
  filters: {
    toStatusText(val) {
      if (val == 0) {
        return "Chưa đánh giá";
      } else if (val == 1) {
        return "Đã đăng kí";
      } else if (val == 3) {
        return "Đã kiểm tra sức khỏe";
      } else if (val == 5) {
        return "Đã tiêm xong";
      }
    },
    toStatusColor(val) {
      if (val == 0) {
        return "info";
      } else if (val == 1) {
        return "primary";
      } else if (val == 3) {
        return "warning";
      } else if (val == 5) {
        return "success";
      }
    }
  },
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      totalSK: 0,
      totalOK: 0,
      totalRows: 0,
      SK: 0,
      OK: 0,
      // dateStart: getStartMonth(),
      // dateEnd: getEndMonth(),
      modeView: 0,
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    create() {
      this.dialogFormCreate = true;
      this.titleDialog = "Thêm mới số đăng ký";
      this.modeView = 1; //tạo mới
      this.rowData = null;
    },
    edit(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Cập nhật số đăng kí";
      this.modeView = 3; //cập nhật
      this.rowData = row;
    },
    view(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "Chi tiết số đăng kí";
      this.modeView = 2; //Xem chi tiết
      this.rowData = row;
    },
    createOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        Search: this.search
      };
      GetVaccineInfoLst(req).then(res => {
        this.tableData = res.VaccineInfoLst;
        this.dataLength = res.TotalRows;
        this.totalRows = res.TotalRows;
        this.totalSK = res.TotalSK;
        this.totalOK = res.TotalOK;
        this.SK = ((this.totalSK + this.totalOK) / this.totalRows) * 100;
        this.OK = (this.totalOK / this.totalRows) * 100;
        this.loadingTableData = false;
      });
    },
    importExcel() {
      this.dialogFormCreate = true;
      this.titleDialog = "Thêm thông tin";
    },
    createOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    ExportExcel() {
      this.downloading = true;
      const req = {
        PageNumber: 1,
        RowspPage: 5000,
        Search: ""
      };
      GetVaccineInfoLst(req).then(res => {
        this.export(res.VaccineInfoLst);
      });
    },
    export(dataT) {
      const tHeader = [
        "Thời gian vào tiêm",
        "Line",
        "Nhóm",
        "MNV",
        "Test",
        "Nơi làm việc",
        "Phòng ban",
        "Vị trí",
        "Họ và tên",
        "Ngày sinh",
        "Giới tính",
        "Đơn vị công tác",
        "Số điện thoại",
        "CMND",
        "Địa chỉ",
        "Ghi chú",
        "Email",
        "Thời gian hoàn thành",
        "Trạng thái"
      ];
      const filterHeader = [
        "Time",
        "Line",
        "TypeGroup",
        "EmployeeCode",
        "TypeTest",
        "Branch",
        "Department",
        "Position",
        "FullName",
        "DateOfBirth",
        "Sex",
        "Work",
        "PhoneNumber",
        "CMND",
        "Address",
        "Note",
        "Email",
        "TimeUpdate",
        "Status"
      ];
      var data = dataT;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách tiêm chủng COVID-19 CPC1HN", //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.toStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {
    pageSize() {
      this.fetchData();
    },
    currentPage() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  padding: 20px;
  .header-block {
    width: 100%;
    background-color: #fff;
    margin-left: 1px;
    border-right: 2px solid #ecf0f1;
    padding: 20px 20px 0 20px;
    .box-item {
      padding: 5px;
      position: relative;
      border-radius: 20px;
      margin-bottom: 5px;
      color: #fff;
      height: 100px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
        rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      h3 {
        margin: 0;
        padding: 10px;
      }
      p {
        position: absolute;
        bottom: 0;
        right: 10px;
      }
    }
    .box1 {
      background-color: #b3e283;
      p {
        font-size: 20px;
        font-weight: 600;
      }
    }
    .box2 {
      background-color: #e8e46e;
      .item1 {
        font-size: 10pt;
        bottom: 20px;
        right: 15px;
      }
      .item2 {
        font-size: 20px;
        font-weight: 600;
        margin: 5px;
      }
    }
    .box3 {
      background-color: #f3c583;
      .item1 {
        font-size: 10pt;
        bottom: 20px;
        right: 15px;
      }
      .item2 {
        font-size: 20px;
        font-weight: 600;
        margin: 5px;
      }
    }
  }
  .inline-block {
    display: inline-block;
  }
}
</style>
