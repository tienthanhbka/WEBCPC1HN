<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        @click="createMaterial"
        style="background-color: #02bc77;color:#fff;"
        icon="el-icon-circle-plus"
        >Thêm nguyên liệu</el-button
      >
    </div>
    <create
      modalId="new-material-modal"
      @materialAdded="materialAdded"
    ></create>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="MaterialLst"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-popover placement="right" width="450" trigger="click">
              <detail-material :material="scope.row"></detail-material>
              <el-button slot="reference" type="text">
                <i class="far fa-eye"></i>
              </el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" width="155px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-tooltip v-if="admin" content="Phê duyệt">
              <el-button
                @click="acceptIdea(scope.row)"
                size="mini"
                type="success"
                ><i class="fas fa-check-double"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Cập nhật">
              <el-popover placement="left" width="350" trigger="click">
                <status-material :material="scope.row"></status-material>
                <el-button slot="reference" type="text"
                  ><i class="far fa-edit"></i
                ></el-button>
              </el-popover>
            </el-tooltip>
            <el-tooltip content="Xóa">
              <el-button
                @click="delMaterial(scope.row)"
                type="text"
                style="color:red;"
                ><i class="far fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên nguyên liệu" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên nguyên liệu">
            {{ scope.row.MaterialName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên thương mại" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên thương mại">
            {{ scope.row.CommerceName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nhà cung cấp" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nhà cung cấp">
            {{ scope.row.SupplierId }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hoạt chất" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hoạt chất">
            {{ scope.row.ActiveElement }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Khởi tạo" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khởi tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:mm dd-MM-yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" min-width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | ideaStatusColor">
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import { GetMaterial, RemoveMaterial } from "@/api/material";
import Create from "@/views/RD/material/component/createMaterial2";
import StatusMaterial from "@/views/RD/material/component/statusMaterial";
import Delete from "@/views/RD/material/component/deleteMaterial";
import DetailMaterial from "@/views/RD/material/employee/component/detailMaterial";
import Cookies from "js-cookie";
export default {
  components: { Create, Delete, DetailMaterial, StatusMaterial },
  data() {
    return {
      MaterialLst: [],
      admin: false,
      rowData: "",
      direction: "ttb",
      drawer: false,
      listLoading: false,
      // dialogFormAccept: false,
      // dialogFormUpdate: false,
      // dialogFormDel: false,
      currentPage: 1,
      dataLength: 10,
      pageSize: 2
    };
  },
  methods: {
    // cancelOK() {
    //   this.dialogFormUpdate = false
    // },
    // addOK(form) {
    //   this.dialogFormUpdate = false
    //   this.fetchData()
    // },
    // updateOK() {
    //   this.dialogFormUpdate = false

    // },
    // canceldelOK(){
    //   this.dialogFormDel = false
    // },
    createMaterial() {
      VoerroModal.show("new-material-modal");
    },
    materialAdded() {
      this.fetchData();
    },
    // editMaterial(row) {
    //   this.rowData = row
    //   this.dialogFormUpdate = true
    // },
    delMaterial(row) {
      this.$confirm(
        "Xác nhận xóa nguyên liệu " + row.MaterialName + ". Continue?",
        "Xóa nguyên liệu",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "warning"
        }
      )
        .then(() => {
          var rep = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            MaterialId: row.MaterialId
          };
          RemoveMaterial(rep).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                type: "success",
                message: "Xóa thành công"
              });
              this.fetchData();
            } else {
              this.$message({
                type: "warning",
                message: res.RespText
              });
            }
          });
        })
        .catch(() => {});
    },
    // delOK() {
    //   this.dialogFormDel = false
    //   this.fetchData()
    // },
    fetchData() {
      this.listLoading = true;
      GetMaterial({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        ActiveElement: ""
      }).then(res => {
        this.MaterialLst = res.MaterialLst;
        this.listLoading = false;
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
.container {
  padding: 5px;
  background-color: #e9ebee;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  margin-top: 10px;
}
</style>
