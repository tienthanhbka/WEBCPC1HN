<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <el-button
        class="t-button"
        type="primary"
        size="small"
        @click="createGroup"
        ><i class="fas fa-plus-circle"></i> Tạo nhóm mới</el-button
      >
      <el-button
        class="t-button"
        style="float:right"
        type="success"
        :loading="downloading"
        size="small"
        ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
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
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Title" min-width="120px;" label="Tên nhóm">
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
      <el-table-column width="150px" label="Ngày tạo" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo" v-if="scope.row.TimeCreate">
            {{ Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy") }}
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
      <el-table-column label="Actions" width="150px" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-tooltip content="Chi tiết" placement="top" effect="light">
              <router-link
                :to="'/tuyen-dung/groups/introduce/' + scope.row.CompanyID"
              >
                <el-button type="primary" size="mini" icon="el-icon-view">
                </el-button
              ></router-link>
            </el-tooltip>
            <el-tooltip
              content="Thêm thành viên"
              placement="top"
              effect="light"
            >
              <el-button
                size="mini"
                type="info"
                icon="fas fa-users"
                @click="addEm(scope.row)"
              ></el-button
            ></el-tooltip>
          </el-button-group>
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
    <el-dialog :visible.sync="dialogFormAddEm" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <add-employee @addEmOK="addEmOK" :company="companyID"></add-employee>
    </el-dialog>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import Create from "./component/createGroup";
import { GetCompanyByUser } from "@/api/work-dtp/company";
import AddEmployee from "../groups/component/addEmployee";
export default {
  filters: {},
  components: { Create, AddEmployee },
  props: {},
  data() {
    return {
      tableData: [],
      dialogFormEdit: false,
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      dialogFormAddEm: false,
      titleDialog: "",
      LinkUrl: "",
      rowData: "",
      companyID: "",
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
    detail() {},
    addEm(row) {
      this.dialogFormAddEm = true;
      this.titleDialog = "Thêm thành viên";
      this.companyID = row.CompanyID;
    },
    addEmOK() {
      this.dialogFormAddEm = false;
      this.fetchData();
    },
    fetchData() {
      this.loadingTableData = true;
      const req = {
        UserName: this.UserName,
        TokenCode: this.TokenCode
      };
      GetCompanyByUser(req).then(res => {
        this.tableData = res.CompanyLst;
        this.loadingTableData = false;
      });
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
}
</style>
