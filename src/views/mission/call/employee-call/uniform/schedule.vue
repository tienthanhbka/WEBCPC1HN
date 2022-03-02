<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px; border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-button
          v-if="modeAdmin"
          icon="fas fa-plus"
          type="primary"
          size="small"
          @click="create"
        >
          Tạo lịch</el-button
        >
      </div>
      <div style="float:right">
        <div class="inline-block">
          <el-date-picker
            v-model="dateStart"
            size="small"
            type="date"
            placeholder="Từ ngày"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            v-model="dateEnd"
            size="small"
            type="date"
            placeholder="Đến ngày"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-button
            v-if="modeAdmin"
            type="success"
            @click="exportResult"
            :loading="downloading"
            size="small"
            ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
          >
        </div>
        <div class="inline-block">
          <el-button
            v-if="modeAdmin"
            type="success"
            @click="dowloadSample"
            :loading="downloading"
            size="small"
            ><i class="fas fa-download"></i> Tải mẫu</el-button
          >
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="tableData"
      style="width:100%"
      border=""
      fit
      @expand-change="expandRow"
      show-header
      class="el-mobile-table"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="12" :lg="18" class="side">
              <el-button
                v-if="modeAdmin"
                type="success"
                @click="exportLine(scope.row)"
                :loading="downloading"
                size="small"
                ><i class="fas fa-file-excel"></i
              ></el-button>
              <el-table
                :data="scope.row.lines"
                v-loading="loadingEx"
                element-loading-text="Loading"
                style="width:100%"
                height="700px"
                size="small"
                border
                fit
                highlight-current-row
                :row-class-name="tableRowClassName"
              >
                <el-table-column align="center" label="STT" width="85">
                  <template slot-scope="props"
                    >{{ props.$index + 1 }}
                  </template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="110px"
                  label="Trạng thái"
                >
                  <template slot-scope="{ row }">
                    <el-button
                      :type="
                        row.NumImgs > 0
                          ? row.Status == 3 && row.CallApprove == row.IDCall
                            ? 'success'
                            : row.Status == 5 && row.CallApprove == row.IDCall
                            ? 'danger'
                            : 'warning'
                          : 'info'
                      "
                      :plain="!row.isview"
                      size="small"
                      @click="viewImgs(row)"
                    >
                      Xem ({{ row.NumImgs }}) <i class="fas fa-images"></i>
                    </el-button>
                  </template>
                </el-table-column>
                <el-table-column label="Nhân viên" min-width="150">
                  <!-- <el-input
                    slot="header"
                    size="small"
                    placeholder="Nhân viên"
                    v-model="scope.row.employeeS"
                  >
                    <el-tooltip
                      slot="suffix"
                      content="Tìm theo tên hoặc SĐT"
                      placement="top"
                    >
                      <el-button @click="expandRow(scope.row)" type="text"
                        ><i
                          style="margin-right: 10px;"
                          class="el-icon-search"
                        ></i
                      ></el-button>
                    </el-tooltip>
                  </el-input> -->
                  <template slot-scope="{ row }"
                    >[{{ row.EmployeeCode }}] {{ row.EmployeeName }}</template
                  >
                </el-table-column>
                <el-table-column label="Nhóm" min-width="150">
                  <template slot-scope="{ row }">{{ row.IDGroup }}</template>
                </el-table-column>
                <el-table-column label="Số điện thoại" width="120">
                  <template slot-scope="{ row }">{{ row.EmployeeID }}</template>
                </el-table-column>
                <el-table-column label="Nội dung call" width="180">
                  <template slot-scope="{ row }">{{ row.Plan }}</template>
                </el-table-column>
                <el-table-column label="CheckIn" width="160">
                  <template slot-scope="{ row }">{{
                    row.TimeCheckIn ? row.TimeCheckIn.substring(0, 19) : ""
                  }}</template>
                </el-table-column>
                <el-table-column label="Địa điểm" width="250">
                  <template slot-scope="{ row }">{{ row.PlaceName }}</template>
                </el-table-column>
                <el-table-column label="Khách hàng" width="150">
                  <template slot-scope="{ row }">{{
                    row.NameCustomer
                  }}</template>
                </el-table-column>
                <el-table-column label="Người check ảnh" width="150">
                  <template
                    slot-scope="{ row }"
                    v-if="row.CallApprove == row.IDCall"
                    >{{ row.ApproveID }}</template
                  >
                </el-table-column>
                <el-table-column label="Ghi chú" width="150">
                  <template
                    slot-scope="{ row }"
                    v-if="row.CallApprove == row.IDCall"
                    >{{ row.Note }}</template
                  >
                </el-table-column>
              </el-table>
            </el-col>
            <el-col
              style="border: 1px solid #EBEEF5;"
              :xs="24"
              :sm="12"
              :lg="6"
              class="side"
            >
              <div v-if="curCall.isview" style="height:100%">
                <div
                  v-if="curCall.NumImgs == 0"
                  style="width: 100%;
                    height: 500px;
                    text-align: center;
                    vertical-align: middle;
                    line-height: 500px;
                    font-size: 32px;"
                >
                  Không có ảnh
                </div>
                <el-carousel v-else height="500px" v-loading="imgLoading">
                  <el-carousel-item
                    v-for="(item, index) in curCall.curImgs"
                    :key="index"
                  >
                    <button
                      class="el-carousel__arrow el-carousel__arrow--left"
                      style="top:35px"
                      @click="item.rotate -= 90"
                    >
                      <i class="fas fa-undo"></i>
                    </button>
                    <button
                      class="el-carousel__arrow el-carousel__arrow--right"
                      @click="item.rotate += 90"
                      style="top:35px"
                    >
                      <i class="fas fa-redo"></i>
                    </button>
                    <button
                      class="el-carousel__arrow el-carousel__arrow--left imgPass1"
                      v-if="
                        curCall.Status == 3 &&
                          curCall.CallApprove == curCall.IDCall
                      "
                    >
                      <i class="fas fa-check"></i>
                    </button>
                    <button
                      class="el-carousel__arrow el-carousel__arrow--left imgPass2"
                      v-else-if="
                        curCall.Status == 5 &&
                          curCall.CallApprove == curCall.IDCall
                      "
                    >
                      <i class="fas fa-times"></i>
                    </button>
                    <button
                      class="el-carousel__arrow el-carousel__arrow--left imgPass3"
                      v-else
                    >
                      <i class="fas fa-minus"></i>
                    </button>
                    <p class="timeImg">
                      {{
                        item.timeCheckIn
                          ? item.timeCheckIn.substring(0, 16)
                          : ""
                      }}
                    </p>
                    <img
                      class="image-call"
                      :style="{ transform: 'rotate(' + item.rotate + 'deg)' }"
                      :src="
                        baseUrl +
                          'ImgCall/' +
                          item.idCall +
                          '/' +
                          item.type +
                          '?token=' +
                          token
                      "
                      alt
                    />
                  </el-carousel-item>
                </el-carousel>

                <el-card shadow="never" :body-style="{ padding: '15px' }">
                  <div>
                    <b>{{ curCall.EmployeeName }}</b> tại
                    {{ curCall.Location }}
                    <el-tooltip content="Xem trên map" placement="top">
                      <el-button
                        @click="
                          openLocation(
                            curCall.LatitudeCheckIn,
                            curCall.LongitudeCheckIn
                          )
                        "
                        type="text"
                        style="color:#8e44ad"
                      >
                        <i class="fas fa-map-marker-alt"></i>
                      </el-button>
                    </el-tooltip>
                  </div>
                  <div>
                    <el-input
                      placeholder="Nhập ghi chú (lý do)"
                      size="medium"
                      v-model="curCall.Note"
                      style="margin-bottom:10px"
                    ></el-input>
                    <el-button
                      size="mini"
                      icon="el-icon-close"
                      @click="EvaluateImgCall(5)"
                      :type="
                        curCall.Status == 5 &&
                        curCall.CallApprove == curCall.IDCall
                          ? 'danger'
                          : 'default'
                      "
                      >Không đạt</el-button
                    >
                    <el-button
                      size="mini"
                      icon="el-icon-check"
                      @click="EvaluateImgCall(3)"
                      :type="
                        curCall.Status == 3 &&
                        curCall.CallApprove == curCall.IDCall
                          ? 'success'
                          : 'default'
                      "
                      >Đạt</el-button
                    >

                    <el-button
                      size="mini"
                      v-show="curCall.Note != curCall.oImgNote"
                      @click="undoEva"
                      type="warning"
                      ><i class="fas fa-undo"></i
                    ></el-button>
                    <i
                      class="el-icon-loading"
                      style="font-size:20px;float:right"
                      v-show="evaluating"
                    ></i>
                  </div>
                </el-card>
                <div style="text-align:center;margin-top:10px"></div>
              </div>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Hủy lịch" effect="light">
              <el-button
                v-if="modeAdmin"
                @click="del(scope.row)"
                type="text"
                style="color:red;"
                ><i class="el-icon-delete"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Tiêu đề">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tiêu đề">
            {{ scope.row.Title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Thời gian">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian">
            {{ Date.parse(scope.row.TimeStart).toString("HH:mm") }} -
            {{ Date.parse(scope.row.TimeEnd).toString("HH:mm") }}
            {{ Date.parse(scope.row.TimeEnd).toString(" dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Số lượng" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số lượng">
            {{ scope.row.NumEmCheck }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="120px"
        label="Người tạo"
        align="center"
        v-if="modeAdmin"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        label="Ngày tạo"
        align="center"
        v-if="modeAdmin"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:mm dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:0;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-calendar-alt"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create @addOK="addOK"></create>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {
  GetScheduleCheckLst,
  DelScheduleCheck,
  GetCallWithImgInfo,
  ApproveUniform,
  GetImgInfoInCall,
  GetResultCheck
} from "@/api/call";
import Create from "./component/createSchedule";
import { getStartMonth, getEndMonth } from "@/api/index";
import baseUrl from "@/utils/baseUrl";
import { getToken } from "@/utils/auth";
export default {
  filters: {},
  components: { Create },
  props: {},
  data() {
    return {
      tableData: [],
      curImgs: [],
      curCall: {},
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      imgLoading: false,
      evaluating: false,
      loadingEx: false,
      titleDialog: "",
      LinkUrl: "",
      employeeS: "",

      dateStart: getStartMonth(),
      dateEnd: getEndMonth(),
      token: getToken(),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      typeEm: Cookies.get("otc"),
      userName: Cookies.get("idEmployee"),
      modeAdmin: ""
    };
  },
  methods: {
    create() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo lịch check đồng phục";
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd
      };
      GetScheduleCheckLst(req).then(res => {
        this.tableData = res.ScheduleCheckLst;
        this.loadingTableData = false;
      });
    },

    del(row) {
      DelScheduleCheck({ IDHeader: row.RowID }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Hủy lịch check đồng phục thành công",
            type: "success",
            position: "top-left"
          });
          this.fetchData();
        }
      });
    },
    exportResult() {
      this.downloading = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd
      };
      GetResultCheck(req).then(res => {
        if (res.RespCode == 0) {
          this.ExportExcel(res.ResultLst);
        }
      });
    },
    ExportExcel(data) {
      const tHeader = [
        "Tên nhân viên",
        "Nhóm",
        "Mã nhân viên",
        "Số điện thoại",
        "Tổng số lần check",
        "Đạt",
        "Không đạt",
        "Ghi chú"
      ];
      const filterVal = [
        "EmployeeName",
        "GroupID",
        "EmployeeCode",
        "EmployeeID",
        "CountAll",
        "CountEn",
        "CountDis",
        "Note"
      ];
      var data2 = this.formatJson(filterVal, data);

      var self = this;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data2,
          filename:
            "Kết quả check đồng phục từ " +
            Date.parse(self.dateStart).toString("dd/MM/yyyy") +
            " đến " +
            Date.parse(self.dateEnd).toString("dd/MM/yyyy"),
          autoWidth: true, //Optional
          bookType: "xlsx" //Optional
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j == "Status") {
            switch (v[j]) {
              case 3:
                return "Ảnh đạt";
                break;
              case 5:
                return "Ảnh không đạt";
                break;
              default:
                return "Chưa đánh giá";
                break;
            }
          } else {
            return v[j];
          }
        })
      );
    },
    dowloadSample() {
      window.open(
        "https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/sampleUN.xlsx?alt=media&token=d5709d61-300d-4069-a4cd-96eda087cbb5"
      );
    },
    expandRow(row, expandedRows) {
      this.loadingEx = true;
      const req = {
        IDHeader: row.RowID,
        DateStart: row.TimeStart,
        DateEnd: row.TimeEnd,
        EmployeeS: row.employeeS ? row.EmployeeS : ""
      };
      GetCallWithImgInfo(req).then(res => {
        if (res.RespCode == 0) {
          res.CallLst.forEach(e => {
            e.curImgs = null;
            e.isview = false;
            e.oImgNote = e.Note;
            e.oCallPass = e.Status;
          });
          row.lines = res.CallLst;
          if (row.lines.length > 0) {
            this.curCall = row.lines[0];
            this.viewImgs(this.curCall);
          }
          this.loadingEx = false;
        }
      });
    },
    viewImgs(call) {
      this.curCall.isview = false;
      var id = call.IDCall;

      call.isview = true;
      this.curCall = call;
      if (!this.curCall.curImgs) {
        this.imgLoading = true;

        GetImgInfoInCall({ idCall: id }).then(res => {
          for (var i in res.Data) {
            res.Data[i].rotate = 0;
          }
          this.curCall.curImgs = res.Data;
          this.imgLoading = false;
        });
      }
    },
    undoEva() {
      this.curCall.Note = this.curCall.oImgNote;
      this.curCall.Status = this.curCall.oCallPass;
    },
    EvaluateImgCall(val) {
      this.evaluating = true;
      const req = {
        RowID: this.curCall.RowID,
        IDCall: this.curCall.IDCall,
        IDGroup: this.curCall.IDGroup,
        Note: this.curCall.Note,
        Status: val
      };
      ApproveUniform({ CallInfo: req })
        .then(res => {
          if (res.RespCode === 0) {
            this.evaluating = false;
            this.curCall.Status = val;
            this.curCall.oImgNote = this.curCall.Note;
            this.curCall.CallApprove = this.curCall.IDCall;
            this.curCall.oCallPass = this.curCall.Status;
            this.curCall.ApproveID = this.userName;
            //this.expandRow(row);
          }
        })
        .catch(() => {
          this.curCall.Status = this.curCall.oCallPass;
          this.curCall.Note = this.curCall.oImgNote;
        });
    },
    exportLine(data) {
      const tHeader = [
        "Nhân viên",
        "ID",
        "Nhóm",
        "Thời gian check",
        "Địa điểm check",
        "Kế hoạch Call",
        "Khách hàng tổ chức",
        "Khách hàng cá nhân",
        "Số ảnh",
        "Người duyệt ảnh",
        "Kết quả duyệt",
        "Ghi chú ảnh"
      ];
      const filterVal = [
        "EmployeeName",
        "EmployeeID",
        "IDGroup",
        "TimeCheckIn",
        "Location",
        "Plan",
        "PlaceName",
        "NameCustomer",
        "NumImgs",
        "ApproveID",
        "Status",
        "Note"
      ];
      var data2 = this.formatJson(filterVal, data.lines);
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data2,
          filename: "Báo cáo " + data.Title, //Optional
          autoWidth: true, //Optional
          bookType: "xlsx" //Optional
        });
      });
      this.downloading = false;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.Note == "NGHỈ PHÉP") {
        return "warning-row";
      }
      return "";
    }
  },
  computed: {
    baseUrl() {
      return baseUrl;
    }
  },
  created() {
    if (this.typeEm == 26 || this.typeEm == 10) {
      this.modeAdmin = true;
    }
    this.fetchData();
  },
  watch: {
    dateStart() {
      this.fetchData();
    },
    dateEnd() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
  .inline-block {
    display: inline-block;
  }
}
.warning-row {
  background: oldlace;
}
.side {
  /* border: 1px solid red; */
  height: 100%;
}
.h-select {
  width: 100%;
}
.image-call {
  width: 100%;
  height: 100%;
  background: transparent;
  object-fit: contain;
}

.call-image-title {
  text-align: bottom;
  margin-right: 10px;
}
.call-info-item-title {
  float: left;
  text-align: bottom;
  margin-right: 10px;
}
.btn-rotate-left {
  position: absolute;
  z-index: 10;
}
.btn-rotate-right {
  position: absolute;
  z-index: 10;
  right: 0;
}
.call-info-item-content {
  margin-left: 10px;
  text-align: bottom;
  color: rgb(27, 27, 27);
}
.imgPass1 {
  font-size: 24px;
  color: #2ecc71;
  top: auto;
  bottom: 20px;
}
.imgPass2 {
  font-size: 24px;
  color: #c0392b;
  top: auto;
  bottom: 20px;
}
.imgPass3 {
  font-size: 24px;
  color: #f1c40f;
  top: auto;
  bottom: 20px;
}

.timeImg {
  position: absolute;
  z-index: 15;
  top: auto;
  bottom: 20px;
  right: 10px;
}
</style>
<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
