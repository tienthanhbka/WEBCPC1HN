<template>
  <div>
    <el-form
      aria-orientation="vertical"
      label-position="top"
      :model="form"
      label-width="120px"
      class="demo-ruleForm"
    >
      <el-dialog
        :close-on-click-modal="false"
        title="Khách hàng"
        append-to-body
        :visible.sync="customerModalVisible"
        custom-class="modal-class"
      >
        <cus-modal-content @cusAdded="onCusAdded"></cus-modal-content>
      </el-dialog>
      <el-dialog
        :close-on-click-modal="false"
        title="Sản phẩm"
        append-to-body
        :visible.sync="itemModalVisible"
        custom-class="modal-class"
      >
        <item-modal-content @itemAdded="onItemAdded" :idCustomer="form.cusNo"></item-modal-content>
      </el-dialog>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-form-item label="Khách hàng" prop="note">
            <el-input :disabled="true" v-model="form.cusName" class="input-with-select">
              <el-button @click="openCModal" slot="prepend" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="Ngày bắt đầu hiệu lực" prop="note">
            <el-date-picker
              style="width:100%"
              v-model="form.dateStart"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="Loại tích đơn" prop="type">
            <el-radio-group v-model="form.type">
              <el-radio :label="1">
                Tích đơn theo khách hàng
                <el-popover width="300" trigger="hover">
                  <div>Khách hàng sẽ nhận được chi phí tích đơn khi mua hàng bất kỳ của công ty</div>
                  <i slot="reference" class="fas fa-question"></i>
                </el-popover>
              </el-radio>
              <el-radio :label="2">
                Tích đơn theo khách hàng - sản phẩm
                <el-popover width="300" trigger="hover">
                  <div>Khách hàng sẽ nhận được chi phí tích đơn khi mua hàng được chỉ định của công ty</div>
                  <i slot="reference" class="fas fa-question"></i>
                </el-popover>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-if="form.type==1" label="Chi phí được nhận">
            Chi phí (VNĐ):
            <el-input-number size="small" v-model="form.value" controls-position="right"></el-input-number>Định mức (VNĐ)
            <el-popover width="300" trigger="hover">
              <div>Khách hàng sẽ được xét tính chi phí tích đơn nếu doanh số đủ điều kiện</div>
              <i slot="reference" class="fas fa-question"></i>
            </el-popover>:
            <el-input-number size="small" v-model="form.condition" controls-position="right"></el-input-number>
          </el-form-item>
          <el-form-item v-if="form.type==2">
            <div slot="label">
              Danh mục sản phẩm
              <el-tooltip content="Thêm sản phẩm" effect="light">
                <i
                  @click="addItemClick"
                  style="font-size:18px;color:blue; cursor:pointer"
                  class="fas fa-plus-circle"
                ></i>
              </el-tooltip>
            </div>
            <div>
              <div class="item-row" v-for="(item, index) in form.items" :key="index">
                <template v-if="allowEdit(coupon,item.lStatus)">
                  <span style="display:block">
                    <el-tooltip content="Xóa sản phẩm" effect="light">
                      <i
                        class="fas fa-minus-circle"
                        @click="removeItem(item)"
                        style="color:red;cursor:pointer"
                      ></i>
                    </el-tooltip>
                    <b style="color:#30336b">{{item.idProduct}} - {{item.Name}}</b>
                    <el-tag
                      style="float:right"
                      slot="reference"
                      size="mini"
                      :type="item.lStatus|phanBoStatusColor "
                    >
                      <i class="fas fa-info"></i>
                      {{ item.lStatus|phanBoStatusText }}
                    </el-tag>
                  </span>
                  <span style="display:inline-block">
                    <b>Chi phí(VNĐ):</b>
                    <el-input-number size="mini" v-model="item.value" controls-position="right"></el-input-number>
                  </span>
                  <span style="display:inline-block">
                    <b>Định mức ({{item.Unit}})</b>
                    <el-popover width="300" trigger="hover">
                      <div>Khách hàng sẽ được xét tính chi phí tích đơn sản phẩm này nếu doanh số đủ điều kiện</div>
                      <i slot="reference" class="fas fa-question"></i>
                    </el-popover>:
                    <el-input-number size="mini" v-model="item.condition" controls-position="right"></el-input-number>
                  </span>
                </template>
                <template v-else>
                  <span style="display:block">
                    <b style="color:#30336b">{{item.idProduct}} - {{item.Name}}</b>
                    <el-tag
                      style="float:right"
                      slot="reference"
                      size="mini"
                      :type="item.lStatus|phanBoStatusColor "
                    >
                      <i class="fas fa-info"></i>
                      {{ item.lStatus|phanBoStatusText }}
                    </el-tag>
                  </span>
                  <span style="display:inline-block">
                    <b>Chi phí(VNĐ):</b>
                    <b style="color:#1abc9c">{{item.value|toVND}}</b>
                  </span>
                  <span style="display:inline-block">
                    <b>Định mức ({{item.Unit}})</b>
                    <el-popover width="300" trigger="hover">
                      <div>Khách hàng sẽ được xét tính chi phí tích đơn sản phẩm này nếu doanh số đủ điều kiện</div>
                      <i slot="reference" class="fas fa-question"></i>
                    </el-popover>:
                    <b style="color:#1abc9c">{{item.condition|numbered}}</b>
                  </span>
                </template>
              </div>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú" prop="note">
        <el-input type="text" v-model="form.note" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info">Hủy</el-button>
      <el-button type="success" @click="btnOKClick">{{coupon==null?'Thêm':'Sửa'}}</el-button>
    </div>
  </div>
</template>
<script>
import CusModalContent from "@/views/debt/phanbo/TH-offer/components/cus-modal-content";
import ItemModalContent from "@/views/debt/phanbo/TH-offer/components/item-modal-content";
import { AddCommissionOrderTD, EditCommissionOrderTD } from "@/api/debt";
export default {
  props: {
    coupon: Object,
    visible:Boolean
  },
  components: {
    CusModalContent,
    ItemModalContent
  },

  data() {
    return {
      customerModalVisible: false,
      itemModalVisible: false,
      form: {
        type: null,
        value: 0,
        condition: 0,
        cusNo: null,
        cusName: null,
        dateStart: null,
        items: [],
        note: null
      }
    };
  },

  created() {
    this.setData();
  },
  watch: {
    // coupon() {
    //   this.setData();
    // },
    visible(){
      this.setData();
    }
  },
  methods: {
    allowEdit(coupon, status) {
      var elEdit = false;
      if(coupon==null) return true;
      var lv = coupon.lv;
      if (lv == null) {
        if (status == 1 || status == 4) {
          elEdit = true;
        }
      } else {
        if (lv < 2) {
          if (status == 1 || status == 4) {
            elEdit = true;
          }
        } else if (lv == 2) {
          if (status <= 6) {
            elEdit = true;
          }
        } else if (lv > 2) {
          if (status <= 8) {
            elEdit = true;
          }
        }
      }
      return elEdit;
    },
    setData() {
      if (this.coupon != null) {
        
        this.form = {
          type: Number(this.coupon.Type),
          value: this.coupon.Value,
          cusNo: this.coupon.CustomerNo,
          condition:this.coupon.Condition,
          cusName: this.coupon.CustomerName,
          dateStart: this.coupon.DateStart,
          note: this.coupon.Note,
          items:
            this.coupon.Type == 1
              ? []
              : this.coupon.Lines.map(e => {
                  return {
                    DateStart: null,
                    Name: e.LItemName,
                    TotalRows: "114",
                    Unit: e.LUnit,
                    "Unit Price": "23047.6191000000",
                    idProduct: e.LItemNo,
                    isEdit: true,
                    value: e.LValue,
                    lStatus: e.LStatus,
                    condition: e.LCondition
                  };
                })
        };
      } else {
        this.form = {
          type: null,
          value: 0,
          condition: 0,
          cusNo: null,
          cusName: null,
          dateStart: null,
          note: null,
          items: []
        };
      }
    },
    btnOKClick() {
      if (this.coupon == null) {
        AddCommissionOrderTD(this.form).then(res => {
          this.$emit("newCoupon", res.Data);
        });
      } else {
        this.form.rowID = this.coupon.RowID;
        this.form.idGroup = this.coupon.IDGroup;
        EditCommissionOrderTD(this.form).then(res => {
          this.$emit("couponEdited", res.Data);
        });
      }
    },
    removeItem(item) {
      this.form.items.splice(this.form.items.indexOf(item), 1);
    },
    onCusAdded(cus) {
      this.form.cusNo = cus.No_;
      this.form.cusName = cus.Name;
      this.form.items = [];
      this.customerModalVisible = false;
    },
    onItemAdded(items) {
      console.log(items);

      items.forEach(o => {
        var allowAdd = true;
        this.form.items.forEach(e => {
          if (o.idProduct == e.idProduct) {
            allowAdd = false;
          }
        });
        if (allowAdd) {
          o.value = 0;
          o.lStatus = 1;
          this.form.items.push(o);
        }
      });
      this.itemModalVisible = false;
    },
    openCModal() {
      this.customerModalVisible = true;
    },
    addItemClick() {
      this.itemModalVisible = true;
    }
  }
};
</script>
<style lang="css" scoped>
.item-row {
  border-radius: 10px;
  border: 1px solid #2d3436;
  padding: 5px;
  margin-bottom: 5px;
}
</style>