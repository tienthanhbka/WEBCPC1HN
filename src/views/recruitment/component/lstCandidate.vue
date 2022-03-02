<template>
  <div class="group-block">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <!-- <div class="inline-block">
        <el-select
          v-model="group"
          placeholder="Chọn nhóm của bạn..."
          class="selectIDGroup"
        >
          <el-option
            v-for="item in groupLst"
            :key="item.CompanyID"
            :label="item.CompanyName"
            :value="item.CompanyID"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-button type="primary" size="small" @click="createGroup"
          ><i class="fas fa-plus-circle"></i> Tạo tin tuyển dụng</el-button
        >
      </div> -->

      <el-button
        class="t-button"
        style="float:right"
        type="success"
        :loading="downloading"
        size="small"
        ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
      >
      <div style="clear:both;"></div>
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="tableData"
      size="small"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}

            <!-- <el-tooltip content="Chỉnh sửa" placement="top" effect="light"
              ><el-button type="text" @click="updateDoc(scope.row)">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa" placement="top" effect="light"
              ><el-button type="text" @click="delDoc(scope.row)">
                <i
                  style="color: #F56C6C;"
                  class="fas fa-trash-alt"
                ></i></el-button
            ></el-tooltip> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="FullName" min-width="120px;" label="Tên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên">
            {{ scope.row.FullName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" prop="PhoneNumber" label="SĐT">
        <template slot-scope="scope">
          <div class="dat-cell" label="SĐT">
            {{ scope.row.PhoneNumber }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Email">
        <template slot-scope="scope">
          <div class="dat-cell" label="Email">
            {{ scope.row.Email }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Giới thiệu">
        <template slot-scope="scope">
          <div class="dat-cell" label="Giới thiệu">
            {{ scope.row.Introduce }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="CV">
        <template slot-scope="scope">
          <div class="dat-cell" label="CV">
            {{ scope.row.IdCV }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column width="150px" label="Hạn chót" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hạn chót" v-if="scope.row.Deadline">
            {{ Date.parse(scope.row.Deadline).toString("HH:mm dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Người tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Thời gian tạo" align="center">
        <template slot-scope="scope">
          <div
            class="dat-cell"
            label="Thời gian tạo"
            v-if="scope.row.TimeCreate"
          >
            {{ Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        prop="Status"
        width="120px"
        label="Trạng thái"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | WRecruitmentStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | WRecruitmentStatusText }}</el-tag
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
                  type="info"
                  icon="fas fa-info-circle"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="Liên hệ" placement="top" effect="light">
                <el-button
                  type="primary"
                  icon="fas fa-phone-square"
                  size="small"
                ></el-button
              ></el-tooltip>
              <!-- <el-tooltip content="DS đăng kí" placement="top" effect="light">
                <el-button
                  type="success"
                  icon="fas fa-users"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa" placement="top" effect="light">
                <el-button
                  type="danger"
                  @click="delDoc(scope.row)"
                  icon="fas fa-trash-alt"
                  size="small"
                ></el-button
              ></el-tooltip> -->
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:0;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
  </div>
</template>

<script>
import { GetCandidateRecruitment } from "@/api/work-dtp/recruitment";
export default {
  filters: {},
  components: {},
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tableData: [],
      group: "",
      downloading: false,
      loadingTableData: false,
      titleDialog: "",
      rowData: "",
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    createGroup() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo tin tuyển dụng";
    },
    delDoc(row) {
      this.$confirm(
        "Xóa bài tuyển dụng: " + row.Title + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            CompanyID: this.group,
            DocumentID: row.DocumentID
          };
          DelRecruitment(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa bài tuyển dụng thành công",
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
      this.loadingTableData = true;
      this.tableData = [];
      const req = {
        DocumentID: this.row.DocumentID,
        NumberRow: 0,
        PageNumber: 0
      };
      GetCandidateRecruitment(req).then(res => {
        if (res.RespCode === 0) {
          this.tableData = res.CandidateLst;
          this.loadingTableData = false;
        }
      });
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {
    row() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  .inline-block {
    display: inline-block;
  }
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
}
</style>
