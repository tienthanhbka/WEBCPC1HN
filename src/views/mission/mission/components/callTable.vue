<template>
  <el-table
    v-loading="isLoading"
    size="mini"
    :header-row-style="headerRowStyle"
    border
    :data="tableData"
  >
    <el-table-column label="Đánh giá" width="80" align="center">
      <template slot-scope="scope">
        <el-checkbox
          v-model="scope.row.evaluated"
          @change="checkedChange(scope)"
        ></el-checkbox>
      </template>
    </el-table-column>
    <el-table-column label="Trạng thái" width="110" align="center">
      <template slot-scope="scope">
        <el-tag :type="scope.row.status | callStatusColor" size="mini">{{
          scope.row.status | callStatusText
        }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column prop="nameCustomer" label="Khách hàng"></el-table-column>
    <el-table-column prop="plan" label="Kế hoạch"></el-table-column>
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
  </el-table>
</template>

<script>
import { GetCallByIDMissionIDPlace } from "@/api/mission";
import { GetPlaceByUId } from "@/api/KDPlace";
import { EvaluateCall } from "@/api/call";
export default {
  data() {
    return {
      tableData: [],
      isLoading: false
    };
  },
  props: {
    place: Object
  },
  methods: {
    headerRowStyle() {
      return { color: "#e17055" };
    },
    checkedChange(scope) {
      if (scope.row.evaluated) {
        scope.row.status = 10;
      } else {
        scope.row.status = 6;
      }
      this.evaluateCall(scope.row.idCall, scope.row.evaluated);
    },
    evaluateCall(idCall, evaluated) {
      EvaluateCall({ idCall: idCall, evaluate: evaluated }).then(res => {
        //console.log(res);
      });
    },
    openLocation(la, lo) {
      var url = "http://maps.google.com/maps?q=" + la + "," + lo;
      window.open(url);
    }
  },
  watch: {
    place: function() {
      var IDPlace = this.place.idPlace;
      var IDMission = this.place.idMission;
      if (this.place.calls == null) {
        this.isLoading = true;
        GetCallByIDMissionIDPlace({
          IDPlace: IDPlace,
          IDMission: IDMission
        }).then(res => {
          for (var i in res.Data) {
            res.Data[i].evaluated = res.Data[i].status == 10;
          }
          this.place.calls = res.Data;
          this.isLoading = false;
          this.tableData = res.Data;
        });
      } else {
        this.tableData = this.place.calls;
      }
    }
  }
};
</script>
