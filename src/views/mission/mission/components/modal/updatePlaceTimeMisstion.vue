<template>
  <div>
    <el-form
      ref="form"
      label-position="left"
      size="small"
      :model="form"
      label-width="200px"
    >
      <el-form-item label="Ngày" prop="TimeStartCheck">
        <el-date-picker
          v-model="form.DateTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="Chọn ngày..."
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Thời gian bắt đầu" prop="TimeStartCheck">
        <el-time-picker
          v-model="form.TimeStartCheck"
          :picker-options="{
            start: '00:00',
            step: '00:01',
            end: '23:45'
          }"
          value-format="HH:mm:ss"
          placeholder="Thời gian bắt đầu"
        >
        </el-time-picker>
      </el-form-item>
      <el-form-item label="Thời gian kết thúc" prop="TimeEndCheck">
        <el-time-picker
          :picker-options="{
            start: '00:00',
            step: '00:01',
            end: '23:45'
          }"
          value-format="HH:mm:ss"
          v-model="form.TimeEndCheck"
          placeholder="Thời gian kết thúc"
        >
        </el-time-picker>
      </el-form-item>
      <div style="width:100%;text-align:center">
        <el-button type="info" @click="closeModal">Hủy</el-button>
        <el-button type="success" @click="addTimePlace" :loading="loading"
          >Thêm</el-button
        >
      </div>
    </el-form>
  </div>
</template>
<script>
import { GetMyPlace, GetPlaceByIdEmployee } from "@/api/place";
import { AddPlaceMission } from "@/api/mission";
import Cookies from "js-cookie";
export default {
  props: ["mission", "place"],
  data() {
    return {
      search: "",
      loading: false,
      pageSize: 10,
      currentPage: 1,
      tableData: [],
      currentTableData: [],
      selectedPlace: [],
      form: {
        TimeStartCheck: "",
        TimeEndCheck: "",
        DateTime: ""
      }
    };
  },
  methods: {
    fetchData() {
      this.currentTableData = this.tableData
        .filter(o => {
          return o.PlaceName.toLowerCase().includes(this.search.toLowerCase());
        })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    rowclick(row, col, e) {
      if (row) {
        this.$refs.placeTableModal.toggleRowSelection(row);
      }
    },
    rowchange: function(cur) {
      this.selectedPlace = cur;
    },
    closeModal: function() {
      VoerroModal.hide("my-place-modal");
    },
    addTimePlace() {
      this.loading = true;
      const req = {
        UserName: Cookies.get("idEmployee"),
        Token: Cookies.get("token"),
        MissionId: this.mission.idMission,
        PlaceMissionLst: [
          {
            PlaceID: this.place.PlaceId,
            TimeStartCheck: this.form.DateTime + " " + this.form.TimeStartCheck,
            TimeEndCheck: this.form.DateTime + " " + this.form.TimeEndCheck
          }
        ],
        PlaceIdLst: []
      };
      AddPlaceMission(req).then(res => {
        if (res.RespCode === 0) {
          this.$message({
            message: "Thêm thời gian thành công",
            type: "success"
          });
          this.loading = false;
          this.$emit("AddMissionOK");
        } else {
          this.$message({
            message: res.RespText,
            type: "success"
          });
        }
      });
    },
    closeModal() {
      this.$emit("closeModal");
    }
  },
  created() {},
  watch: {
    search() {
      this.fetchData();
    },
    employee: function() {
      GetPlaceByIdEmployee({ idEmployee: this.employee.idEmployee }).then(
        res => {
          this.tableData = res.Data;
          his.fetchData();
        }
      );
    },
    pageSize() {
      this.fetchData();
    }
  }
};
</script>
