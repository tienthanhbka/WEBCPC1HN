<template>
  <div>
    <el-dialog
      title="Khách hàng cá nhân"
      append-to-body
      custom-class="medium-modal"
      :visible.sync="cusModalVisible"
    >
      <customer-cn-modal-content
        :cusNo="info.cusNo"
        @cusChoosed="onCusChoosed"
      ></customer-cn-modal-content>
    </el-dialog>
    <el-button size="small" type="primary" @click="fetchData">
      <i class="fas fa-sync-alt"></i>
    </el-button>
    <div v-loading="isLoading" style="min-height:30px">
      <div v-for="(item, index) in tableData" :key="index">
        <div :class="validRow(item) ? 'in-row' : 'in-row error'">
          <span v-if="!validRow(item)"
            >(Không có dữ liệu đầu kì, cuối kì!!!)</span
          >
          <el-button
            size="small"
            type="primary"
            @click="openCModal(item)"
            v-else-if="info.typeCus.includes('BS') && !disableEdit"
            >Thêm KHCN</el-button
          >

          <span>{{ item.ItemNo }} {{ item.ItemCode }}</span> •
          <span>Mua: {{ numberFormat(item.BuyQuantity) }}</span> •
          <span>Đầu kì: {{ numberFormat(item.InvenFirstQuantity) }}</span>
          •
          <span>Cuối kì: {{ numberFormat(item.InvenLastQuantity) }}</span> •

          <span>SL Kê đơn: {{ numberFormat(item.SellQuantity) }}</span>

          <span v-if="!validQuantity(item)" style="color:red"
            >Hãy chia đủ số lượng</span
          >
          <el-table
            v-if="item.cusCN.length > 0"
            style="margin-top:5px"
            size="small"
            border
            fit
            :data="item.cusCN"
          >
            <el-table-column label="KH CN" min-width="150">
              <template slot-scope="scope">
                <el-button
                  @click="removeCNRow(item.cusCN, scope.row)"
                  v-if="!disableEdit"
                  type="text"
                >
                  <i style="color:red" class="fas fa-user-times"></i>
                </el-button>
                {{ scope.row.CustomerCNName }}
              </template>
            </el-table-column>
            <el-table-column
              :label="
                'SL Tiêu thụ (max =' + numberFormat(item.SellQuantity) + ')'
              "
              min-width="150"
            >
              <template slot-scope="{ row }">
                <el-input-number
                  v-if="!disableEdit"
                  controls-position="right"
                  size="mini"
                  v-model="row.Quantity"
                ></el-input-number>
                <span v-else>{{ row.Quantity | numbered }}</span>
              </template>
            </el-table-column>

            <!-- <el-table-column
              label="STK"
              min-width="150"
            >
              <template slot-scope="{row}">
                <el-input

                  v-if="!disableEdit"
                  controls-position="right"
                  
                  size="mini"
                  v-model="row.STK"
                ></el-input>
                <span v-else>{{row.STK}}</span>
              </template>
            </el-table-column> -->

            <el-table-column label="P" min-width="150">
              <template slot-scope="{ row }">
                <!-- <el-input

                  v-if="!disableEdit"
                  controls-position="right"
                  
                  size="mini"
                  v-model="row.Pay"
                ></el-input> -->
                <!-- <el-checkbox-group controls-position="right"  v-if="!disableEdit"  v-model="row.Pay">
                  <el-checkbox label="1"></el-checkbox>
                  <el-checkbox label="0"></el-checkbox>
                </el-checkbox-group> -->

                <el-radio
                  controls-position="right"
                  v-if="!disableEdit"
                  v-model="row.Pay"
                  label="1"
                  >CK</el-radio
                >
                <span v-else>{{ row.Pay }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { CalInventoryReportByCus } from "@/api/customer";
import CustomerCnModalContent from "./customer-cn-modal-content";
export default {
  components: {
    CustomerCnModalContent
  },
  props: {
    info: Object,
    disableEdit: Boolean,
    visible: Boolean
  },
  data() {
    return {
      tableData: [],
      cusModalVisible: false,
      curItem: null,
      isLoading: false
    };
  },

  created() {},
  filters: {},
  watch: {
    "info.rowID"() {
      this.tableData = [];
      this.info.inventoryData = this.tableData;
    },
    visible() {
      this.tableData = [];
      this.info.inventoryData = this.tableData;
    }
  },
  computed: {},
  methods: {
    validQuantity(item) {
      if (item.cusCN && item.cusCN.length > 0) {
        var sum = 0;
        item.cusCN.forEach(cn => {
          //console.log(cn.Quantity);

          sum += Number(cn.Quantity);
        });

        if (sum == Number(item.SellQuantity)) {
          //console.log(sum);

          return true;
        }
        return false;
      } else {
        if (item.SellQuantity == 0 || item.SellQuantity == null) {
          return true;
        }
        return false;
      }
    },
    removeCNRow(tab, row) {
      tab.splice(tab.indexOf(row), 1);
    },
    saveTemp() {},
    qChange(item, row) {
      var sum = 0;
      item.cusCN.forEach(e => {
        sum += Number(e.Quantity);
      });

      if (sum > item.SellQuantity) {
        var t = row.Quantity - (sum - item.SellQuantity);

        row.Quantity = 0;
      }
    },
    onCusChoosed(cuss) {
      cuss.forEach(e => {
        let cExist = false;
        this.curItem.cusCN.forEach(c => {
          if (e.idCustomer == c.CusCNNo) {
            cExist = true;
          }
        });
        if (!cExist) {
          var o = {
            CusCNNo: e.idCustomer,
            CustomerCNName: e.nameCustomer
          };
          o.Quantity = 0;

          this.curItem.cusCN.push(o);
        }
      });
      this.cusModalVisible = false;
    },
    openCModal(row) {
      this.curItem = row;
      this.cusModalVisible = true;
    },
    validRow(row) {
      if (!this.info.typeCus.includes("BS")) {
        return true;
      }
      if (row.InvenFirstQuantity == null || row.InvenLastQuantity == null) {
        return false;
      } else {
        return true;
      }
    },
    numberFormat(e) {
      if (e) {
        return this.$options.filters.numbered(e);
      } else {
        return "---";
      }
    },
    fetchData() {
      this.isLoading = true;
      // console.log(this.info);
      CalInventoryReportByCus({
        rowID: this.info.rowID,
        cus: this.info.cusNo,
        start: this.info.start,
        end: this.info.end,
        items: this.info.items,
        typeItem: this.info.typeItem
      }).then(res => {
        this.isLoading = false;
        res.Data.forEach(e => {
          if (!e.cusCN) {
            e.cusCN = [];
          }
        });
        this.tableData = res.Data;
        this.info.inventoryData = this.tableData;
      });
    }
  }
};
</script>
<style lang="css" scoped>
.in-row {
  padding: 5px;
  border: 1px dashed;
  margin-top: 5px;
  word-break: normal;
}
.in-row span {
  padding: 4px;
  color: #192a56;
  margin-left: 5px;
}
.in-row.error {
  color: #d63031;
  border-color: #d63031;
}
.in-row.error span {
  color: #d63031;
}
</style>
