<template>
  <div>
    <div class="container" v-if="admin">
      <div class="inline-block" style="float:right;">
        <router-link :to="'/san-xuat/theo-doi-mau/danh-sach-bao-cao'">
          <el-button
            style="background-color:#02bc77;color:white;"
            icon="el-icon-document"
            class="inline-block"
            >Danh sách</el-button
          ></router-link
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
      <div class="body">
        <el-table
          class="el-mobile-table"
          :data="
            SampleLst.filter(
              data =>
                !TextSearch ||
                data.ProductName.toLowerCase().includes(
                  TextSearch.toLowerCase()
                )
            )
          "
          style="width: 100%"
          border
          :header-row-style="{ color: '#1c456f' }"
          @expand-change="expand"
        >
          <el-table-column type="expand">
            <template slot-scope="scope">
              <el-table :data="scope.row.lines" border style="width: 100%">
                <el-table-column width="100">
                  <template slot-scope="props">
                    {{ props.$index + 1 }}
                    <el-tooltip
                      content="Đánh giá"
                      v-if="admin == true && props.row.Status != 3"
                    >
                      <el-button
                        @click="evalReport(props.row)"
                        type="text"
                        style="color:#ffcb2b;"
                        ><i class="far fa-paper-plane"></i></el-button
                    ></el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column prop="SampleName" label="Chỉ tiêu" width="150">
                  <template slot-scope="props">
                    <el-button type="text" @click="detailReport(props.row)"
                      ><el-link> {{ props.row.TargetName }}</el-link></el-button
                    >
                  </template>
                </el-table-column>
                <el-table-column prop="ValObserved" label="GT đo" width="200">
                </el-table-column>
                <!-- <el-table-column
                prop="TimeCreate"
                label="Thời gian báo cáo"
                width="180"
              >
              </el-table-column> -->
                <el-table-column prop="Index" label="Mức chất lượng">
                </el-table-column>
                <el-table-column prop="Unit" label="Đơn vị"> </el-table-column>
                <!-- <el-table-column prop="Error" label="Sai số"> </el-table-column> -->
                <el-table-column prop="Creator" label="Người đo">
                </el-table-column>
                <el-table-column prop="TimeCreate" label="Ngày đo">
                </el-table-column>
                <!-- <el-table-column prop="Status" label="Sai số" width="100">
                <template slot-scope="props">
                  <el-tag :type="props.row.Status | ideaStatusColor">
                    {{ props.row.Status | ideaStatusText }}
                  </el-tag>
                </template>
              </el-table-column> -->
              </el-table>
            </template>
          </el-table-column>
          <el-table-column min-width="50px" label="STT">
            <template slot-scope="scope">
              <div class="dat-cell" label="STT">
                {{ scope.$index + 1 }}

                <!-- <el-tooltip content="Báo cáo" v-if="admin">
                <el-button
                  @click="evalReport(scope.row)"
                  type="text"
                  icon="el-icon-document"
                ></el-button
              ></el-tooltip> -->
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Mã mẫu" min-width="70">
            <template slot-scope="scope">
              <div class="dat-cell" label="Mã mẫu">
                {{ scope.row.SampleName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Tên sản phẩm"
            min-width="100"
            prop="ProductName"
            sortable
          >
            <template slot-scope="scope">
              <div class="dat-cell" label="Tên sản phẩm">
                {{ scope.row.ProductName }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="Lệnh sản xuất"
            min-width="100"
            prop="ProductOrder"
            sortable
          >
            <template slot-scope="scope">
              <div class="dat-cell" label="Lệnh sản xuất">
                {{ scope.row.ProductOrder }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Điều kiện bảo quản" min-width="120">
            <template slot-scope="scope">
              <div class="dat-cell" label="Điều kiện bảo quản">
                {{ scope.row.Condition }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Thời gian theo dõi" min-width="100">
            <template slot-scope="scope">
              <div class="dat-cell" label="Thời gian theo dõi">
                {{ scope.row.Time }}
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column label="Giá trị quan sát" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Giá trị quan sát">
              {{ scope.row.ValObserved }}
            </div>
          </template>
        </el-table-column> -->
          <!-- <el-table-column label="Điều kiện bảo quản" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Điều kiện bảo quản">
              {{ scope.row.Condition }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tình trạng ban đầu" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tình trạng ban đầu">
              {{ scope.row.Original }}
            </div>
          </template>
        </el-table-column> -->
          <!-- <el-table-column label="Người báo cáo" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người báo cáo">
              {{ scope.row.Creator }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Ngày báo cáo"
          min-width="100"
          sortable
          prop="date"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày báo cáo">
              {{ Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column> -->
          <el-table-column label="Trạng thái" align="center" min-width="80">
            <template slot-scope="scope">
              <div class="dat-cell" label="Trạng thái">
                <el-tag :type="scope.row.Status | ideaStatusColor">
                  {{ scope.row.Status | ideaStatusText }}
                </el-tag>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
        <span
          slot="title"
          style="font-weight:700;color: #02bc77;font-size: 20pt;"
          ><i class="el-icon-document"></i>&#32;&#32;Báo cáo
        </span>
        <create
          :report="rowData"
          @cancel="cancelOK"
          @ReportAdded="ReportAdded"
        ></create>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormDetail" custom-class="default-modal">
        <span
          slot="title"
          style="font-weight:700;color: #02bc77;font-size: 20pt;"
          ><i class="el-icon-document"></i>&#32;&#32;Chi tiết
        </span>
        <detail :report="rowData" @cancel="cancelDetail"></detail>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogFormEvaluate"
        custom-class="default-modal"
      >
        <span
          slot="title"
          style="font-weight:700;color: #02bc77;font-size: 20pt;"
          ><i class="far fa-paper-plane"></i>&#32;&#32;Đánh giá kiểm nghiệm
        </span>
        <evaluate
          :report="rowData"
          @cancel="cancelEval"
          @ReportApprovered="ReportApprovered"
        ></evaluate>
      </el-dialog>
      <el-dialog
        :visible.sync="dialogFormQR"
        custom-class="default-modal"
        append-to-body
      >
        <span
          slot="title"
          style="font-weight:700;color: #02bc77;font-size: 20pt;"
          ><i class="fas fa-qrcode"></i>&#32;&#32;Quét QR
        </span>
        <scan-qr @answer="stringQR"></scan-qr>
      </el-dialog>
      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
    <!-- <div class="blank-table">
      Không có dữ liệu
    </div> -->
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
      dialogFormCreate: false,
      dialogFormDetail: false,
      dialogFormEvaluate: false,
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
    createReport() {
      this.dialogFormQR = true;
      this.rowData = null;
    },
    editReport(row) {
      this.dialogFormCreate = true;
      this.rowData = row;
    },
    ReportAdded() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    detailReport(row) {
      (this.dialogFormDetail = true), (this.rowData = row);
    },
    cancelDetail() {
      this.dialogFormDetail = false;
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    evalReport(row) {
      (this.rowData = row), (this.dialogFormEvaluate = true);
    },
    addReport(row) {
      (this.rowData = row.SampleName), (this.dialogFormCreate = true);
    },
    cancelEval() {
      this.dialogFormEvaluate = false;
    },
    ReportApprovered() {
      this.expand();
      this.dialogFormEvaluate = false;
    },
    delReport(row) {
      this.$confirm(
        "Xác nhận xóa báo cáo mẫu " + row.SampleName + ". Continue?",
        "Xóa báo cáo",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          db.ref("/ReportList/" + row.ReportID).remove();
          this.$message({
            message: "Xóa thành công ",
            type: "success"
          });
          this.fetchData();
        })
        .catch(() => {});
    },
    fetchData() {
      let a = [];
      let b = [];
      db.ref("TargetList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            b.push(element);
          });
        }
      });
      this.TargetLst = b;
      db.ref("ReportList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
      });
      this.ReportLst = a;
      let _this = this;
      db.ref("Admin").on("value", snap => {
        Object.values(snap.val()).forEach(element => {
          if (this.UserName == element.Code) {
            this.admin = true;
          }
        });
      });
    },
    fetchSample() {
      let a = [];
      db.ref("SampleList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
      });
      this.SampleLst = a;
    },
    expand(row) {
      let a = [];
      db.ref("ReportList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (element.SampleName == row.SampleName) {
              Object.values(element.ValObservedItem).forEach(item => {
                var item2 = {
                  TargetName: item.TargetName,
                  Index: item.Index,
                  TypeIndex: item.TypeIndex,
                  Unit: item.Unit,
                  Error: item.Error,
                  ValObserved: item.ValObserved,
                  Creator: element.Creator,
                  TimeCreate: element.TimeCreate
                };
                a.push(item2);
              });
            }
          });
          row.lines = a;
        }
      });
    },
    stringQR(string) {
      if (string) {
        this.dialogFormQR = false;
        this.rowData = string;
        this.dialogFormCreate = true;
      }
    },
    ExportExcel() {}
  },
  created() {
    this.fetchData();
    this.fetchSample();
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
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
</style>
