<template>
  <div class="employee-mission-container">
    <div>
      <div class="inline-block">
        <el-select v-model="currentGroup" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupsLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          ></el-option>
        </el-select>
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
        class="inline-block"
        @click="fetchData"
      ></el-button>
      <el-button
        type="success"
        icon="el-icon-document"
        :loading="downloading"
        @click="exportCall"
        class="inline-block"
        >Xuất Báo cáo</el-button
      >
      <router-link to="/mission-call/call/my-em/report">
        <el-button type="success" icon="el-icon-document" class="inline-block"
          >Thống kê nhóm</el-button
        >
      </router-link>
    </div>

    <div>
      <el-table
        ref="emCallTable"
        @filter-change="filterFire"
        :data="tableData"
        v-loading="isLoading"
        fit
        style="width: 100%"
        @expand-change="expandRow"
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
        <!-- <el-table-column
      type="selection" 
      width="85" align="center"
      :filters="[{text: 'Đã đánh giá', value: '10'},{text: 'Chưa đánh giá', value: '0'}]">

        </el-table-column>-->
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{
            scope.$index + 1 + (currentPage - 1) * pageSize
          }}</template>
        </el-table-column>
        <el-table-column
          width="115"
          align="center"
          label="Đánh giá"
          column-key="evaluate"
          prop="evaluate"
          :filters="[
            { text: 'Đã đánh giá', value: '10' },
            { text: 'Chưa đánh giá', value: '0' }
          ]"
        >
          <template slot="header">
            <el-tooltip content="Gửi đánh giá" placement="top">
              <el-button @click="uploadEvaluate()" size="mini">
                <i
                  class="el-icon-loading"
                  v-show="false"
                  id="is-upload-evaluate"
                ></i>
                <i class="fas fa-upload"></i>
                <span id="evaluate-upload-text"></span>
              </el-button>
            </el-tooltip>

            <el-checkbox
              style="margin-right:0px"
              @change="checkAll"
              ref="boxCheckAll"
            ></el-checkbox>
          </template>
          <template slot-scope="scope">
            <el-checkbox
              :disabled="scope.row.status < 6"
              v-model="scope.row.evaluate"
            ></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column
          label="Trạng thái"
          width="200"
          align="center"
          prop="status"
          column-key="status"
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
        <el-table-column
          prop="nameEmployee"
          width="260"
          label="Nhân viên"
          column-key="employee"
          :filters="employeeFilterLst"
        ></el-table-column>
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
import {
  GetCallByIdGroup,
  GetImgInfoInCall,
  EvaluateCall,
  EvaluateLstCall
} from "@/api/call";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
import { getStartDate, getEndDate } from "@/api/index";

export default {
  components: {
    CallInfo
  },
  data() {
    return {
      uploadText: "324",
      testvalue: [],
      isUpLoadEvaluate: false,
      isCheckAll: true,
      groupsLst: [],
      downloading: false,
      currentGroup: null,
      employeeOfcurGroup: [],
      employeeFilterLst: [],
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
        "Thời gian CheckIn",
        "Thời  gian CheckOut",
        "Địa điểm CheckIn",
        "Địa điểm CheckOut",
        "Thời gian kế hoạch",
        "Thời gian duyệt",
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
      GetCallByIdGroup({
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
        PageNumber: 1,
        IdGroup: this.currentGroup,
        RowspPage: 123456
      }).then(res => {
        var data = res.Data;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: self.formatJson(filterVal, data),
            filename:
              "Báo cáo từ " +
              Date.parse(self.DateBegin).toString("dd-MM-yyyy") +
              " đến " +
              Date.parse(self.DateEnd).toString("dd-MM-yyyy"), //Optional
            autoWidth: true, //Optional
            bookType: "xlsx" //Optional
          });
          self.downloading = false;
        });
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
            return v[j] ? Date.parse(v[j]).toString("yyyy-MM-dd HH:mm") : "";
          } else if (j === "status") {
            return this.$options.filters.callStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    async uploadEvaluate() {
      var loading = document.getElementById("is-upload-evaluate");
      loading.style.display = "inline-block";
      var evaluateLst = [];
      this.tableData.forEach(e => {
        if (e.evaluate && e.status != 10) {
          evaluateLst.push({ call: e.idCall, evaluate: 1 });
        }
        if (!e.evaluate && e.status == 10) {
          evaluateLst.push({ call: e.idCall, evaluate: 0 });
        }
      });

      if (evaluateLst.length == 0) {
        this.$message({
          message: "Không có thông tin đánh giá call mới",
          type: "danger"
        });
        loading.style.display = "none";
        return;
      }

      EvaluateLstCall({ data: evaluateLst })
        .then(res => {
          this.tableData.forEach(e => {
            res.Data.forEach(o => {
              if (e.idCall == o.idCall) {
                if ((o.ss = 1)) {
                  e.status = o.status;
                }
              }
            });
          });
          loading.style.display = "none";
        })
        .catch(() => {
          loading.style.display = "none";
        });

      // console.log(this.$refs['isUpLoadEvaluate']);
    },
    checkAll(e) {
      console.log(e);
      if (e) {
        this.tableData.forEach(element => {
          if (element.status >= 6 && !element.namePlace.includes("CPC1"))
            element.evaluate = true;
        });
      } else {
        this.tableData.forEach(element => {
          element.evaluate = false;
        });
      }
      console.log(this.$refs["boxCheckAll"]);
    },
    filterFire(filters) {
      this.queryPara.filter = [];
      var cols = this.$refs.emCallTable.columns;
      var mapF = {
        evaluate: "evaluate",
        nameEmployee: "idEmployee",
        status: "status"
      };
      cols.forEach(e => {
        let prop = e["property"];
        let vals = e["filteredValue"];
        if (prop == "evaluate" || prop == "nameEmployee" || prop == "status") {
          if (vals.length > 0) {
            this.queryPara.filter.push({ col: mapF[prop], value: vals });
          }
        }
      });

      // console.log(filters);

      // if(filters['evaluate']){

      //   this.queryPara.filter.push({col:'evaluate',value:filters[Object.keys(filters)[0]]});

      // }
      // if(filters['employee']){
      //   this.queryPara.filter.push({col:'idEmployee',value:filters[Object.keys(filters)[0]]});

      // }
      this.fetchData();
    },
    evaluateCall(call) {
      EvaluateCall({
        idCall: call.idCall,
        evaluate: call.evaluate ? 1 : 0
      }).then(res => {
        for (var i in this.tableData) {
          if (this.tableData[i].idCall == call.idCall) {
            this.tableData[i].status = call.evaluate ? 10 : 6;
          }
        }
      });
    },
    expandRow(row) {
      console.log(row.idCall);

      if (row.numImg > 0 && row.image == null) {
        GetImgInfoInCall({ idCall: row.idCall }).then(res => {
          for (var i in res.Data) {
            res.Data[i].rotate = 0;
          }
          row.image = res.Data;
        });
      }
    },
    fetchData() {
      var req = {
        IdGroup: this.currentGroup,
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      };
      if (this.queryPara.filter != null) {
        req.filter = this.queryPara.filter;
      }
      if (this.TextSearch != null && this.TextSearch.trim() != "") {
        req.search = this.TextSearch.trim();
      }
      this.isLoading = true;

      GetCallByIdGroup(req).then(res => {
        console.log(res);
        this.dataLength = res.Data[0] ? Number(res.Data[0].TotalRows) : 0;
        for (var i in res.Data) {
          if (res.Data[i].status == 10) {
            res.Data[i].evaluate = true;
          } else {
            res.Data[i].evaluate = false;
          }
          res.Data[i].image = null;
          res.Data[i].imageLoaded = false;
        }

        this.tableData = res.Data;
        this.$refs["boxCheckAll"].model = false;
        this.isLoading = false;
      });
    }
  },
  // mounted() {
  //   this.fetchData();
  // },
  created() {
    GetListGroupAdminByToken().then(res => {
      this.groupsLst = res.Data;
      this.currentGroup = this.groupsLst[0].idGroup;
    });
  },
  watch: {
    currentGroup: function() {
      if (this.currentGroup != "") {
        getEmployeesByIdGroup({ idGroup: this.currentGroup }).then(res => {
          console.log(res);
          var lst = [];
          res.Data.forEach(element => {
            lst.push({ text: element.nameEmployee, value: element.idEmployee });
          });
          this.employeeFilterLst = lst;
        });
        this.fetchData();
      }
    },
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
