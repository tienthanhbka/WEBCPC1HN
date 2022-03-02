<template>
  <div class="container">
    <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        @click="ExportExcel"
        :loading="downloading"
        plain
        >Xuất Excel</el-button
      >
    </div>
    <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <!-- <div class="inline-block">
      <el-button
        @click="createReport"
        style="background-color:#02bc77;color:white;"
        icon="fas fa-qrcode"
      >
        Báo cáo</el-button
      >
    </div> -->
    <div class="body">
      <el-table
        class="el-mobile-table"
        :data="
          ReportLst.filter(
            data =>
              !TextSearch ||
              data.ProductName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        border
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.ValObservedItem"
              border
              style="width: 100%"
            >
              <el-table-column>
                <template slot-scope="props">
                  {{ props.$index + 1 }}
                  <!-- <el-tooltip content="Chỉnh sửa" v-if="props.row.Status != 3">
                    <el-button @click="editReport(props.row)" type="text"
                      ><i class="far fa-edit"></i></el-button
                  ></el-tooltip>
                  <el-tooltip content="Xóa" v-if="props.row.Status != 3">
                    <el-button
                      @click="delReport(props.row)"
                      type="text"
                      style="color:red;"
                      ><i class="far fa-trash-alt"></i></el-button
                  ></el-tooltip> -->
                </template>
              </el-table-column>
              <el-table-column prop="SampleName" label="Chỉ tiêu">
                <template slot-scope="props">
                  {{ props.row.TargetName }}
                </template>
              </el-table-column>
              <el-table-column prop="Creator" label="Giá trị quan sát">
                <template slot-scope="props">
                  {{ props.row.ValObserved }}
                </template>
              </el-table-column>
              <el-table-column prop="Creator" label="Chỉ số tiêu chuẩn">
                <template slot-scope="props">
                  {{ props.row.Index }}
                </template>
              </el-table-column>
              <el-table-column prop="TimeCreate" label="Loại">
                <template slot-scope="props">
                  {{ props.row.TypeIndex }}
                </template>
              </el-table-column>
              <el-table-column prop="Note" label="Sai số">
                <template slot-scope="props">
                  {{ props.row.Error }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="props">
            {{ props.$index + 1 }}
            <!-- <el-tooltip content="Chỉnh sửa" v-if="props.row.Status != 3">
              <el-button @click="editReport(props.row)" type="text"
                ><i class="far fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" v-if="props.row.Status != 3">
              <el-button
                @click="delReport(props.row)"
                type="text"
                style="color:red;"
                ><i class="far fa-trash-alt"></i></el-button
            ></el-tooltip> -->
            <el-tooltip content="Chi tiết">
              <el-button @click="viewReport(props.row)" type="text"
                ><i class="el-icon-s-operation"></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="SampleName" label="Mẫu" sortable>
          <template slot-scope="props">
            <el-button type="text" @click="detailReport(props.row)"
              ><el-link> {{ props.row.SampleName }}</el-link></el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="ProductName"
          label="Sản phẩm"
          width="150"
          sortable
        >
          <template slot-scope="props">
            {{ props.row.ProductName }}
          </template>
        </el-table-column>
        <el-table-column prop="Creator" label="Người báo cáo">
        </el-table-column>
        <el-table-column
          prop="TimeCreate"
          label="Thời gian báo cáo"
          width="180"
        >
        </el-table-column>
        <!-- <el-table-column
          prop="Note"
          label="Giá trị quan sát"
          width="300"
          align="center"
        >
          <el-table-column label="Chỉ tiêu"> </el-table-column>
          <el-table-column label="Quan sát"> </el-table-column
          ><el-table-column label="Định mức"> </el-table-column>
          <el-table-column label="Sai số"> </el-table-column>
        </el-table-column> -->
        <el-table-column prop="Status" label="Trạng thái">
          <template slot-scope="props">
            <el-tag :type="props.row.Status | ideaStatusColor">
              {{ props.row.Status | ideaStatusText }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormDetail" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="el-icon-document"></i>&#32;&#32;Chi tiết
      </span>
      <detail :report="rowData" @cancel="cancelDetail"></detail>
    </el-dialog>
    <el-pagination
      class="pagination"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import { db } from "../component/firebase";
import Create from "../component/createReport";
import Detail from "../component/detailReport";
import Evaluate from "../component/evaluateReport";
import ScanQr from "../component/scanQR";
import Cookies from "js-cookie";
export default {
  components: {
    Create,
    Detail,
    Evaluate,
    ScanQr
  },
  data() {
    return {
      ReportLst: [],
      ReportItemLst: [],
      TargetLst: [],
      SampleLst: [],
      dialogFormDetail: false,
      dialogFormQR: false,
      admin: false,
      rowData: "",
      TextSearch: "",
      downloading: false,
      show: false,
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    detailReport(row) {
      (this.dialogFormDetail = true), (this.rowData = row);
    },
    cancelDetail() {
      this.dialogFormDetail = false;
    },
    // tableRowClassName({ row, rowIndex }) {
    //   console.log(row.Status);
    //   switch (row.Status) {
    //     case 0:
    //       {
    //         return "error-row";
    //       }
    //       break;
    //     case 1:
    //       {
    //         return "primary-row";
    //       }
    //       break;
    //     case 3:
    //       {
    //         return "success-row";
    //       }
    //       break;
    //     default:
    //       return "";
    //   }
    // },
    fetchData() {
      db.ref("Admin").on("value", snap => {
        Object.values(snap.val()).forEach(element => {
          if (this.UserName == element.Code) {
            this.admin = true;
          }
        });
      });
      let a = [];
      db.ref("ReportList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (this.admin) {
              a.push(element);
            } else {
              if (element.Creator == Cookies.get("idEmployee")) {
                a.push(element);
              }
            }
          });
        }
      });
      this.ReportLst = a;
    },
    viewReport(row) {
      (this.dialogFormDetail = true), (this.rowData = row);
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã mẫu",
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Điều kiện bảo quản",
        "Thời gian theo dõi",
        "Người báo cáo",
        "ID",
        "Ngày báo cáo",
        "Ghi chú",
        "Người duyệt",
        "Ngày duyệt",
        "Kết quả",
        "Đánh giá",
        "Trạng thái"
      ];
      const filterHeader = [
        "SampleName",
        "ProductID",
        "ProductName",
        "Condition",
        "Time",
        "Creator",
        "CreatorID",
        "TimeCreate",
        "Note",
        "Approver",
        "TimeApprover",
        "Result",
        "Comment",
        "Status"
      ];
      var data = this.ReportLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách báo cáo",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.ideaStatusText(v[j]);
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
  watch: {}
};
</script>
<style lang="scss">
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 24px;
  margin-top: 5px;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  margin-top: 10px;
}
.el-table .error-row {
  background: #fef0f0;
}

.el-table .success-row {
  background: #02bc77;
  color: #fff;
}
.el-table .primary-row {
  background: #81b2e9;
  color: #fff;
}
.el-icon-s-operation:before {
  color: #fff;
}
</style>
