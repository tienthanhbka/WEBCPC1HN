<template>
  <div>
    <div>
      <div style="">
        <el-button
          size="mini"
          type="primary"
          icon="fas fa-plus"
          @click="addPlace"
        >
          Thêm KHTC
        </el-button>

        <el-table
          v-loading="mission.isLoading"
          style="width:100%;float:right"
          :header-row-style="headerRowStyle"
          size="small"
          border
          :data="tableData"
          @current-change="selectionChanged"
          highlight-current-row
        >
          <el-table-column width="50" type="expand"> </el-table-column>
          <el-table-column prop="PlaceName" label="Khách hàng tổ chức">
            <template slot-scope="scope">
              <div>
                <span style="font-weight:700;color:#02bc77;"
                  >F{{ scope.row.Frequency }}</span
                >
                <span> - {{ scope.row.PlaceName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Số call đã check" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.QuantityCall }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Số ngày đã đến" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.MeetDay }}</div>
            </template>
          </el-table-column>
          <el-table-column label="Số VIP đã gặp" align="center">
            <template slot-scope="scope">
              <div>{{ scope.row.QuantityPeople }}</div>
            </template>
          </el-table-column>
          <el-table-column
            label="Thời gian checkcall (dự kiến)"
            align="center"
            width="250px"
          >
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.TimeStartCheck"
                  >{{ Date.parse(scope.row.TimeStartCheck).toString("HH:mm") }}
                  -
                </span>
                <span v-if="scope.row.TimeEndCheck">{{
                  Date.parse(scope.row.TimeEndCheck).toString("HH:mm")
                }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="Hoạt động" align="center" width="200px">
            <template slot-scope="scope">
              <el-button-group
                style="float:right; margin-top:5px;margin-bottom:5px"
              >
                <el-tooltip
                  content="Chỉnh sửa thời gian checkcall"
                  placement="top"
                >
                  <el-button
                    size="mini"
                    type="success"
                    @click="editTimePlace(scope.row)"
                    icon="el-icon-edit"
                  ></el-button>
                </el-tooltip>
                <el-tooltip
                  content="Bỏ khách hàng tổ chức khỏi nhiệm vụ"
                  placement="top"
                >
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="removePlace(scope.row, scope.$index)"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="Hiệu quả checkcall" placement="top">
                  <el-button
                    size="mini"
                    type="primary"
                    icon="el-icon-view"
                    @click="viewTimeline(scope.row)"
                  ></el-button>
                </el-tooltip>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- </el-col>
      </el-row> -->
      <!-- <time-mission
        modalId="modal-time-edit"
        :mission="mission"
        :place="rowData"
      ></time-mission> -->
    </div>
    <el-dialog :visible.sync="dialogDetail" custom-class="small--modal">
      <span slot="title" class="title-dialog">{{ dialogTitle }}</span>
      <time-line :data="rowData"></time-line>
    </el-dialog>
    <el-dialog :visible.sync="dialogTimePlaceM" custom-class="small--modal2">
      <span slot="title" class="title-dialog">{{ dialogTitle }}</span>
      <time-mission
        :place="rowData"
        :mission="mission"
        @AddMissionOK="AddMissionOK"
        @closeModal="closeModal"
      ></time-mission>
    </el-dialog>
    <el-dialog
      title="Thêm KHTC vào nhiệm vụ"
      :visible.sync="dialogAddPlace"
      custom-class="medium-modal"
    >
      <place-modal
        @closeModal="closeModal"
        @ModalMyPlaceChange="ModalMyPlaceChange"
      ></place-modal>
    </el-dialog>
  </div>
</template>

<script>
import CallTable from "./callTable";
import TimeLine from "./timeLine";
import TimeMission from "./modal/updatePlaceTimeMisstion";
import PlaceModal from "./modal/myPlaceModal";
import {
  GetCallByIDMissionIDPlace,
  HidePlaceMission,
  AddPlaceMission
} from "@/api/mission";
import Cookies from "js-cookie";
export default {
  components: {
    CallTable,
    TimeLine,
    TimeMission,
    PlaceModal
  },
  props: {
    tableData: Array,
    mission: Object
  },
  data() {
    return {
      customerTableData: [],
      selectedPlace: null,
      dialogDetail: false,
      dialogTitle: "",
      rowData: "",
      dialogTimePlaceM: false,
      dialogAddPlace: false
    };
  },
  methods: {
    headerRowStyle() {
      return { color: "#16a085" };
    },
    openModalPlace: function() {
      VoerroModal.show("my-place-modal");
    },
    selectionChanged(row, oldRow) {
      this.selectedPlace = row;
    },
    viewTimeline(row) {
      this.dialogDetail = true;
      this.dialogTitle = row.PlaceName;
      this.rowData = row;
    },
    editTimePlace(row) {
      this.dialogTimePlaceM = true;
      this.rowData = row;
      this.dialogTitle = "Chỉnh sửa thời gian dự kiến checkcall";
    },
    addPlace() {
      this.dialogAddPlace = true;
    },
    closeModal() {
      this.dialogAddPlace = false;
    },
    removePlace(row, index) {
      const req = {
        UserName: Cookies.get("idEmployee"),
        Token: Cookies.get("token"),
        MissionId: this.mission.idMission,
        PlaceMissionLst: [{ PlaceID: row.PlaceId }]
      };
      HidePlaceMission(req).then(res => {
        if (res.RespCode === 0) {
          this.$message({
            message: "Bỏ tổ chức thành công",
            type: "success"
          });
          this.tableData.splice(index, 1);
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    },
    AddMissionOK() {
      this.dialogTimePlaceM = false;
    },
    closeModal() {
      this.dialogTimePlaceM = false;
    },
    ModalMyPlaceChange(place) {
      this.dialogAddPlace = false;
      const PlaceIdLst = [];
      place.forEach(e => {
        PlaceIdLst.push(e.PlaceId);
        this.tableData.push(e);
      });
      const req = {
        MissionId: this.mission.idMission,
        PlaceIdLst: PlaceIdLst,
        PlaceMissionLst: this.tableData
      };
      AddPlaceMission(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Cập nhật nhiệm vụ thành công",
            type: "success"
          });
        }
      });
      this.$emit("addPlaceOK", this.mission);
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.title-dialog {
  display: inline-block;
  font-size: 10pt;
  font-weight: 700;
  color: #02bc77;
  text-transform: uppercase;
  text-align: center;
}
</style>
<style lang="scss">
.small--modal {
  width: 580px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 0;
  }
}
.small--modal2 {
  width: 580px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 20px;
  }
}
</style>
