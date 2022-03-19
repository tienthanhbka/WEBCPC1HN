<template>
  <div>
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

    <div class="inline-block">
      <el-button icon="fas fa-plus" type="primary" size="small" @click="create">
        Tạo mới</el-button
      >
    </div>
    <div>
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        size="small"
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
        <el-table-column align="center" label="STT" width="95">
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
            <!-- <el-tooltip content="Sửa" placement="top"
              ><el-button @click="edit(scope.row)" type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="del(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column label="Nhóm" width="180">
          <template slot-scope="scope">
            {{ scope.row.GroupID }}
          </template>
        </el-table-column>
        <el-table-column label="Tỉnh" min-width="150">
          <template slot-scope="scope">
            {{ scope.row.City }}
          </template>
        </el-table-column>
        <el-table-column label="Khách hàng" min-width="200">
          <template slot-scope="scope">
            [{{ scope.row.PlaceID }}] {{ scope.row.PlaceName }}
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
        <el-table-column width="200px" label="Actions" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Actions">
              <el-button-group>
                <el-tooltip content="Chi tiết" placement="top" effect="light">
                  <el-button
                    type="primary"
                    @click="view(scope.row)"
                    icon="el-icon-view"
                    size="small"
                  ></el-button>
                </el-tooltip>
                <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                  <el-button
                    type="warning"
                    icon="el-icon-edit"
                    @click="edit(scope.row)"
                    size="small"
                  ></el-button
                ></el-tooltip>
                <el-tooltip content="Xóa" placement="top" effect="light">
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    @click="del(scope.row)"
                    size="small"
                  ></el-button
                ></el-tooltip>
              </el-button-group>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :visible.sync="dialogForm" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span> {{ titleDialog }}</span>
        </h3>
        <modal-info
          @createOK="createOK"
          @closeOK="closeOK"
          :row="rowData"
          :types="types"
          :citys="citys"
          :places="places"
          :groups="groups"
          :mode="modeView"
        ></modal-info>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetReminderByEm, DelReminder } from "@/api/reminder";
import { GetDefaultValue } from "@/api/default";
import ModalInfo from "./component/modal-info";
import { GetGroupEmployee } from "@/api/groups";
import { getIdUser, getToken } from "@/utils/auth";
import { GetPlaceByUId } from "@/api/KDPlace";
import { GetCity } from "@/api/default";
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
      dialogForm: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      citys: [],
      modeView: 0
    };
  },
  methods: {
    create() {
      this.dialogForm = true;
      this.titleDialog = "Tạo lời nhắc mới";
      this.modeView = 1; //tạo mới
      this.rowData = null;
    },
    edit(row) {
      this.dialogForm = true;
      this.titleDialog = "Cập nhật lời nhắc";
      this.modeView = 2; //cập nhật
      this.rowData = row;
    },
    view(row) {
      this.dialogForm = true;
      this.titleDialog = "Chi tiết lời nhắc";
      this.modeView = 3; //Xem chi tiết
      this.rowData = row;
    },
    createOK() {
      this.dialogForm = false;
      this.fetchData();
    },
    closeOK() {
      this.dialogForm = false;
    },
    del(row) {
      this.$confirm(
        "Xóa lời nhắc KH " + row.PlaceName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            RowID: row.RowID
          };
          DelReminder(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa lời nhắc thành công",
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
      GetReminderByEm().then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ReminderLst;
          this.listLoading = false;
        }
      });
    },
    fetchDefaultValue() {
      GetDefaultValue({ Table: "TypeReminder" }).then(res => {
        if (res.RespCode == 0) {
          this.types = res.DefaultValueLst;
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
      });
    },
    fetchPlace() {
      GetPlaceByUId().then(res => {
        if (res.RespCode == 0) {
          this.places = res.PlaceLst;
        }
      });
    },
    fetchCity() {
      GetCity().then(res => {
        this.citys = res.Data;
      });
    }
  },
  computed: {},
  mounted() {},
  watch: {},
  created() {
    this.fetchData();
    this.fetchDefaultValue();
    this.fetchPlace();
    this.fetchGroup();
    this.fetchCity();
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
