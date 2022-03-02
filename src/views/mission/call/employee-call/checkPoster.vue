<template>
  <div style="background:white">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="18" class="side">
        <el-row id="c-img-header">
          <!-- <el-col :xs="24" :sm="24" :lg="6" class="side">
            <el-select
              class="h-select"
              v-model="currentType"
              placeholder="Select"
            >
              <el-option
                v-for="group in typeMission"
                :key="group.type"
                :label="group.name"
                :value="group.type"
              ></el-option>
            </el-select>
          </el-col> -->
          <el-col :xs="24" :sm="24" :lg="12" class="side">
            <el-row>
              <el-col :span="12">
                <el-date-picker
                  class="h-select"
                  v-model="DateBegin"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="Thời gian bắt đầu"
                  default-time="12:00:00"
                ></el-date-picker>
              </el-col>
              <el-col :span="12">
                <el-date-picker
                  class="h-select"
                  v-model="DateEnd"
                  type="datetime"
                  value-format="yyyy-MM-dd HH:mm"
                  placeholder="Thời gian kết thúc"
                  default-time="12:00:00"
                ></el-date-picker>
              </el-col>
            </el-row>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="6">
            <el-button
              style="margin-left:10px"
              type="primary"
              icon="el-icon-refresh"
              class="inline-block"
              @click="fetchData"
            ></el-button>
            <el-button
              :loading="downloading"
              type="success"
              icon="el-icon-document"
              @click="exportReport"
              class="inline-block"
              >Báo cáo</el-button
            >
          </el-col>
        </el-row>
        <el-row>
          <el-table
            ref="checkImgTable"
            @filter-change="filterFire"
            :header-cell-style="{ padding: '5px 0px' }"
            :cell-style="{ padding: '5px 0px' }"
            :data="tableData"
            v-loading="isLoading"
            :header-row-style="{ color: '#2f3640' }"
            style="width: 100%"
            :max-height="tableHeight"
            border
          >
            <el-table-column align="center" width="75px" label="STT">
              <template slot-scope="scope">{{
                scope.$index + 1 + (CurrentPage - 1) * RowspPage
              }}</template>
            </el-table-column>
            <el-table-column
              align="center"
              width="120px"
              label="Trạng thái"
              column-key="Status"
              prop="Status"
              :filters="[
                { text: 'Ảnh đạt', value: 3 },
                { text: 'Không đạt', value: 5 },
                { text: 'Chưa check', value: 0 }
              ]"
            >
              <template slot-scope="{ row }">
                <el-button
                  :type="
                    row.NumImg > 0
                      ? row.Status == 3
                        ? 'success'
                        : row.Status == 5
                        ? 'danger'
                        : 'warning'
                      : 'info'
                  "
                  :plain="!row.isview"
                  size="small"
                  @click="viewImgs(row)"
                >
                  Xem ({{ row.NumImg }}) <i class="fas fa-images"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column label="Tên nhân viên" width="150">
              <el-input
                slot="header"
                size="small"
                :disabled="modeAdmin ? false : true"
                placeholder="Nhân viên"
                v-model="employeeSearch"
              >
                <el-tooltip
                  slot="suffix"
                  content="Tìm theo tên hoặc SĐT"
                  placement="top"
                  v-if="modeAdmin"
                >
                  <el-button @click="fetchData" type="text"
                    ><i style="margin-right: 10px;" class="el-icon-search"></i
                  ></el-button>
                </el-tooltip>
              </el-input>
              <template slot-scope="{ row }">{{ row.EmployeeName }}</template>
            </el-table-column>
            <el-table-column label="Nhóm" width="200">
              <el-input
                slot="header"
                size="small"
                placeholder="Nhóm"
                v-model="groupSearch"
              >
                <el-tooltip
                  slot="suffix"
                  content="Tìm theo tên nhóm"
                  placement="top"
                >
                  <el-button @click="fetchData" type="text"
                    ><i style="margin-right: 10px;" class="el-icon-search"></i
                  ></el-button>
                </el-tooltip>
              </el-input>
              <template slot-scope="{ row }">{{ row.GroupID }}</template>
            </el-table-column>
            <el-table-column label="Nội dung call" width="150">
              <el-input
                slot="header"
                size="small"
                placeholder="Nội dung"
                v-model="titleSearch"
              >
                <el-tooltip
                  slot="suffix"
                  content="Tìm theo nội dung call"
                  placement="top"
                >
                  <el-button @click="fetchData" type="text"
                    ><i style="margin-right: 10px;" class="el-icon-search"></i
                  ></el-button>
                </el-tooltip>
              </el-input>
              <template slot-scope="{ row }">{{ row.Plan }}</template>
            </el-table-column>
            <el-table-column label="Mã QR" min-width="340">
              <template slot-scope="{ row }">
                <el-link target="_blank" :href="row.Note">{{
                  row.Note
                }}</el-link>
              </template>
            </el-table-column>
            <el-table-column label="CheckIn" width="160">
              <template slot-scope="{ row }">{{
                row.TimeCheckIn ? row.TimeCheckIn.substring(0, 19) : ""
              }}</template>
            </el-table-column>
            <el-table-column width="250">
              <el-input
                slot="header"
                size="small"
                placeholder="Địa điểm"
                v-model="placeSearch"
              >
                <el-tooltip
                  slot="suffix"
                  content="Tìm theo mã khách hàng"
                  placement="top"
                >
                  <el-button @click="fetchData" type="text"
                    ><i style="margin-right: 10px;" class="el-icon-search"></i
                  ></el-button>
                </el-tooltip>
              </el-input>
              <template slot-scope="{ row }"
                >[{{ row.PlaceID }}] {{ row.PlaceName }}</template
              >
            </el-table-column>
            <el-table-column label="Khách hàng" width="150">
              <template slot-scope="{ row }">{{ row.CustomerName }}</template>
            </el-table-column>

            <el-table-column label="Người check ảnh" width="150">
              <template slot-scope="{ row }">{{ row.ApproveName }}</template>
            </el-table-column>
            <el-table-column label="Ghi chú" width="150">
              <template slot-scope="{ row }">{{ row.CheckNote }}</template>
            </el-table-column>
          </el-table>
          <el-pagination
            class="pagination"
            style="margin-top:10px"
            :total="TotalRows"
            :page-size.sync="RowspPage"
            :current-page.sync="CurrentPage"
            @current-change="fetchData"
            background
            layout="total,-> , prev, pager, next, sizes"
          ></el-pagination>
        </el-row>
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
            v-if="curCall.NumImg == 0"
            style="width: 100%;height: 500px;text-align: center;vertical-align: middle;line-height: 500px;font-size: 32px;"
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
                v-if="curCall.Status == 3"
              >
                <i class="fas fa-check"></i>
              </button>
              <button
                class="el-carousel__arrow el-carousel__arrow--left imgPass2"
                v-else-if="curCall.Status == 5"
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
                {{ item.timeCheckIn ? item.timeCheckIn.substring(0, 16) : "" }}
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
              {{ curCall.NameLocationCheckIn }}
              <el-tooltip content="Xem trên map" placement="top">
                <el-button
                  @click="
                    openLocation(
                      curCall.LatitudeCheckIn,
                      curCall.LongtitudeCheckIn
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
              <el-select
                v-model="curCall.TypePoster"
                style="width:100%"
                placeholder="Chọn loại Poster"
              >
                <el-option
                  v-for="(item, index) in typeLst"
                  :key="index"
                  :label="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <div v-if="curCall.TypePoster" style="margin-top:5px">
                <el-input
                  placeholder="Nhập ghi chú (lý do)"
                  size="medium"
                  v-model="curCall.CheckNote"
                  style="margin-bottom:10px"
                ></el-input>
                <el-button
                  size="mini"
                  icon="el-icon-close"
                  @click="EvaluateImgCall(5)"
                  :type="curCall.Status == 5 ? 'danger' : 'default'"
                  >Không đạt</el-button
                >
                <el-button
                  size="mini"
                  icon="el-icon-check"
                  @click="EvaluateImgCall(3)"
                  :type="curCall.Status == 3 ? 'success' : 'default'"
                  >Đạt</el-button
                >
              </div>
              <el-button
                size="mini"
                v-show="curCall.CheckNote != curCall.oImgNote"
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
  </div>
</template>
<script>
import {
  GetCallPoster3D,
  GetImgInfoInCall,
  ApprovePoster3D,
  EvaluateCallImg,
  ReportCallImgs
} from "@/api/call";
import { parseTime } from "@/utils";
import resizeTable from "@/views/mixin/resizeTable";
import { getToken } from "@/utils/auth";
import baseUrl from "@/utils/baseUrl";
import Cookies from "js-cookie";
export default {
  mixins: [resizeTable],
  data() {
    return {
      typeMission: [
        { type: 1, name: "Check Ảnh" },
        { type: 2, name: "Check Poster" },
        { type: 3, name: "Tất cả" }
      ],
      typeLst: [{ value: "Hô hấp" }, { value: "Tiêu hóa" }, { value: "Mắt" }],
      currentType: 3,
      DateBegin: null,
      DateEnd: null,
      tableData: [],
      curImgs: [],
      curCall: {},
      isLoading: false,
      isTypePoster: false,
      tableHeight: "",
      downloading: false,
      imgLoading: false,
      evaluating: false,
      checked: "",
      TotalRows: 0,
      RowspPage: 10,
      CurrentPage: 1,
      employeeSearch: "",
      groupSearch: "",
      titleSearch: "",
      placeSearch: "",
      queryPara: null,
      typeEm: Cookies.get("otc"),
      emID: Cookies.get("idEmployee"),
      modeAdmin: ""
    };
  },
  computed: {
    token() {
      return getToken();
    },
    baseUrl() {
      return baseUrl;
    }
  },
  methods: {
    filterFire(filters) {
      this.queryPara.filter = [];
      var cols = this.$refs.checkImgTable.columns;
      var mapF = { Status: "Status" };
      cols.forEach(e => {
        let prop = e["property"];
        let vals = e["filteredValue"];
        if (prop == "Status") {
          if (vals.length > 0) {
            //this.queryPara.filter.push({ col: mapF[prop], value: vals });
            //console.log(vals);
          }
        }
      });
      this.fetchData();
    },
    openLocation(la, lo) {
      var url = "http://maps.google.com/maps?q=" + la + "," + lo;
      window.open(url);
    },
    undoEva() {
      this.curCall.CheckNote = this.curCall.oImgNote;
      this.curCall.Status = this.curCall.oCallPass;
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.isview) {
        return "warning-row";
      }
      return "warning-row";
    },
    EvaluateImgCall(val) {
      if (!this.curCall.TypePoster) {
        this.$notify({
          title: "Lỗi",
          message: "Chưa chọn loại Poster",
          type: "error",
          position: "top-left"
        });
        return;
      }
      this.evaluating = true;
      this.curCall.Distance_Err = this.HaversineInKM(
        this.curCall.LatitudeCheckIn,
        this.curCall.LongtitudeCheckIn,
        this.curCall.LatitudePlace,
        this.curCall.LongtitudePlace
      );
      const req = {
        IDCall: this.curCall.IDCall,
        CheckNote: this.curCall.CheckNote,
        PlaceID: this.curCall.PlaceID,
        Note: this.curCall.Note,
        TypePoster: this.curCall.TypePoster,
        TimeCheckIn: this.curCall.TimeCheckIn,
        EmployeeID: this.curCall.EmployeeID,
        City: this.curCall.City,
        LatitudeCheckIn: this.curCall.LatitudeCheckIn,
        LongtitudeCheckIn: this.curCall.LongtitudeCheckIn,
        Distance_Err: this.curCall.Distance_Err,
        Status: val
      };
      //console.log(req);
      ApprovePoster3D({ CallInfo: req })
        .then(res => {
          if (res.RespCode === 0) {
            this.evaluating = false;
            this.curCall.Status = val;
            this.curCall.oImgNote = this.curCall.CheckNote;
            this.curCall.oCallPass = this.curCall.Status;
          }
        })
        .catch(() => {
          this.curCall.Status = this.curCall.oCallPass;
          this.curCall.CheckNote = this.curCall.oImgNote;
        });
      //   EvaluateCallImg({
      //     idCall: this.curCall.IDCall,
      //     note: this.curCall.imgNote,
      //     pass: val
      //   })
      //     .then(res => {
      //       this.evaluating = false;
      //       this.curCall.Status = val;
      //       this.curCall.oImgNote = this.curCall.imgNote;
      //       this.curCall.oCallPass = this.curCall.Status;
      //     })
      //     .catch(() => {
      //       this.curCall.Status = this.curCall.oCallPass;
      //       this.curCall.imgNote = this.curCall.oImgNote;
      //     });
    },
    /*Hàm tính khoảng cách giữa 2 tọa độ checkin theo công thức Haversine*/
    HaversineInKM(lat1, long1, lat2, long2) {
      let _eQuatorialEarthRadius = 6378.137;
      let _d2r = Math.PI / 180.0;
      var dlong = (long2 - long1) * _d2r;
      var dlat = (lat2 - lat1) * _d2r;
      var a =
        Math.pow(Math.sin(dlat / 2.0), 2.0) +
        Math.cos(lat1 * _d2r) *
          Math.cos(lat2 * _d2r) *
          Math.pow(Math.sin(dlong / 2.0), 2.0);
      var c = 2.0 * Math.atan2(Math.sqrt(a), Math.sqrt(1.0 - a));
      var d = _eQuatorialEarthRadius * c;
      const toFixedNumber = (toFixTo = 2, base = 10) => num => {
        const pow = Math.pow(base, toFixTo);
        return +(Math.round(num * pow) / pow);
      };
      return d;
    },
    exportReport() {
      // this.$notify({
      //   title: "Xảy ra lỗi",
      //   message: "Tính năng đang được phát triển",
      //   type: "warning",
      //   position: "top-left"
      // });
      this.downloading = true;
      var req = {
        groupS: this.groupSearch.trim(),
        employeeS: this.employeeSearch.trim(),
        titleS: this.titleSearch.trim(),
        placeS: this.placeSearch.trim(),
        filterCallPassValues: this.queryPara,
        PageNumber: 1,
        RowspPage: 10000,
        DateStart: this.DateBegin,
        DateEnd: this.DateEnd
      };
      GetCallPoster3D(req)
        .then(res => this.exportEXL(res.CallPoster3DLst))
        .catch(res => this.exportEXL(res.CallPoster3DLst));
    },
    exportEXL(data) {
      const tHeader = [
        "Nhân viên",
        "ID",
        "Nhóm",
        "Thời gian check",
        "Địa điểm check",
        "Loại nhiệm vụ",
        "Kế hoạch Call",
        "Khách hàng tổ chức",
        "Mã KHTC",
        "Khách hàng cá nhân",
        "Số ảnh",
        "Người duyệt ảnh",
        "Kết quả duyệt",
        "Ghi chú ảnh",
        "Loại Poster",
        "Mã QR"
      ];
      const filterVal = [
        "EmployeeName",
        "EmployeeID",
        "GroupID",
        "TimeCheckIn",
        "NameLocationCheckIn",
        "TypeMission",
        "Plan",
        "PlaceName",
        "PlaceID",
        "CustomerName",
        "NumImg",
        "ApproveName",
        "Status",
        "CheckNote",
        "TypePoster",
        "Note"
      ];
      var data2 = this.formatJson(filterVal, data);

      var self = this;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: data2,
          filename:
            "Báo cáo từ " +
            self.DateBegin +
            " đến " +
            self.DateEnd +
            "-" +
            this.typeMission[this.currentType - 1].name +
            "-" +
            this.groupSearch.trim() +
            "-" +
            this.employeeSearch.trim() +
            "-" +
            this.titleSearch.trim(), //Optional
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

    fetchData() {
      this.curCall = {};
      if (!this.DateBegin || !this.DateEnd) return;
      if (!this.checkDate()) {
        this.tableData = [];
        return;
      }
      this.tableData = [];
      this.isLoading = true;
      var req = {
        groupS: this.groupSearch.trim(),
        employeeS: this.employeeSearch.trim(),
        titleS: this.titleSearch.trim(),
        placeS: this.placeSearch.trim(),
        filterCallPassValues: this.queryPara,
        PageNumber: this.CurrentPage,
        RowspPage: this.RowspPage,
        DateStart: this.DateBegin,
        DateEnd: this.DateEnd
      };
      //   if (this.queryPara.filter != null) {
      //     req.filter = this.queryPara.filter;
      //   }
      GetCallPoster3D(req).then(res => {
        this.TotalRows = res.TotalRows;
        this.isLoading = false;
        res.CallPoster3DLst.forEach(e => {
          e.curImgs = null;
          e.isview = false;
          e.oImgNote = e.CheckNote;
          e.oCallPass = e.Status;
        });
        this.tableData = res.CallPoster3DLst;
        if (this.tableData.length > 0) {
          this.curCall = this.tableData[0];
          this.viewImgs(this.curCall);
          //console.log(this.curCall);
        }
      });
    },
    changeTableHeight() {
      this.tableHeight =
        document.body.offsetHeight -
        document.getElementById("c-img-header").clientHeight -
        105;
    },
    checkDate() {
      // var diff = new Date(this.DateEnd) - new Date(this.DateBegin);
      // if(diff>864000000||diff<-864000000){
      //   this.$message({
      //       message: "Chọn khoảng thời gian trong vòng 10 ngày",
      //       type: "error"
      //     });
      //     return false;
      // }
      return true;
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
    }
  },
  mounted() {},

  created() {
    this.DateBegin = new Date().toISOString().substring(0, 10) + " 00:00";
    this.DateEnd = new Date().toISOString().substring(0, 10) + " 23:00";
    if (this.typeEm == 29 || this.typeEm == 10) {
      this.modeAdmin = true;
      this.employeeSearch = "";
    } else {
      this.employeeSearch = this.emID;
      this.RowspPage = 100;
    }
    this.fetchData();
  },

  watch: {
    RowspPage() {
      this.fetchData();
    },
    CurrentPage() {
      this.fetchData();
    },
    "curCall.imgNote": function(o, n) {
      if (this.curCall.oImgNote != this.curCall.imgNote) {
        this.curCall.Status = null;
      }
    }
  }
};
</script>
<style scoped>
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
