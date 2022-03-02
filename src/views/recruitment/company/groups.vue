<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-input class="selectIDGroup" placeholder="Tìm kiếm..."></el-input>
      </div>
      <div class="inline-block">
        <el-button
          icon="el-icon-search"
          type="primary"
          size="small"
          @click="createGroup"
          >Tìm kiếm</el-button
        >
      </div>
      <el-button
        class="t-button"
        style="float:right"
        type="success"
        :loading="downloading"
        size="small"
        icon="fas fa-file-excel"
      >
        Xuất Excel</el-button
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
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}

            <!-- <el-tooltip content="Chỉnh sửa" placement="top" effect="light"
              ><el-button type="text">
                <i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip
              :content="scope.row.Status === 1 ? 'Ẩn' : 'Hiển thị'"
              placement="top"
              effect="light"
              ><el-button type="text">
                <i
                  style="color: #F56C6C;"
                  class="fas fa-power-off"
                ></i></el-button
            ></el-tooltip> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="120px;" label="Tên nhóm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên nhóm">
            {{ scope.row.CompanyName }}
          </div>
        </template>
      </el-table-column>

      <el-table-column width="200px" prop="TypeDoc" label="Người đại diện">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người đại diện">
            {{ scope.row.ContactRepresent }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" prop="Image" label="Email">
        <template slot-scope="scope">
          <div class="dat-cell" label="Email">
            {{ scope.row.ContactEmail }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Số điện thoại">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số điện thoại">
            {{ scope.row.ContactPhone }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="SL thành viên" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="SL thành viên">
            {{ scope.row.QuantityMember }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Ngày tạo" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:ss dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="Status"
        width="120px"
        label="Trạng thái"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | WCompanyStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | WCompanyStatusText }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Actions" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Actions">
            <el-button-group>
              <el-tooltip content="Chi tiết" placement="top" effect="light">
                <router-link
                  :to="'/tuyen-dung/groups/introduce/' + scope.row.CompanyID"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-view"
                    size="small"
                  ></el-button
                ></router-link>
              </el-tooltip>
              <el-tooltip content="Phê duyệt" placement="top" effect="light">
                <el-button
                  type="success"
                  icon="el-icon-more-outline"
                  @click="approve(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="DS bài đăng" placement="top" effect="light">
                <el-button
                  type="success"
                  icon="fas fa-briefcase"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip content="Hot" placement="top" effect="light">
                <el-button
                  type="info"
                  icon="fas fa-dot-circle"
                  size="small"
                ></el-button
              ></el-tooltip>
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
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create @addOK="addOK"></create>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { GetCompanyByAdmin, ApproveCompany } from "@/api/work-dtp/company";

export default {
  filters: {},
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      LinkUrl: "",
      UserName: Cookies.get("idEmployee"),
      TokenCode: Cookies.get("token"),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    createGroup() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo nhóm tuyển dụng";
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        UserName: this.UserName,
        TokenCode: this.TokenCode
      };
      GetCompanyByAdmin(req).then(res => {
        this.tableData = res.CompanyLst;
        this.loadingTableData = false;
      });
    },
    approve(row) {
      this.$confirm("Xác nhận :" + row.CompanyName + " Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "success"
      })
        .then(() => {
          const req = {
            CompanyID: row.CompanyID
          };
          ApproveCompany(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xác thực thành công",
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
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
  .inline-block {
    display: inline-block;
  }
}
</style>
