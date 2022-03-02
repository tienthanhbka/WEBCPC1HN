<template>
  <div class="block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-input class="selectIDGroup" placeholder="Tìm kiếm..."></el-input>
      </div>
      <div class="inline-block">
        <el-button icon="el-icon-search" type="primary" size="small"
          >Tìm kiếm</el-button
        >
      </div>
      <el-button
        class="t-button"
        style="float:right"
        type="success"
        :loading="downloading"
        size="small"
        ><i class="fas fa-file-excel"></i> xuất Excel</el-button
      >
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
                <i class="fas fa-edit" style="color: #FD7E14;"></i></el-button
            ></el-tooltip>
            <el-tooltip placement="top" effect="light"
              ><el-button type="text">
                <i
                  style="color: #F56C6C;"
                  class="fas fa-power-off"
                ></i></el-button
            ></el-tooltip> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Title" min-width="120px;" label="Tên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên">
            {{ scope.row.Title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Vị trí cần tuyển">
        <template slot-scope="scope">
          <div class="dat-cell" label="Vị trí cần tuyển">
            {{ scope.row.WorkPosition }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" label="Nhóm">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhóm">
            {{ scope.row.CompanyName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="SL tuyển" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="SL tuyển">
            {{ scope.row.QuantityCandidate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="SL đăng kí">
        <template slot-scope="scope">
          <div class="dat-cell" label="SL đăng kí">
            {{ scope.row.NumberCandidate }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Hạn chót" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hạn chót" v-if="scope.row.Deadline">
            {{ Date.parse(scope.row.Deadline).toString(" HH:mm dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="150px" label="Người duyệt">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người duyệt">
            {{ scope.row.ApproveID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Trạng thái" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái" v-if="scope.row.Status">
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
                <router-link
                  :to="'/tuyen-dung/groups/recruitment/' + scope.row.DocumentID"
                >
                  <el-button
                    type="primary"
                    icon="el-icon-view"
                    size="small"
                  ></el-button
                ></router-link>
              </el-tooltip>
              <el-tooltip content="xác nhận" placement="top" effect="light">
                <el-button
                  type="success"
                  icon="el-icon-more-outline"
                  @click="approve(scope.row)"
                  size="small"
                ></el-button>
              </el-tooltip>
              <el-tooltip content="DS đăng kí" placement="top" effect="light">
                <el-button
                  type="success"
                  @click="viewCandidate(scope.row)"
                  icon="fas fa-users"
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
    <el-dialog :visible.sync="dialogFormApprove" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="el-icon-check"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <approve :row="rowData" @approveOK="approveOK"></approve>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormCandidate"
      custom-class="medium-modal"
      :close-on-click-modal="false"
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-users"></i> {{ titleDialog }}
      </h3>
      <candidate :row="rowData"></candidate>
    </el-dialog>
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
import Cookies from "js-cookie";
import { GetRecruitmentByAdmin } from "@/api/work-dtp/recruitment";
import Approve from "./component/approveRecruitment";
import Candidate from "../component/lstCandidate";
export default {
  filters: {},
  components: { Approve, Candidate },
  props: {},
  data() {
    return {
      tableData: [],
      loadingTableData: false,
      downloading: false,
      dialogFormApprove: false,
      dialogFormCandidate: false,
      LinkUrl: "",
      titleDialog: "",
      rowData: "",
      UserName: Cookies.get("UserName"),
      Tokencode: Cookies.get("TokenCode"),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      GetRecruitmentByAdmin().then(res => {
        this.tableData = res.RecruitmentLst;
        this.loadingTableData = false;
      });
    },
    approve(row) {
      this.dialogFormApprove = true;
      this.titleDialog = "Xác nhận bài tuyển dụng";
      this.rowData = row;
    },
    approveOK() {
      this.dialogFormApprove = false;
      this.fetchData();
    },
    viewCandidate(row) {
      this.dialogFormCandidate = true;
      this.titleDialog = "Danh sách ứng viên";
      this.rowData = row;
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
.block {
  background-color: #f0f2f5;
  .inline-block {
    display: inline-block;
  }
}
</style>
