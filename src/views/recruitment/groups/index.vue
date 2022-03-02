<template>
  <div class="block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <el-button class="t-button" type="primary" size="small"
        ><i class="fas fa-plus-circle"></i> Đăng tin</el-button
      >
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
      <el-table-column align="center" width="120">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}

            <el-tooltip content="Chỉnh sửa" placement="top" effect="light"
              ><el-button type="text">
                <i class="fas fa-edit" style="color: #FD7E14;"></i></el-button
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
            ></el-tooltip>
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
      <el-table-column width="150px" prop="Image" label="Email">
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
      <el-table-column
        width="150px"
        prop="TimeCreate"
        label="Ngày tạo"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            <!-- {{ Date.parse(scope.row.TimeCreate).toString("HH:ss dd/MM/yyyy") }} -->
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
              :type="scope.row.Status"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormView">
      <img :src="LinkUrl" alt="image" style="width:100%" />
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
import { GetCompanyByUser } from "@/api/work-dtp/company";
import Cookies from "js-cookie";
export default {
  filters: {},
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      dialogFormEdit: false,
      loadingTableData: false,
      dialogFormView: false,
      downloading: false,
      LinkUrl: "",
      UserName: Cookies.get("UserName"),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      GetCompanyByUser().then(res => {
        this.tableData = res.CompanyLst;
        this.loadingTableData = false;
      });
    }
  },
  computed: {},
  created() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.block {
  background-color: #f0f2f5;
}
</style>
