<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px; border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-input
          v-model="search"
          size="small"
          placeholder="Tên NV | MNV"
        ></el-input>
      </div>
      <div class="inline-block">
        <el-button
          type="primary"
          size="small"
          icon="el-icon-refresh"
          @click="search = ''"
        ></el-button>
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
            type="success"
            @click="exportResult"
            :loading="downloading"
            size="small"
            ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
          >
        </div>
      </div>
      <div style="clear: both;"></div>
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="
        tableData.filter(
          data =>
            !search ||
            data.EmployeeName.toLowerCase().includes(search.toLowerCase()) ||
            data.EmployeeCode.toLowerCase().includes(search.toLowerCase())
        )
      "
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
              <el-table
                :data="scope.row.lines"
                v-loading="loadingEx"
                element-loading-text="Loading"
                style="width:100%"
                height="450px"
                size="small"
                border
                fit
                highlight-current-row
              >
                <el-table-column align="center" label="STT" width="90">
                  <template slot-scope="props"
                    >{{ props.$index + 1 }}
                    <el-tooltip content="Xem ảnh" effect="light">
                      <el-button
                        icon="el-icon-view"
                        type="text"
                        @click="viewImgs(props.row)"
                      ></el-button
                    ></el-tooltip>
                  </template>
                </el-table-column>
                <el-table-column label="" min-width="180">
                  <template slot-scope="{ row }">{{ row.Title }}</template>
                </el-table-column>
                <el-table-column
                  align="center"
                  width="140px"
                  label="Trạng thái"
                >
                  <template slot-scope="{ row }">
                    <el-tag
                      style="width:120px"
                      effect="plain"
                      :type="row.Status | toStatusColor"
                      >{{ row.Status | toStatusText }}</el-tag
                    >
                  </template>
                </el-table-column>

                <el-table-column label="Nhân viên" width="220">
                  <template slot-scope="{ row }">{{
                    row.EmployeeName
                  }}</template>
                </el-table-column>
                <el-table-column label="Số điện thoại" width="120">
                  <template slot-scope="{ row }">{{ row.EmployeeID }}</template>
                </el-table-column>
                <el-table-column label="Nhóm" min-width="150">
                  <template slot-scope="{ row }">{{ row.GroupID }}</template>
                </el-table-column>
                <el-table-column label="Người duyệt" width="200">
                  <template slot-scope="{ row }">{{
                    row.ApproveName
                  }}</template>
                </el-table-column>
                <el-table-column label="Ghi chú" min-width="150">
                  <template slot-scope="{ row }">{{ row.Note }}</template>
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
              <el-carousel height="500px" v-loading="imgLoading">
                <el-carousel-item v-for="(item, index) in curImgs" :key="index">
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
                    onerror="this.onerror = null; this.src = 'https://www.360do.com.vn/uploads/nopicture.jpg';"
                  />
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column align="center" width="90">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Nhân viên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhân viên">
            [{{ scope.row.EmployeeCode }}] - {{ scope.row.EmployeeName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="SĐT">
        <template slot-scope="scope">
          <div class="dat-cell" label="SĐT">
            {{ scope.row.EmployeeID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="160px" label="Tổng số lần check" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tổng số lần check">
            {{ scope.row.CountAll }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="80px" label="Đạt" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đạt">
            {{ scope.row.CountEn }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="110px" label="không đạt" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="không đạt">
            {{ scope.row.CountDis }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="140px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
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
  </div>
</template>

<script>
import Cookies from "js-cookie";
import {
  GetImgInfoInCall,
  GetResultCheck,
  GetDetailResultCheck
} from "@/api/call";
import { getStartMonth, getEndMonth } from "@/api/index";
import baseUrl from "@/utils/baseUrl";
import { getToken } from "@/utils/auth";
export default {
  filters: {
    toStatusText(val) {
      if (val == 1) {
        return "Chưa đánh giá";
      } else if (val == 3) {
        return "Đạt";
      } else if (val == 5) {
        return "Không đạt";
      } else {
        return "Khác";
      }
    },
    toStatusColor(val) {
      if (val == 0) {
        return "info";
      } else if (val == 3) {
        return "success";
      } else if (val == 5) {
        return "danger";
      } else {
        return "warning";
      }
    }
  },
  components: {},
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
      search: "",
      dateStart: getStartMonth(),
      dateEnd: getEndMonth(),
      token: getToken(),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      typeEm: Cookies.get("otc"),
      userName: Cookies.get("idEmployee")
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd
      };
      GetResultCheck(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ResultLst;
          this.loadingTableData = false;
        }
      });
    },

    ExportExcel() {
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
      var data = this.tableData;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename:
            "Kết quả check đồng phục từ " +
            Date.parse(this.dateStart).toString("dd/MM/yyyy") +
            " đến " +
            Date.parse(this.dateEnd).toString("dd/MM/yyyy"),
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
    expandRow(row, expandedRows) {
      this.loadingEx = true;
      const req = {
        DateStart: this.dateStart,
        DateEnd: this.dateEnd,
        EmployeeID: row.EmployeeID
      };
      GetDetailResultCheck(req).then(res => {
        if (res.RespCode == 0) {
          row.lines = res.DetailResultLst;
          this.viewImgs(row.lines[0]);
          this.loadingEx = false;
        }
      });
    },
    viewImgs(call) {
      this.imgLoading = true;
      GetImgInfoInCall({ idCall: call.IDCall }).then(res => {
        this.curImgs = res.Data;
        this.imgLoading = false;
      });
    }
  },
  computed: {
    baseUrl() {
      return baseUrl;
    }
  },
  created() {
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
