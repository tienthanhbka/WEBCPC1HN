<template>
  <div class="em-mission-container">
    <create-mission-em-modal
      :IdGroup="currentGroup"
      @missionAdded="onMissionAdded"
    ></create-mission-em-modal>
    <create-mission-modal :mission="currentMission"></create-mission-modal>
    <div>
      <div class="inline-block">
        <el-select v-model="currentGroup" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupsLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>

        <span>đến</span>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
        <el-select
          class="input-with-select"
          style="width:100%"
          filterable
          clearable
          v-model="TextSearch"
          placeholder="Chọn loại nhiệm vụ..."
        >
          <el-option
            v-for="item in typeMissonLst"
            :key="item.attribute"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="inline-block"
        @click="fetchData"
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-document"
        class="inline-block"
        @click="openModal"
        >Tạo nhiệm vụ cho nhóm</el-button
      >
      <el-button type="success" icon="el-icon-document" class="inline-block"
        >Xuat bao cao</el-button
      >
    </div>

    <div>
      <el-table
        class="el-mobile-table"
        :data="currentTable"
        @expand-change="handleExpandChange"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <place-table
              :tableData="props.row.places"
              :mission="props.row"
            ></place-table>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
              <el-tooltip
                content="Duyệt nhiệm vụ"
                placement="top"
                effect="light"
              >
                <el-popconfirm
                  class="popconfirm-custom"
                  confirm-button-text="Phê duyệt"
                  cancel-button-text="Hủy nhiệm vụ"
                  @confirm="confirm(scope.row)"
                  @cancel="cancel(scope.row)"
                  icon="el-icon-info"
                  icon-color="#409EFF"
                  title="Xác nhận nhiệm vụ?"
                >
                  <el-button type="text" style="color:#02bc77" slot="reference">
                    <i class="fas fa-check-double"></i
                  ></el-button>
                </el-popconfirm>
              </el-tooltip>
              <el-tooltip content="Sửa nhiệm vụ" placement="top" effect="light"
                ><el-button type="text" @click="editMission(scope.row)">
                  <i class="fas fa-edit"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thứ thực hiện" width="120" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thứ thực hiện">
              <el-tag v-if="scope.row.date">{{
                scope.row.date ? scope.row.date.replace("8", "CN") : ""
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="title" width="230" label="Tên nhiệm vụ">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên nhiệm vụ">
              {{ scope.row.title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="typeMission" width="230" label="Loại nhiệm vụ">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại nhiệm vụ">
              {{ scope.row.typeMission }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hạn chót" width="110">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hạn chót">
              {{ scope.row.deadline.substring(0, 10) }}
            </div></template
          >
        </el-table-column>
        <el-table-column prop="target" width="180" label="Mục tiêu">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mục tiêu">
              {{ scope.row.target }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Nhân viên" width="180">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhân viên">
              {{ scope.row.nameEmployee }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Trạng thái" width="120" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag :type="scope.row.status | missionStatusColor">{{
                scope.row.status | missionStatusText
              }}</el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        :total="total"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="GetPagination"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CreateMissionEmModal from "@/views/mission/mission/components/modal/createMissionEmModal";
import CreateMissionModal from "@/views/mission/mission/components/modal/createMissionModal";
import MyPlaceModal from "@/views/mission/mission/components/modal/myPlaceModal";
import PlaceTable from "@/views/mission/mission/components/placeTable";
import { GetMissionByIdGroup, ApproveMission } from "@/api/mission";
import { GetPlaceByMId } from "@/api/KDPlace";
import { GetListGroupAdminByToken } from "@/api/groups";
import { GetSuggestTypeMission } from "@/api/mission";
import Cookies from "js-cookie";
export default {
  components: {
    PlaceTable,
    CreateMissionEmModal,
    MyPlaceModal,
    CreateMissionModal
  },
  data() {
    return {
      currentMission: null,
      currentGroup: "",
      groupsLst: [],
      tableData: [],
      typeMissonLst: [],
      currentTable: [],
      TextSearch: "",
      DateBegin: "",
      DateEnd: "",
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    openModalPlace() {},
    onMissionAdded(missionLst) {
      missionLst.forEach(e => {
        this.tableData.unshift(e);
      });
    },
    editMission(mission) {
      this.currentMission = mission;
      VoerroModal.show("new-mission-modal");
    },
    openModal() {
      VoerroModal.show("new-mission-em-modal");
    },
    handleExpandChange(row) {
      if (row.places == null) {
        row.isLoading = true;

        const req = {
          UserName: Cookies.get("idEmployee"),
          Token: Cookies.get("token"),
          MissionId: row.idMission
        };
        row.isLoading = true;
        GetPlaceByMId(req)
          .then(res => {
            if (res.RespCode === 0) {
              row.isLoading = false;
              row.places = res.PlaceLst;
            }
          })
          .finally(function() {
            row.isLoading = false;
          });
      }
    },
    fetchData() {
      if (this.currentGroup != "") {
        this.loadingTableData = true;
        var req = {
          IdGroup: this.currentGroup,
          DateBegin: this.DateBegin,
          DateEnd: this.DateEnd + " 23:59:50",
          PageNumber: "",
          RowspPage: ""
        };
        GetMissionByIdGroup(req).then(res => {
          this.loadingTableData = false;
          for (var i in res.Data) {
            res.Data[i].places = null;
            res.Data[i].isLoading = false;
          }
          this.tableData = res.Data;
          this.tableData.sort((a, b) =>
            Number.parseInt(a.status) > Number.parseInt(b.status)
              ? 1
              : Number.parseInt(b.status) > Number.parseInt(a.status)
              ? -1
              : 0
          );
          this.GetPagination();

          this.total = res.Data.length;
        });
        GetSuggestTypeMission().then(res => {
          this.typeMissonLst = res.Data;
        });
      }
    },
    GetPagination() {
      this.currentTable = this.tableData
        .filter(o => {
          return o.typeMission
            .toLowerCase()
            .includes(this.TextSearch.toLowerCase());
        })
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    approveMission(row) {
      // this.$confirm(
      //   "Xác nhận duyệt nhiệm vụ " + row.title + ". Continue?",
      //   "Duyệt nhiệm vụ",
      //   {
      //     confirmButtonText: "Xác nhận",
      //     cancelButtonText: "Hủy",
      //     type: "success"
      //   }
      // )
      //   .then(() => {
      //     let _this = this;
      //     var instance = axios.create({
      //       baseURL: "https://icpc1hn.work/CPC1HN/",
      //       withCredentials: false, // send cookies when cross-domain requests
      //       timeout: 20000, // request timeout
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json"
      //       }
      //     });
      //     instance
      //       .post("Mission/ApproveMission", {
      //         UserName: Cookies.get("idEmployee"),
      //         Token: Cookies.get("token"),
      //         MissionId: row.idMission
      //       })
      //       .then(res => {
      //         if (res.data.RespCode == 0) {
      //           _this.$message({
      //             message: "Duyệt nhiệm vụ thành công.",
      //             type: "success"
      //           });
      //           this.fetchData();
      //         } else {
      //           _this.$message({
      //             message: res.data.RespText,
      //             type: "warning"
      //           });
      //         }
      //       })
      //       .catch(function(error) {
      //         console.log(error);
      //       });
      //   })
      //   .catch(() => {});
    },
    confirm(val) {
      const req = {
        MissionID: val.idMission,
        Status: 3
      };
      ApproveMission(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Duyệt nhiệm vụ thành công.",
            type: "success"
          });
          this.fetchData();
        }
      });
    },
    cancel(val) {
      const req = {
        MissionID: val.idMission,
        Status: 0
      };
      ApproveMission(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Duyệt nhiệm vụ thành công.",
            type: "success"
          });
          this.fetchData();
        }
      });
    }
  },
  watch: {
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
    TextSearch() {
      this.GetPagination();
    },
    currentGroup: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    }
  },
  created() {
    var frt = Date.today().set({ day: 1 });
    this.DateBegin = frt.toString("yyyy-MM-dd");
    this.DateEnd = frt
      .addMonths(1)
      .addDays(-1)
      .toString("yyyy-MM-dd");
    GetListGroupAdminByToken().then(res => {
      this.groupsLst = res.Data;
      this.currentGroup = this.groupsLst[0].idGroup;
    });
  }
};
</script>

<style lang="css" scoped>
.em-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}
</style>
