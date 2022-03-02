<template>
  <div class="takecare-customer">
    <div class="inline-block" style="margin-bottom:5px;">
      <div style="display:inline-block">
        <el-select
          v-model="currentGroup"
          clearable
          style="width:100%;"
          placeholder="Chọn nhóm"
          @change="selectGroup"
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
      <div style="display:inline-block">
        <el-select
          v-model="currentEmployee"
          style="width:100%;"
          placeholder="Chọn nhân viên"
          @change="selectEmployee"
        >
          <el-option
            v-for="item in employeeList"
            :key="item.idEmployee"
            :label="item.nameEmployee"
            :value="item.idEmployee"
          >
          </el-option>
        </el-select>
      </div>
      <div style="display:inline-block">
        <el-date-picker v-model="TimeStart" type="date" placeholder="Từ ngày">
        </el-date-picker>
      </div>

      <div style="display:inline-block">
        <el-date-picker v-model="TimeEnd" type="date" placeholder="Đến ngày">
        </el-date-picker>
      </div>

      <div style="display:inline-block">
        <el-button
          type="success"
          icon="fas fa-file-excel"
          @click="ExportExcel"
          v-loading="downloading"
        >
          Xuất Excel</el-button
        >
      </div>
    </div>
    <div style="margin-bottom:5px;"></div>
    <div
      class="inline-block"
      style="float:right;background-color: rgb(244 244 244);"
    ></div>
    <el-table
      class="el-mobile-table"
      :data="tableData"
      v-loading="isLoading"
      border
      fit
      style="width: 100%"
      show-summary
      :summary-method="getSummaries"
    >
      <el-table-column width="100px" label="Điểm check" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Điểm check">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        min-width="150px"
        label="Địa điểm"
        prop="NameLocationCheckIn"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Địa điểm">
            {{ scope.row.NameLocationCheckIn }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Thời gian" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian">
            {{
              Date.parse(scope.row.TimeCheckIn).toString("HH:mm:ss dd/MM/yyyy")
            }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        label="Quãng đường"
        align="center"
        prop="Distance"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Quãng đường">
            {{ String(scope.row.Distance).substring(0, 5) }} km
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        label="Vận tốc"
        align="center"
        prop="Speed"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Vận tốc">
            {{ String(scope.row.Speed).substring(0, 5) }} km/h
          </div>
        </template>
      </el-table-column>
      <el-table-column
        width="150px"
        label="Thời gian"
        align="center"
        prop="TimeTravel"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian">
            {{ String(scope.row.TimeTravel).substring(0, 5) }} h
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Hệ số" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hệ số"></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/appview";
import { GetCallByGId, GetCallEm } from "@/api/call";
import { getYesterday, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
export default {
  components: {},
  props: {},
  data() {
    return {
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      currentGroup: "",
      tableData: [],
      groupList: [],
      CallLst: [],
      currentEmployee: "",
      employeeList: [],
      TimeStart: getYesterday(),
      TimeEnd: getEndDate(),
      isLoading: false,
      downloading: false
    };
  },
  methods: {
    fetchData(data) {
      if (data) {
        //let ArrayEx = data.filter(item => item.EmployeeId === val);
        for (let i = 0; i < data.length; i++) {
          if (i === 0) {
            let obj = {
              Distance: 0,
              TimeTravel: 0
            };
            Object.assign(data[i], obj);
          } else if (i <= data.length - 1) {
            let obj = {
              Distance: this.HaversineInKM(
                data[i - 1].LatitudeCheckIn,
                data[i - 1].LongitudeCheckIn,
                data[i].LatitudeCheckIn,
                data[i].LongitudeCheckIn
              ),
              TimeTravel: this.calTime(
                data[i - 1].TimeCheckIn,
                data[i].TimeCheckIn
              )
            };
            Object.assign(data[i], obj);
          }
        }

        this.tableData = data.map((item, index) => {
          return {
            ...item,
            Speed:
              index === 0
                ? 0
                : this.calSpeed(
                    item.Distance ? item.Distance : 0,
                    item.TimeTravel ? item.TimeTravel : 0
                  )
          };
        });
        this.isLoading = false;
      }
    },
    /*Hàm tính khoảng cách giữa 2 tọa độ checkin theo công thức Haversine*/
    HaversineInKM(lat1, long1, lat2, long2) {
      let d = 0;
      if (lat1 && long1 && lat2 && long2) {
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
        d = _eQuatorialEarthRadius * c;
        const toFixedNumber = (toFixTo = 2, base = 10) => num => {
          const pow = Math.pow(base, toFixTo);
          return +(Math.round(num * pow) / pow);
        };
      }
      return d;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "CallId",
        "CallName",
        "CustomerId",
        "CustomerJob",
        "CustomerName",
        "CustomerPosition",
        "Distance",
        "EmployeeId",
        "EmployeeName",
        "GroupId",
        "LatitudeCheckIn",
        "LatitudeCheckOut",
        "LongitudeCheckIn",
        "LongitudeCheckOut",
        "MissionId",
        "MissionName",
        "NameLocationCheckIn",
        "NameLocationCheckOut",
        "Note",
        "PlaceId",
        "PlaceName",
        "TimeCheck",
        "TimeCheckIn",
        "TimeCheckOut",
        "TimeComplete",
        "TimePlan",
        "Hệ số"
      ];
      const filterHeader = [
        "CallId",
        "CallName",
        "CustomerId",
        "CustomerJob",
        "CustomerName",
        "CustomerPosition",
        "Distance",
        "EmployeeId",
        "EmployeeName",
        "GroupId",
        "LatitudeCheckIn",
        "LatitudeCheckOut",
        "LongitudeCheckIn",
        "LongitudeCheckOut",
        "MissionId",
        "MissionName",
        "NameLocationCheckIn",
        "NameLocationCheckOut",
        "Note",
        "PlaceId",
        "PlaceName",
        "TimeCheck",
        "TimeCheckIn",
        "TimeCheckOut",
        "TimeComplete",
        "TimePlan"
      ];

      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, this.CallLst),
          filename: "Danh sách Call - quãng đường - " + this.currentEmployee,
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
            return this.$options.filters.missionStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },

    /*Hàm tính thời gian 2 điểm check */
    calTime(timeEnd, timeStart) {
      let hours = Math.abs(Date.parse(timeEnd) - Date.parse(timeStart)) / 36e5;
      return hours;
    },
    /*Hàm tính vận tốc*/
    calSpeed(s, t) {
      let v = s / t;
      if (t == 0 || (t == 0 && s == 0)) v = 0;

      return v ? v : 0;
    },
    /*Hàm tính khoảng cách giữa 2 lần checkin theo api google map*/

    calculateAndDisplayRoute() {
      let directionsService = new google.maps.DirectionsService();
      let directionsRenderer = new google.maps.DirectionsRenderer();
      directionsService.route(
        {
          origin: {
            query: "102 Phố Trần Đại Nghĩa Hà Nội Việt Nam"
          },
          destination: {
            query: "Trường Đại học Bách Khoa Hà Nội Hà Nội Việt Nam"
          },
          travelMode: google.maps.TravelMode.DRIVING
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    },
    fetchGroup() {
      const req = {
        idEmployee: this.UserName,
        token: this.Token
      };
      GetListGroupAdminByToken(req).then(response => {
        this.groupList = response.Data;
      });
    },
    selectGroup(val) {
      //this.fetchData(val);
      this.currentEmployee = "";
      const req = {
        idGroup: val,
        token: this.Token
      };
      getEmployeesByIdGroup(req).then(res => {
        if (res.ResCode == 0) {
          this.employeeList = res.Data;
        }
      });
    },
    toTimestamp(strDate) {
      var datum = Date.parse(strDate);
      return datum / 1000;
    },
    selectEmployee(val) {
      this.isLoading = true;
      const req = {
        DateStart: this.TimeStart,
        DateEnd: this.TimeEnd,
        EmployeeID: val
      };
      GetCallEm(req).then(res => {
        if (res.RespCode == 0) {
          this.CallLst = res.CallLst;
          this.fetchData(this.CallLst);
        }
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Tổng";
          return;
        }

        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr).toFixed(3);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "";
        }
      });
      return sums;
    }
  },
  created() {
    this.fetchGroup();
  },
  mounted() {},
  watch: {
    TimeStart() {
      this.selectEmployee(this.currentEmployee);
    },
    TimeEnd() {
      this.selectEmployee(this.currentEmployee);
    }
  }
};
</script>

<style lang="scss" scoped></style>
