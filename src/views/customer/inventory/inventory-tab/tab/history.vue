<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      title="Lịch  sử tồn kho"
      :visible.sync="inventoryModalVisible"
      custom-class="medium-modal"
    >
      <inventory-history-modal
        @historyAdded="onHistoryAdded"
        :customer="customer"
      ></inventory-history-modal>
    </el-dialog>
    <el-button
      size="small"
      style="margin-bottom:5px"
      type="primary"
      @click="fetchData()"
      ><i class="fas fa-sync-alt"></i
    ></el-button>
    <el-button size="small" style="margin-bottom:5px" @click="openHistoryModal"
      >Thêm tồn kho</el-button
    >
    <el-table
      class=""
      :data="tableData"
      v-loading="loadingTableData"
      border
      show-header
    >
      <el-table-column label="Mã SP" width="130">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Mã SP">
            <span
              ><i
                class="fas fa-trash-alt"
                style="cursor:pointer;color:red"
                @click="removeH(row)"
              ></i>
              {{ row.ItemNo }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên SP" min-width="150">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Tên SP">
            <span>{{ row.Name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="SL tồn ghi nhận" min-width="150">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="SL">
            <span>{{ row.Quantity | numbered }} {{ row.Unit }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày ghi nhận" min-width="150">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="SL">
            <span>{{ Date.parse(row.RecordTime).toString("dd/MM/yyyy") }}</span>
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
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
  </div>
</template>
<script>
import InventoryHistoryModal from "@/views/customer/inventory/components/inventory-history-modal";
import {
  AddInventoryHistoryToCus,
  GetInventoryHistoryOfCus,
  DelInventoryRow
} from "@/api/customer";
import { CheckInventoryCus } from "@/api/inventory";
export default {
  components: {
    InventoryHistoryModal
  },
  props: {
    customer: Object,
    idEmployee: String
  },
  data() {
    return {
      dataLength: 0,
      pageSize: 5,
      currentPage: 1,
      inventoryModalVisible: false,
      tableData: [],
      loadingTableData: false
    };
  },
  created() {
    if (this.customer.history == null) {
      this.fetchData();
    } else {
      this.tableData = this.customer.history;
    }
  },
  methods: {
    removeH(row) {
      this.$confirm("Bạn có muốn xóa dòng lịch sử này", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        DelInventoryRow({
          rowID: row.RowID
        }).then(res => {
          this.tableData.splice(this.tableData.indexOf(row), 1);
        });
      });
    },
    fetchData() {
      this.loadingTableData = true;
      GetInventoryHistoryOfCus({
        cus: this.customer.No_,
        idEmployee: this.idEmployee ? this.idEmployee : null,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      }).then(res => {
        (this.dataLength = res.TotalRows),
          (this.currentPage = res.PageNumber),
          (this.loadingTableData = false);
        this.customer.history = res.Data;
        this.tableData = this.customer.history;
      });
    },
    onHistoryAdded(items) {
      items.forEach(i => {
        this.checkInEx(i);
      });
      AddInventoryHistoryToCus({
        cus: this.customer.No_,
        data: items
      }).then(res => {
        var its = res.Data;
        its.forEach(e => {
          this.tableData.unshift(e);
        });
      });

      this.inventoryModalVisible = false;
    },
    checkInEx(item) {
      const req = {
        CustomerID: this.customer.No_,
        ProductID: item.No_,
        DayRecord: item.date
      };
      CheckInventoryCus(req).then(res => {
        if (res.RespCode != 0) {
          this.$notify({
            title: "Xảy ra lỗi",
            message: res.RespText,
            type: "error"
          });
          return;
        }
      });
    },
    openHistoryModal() {
      this.inventoryModalVisible = true;
    }
  }
};
</script>
<style lang="stylus" scoped></style>
