<template>
  <div class="my-mission-container">
    <div>
      <div class="inline-block">
        <span></span>
        <el-date-picker
          style="width:140px"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>

      <div class="inline-block">
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
        <el-input
          placeholder="Search"
          v-model="TextSearch"
          class="input-with-select"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="fetchData()"
          ></el-button>
        </el-input>
      </div>
      <create-mission-modal
        @missionAdded="onMissionAdded"
        :mission="rowData"
        modalId="new-mission-modal"
      ></create-mission-modal>

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
        >Tạo nhiệm vụ</el-button
      >
      <el-button type="success" icon="el-icon-document" class="inline-block"
        >Xuat bao cao</el-button
      >
    </div>
    <div>
      <el-table
        :data="tableData"
        @expand-change="handleExpandChange"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <placeTable
              :tableData="props.row.places"
              :mission="props.row"
              @addPlaceOK="handleExpandChange"
            ></placeTable>
          </template>
        </el-table-column>
        <el-table-column align="center" width="100px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Sửa nhiệm vụ" placement="top"
              ><el-button type="text" @click="edit(scope.row)">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="del(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="Thứ thực hiện" width="140" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.date">{{
              scope.row.date ? scope.row.date.replace("8", "CN") : ""
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="Tên nhiệm vụ"
          min-width="200"
        ></el-table-column>
        <el-table-column
          prop="typeMission"
          label="Loại nhiệm vụ"
        ></el-table-column>
        <el-table-column label="Hạn chót" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.deadline.substring(0, 10)
          }}</template>
        </el-table-column>
        <el-table-column prop="target" label="Mục tiêu"></el-table-column>
        <el-table-column label="Tạo lúc" width="120" align="center">
          <template slot-scope="scope">{{
            scope.row.time.substring(0, 10)
          }}</template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="150" align="center">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status | missionStatusColor">{{
              scope.row.status | missionStatusText
            }}</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import CreateMissionModal from "@/views/mission/mission/components/modal/createMissionModal";
import MyPlaceModal from "@/views/mission/mission/components/modal/myPlaceModal";
import PlaceTable from "@/views/mission/mission/components/placeTable";
import { parseTime } from "@/utils/index";
import { getMyMission, DelMissionByMId } from "@/api/mission";
import { GetPlaceByMId } from "@/api/KDPlace";
import Cookies from "js-cookie";
export default {
  components: {
    PlaceTable,
    CreateMissionModal,
    MyPlaceModal
  },
  data() {
    return {
      tableData: [],
      TextSearch: "",
      rowData: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    onMissionAdded(m) {
      this.fetchData();
    },
    openModal() {
      VoerroModal.show("new-mission-modal");
      this.rowData = "";
    },
    handleExpandChange(row) {
      const req = {
        UserName: Cookies.get("idEmployee"),
        Token: Cookies.get("token"),
        MissionId: row.idMission
      };
      row.isLoading = true;
      GetPlaceByMId(req).then(res => {
        if (res.RespCode === 0) {
          row.isLoading = false;
          row.places = res.PlaceLst;
        }
      });
    },

    fetchData() {
      this.loadingTableData = true;
      var req = {
        DateBegin: this.DateBegin,
        DateEnd: this.DateEnd,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      };
      getMyMission(req).then(res => {
        this.loadingTableData = false;
        for (var i in res.Data) {
          res.Data[i].places = null;
          res.Data[i].isLoading = false;
        }
        this.tableData = res.Data;
        this.total = res.TotalPage * res.RowspPage;
      });
    },
    edit(row) {
      VoerroModal.show("new-mission-modal");
      this.rowData = row;
    },
    del(row) {
      this.$confirm("Xóa nhiệm vụ " + row.title + ". Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          const req = {
            MissionId: row.idMission
          };
          DelMissionByMId(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa nhiệm vụ thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    }
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
  },
  created() {
    this.DateBegin = (-1)
      .months()
      .fromNow()
      .toString("yyyy-MM-dd");
    this.DateEnd = (1)
      .months()
      .fromNow()
      .toString("yyyy-MM-dd");
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
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
