<template>
  <div>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :xs="24" :sm="24" :lg="24">
        <!-- <div class="inline-block">
          <h3
            style="    margin: 0;
    padding: 20px;
    font-size: 13pt;
    color: #64c9cf;"
          >
            {{ place.PlaceName }}
          </h3>
        </div> -->
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
        <create
          modalId="new-customer-modal"
          :customer="rowData"
          :place="place"
          @customerUpdated="updateOK"
          @customerAdded="addOK"
        ></create>
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
            {{ scope.$index + 1 }}
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
      <el-table-column width="180px" label="Tên khách hàng">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên khách hàng">
            {{ scope.row.CustomerName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Số điện thoại">
        <template slot-scope="scope">
          <div class="dat-cell" label="Số điện thoại">
            {{ scope.row.Phone }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220px" label="Chức vụ">
        <template slot-scope="scope">
          <div class="dat-cell" label="Chức vụ">
            {{ scope.row.Position }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220px" label="Chuyên môn">
        <template slot-scope="scope">
          <div class="dat-cell" label="Chuyên môn">
            {{ scope.row.Job }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="220px" label="Email">
        <template slot-scope="scope">
          <div class="dat-cell" label="Email">
            {{ scope.row.Email }}
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
    <el-dialog
      :visible.sync="dialogFormDel"
      title="Xóa khách hàng"
      center
      append-to-body
    >
      <del-customer
        :customer="row"
        @deletecancelOK="delcancelOK"
        @delOK="delOK"
      ></del-customer>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
  </div>
</template>
<script>
import Create from "@/views/customerV2/component/createCustomer";
import DelCustomer from "@/views/customerV2/component/deleteCustomer";
import { TGetCustomerByPId, CreateCustomer } from "@/api/KDCustomer";
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
      token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      isLoading: false,
      tableData: [],
      dialogFormDel: false,
      dialogFormCreatePlace: false,
      dialogFormSys: false,
      rowData: "",
      row: ""
      //place: ""
    };
  },

  methods: {
    createCustomer() {
      VoerroModal.show("new-customer-modal");
      this.rowData = null;
    },
    updateOK() {
      this.fetchData();
    },
    addOK() {
      this.fetchData();
    },
    delCustomer(row) {
      this.row = row;
      this.dialogFormDel = true;
    },
    delOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    delcancelOK() {
      this.dialogFormDel = false;
    },
    editCustomer(data) {
      VoerroModal.show("new-customer-modal");
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
          this.tableData = cus;
        }
      });

      this.isLoading = false;
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
    }
    // fetchPlace() {
    //   GetPlaceByPId({ PlaceId: this.place.PlaceId }).then(res => {
    //     this.place = res.PlaceInfo;
    //   });
    // }
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
<style scoped>
.inline-block {
  display: inline-block;
}
.el-table__expanded-cell[class*="cell"] {
  padding: 15px 5px;
}
.el-tabs--border-card > .el-tabs__content {
  padding: 5px;
}
.modal-class {
  max-width: 960px;
  width: 98%;
}
</style>
