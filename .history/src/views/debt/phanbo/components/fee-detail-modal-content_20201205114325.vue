<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="Tốc độ đẩy hàng">
        <inventory-detail
          :visible="visible"
          :disableEdit="disableEdit"
          :info="info"
        ></inventory-detail>
      </el-tab-pane>
      <el-tab-pane label="Chi tiết chi phí">
        <fee-table-detail :info="info"></fee-table-detail>
      </el-tab-pane>
    </el-tabs>
    <div style="text-align:right;margin-top:10px">
      <el-button type="success" @click="sendRequest" v-if="!disableEdit">
        <template v-if="info.rowID"
          >Sửa đề xuất</template
        >
        <template v-else
          >Gửi đề xuất</template
        >
      </el-button>
    </div>
  </div>
</template>
<script>
import { db } from "./firebase";
import InventoryDetail from "./inventory-detail";
import FeeTableDetail from "./fee-table-detail";
import { CreateFeeRequest, EditFeeRequest } from "@/api/debt";
export default {
  data() {
    return {};
  },
  watch: {},

  props: {
    info: Object,
    disableEdit: Boolean,
    visible: Boolean
  },
  components: {
    InventoryDetail,
    FeeTableDetail
  },
  methods: {
    sendRequest() {
      if (this.info.typeCus.includes("BS")) {
        if (this.info.inventoryData) {
          var valid = true;
          this.info.inventoryData.forEach(e => {
            if (e.cusCN) {
              var sum = 0;
              e.cusCN.forEach(cn => {
                sum += Number(cn.Quantity);
              });

              if (sum != Number(e.SellQuantity)) {
                valid = false;
              }
            } else {
              if (e.SellQuantity == 0 || e.SellQuantity == null) {
              } else {
                valid = false;
              }
            }
          });
          if (!valid) {
            this.$message({
              message: "Hãy nhập đủ KHCN",
              type: "error"
            });
          } else {
            let key =
              Math.random()
                .toString(36)
                .substring(2) + Date.now().toString(36);
            console.log(this.info);
            db.ref("/Allocation/" + key).set(
              {
                cusName: this.info.cusName,
                cusNo: this.info.cusNo,
                end: this.info.end,
                rowID: this.info.rowID,
                note: this.info.note,
                start: this.info.start,
                status: this.info.status
                // typeItem: this.info.typeItem,
                // inventoryData: this.info.inventoryData,
                // items: this.info.items,
                // typeCus: this.info.typeCus
              },
              function(error) {
                if (error) {
                } else {
                }
              }
            );
            if (this.info.rowID) {
              EditFeeRequest({
                data: this.info
              }).then(res => {
                this.$emit("feeRequestEdited", res.Data);
              });
            } else {
              if (
                this.info.inventoryData != null &&
                this.info.inventoryData.length > 0
              ) {
                CreateFeeRequest({
                  data: this.info
                }).then(res => {
                  this.$emit("feeRequestAdded", res.Data);
                });
              } else {
                this.$message({
                  message:
                    "Hãy bấm cập nhật tốc độ đẩy hàng, hoặc bỏ tính mô B2 nếu không có tồn kho",
                  type: "error"
                });
              }
            }
          }
        }
      } else {
        if (this.info.rowID) {
          EditFeeRequest({
            data: this.info
          }).then(res => {
            this.$emit("feeRequestEdited", res.Data);
          });
        } else {
          CreateFeeRequest({
            data: this.info
          }).then(res => {
            this.$emit("feeRequestAdded", res.Data);
          });
        }
      }
    }
  }
};
</script>
