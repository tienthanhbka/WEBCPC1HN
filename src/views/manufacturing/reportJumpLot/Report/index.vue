<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        @click="createReport"
        type="success"
        icon="fas fa-plus"
        class="pan-btn green-btn"
        >&#32;Tạo báo cáo
      </el-button>
    </div>
    <!-- <div v-show="show" class="inline-block">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div> -->
    <div class="inline-block" style="float: right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        :loading="downloading"
        @click="ExportExcel"
        >Xuất Excel</el-button
      >
    </div>
    <div
      class="inline-block"
      style="float:right;background-color: rgb(244 244 244);"
    >
      <el-date-picker
        class="item-date-picker"
        v-model="TimeStart"
        type="date"
        format="dd/MM/yyyy"
        placeholder="Từ ngày"
      >
      </el-date-picker>
      <el-date-picker
        class="item-date-picker"
        v-model="TimeEnd"
        format="dd/MM/yyyy"
        type="date"
        placeholder="Đến ngày"
      >
      </el-date-picker>
    </div>

    <create-report
      modalId="new-report-modal"
      @reportAdded="reportOK"
      :report="rowData"
      :date="dateEnd"
    ></create-report>
    <div class="filter-body">
      <div class="label">
        <span><i class="fas fa-filter"></i> Bộ lọc</span>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="4" :lg="4">
          <div class="filter1">
            <el-input
              placeholder="-- Theo sản phẩm --"
              v-model="ProductNameKey"
            ></el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4" :lg="4">
          <div class="filter1">
            <el-input
              placeholder="-- Theo lệnh sản xuất --"
              v-model="ProductionOrderIDKey"
            ></el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="4" :lg="4">
          <div class="filter2">
            <el-input
              placeholder="-- Theo số lô --"
              v-model="BatchKey"
            ></el-input>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <div class="search">
            <el-button icon="el-icon-search" @click="fetchData">
              Tìm kiếm</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      class="el-mobile-table"
      :data="
        ReportQuotaBoxLst.filter(
          data =>
            !TextSearch ||
            data.ProductName.toLowerCase().includes(TextSearch.toLowerCase())
        )
      "
      size="small"
      v-loading="listLoading"
      style="width: 100%"
      border
      fit
      highlight-current-row
    >
      <el-table-column width="85px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chỉnh sửa">
              <el-button @click="updateReport(scope.row)" type="text"
                ><i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa">
              <el-button
                @click="deleteReport(scope.row)"
                type="text"
                style="color:red"
                ><i class="el-icon-delete"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="100px" label="Trạng thái">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | missionStatusColor">
              {{ scope.row.Status | missionStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        min-width="110"
        label="Sản phẩm"
        prop="ProductName"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Sản phẩm">
            {{ scope.row.ProductName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="110" label="Mã SP">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã SP">
            {{ scope.row.ProductID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="110" label="Lệnh SX">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lệnh SX">
            {{ scope.row.ProductionOrderID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="75px" label="TT kiện">
        <template slot-scope="scope">
          <div class="dat-cell" label="TT kiện">
            {{ scope.row.BoxCode }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        min-width="110px"
        label="Loại kiện"
        prop="BoxType"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại kiện">
            {{ scope.row.BoxType | BoxType }}
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="Kích cỡ" prop="BoxSize" sortable>
        <template slot-scope="scope">
          <div class="dat-cell" label="Kích cỡ">
            {{ scope.row.BoxSize }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="80" label="Số lô">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số lô">
            {{ scope.row.LotCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số bắt đầu" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số bắt đầu">
            {{ scope.row.NumberStart }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số kết thúc" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số kết thúc">
            <span style="margin-left:5px;">{{ scope.row.NumberEnd }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Mã số TT thiếu" min-width="150">
        <template slot-scope="scope">
          <div
            class="dat-cell"
            label="Mã số TT thiếu"
            style="float:left;word-break: break-word;"
          >
            <!-- <span v-for="(num, index) in scope.row.NumberDeficit" :key="index">
              <br />
              <el-tag type="info">{{num}}</el-tag>
            </span> -->
            {{ scope.row.NumberDeficit }}
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="100" label="Số lượng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số lượng">
            {{ scope.row.Quantity }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người báo cáo" min-width="150">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người báo cáo">
            {{ scope.row.CreaterID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Thời gian BC"
        min-width="120"
        prop="TimeCreate"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian BC">
            {{ scope.row.TimeCreate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ca" min-width="130" prop="Shift" sortable>
        <template slot-scope="scope">
          <div class="dat-cell" label="Ca">
            {{ scope.row.Shift }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ghi chú" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
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
</template>
<script>
import Cookies from "js-cookie";

import createReport from "@/views/manufacturing/reportJumpLot/Report/component/createReport";

import { GetProductionOrder } from "@/api/productionOrder";
import { GetReportQuotaBox, DelReportQuotaBox } from "@/api/reportBox";
import { getYesterday, getEndDate } from "@/api/index";
import { parseTime } from "@/utils";
export default {
  components: {
    createReport
  },
  data() {
    return {
      dateEnd: "",
      total: 0,
      currentPage: 1,
      pageSize: 10,
      ReportQuotaBoxLst: [],
      ProductionOrderID: "",
      ReportType: "",
      TextSearch: "",
      ProductNameKey: "",
      ProductionOrderIDKey: "",
      BatchKey: "",
      listLoading: false,
      downloading: false,
      show: false,
      rowData: "",
      datetime: [],
      TimeStart: getYesterday(),
      TimeEnd: getEndDate()
    };
  },
  methods: {
    createReport() {
      VoerroModal.show("new-report-modal");
      this.rowData = null;
      this.dateEnd = this.TimeEnd;
    },
    deleteReport(row) {
      this.$confirm(
        "Xác nhận xóa báo cáo lệnh " +
          row.ProductionOrderID +
          " - mã kiện " +
          row.BoxCode +
          ". Continue?",
        "Xóa báo cáo",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            DocumentID: row.DocumentID
          };
          DelReportQuotaBox(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Xóa báo cáo thành công",
                type: "success"
              });
              this.fetchData();
            } else {
              this.$message({
                message: res.RespText,
                type: "danger"
              });
            }
          });
        })
        .catch(() => {});
    },
    fetchData() {
      this.listLoading = true;
      GetReportQuotaBox({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd,
        ProductName: this.ProductNameKey,
        ProductionOrderID: this.ProductionOrderIDKey,
        LotCode: this.BatchKey,
        NumberRow: this.pageSize,
        PageNumber: this.currentPage
      }).then(res => {
        if (res.RespCode == 0) {
          this.ReportQuotaBoxLst = res.ReportQuotaBoxLst;
          this.total = res.NumberPage * this.pageSize;
        }
        this.listLoading = false;
      });
    },
    reportOK() {
      VoerroModal.hide("new-report-modal");
      this.fetchData();
    },
    updateReport(row) {
      VoerroModal.show("new-report-modal");
      this.rowData = row;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Lệnh sản xuất",
        "Mã kiện",
        "Loại kiện",
        "Sản phẩm",
        "Kích cỡ",
        "Số lô",
        "Số bắt đầu",
        "Số kết thúc",
        "Mã số TT thiếu",
        "Số lượng",
        "Người báo cáo",
        "Thời gian báo cáo",
        "Ca",
        "Trạng thái"
      ];
      const filterHeader = [
        "ProductionOrderID",
        "BoxCode",
        "BoxType",
        "ProductName",
        "BoxSize",
        "LotCode",
        "NumberStart",
        "NumberEnd",
        "NumberDeficit",
        "Quantity",
        "CreaterID",
        "TimeCreate",
        "Shift",
        "Status"
      ];
      GetReportQuotaBox({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(response => {
        if (response.RespCode == 0) {
          var data = response.ReportQuotaBoxLst;
        }
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách báo cáo từ " +
              parseTime(this.TimeStart, "{d}-{m}-{y}").substring(0, 10) +
              " đến " +
              parseTime(this.TimeEnd, "{d}-{m}-{y}"), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    },
    currentPage() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.filter-body {
  background-color: #02bc77;
  margin: 10px 0px;
  .label {
    padding: 10px;
    font-size: 10pt;
    color: #fff;
  }
  .filter1 {
    padding: 5px 10px;
  }
  .filter2 {
    padding: 5px 10px;
  }
  .search {
    padding: 5px 10px;
    float: right;
  }
}
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
</style>
