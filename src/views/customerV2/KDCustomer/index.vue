<template>
  <div>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :xs="24" :sm="24" :lg="24">
        <div class="inline-block" style="float: right;padding:10px">
          <el-button
            @click="createCustomer"
            icon="fas fa-user-plus"
            type="primary"
            size="small"
          >
            Thêm mới
          </el-button>
        </div>
      </el-col>
    </el-row>
    <el-table
      class="el-mobile-table"
      :data="tableData"
      size="small"
      v-loading="isLoading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" width="110px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip content="Chỉnh sửa">
              <el-button
                @click="editCustomer(scope.row)"
                type="text"
                v-if="UserName == scope.row.CreatorId"
                ><i class="fas fa-edit"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Xóa">
              <el-button
                @click="delCustomer(scope.row)"
                type="text"
                style="color:red;"
                v-if="UserName == scope.row.CreatorId"
                ><i class="el-icon-delete"></i></el-button
            ></el-tooltip>
            <el-tooltip content="Lấy KH">
              <el-button
                @click="getCustomer(scope.row)"
                type="text"
                style="color:#02bc77;"
                v-if="UserName != scope.row.CreatorId"
                ><i class="el-icon-document-copy"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column min-width="70px" label="Mã khách hàng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã khách hàng">
            {{ scope.row.CustomerId.substring(0, 6) }}
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="150px" label="Tên khách hàng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên khách hàng">
            {{ scope.row.CustomerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Số điện thoại">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số điện thoại">
            {{ scope.row.Phone }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Chức vụ">
        <template slot-scope="scope">
          <div class="dat-cell" label="Chức vụ">
            {{ scope.row.Position }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="120px" label="Chuyên môn">
        <template slot-scope="scope">
          <div class="dat-cell" label="Chuyên môn">
            {{ scope.row.Job }}
          </div>
        </template>
      </el-table-column>

      <el-table-column min-width="200px" label="Địa chỉ">
        <template slot-scope="scope">
          <div class="dat-cell" label="Địa chỉ">
            {{ scope.row.Address }}
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column min-width="100px" label="Người tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreatorId }}
          </div>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      class="pagination"
      :total="tableDataCustomer.length"
      :small="true"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchTable"
      background
      :pager-count="5"
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>

    <el-dialog
      :visible.sync="dialogFormCreate"
      custom-class="default-modal"
      append-to-body
    >
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create
        :customer="rowData"
        :place="place"
        @customerUpdated="updateOK"
        @customerAdded="addOK"
        @closeOK="closeOK"
      ></create>
    </el-dialog>
  </div>
</template>
<script>
import Create from "@/views/customerV2/component/createCustomer";
import DelCustomer from "@/views/customerV2/component/deleteCustomer";
import {
  TGetCustomerByPId,
  CreateCustomer,
  DelCustomerByCId
} from "@/api/KDCustomer";
import { GetPlaceByPId } from "@/api/KDPlace";

import Cookies from "js-cookie";
export default {
  components: {
    Create,
    DelCustomer
  },
  props: {
    place: Object
  },
  data() {
    return {
      groupLst: [],
      emLst: [],
      tableDataCustomer: [],
      token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      isLoading: false,
      tableData: [],
      dialogFormDel: false,
      dialogFormCreatePlace: false,
      dialogFormSys: false,
      rowData: "",
      row: "",
      pageSize: 10,
      currentPage: 1,
      dialogFormCreate: false,
      titleDialog: ""
      //place: ""
    };
  },

  methods: {
    createCustomer() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo mới thông tin khách hàng cá nhân";
      this.rowData = null;
    },
    updateOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    delCustomer(row) {
      this.$confirm(
        "Xóa khách hàng " + row.CustomerName + ". Tiếp tục?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            Token: this.token,
            UserName: this.UserName,
            CustomerId: row.CustomerId
          };
          DelCustomerByCId(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Xóa khách hàng thành công",
                type: "success"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    delcancelOK() {
      this.dialogFormDel = false;
    },
    editCustomer(data) {
      this.dialogFormCreate = true;
      this.titleDialog = "Cập nhật thông tin khách hàng cá nhân";
      this.rowData = data;
    },

    createPlaceSys() {
      this.dialogFormSys = true;
    },
    addSysOK() {
      this.dialogFormSys = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormSys = true;
    },
    fetchData() {
      this.isLoading = true;
      var req = {
        Token: this.token,
        UserName: this.UserName,
        PlaceId: this.place.PlaceId
      };
      TGetCustomerByPId(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.CustomerLst;
          let cusEm = [];
          let cusNotEm = [];
          let cus = [];
          res.CustomerLst.forEach(element => {
            if (element.CreatorId == this.UserName) {
              cusEm.push(element);
            } else {
              cusNotEm.push(element);
            }
          });
          //console.log(cusEm);
          //console.log(cusNotEm);
          cusEm.forEach(element1 => {
            cusNotEm.forEach((element2, index2) => {
              if (
                element1.CustomerName == element2.CustomerName &&
                element1.Phone == element2.Phone
              ) {
                ////console.log(element2);
                cusNotEm.splice(index2, 1);
              }
            });
          });
          cus = cusEm.concat(cusNotEm);
          //console.log(cus);
          this.tableDataCustomer = cus;
          this.fetchTable();
        }
      });

      this.isLoading = false;
    },
    fetchTable() {
      this.tableData = this.tableDataCustomer.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    getCustomer(val) {
      //console.log(val);
      CreateCustomer({ CustomerInfo: val }).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Lấy khách hàng thành công",
            type: "success"
          });
          this.fetchData();
        }
      });
    },
    closeOK() {
      this.dialogFormCreate = false;
    }
  },
  created() {
    this.fetchData();
    //this.fetchPlace();
  },
  watch: {
    place() {
      this.fetchData();
    }
  }
};
</script>
<style scoped></style>
