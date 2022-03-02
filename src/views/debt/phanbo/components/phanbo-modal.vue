<template>
<div>
<modal :id="modalId" :ref="modalId" v-cloak>
    <template slot="title">Phiếu đề xuất phân bổ</template>
    <div slot="body">
      <el-form
        aria-orientation="vertical"
        label-position="top"
        :model="form"
        label-width="120px"
        class="demo-ruleForm"
      >
        
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Khách hàng" prop="note">
            <el-input :disabled="true" v-model="form.cusName" class="input-with-select">
    <el-button v-if="coupon==null" @click="openCModal" slot="prepend" icon="el-icon-search"></el-button>
  </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Ngày hiệu lực cơ sở" prop="note">
              <el-date-picker style="width:100%"
                v-model="form.baseDateStart"
                placeholder="Chọn ngày"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Ghi chú" prop="note">
          <el-input type="text" v-model="form.note" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info">Hủy</el-button>
      <el-button type="success" @click="successBtnClick">{{coupon?'Sửa':'Thêm'}}</el-button>
    </div>
    
  </modal>
  <customer-modal :modalId="'customer-modal'" @cusAdded="CusAdded"></customer-modal>
</div>
  

  
</template>
<script>
import { parseTime } from "@/utils";
import { GetCommissionOrderHeader, AddCommissionOrderHeader ,EditCommissionOrderHeader} from "@/api/debt";
import customerModal from './customer-modal';
export default {
  components:{
    customerModal
  },
  props: {
    modalId: String,
    coupon:Object
  },
  methods: {
    openCModal(){
      console.log('a');
      
      VoerroModal.show("customer-modal");
    },
    CusAdded(e){
      console.log(e);
      
      this.form.cusName = e.No_ +' - '+e.Name;
      this.form.cusNo = e.No_;
      this.form.type = e['Customer Template Code']
    },
    successBtnClick() {
      if(this.coupon){
        EditCommissionOrderHeader({
          rowID:this.coupon.RowID,
          baseDateStart: this.form.baseDateStart,
          note:this.form.note
        }).then(res=>{
          this.coupon.BaseDateStart = this.form.baseDateStart;
          this.coupon.note = this.form.note;
          VoerroModal.hide(this.modalId);
        })
      }else{
        AddCommissionOrderHeader({
        note: this.form.note,
        baseDateStart: this.form.baseDateStart,
        idCustomer:this.form.cusNo,
        type:this.form.type
      }).then(res => {
        this.$emit("newCoupon", res.Data);
        VoerroModal.hide(this.modalId);
      });
      }
      
    }
  },
  data() {
    return {
      typeCoupons: [
        {
          value: "TH",
          label: "Thầu"
        },
        {
          value: "KD",
          label: "Kê đơn"
        }
      ],
      form: {
        cusName:'',
        cusNo:'',
        note: "",
        baseDateStart: "",
        type:""
      }
    };
  },
  watch:{
    coupon(){
      if(this.coupon){
      this.form.cusName = this.coupon.CusName;
      this.form.note = this.coupon.note;
      this.form.baseDateStart  = this.coupon.BaseDateStart;
    }
    }
  },
  mounted() {
    console.log(this.coupon);
    
    this.form.baseDateStart = new Date().toISOString().substring(0, 10);
    
  }
};
</script>
<style lang="css">
.el-form-item {
  margin-bottom: 6px;
}
.el-form--label-top .el-form-item__label {
  padding: 0px;
}
.el-input.is-disabled .el-input__inner {
    background-color: white;
    /* border-color: #E4E7ED; */
    color: #C0C4CC;
    cursor: not-allowed;
}
</style>