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
        :data="tableData"
        element-loading-text="Loading"
        style="width:100%"
        border
        fit
        highlight-current-row
      >
        <el-table-column type="expand" width="75">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.ConsignmentLineLst"
              border
              style="width: 100%"
            >
              <el-table-column align="center" label="STT" width="95">
                <template slot-scope="props">
                  {{ props.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="Mã sản phẩm" align="center" width="200">
                <template slot-scope="props">
                  {{ props.row.ProductID }}
                </template>
              </el-table-column>
              <el-table-column label="Tên sản phẩm" min-width="160">
                <template slot-scope="props">
                  {{ props.row.ProductName }}
                </template>
              </el-table-column>
              <el-table-column label="Số lượng" width="150" align="center">
                <template slot-scope="props">
                  {{ props.row.Quantity }}
                </template>
              </el-table-column>
              <el-table-column label="ĐTV" width="150" align="center">
                <template slot-scope="props">
                  {{ props.row.Unit }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="STT" width="85">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Khách hàng" min-width="250">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Khách hàng">
              [{{ scope.row.PlaceID }}]-{{ scope.row.PlaceName }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Từ ngày" width="100" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Từ ngày">
              {{ scope.row.DateStart }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Đến ngày" width="100" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Đến ngày">
              {{ scope.row.DateEnd }}
            </div></template
          >
        </el-table-column>

        <el-table-column label="Ghi chú" min-width="150">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div></template
          >
        </el-table-column>
        <el-table-column width="140px" label="Trạng thái" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag
                :type="scope.row.Status | oceStatusColor"
                style="width:120px"
                effect="plain"
                >{{ scope.row.Status | oceStatusText }}</el-tag
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column width="170px" label="Actions" align="center">
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
          :emailLst="emailLst"
          :places="places"
          :groups="groups"
          :mode="modeView"
          :items="items"
        ></modal-info>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { GetEmailLst } from "@/api/mission";

import { GetConsignmentByEm, DelConsignment } from "@/api/order";
import { GetCustomerBFO } from "@/api/customerBFO";
import { GetItemFast } from "@/api/product";
import ModalInfo from "./component/modal-info";
import { getIdUser, getToken } from "@/utils/auth";
import { GetGroupEmployee } from "@/api/groups";
import { GetPlaceByUId } from "@/api/KDPlace";

export default {
  components: {
    ModalInfo
  },
  props: {},
  data() {
    return {
      listLoading: false,
      tableData: [],
      places: [],
      groups: [],
      emailLst: [],
      items: [],
      dialogForm: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      search: "",
      modeView: 0
    };
  },
  methods: {
    create() {
      this.dialogForm = true;
      this.titleDialog = "Tạo phiếu mới";
      this.modeView = 1; //tạo mới
      this.rowData = null;
    },
    edit(row) {
      this.dialogForm = true;
      this.titleDialog = "Cập nhật phiếu";
      this.modeView = 2; //cập nhật
      this.rowData = row;
    },
    view(row) {
      this.dialogForm = true;
      this.titleDialog = "Chi tiết phiếu";
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
        "Xóa phiếu gửi hàng " + row.PlaceName + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            HeaderID: row.HeaderID
          };
          DelConsignment(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa phiếu thành công",
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
      GetConsignmentByEm().then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.ConsignmentLst;
          this.listLoading = false;
        }
      });
    },
    fetchPlace() {
      GetPlaceByUId().then(res => {
        if (res.RespCode == 0) {
          this.places = res.PlaceLst;
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
    fetchEmail() {
      GetEmailLst().then(res => {
        this.emailLst = res.Data;
      });
    },
    fetchItem() {
      GetItemFast().then(res => {
        if (res.RespCode == 0) {
          this.items = res.ItemLst;
        }
      });
    }
    // exportExcel(data) {
    //   this.downloading = true;
    //   const tHeader = [
    //     "Mã phiếu",
    //     "Mã KHTC",
    //     "KHTC",
    //     "Địa bàn",
    //     "Tần suất",
    //     "Doanh số dự kiến",
    //     "Ghi chú TC",
    //     "Mã KHCN",
    //     "Khách hàng",
    //     "SĐT",
    //     "Email",
    //     "Tần suất",
    //     "Ghi chú CN"
    //   ];
    //   const filterHeader = [
    //     "OCE_Header",
    //     "PlaceID",
    //     "PlaceName",
    //     "AddrLv1",
    //     "Frequency",
    //     "s",
    //     "NoteTC",
    //     "CustomerID",
    //     "CustomerName",
    //     "PhoneNumber",
    //     "Email",
    //     "QuantityCall",
    //     "NoteCN"
    //   ];
    //   import("@/vendor/Export2Excel")
    //     .then(excel => {
    //       excel.export_json_to_excel({
    //         header: tHeader,
    //         data: this.formatJson(filterHeader, data),
    //         filename: "Danh sách kế hoạch checkcall " + this.month, //Optional
    //         autoWidth: true,
    //         bookType: "xlsx"
    //       });
    //     })
    //     .finally(() => {
    //       this.downloading = false;
    //     });
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v =>
    //     filterVal.map(j => {
    //       if (j === "Status") {
    //         return this.$options.filters.oceStatusText(v[j]);
    //       } else {
    //         return v[j];
    //       }
    //     })
    //   );
    // }
  },
  computed: {},
  mounted() {},
  watch: {},
  created() {
    this.fetchData();
    this.fetchPlace();
    this.fetchGroup();
    this.fetchEmail();
    this.fetchItem();
  }
};
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
