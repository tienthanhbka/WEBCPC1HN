<template>
  <div class="employee-mission-container">
    <div>
      <div class="inline-block">
        <span></span>
        <el-date-picker
          placeholder="pick a date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateBegin"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <span>đến</span>
        <el-date-picker
          placeholder="pick a date"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <el-input
          placeholder="Search"
          v-model="TextSearch"
          class="input-with-select"
        >
          <!-- <el-select slot="prepend" placeholder="Select">
                    <el-option label="Tên nhiệm vụ" value="1"></el-option>
                    <el-option label="Loại nhiệm vụ" value="2"></el-option>
          </el-select>-->
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="fetchData"
          ></el-button>
        </el-input>
      </div>

      <el-button
        type="primary"
        icon="el-icon-refresh"
        @click="fetchData"
      ></el-button>
      <el-button
        :loading="downloading"
        type="success"
        icon="el-icon-document"
        @click="exportCall"
        >Xuất báo cáo</el-button
      >
    </div>

    <div>
      <el-table
        ref="myCallTable"
        :data="tableData"
        v-loading="isLoading"
        fit
        style="width: 100%"
        @expand-change="expandRow"
        @filter-change="filterFire"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <call-info
              :imageLoaded="scope.row.imageLoaded"
              :call="scope.row"
            ></call-info>
          </template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{
            scope.$index + 1 + (currentPage - 1) * pageSize
          }}</template>
        </el-table-column>
        <el-table-column
          prop="evaluate"
          label="Đánh giá"
          width="95"
          align="center"
          column-key="evaluate"
          :filters="[
            { text: 'Đã đánh giá', value: '10' },
            { text: 'Chưa đánh giá', value: '0' }
          ]"
        >
          <template slot-scope="scope">
            <el-checkbox :value="scope.row.status == 10"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          width="200"
          align="center"
          column-key="status"
          prop="status"
          :filters="[{ text: 'Có ảnh', value: 11 }]"
        >
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | callStatusColor">{{
              scope.row.status | callStatusText
            }}</el-tag>
            <el-tag v-if="scope.row.numImg > 0" type="info"
              >{{ scope.row.numImg }} ảnh</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="Checkin" width="150" align="center">
          <template slot-scope="scope">
            <el-tooltip
              :content="
                scope.row.timeCheckIn.substring(0, 16) +
                  ' -- ' +
                  scope.row.nameLocationCheckIn
              "
              placement="top"
            >
              <div>
                {{ scope.row.timeCheckIn.substring(0, 16) }}
                <el-button
                  @click="
                    openLocation(
                      scope.row.latitudeCheckIn,
                      scope.row.longitudeCheckIn
                    )
                  "
                  type="text"
                  style="color:#8e44ad"
                >
                  <i class="fas fa-map-marker-alt"></i>
                </el-button>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Checkout" width="150" align="center">
          <template slot-scope="scope">
            <el-tooltip
              :content="
                scope.row.timeCheckOut.substring(0, 16) +
                  ' -- ' +
                  scope.row.nameLocationCheckOut
              "
              placement="top"
            >
              <div>
                {{ scope.row.timeCheckOut.substring(0, 16) }}
                <el-button
                  @click="
                    openLocation(
                      scope.row.latitudeCheckOut,
                      scope.row.longitudeCheckOut
                    )
                  "
                  type="text"
                  style="color:#8e44ad"
                >
                  <i class="fas fa-map-marker-alt"></i>
                </el-button>
              </div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="nameMission"
          width="300"
          label="Tên nhiệm vụ"
        ></el-table-column>
        <el-table-column
          prop="namePlace"
          label="Khách hàng tổ chức"
          width="300"
        ></el-table-column>
        <el-table-column
          prop="nameCustomer"
          width="170"
          label="Khách hàng cá nhân"
        ></el-table-column>
        <el-table-column
          prop="plan"
          label="Nội dung"
          width="300"
        ></el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :total="dataLength"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        layout="total,-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CallInfo from "../components/callInfo";
import { GetMyCall, GetImgInfoInCall } from "@/api/call";
import { getStartDate, getEndDate } from "@/api/index";
import { parseTime } from "@/utils";
import { log } from "util";
import baseUrl from "@/utils/baseUrl";
export default {
  components: {
    CallInfo
  },
  data() {
    return {
      downloading: false,
      isLoading: false,
      count: 100,
      DateBegin: getStartDate(),
      DateEnd: getEndDate(),
      TextSearch: "",
      currentPage: 1,
      dataLength: 0,
      pageSize: 10,
      tableData: [],
      queryPara: {}
    };
  },
  methods: {
    filterFire(filters) {
      this.queryPara.filter = [];
      var cols = this.$refs.myCallTable.columns;
      var mapF = { evaluate: "evaluate", status: "status" };
      cols.forEach(e => {
        let prop = e["property"];
        let vals = e["filteredValue"];
        if (prop == "evaluate" || prop == "status") {
          if (vals.length > 0) {
            this.queryPara.filter.push({ col: mapF[prop], value: vals });
          }
        }
      });

      //this.queryPara.filter = [{col:'evaluate',value:filters[Object.keys(filters)[0]]}];
      this.fetchData();
    },

    expandRow(row) {
      if (row.numImg > 0 && row.image == null) {
        GetImgInfoInCall({ idCall: row.idCall }).then(res => {
          for (var i in res.Data) {
            res.Data[i].rotate = 0;
          }
          row.image = res.Data;
        });
      }
    },
    openLocation(la, lo) {
      var url = "http://maps.google.com/maps?q=" + la + "," + lo;
      window.open(url);
    },
    exportCall() {
      this.downloading = true;
      const tHeader = [
        "Mã Call",
        "ID Group",
        "ID Nhân viên",
        "Tên Nhân viên",
        "Khách hàng tổ chức",
        "Nhiệm vụ",
        "Khách hàng cá nhân",
        "Chức vụ",
        "Kế hoạch",
        "Kết quả",
        "Trạng thái",
        "Thời gian Checkin",
        "Địa điểm Checkin",
        "Thời gian CheckOut",
        "Địa điểm CheckOut",
        "Thời gian kế hoạch",
        "Thời gian Check",
        "Thời gian hoàn thành"
      ];
      const filterVal = [
        "idCall",
        "idGroup",
        "idEmployee",
        "nameEmployee",
        "namePlace",
        "nameMission",
        "nameCustomer",
        "positionCustomer",
        "plan",
        "note",
        "status",
        "timeCheckIn",
        "timeCheckOut",
        "nameLocationCheckIn",
        "nameLocationCheckOut",
        "timePlan",
        "checktime",
        "completetime"
      ];
      var self = this;
      GetMyCall({
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
        PageNumber: 1,
        RowspPage: 123456
      }).then(res => {
        var data = res.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: self.formatJson(filterVal, data),
            filename:
              "Báo cáo từ " +
              parseTime(self.DateBegin, "{d}-{m}-{y}").substring(0, 10) +
              " đến " +
              parseTime(self.DateEnd, "{d}-{m}-{y}"), //Optional
            autoWidth: true, //Optional
            bookType: "xlsx" //Optional
          });
          self.downloading = false;
        });
      });
    },

    fetchData() {
      var req = {
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      };
      if (this.queryPara.filter != null) {
        req.filter = this.queryPara.filter;
      }
      this.isLoading = true;

      GetMyCall(req).then(res => {
        this.dataLength = Number(res.TotalRows);
        for (var i in res.Data) {
          res.Data[i].image = null;
          res.Data[i].imageLoaded = false;
        }

        this.tableData = res.Data;

        this.isLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (
            j === "checktime" ||
            j === "completetime" ||
            j === "timeCheckIn" ||
            j === "timeCheckOut" ||
            j === "timePlan"
          ) {
            return v[j] ? parseTime(v[j], "{d}-{m}-{y} {h}:{i}") : "";
          } else if (j === "status") {
            return this.$options.filters.callStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  computed: {
    baseUrl() {
      return baseUrl;
    }
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    pageSize: function() {
      this.fetchData();
    },
    DateBegin: function() {
      this.fetchData();
    },
    DateEnd: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}

.employee-mission-container {
  padding: 5px;
}

.pagination {
  margin-top: 10px;
}
</style>
