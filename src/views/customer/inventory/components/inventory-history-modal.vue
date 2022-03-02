<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      custom-class="medium-modal"
      title="Sản phẩm"
      :visible.sync="itemModalVisible"
      append-to-body
    >
      <item-modal
        @ItemChoosed="onItemChoosed"
        :customer="customer"
      ></item-modal>
    </el-dialog>
    <el-button size="small" style="margin-bottom:5px" @click="openItemModal"
      >Thêm sản phẩm</el-button
    >
    <el-table class="" :data="tableData" border show-header>
      <el-table-column align="center" width="97px" label="STT">
        <template slot-scope="scope">
          <i
            class="fas fa-trash-alt"
            style="color:red"
            @click="tableData = tableData.filter(x => x.id !== scope.row.id)"
          ></i>
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="Mã SP" width="130">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="Mã SP">
            <span>{{ row.No_ }}</span>
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
      <el-table-column label="SL tồn" min-width="100">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="SL">
            <el-input-number
              size="mini"
              v-model="row.quantity"
              controls-position="right"
              :min="0"
              style="width:100%"
            ></el-input-number>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ngày ghi nhận" min-width="120">
        <template slot-scope="{ row }">
          <div class="dat-cell" label="SL">
            <el-date-picker
              style="width:100%"
              size="mini"
              v-model="row.date"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="Chọn ngày"
            ></el-date-picker>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addHistory">
      Thêm
    </el-button>
  </div>
</template>
<script>
import ItemModal from "./item-modal";
export default {
  props: {
    customer: Object
  },
  components: {
    ItemModal
  },
  data() {
    return {
      itemModalVisible: false,
      tableData: []
    };
  },
  methods: {
    openItemModal() {
      this.itemModalVisible = true;
    },
    addHistory() {
      this.$emit("historyAdded", this.tableData);
    },
    onItemChoosed(items) {
      var sef = this;
      items.forEach(e => {
        e.date = Date.today().toString("yyyy-MM-dd");
        e.quantity = null;
        // let exist=false;
        // sef.tableData.forEach(o=>{

        // })
        sef.tableData.push(e);
      });
      this.itemModalVisible = false;
    }
  }
};
</script>
