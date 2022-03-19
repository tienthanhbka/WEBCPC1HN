<template>
  <div>
    <div class="inline-block">
      <el-select
        size="small"
        v-model="group"
        placeholder="Chọn nhóm..."
        style="width:100%"
      >
        <el-option
          v-for="(item, index) in groups"
          :key="index"
          :label="item.idGroup"
          :value="item.idGroup"
        ></el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-input
        size="small"
        class="input-custom"
        v-model="search"
        placeholder="Tìm kiếm..."
      ></el-input>
    </div>
    <div class="inline-block" style="margin-right:5px">
      <el-button
        icon="el-icon-search"
        @click="fetchData"
        type="primary"
        size="small"
        >Tìm kiếm</el-button
      >
    </div>
    <div style="float:right">
      <div class="inline-block">
        <el-date-picker
          v-model="dateStart"
          size="small"
          format="yyyy-MM-dd"
          type="date"
          placeholder="Từ ngày"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-date-picker
          v-model="dateEnd"
          size="small"
          format="yyyy-MM-dd"
          type="date"
          placeholder="Đến ngày"
        >
        </el-date-picker>
      </div>
      <div class="inline-block">
        <el-button
          type="success"
          @click="exportExcel"
          :loading="downloading"
          size="small"
          ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
        >
      </div>
    </div>
    <div>
      <el-table
        class="el-mobile-table"
        size="small"
        v-loading="listLoading"
        :data="
          tableData.filter(
            data =>
              !search ||
              data.PlaceName.toLowerCase().includes(search.toLowerCase()) ||
              data.TypeNote.toLowerCase().includes(search.toLowerCase())
          )
        "
        element-loading-text="Loading"
        style="width:100%"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="STT" width="180">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
            <el-button-group>
              <el-tooltip content="Chi tiết" placement="top" effect="light">
                <el-button
                  type="primary"
                  @click="view(scope.row)"
                  icon="el-icon-view"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Phê duyệt" placement="top" effect="light">
                <el-button
                  type="warning"
                  icon="fas fa-check"
                  @click="accept(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Hoàn thành" placement="top" effect="light">
                <el-button
                  type="success"
                  icon="fas fa-check-double"
                  @click="done(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
            </el-button-group>
            <!-- <el-tooltip content="Phê duyệt" placement="top"
              ><el-button @click="accept(scope.row)" type="text">
                <i class="fas fa-check"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Hoàn thành" placement="top"
              ><el-button @click="done(scope.row)" type="text">
                <i
                  style="color: #02bc77"
                  class="fas fa-check-double"
                ></i></el-button
            ></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column width="140px" label="Trạng thái" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                :type="scope.row.Status | reminderStatusColor"
                style="width:120px"
                effect="plain"
                >{{ scope.row.Status | reminderStatusText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Khách hàng" min-width="200">
          <template slot-scope="scope">
            [{{ scope.row.PlaceID }}] {{ scope.row.PlaceName }}
          </template>
        </el-table-column>
        <el-table-column label="Tỉnh" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.City }}
          </template>
        </el-table-column>
        <el-table-column label="Loại" width="180">
          <template slot-scope="scope">
            {{ scope.row.TypeNote }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="Lời nhắc" min-width="250">
          <template slot-scope="scope">
            {{ scope.row.Note }}
          </template>
        </el-table-column> -->
        <el-table-column label="Thời hạn" width="180" align="center">
          <template slot-scope="scope">
            {{ Date.parse(scope.row.DateStart).toString("dd/MM/yyyy") }} -
            {{ Date.parse(scope.row.DateEnd).toString("dd/MM/yyyy") }}
          </template>
        </el-table-column>
        <el-table-column label="Người tạo" width="150">
          <template slot-scope="scope">
            {{ scope.row.CreateName }}
          </template>
        </el-table-column>
        <el-table-column label="Nhóm" width="180">
          <template slot-scope="scope">
            {{ scope.row.GroupID }}
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogForm" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span> {{ titleDialog }}</span>
        </h3>
        <modal-info
          @closeOK="closeOK"
          :row="rowData"
          :types="types"
          :places="places"
          :groups="groups"
          :mode="modeView"
        ></modal-info>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetReminderByGroup, AcceptReminder } from "@/api/reminder";
import ModalInfo from "./component/modal-info";
import { GetGroupEmployee } from "@/api/groups";
import { getIdUser, getToken } from "@/utils/auth";
import { getStartMonth, getEndMonth } from "@/api/index";

export default {
  components: {
    ModalInfo
  },
  props: {},
  data() {
    return {
      listLoading: false,
      tableData: [],
      types: [],
      places: [],
      groups: [],
      dateStart: getStartMonth(),
      dateEnd: getEndMonth(),
      dialogForm: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      group: "",
      modeView: 0
    };
  },
  methods: {
    view(row) {
      this.dialogForm = true;
      this.titleDialog = "Chi tiết lời nhắc";
      this.modeView = 3; //Xem chi tiết
      this.rowData = row;
    },
    closeOK() {
      this.dialogForm = false;
    },
    accept(row) {
      this.$confirm(
        "Phê duyệt lời nhắc KH " + row.PlaceName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "success"
        }
      )
        .then(() => {
          const req = {
            RowID: row.RowID,
            Status: 3
          };
          AcceptReminder(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Phê duyệt lời nhắc thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    done(row) {
      this.$confirm(
        "Xác nhận hoàn thành lời nhắc KH " + row.PlaceName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "success"
        }
      )
        .then(() => {
          const req = {
            RowID: row.RowID,
            Status: 10
          };
          AcceptReminder(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xác nhận thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    fetchData() {
      this.listLoading = true;
      const req = {
        DateStart: Date.parse(this.dateStart).toString("yyyy-MM-dd"),
        DateEnd: Date.parse(this.dateEnd).toString("yyyy-MM-dd"),
        GroupID: this.group
      };
      GetReminderByGroup(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ReminderLst;
          this.listLoading = false;
        }
      });
    },
    fetchGroup() {
      var req = {
        idEmployee: getIdUser(),
        token: getToken()
      };
      GetGroupEmployee(req).then(response => {
        this.groups = response.Data;
        this.group = this.groups[0].idGroup;
      });
    },
    exportExcel() {
      this.downloading = true;
      const tHeader = [
        "Khách hàng",
        "Tỉnh thành",
        "Mã",
        "Loại",
        "Lời nhắc",
        "Từ ngày",
        "Đến ngày",
        "Người tạo",
        "Thời gian tạo",
        "Cập nhật gần nhất",
        "Người cập nhật",
        "Trạng thái"
      ];
      const filterHeader = [
        "PlaceName",
        "City",
        "PlaceID",
        "TypeNote",
        "Note",
        "DateStart",
        "DateEnd",
        "Creater",
        "TimeCreate",
        "TimeUpdate",
        "ModifyID",
        "Status"
      ];
      var data = this.tableData;
      import("@/vendor/Export2Excel")
        .then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename: "Danh sách lời nhắc nhóm " + this.group, //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        })
        .finally(() => {
          this.downloading = false;
        });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.reminderStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  computed: {},
  mounted() {},
  watch: {
    dateStart() {
      this.fetchData();
    },
    dateEnd() {
      this.fetchData();
    },
    group() {
      this.fetchData();
    }
  },
  created() {
    this.fetchGroup();
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
