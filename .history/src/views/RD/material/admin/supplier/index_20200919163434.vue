<template>
  <div>
    <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button icon="el-icon-search" @click="show = !show" circle></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        style="background-color:#02bc77;color:white;"
        @click="ExportExcel"
        icon="el-icon-document"
      ></el-button>
    </div>
    <div class="inline-block">
      <el-button
        @click="createSupplier"
        style="color:#fff;background-color:#02bc77;"
        >Thêm nhà cung cấp</el-button
      >
    </div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="
        SupplierLst.filter(
          data =>
            !TextSearch ||
            data.SupplierName.toLowerCase().includes(TextSearch.toLowerCase())
        )
      "
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Chỉnh sửa">
              <el-button @click="updateSupplier(scope.row)" type="text"
                ><i class="far fa-edit"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên nhà cung cấp" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên nhà cung cấp">
            {{ scope.row.SupplierName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Địa chỉ" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Địa chỉ">
            {{ scope.row.Address }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Website" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Website">
            {{ scope.row.Website }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ghi chú" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Trạng thái" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | ideaStatusColor">
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <CreateSupplier
      modalId="new-supplier-modal"
      :supplier="rowData"
      @supplierAdded="addSupplierlOK"
      @supplierUpdated="updateSupplierOK"
    ></CreateSupplier>
  </div>
</template>
<script>
import { GetSupplierLst } from "@/api/RDSupplier";
import CreateSupplier from "@/views/RD/material/component/createSupplier";
import Cookies from "js-cookie";
export default {
  components: { CreateSupplier },
  data() {
    return {
      SupplierLst: [],
      admin: false,
      rowData: "",
      show: false,
      TextSearch: "",
      listLoading: false
    };
  },
  methods: {
    createSupplier() {
      VoerroModal.show("new-supplier-modal");
      this.rowData = null;
    },
    addSupplierlOK() {
      this.fetchData();
    },
    updateSupplier(row) {
      VoerroModal.show("new-supplier-modal");
      this.rowData = row;
    },
    updateSupplierOK() {
      this.fetchData();
    },
    fetchData() {
      this.listLoading = true;
      GetSupplierLst({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        SupplierName: ""
      }).then(res => {
        this.SupplierLst = res.SupplierLst;

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
<style scoped>
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
</style>
