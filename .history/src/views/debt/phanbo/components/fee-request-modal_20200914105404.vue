<template>
  <div>
    <el-dialog
      title="Khách hàng"
      append-to-body
      custom-class="modal-class"
      :visible.sync="modalCusVisible"
    >
      <cus-modal-content :coupon="null" @cusAdded="onCusAdded"></cus-modal-content>
    </el-dialog>
    <el-dialog
      title="Sản phẩm"
      append-to-body
      custom-class="modal-class"
      class="width-80"
      :visible.sync="itemModalVisible"
    >
      <item-modal-content
        :coupon="null"
        :info="form"
        :idCustomer="form.cusNo"
        @itemAdded="onItemAdded"
      ></item-modal-content>
    </el-dialog>
    <el-dialog
      title="Kê chi phí"
      append-to-body
      custom-class="modal-class"
      :visible.sync="feeDetailModalVisible"
    >
      <fee-detail-modal-content :visible="feeDetailModalVisible"  @feeRequestAdded="onFeeRequestAdded" @feeRequestEdited="onFeeRequestEdited" :disableEdit="disabled" :info="form"></fee-detail-modal-content>
    </el-dialog>
    <el-form :disabled="disabled">
      <el-form-item label="Khách hàng" prop="note">
        <el-input :disabled="true" v-model="form.cusName" class="input-with-select">
          <el-button @click="openCModal" slot="prepend" icon="el-icon-search"></el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <label>Thời gian</label>
        <div style="width:100%">
          <el-row :gutter="10">
            <el-col :span="12">
              <el-date-picker
                style="width:100%"
                v-model="form.start"
                type="date"
                placeholder="Từ"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col :span="12">
              <el-date-picker
                style="width:100%"
                v-model="form.end"
                type="date"
                placeholder="Đến"
                format="dd/MM/yyyy"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item label="Sản phẩm">
        <el-radio-group size="small" v-model="form.typeItem">
          <el-radio-button disabled="" :label="1">Tất cả SP</el-radio-button>
          <el-radio-button :label="2">Chọn SP</el-radio-button>
        </el-radio-group>
        <el-button type="primary" v-if="form.typeItem==2" size="small" @click="openIModal">
          <i class="fas fa-plus"></i>
        </el-button>
        <div v-if="form.typeItem==2" style="width:100%">
          <el-tag
            style="margin-left:5px"
            :key="tag"
            v-for="tag in form.items"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >{{tag}}</el-tag>
        </div>
        <div style="width:100%" v-else>
          <el-tag type="success">Tất cả SP</el-tag>
        </div>
      </el-form-item>
      <el-form-item>
        <label>Chọn mô</label>
        <div style="width:100%">
          <span style="width:5px"></span>
          <el-checkbox-group v-model="form.typeCus" size="small">
            <el-checkbox
              style="margin-right:0px"
              v-for="t in typeKD"
              :label="t.col"
              :key="t.col"
              border
              size="small"
            >{{t.code}}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input v-model="form.note"></el-input>
      </el-form-item>
    </el-form>
    <div style="
    height: 28px;">
      <el-button type="danger" v-if="!disabled&&form.status!=null" @click=cancelFee()>Hủy phiếu</el-button>
      
      <el-button style="float:right" type="success" @click="openFeeTable" >
        <template v-if="coupon">
          Xem phiếu chi tiết
        </template >
        <template v-else>
          Tạo bảng đề nghị
        </template>
      </el-button>
      <el-button style="float:right" type="success" @click="editFee" v-if="coupon&&!disabled">
        Sửa phiếu
      </el-button>
    </div>
  </div>
</template>

<script>
import CusModalContent from "@/views/debt/phanbo/TH-offer/components/cus-modal-content";
import ItemModalContent from "@/views/debt/phanbo/TH-offer/components/item-modal-content";
import FeeDetailModalContent from "@/views/debt/phanbo/components/fee-detail-modal-content";
import TypeCus from "@/views/debt/phanbo/TH-offer/const.js";
import { GetFeeRequestTable,DelFeeRequestHeader,EditFeeRequest } from "@/api/debt";
export default {
  components: {
    CusModalContent,
    ItemModalContent,
    FeeDetailModalContent
  },
  props:{
    coupon:Object
  },
  computed:{
    
  },
  data() {
    return {
      modalCusVisible: false,
      itemModalVisible: false,
      feeDetailModalVisible: false,
      typeKD: null,
      form: {
        cusName: null,
        cusNo: null,
        start: null,
        end: null,
        items: [],
        typeItem: 2,
        typeCus: [],
        inventoryData:[],
        note:'',
        rowID:null,
        
      },disabled:false,
    };
  },
  methods: {
    editFee(){
      EditFeeRequest({
                data:this.form
            }).then(res=>{
                this.$emit('feeRequestEdited',res.Data);
            });
    },
    calDisable(){
      this.disabled= this.form.status!=1&&this.form.status!=4&&this.form.status!=null
    },
    cancelFee(){
      this.$confirm('Bạn có chắc muốn hủy phiếu này?', 'Warning', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          DelFeeRequestHeader({
            rowID:this.form.rowID
          }).then(res=>{
            this.$message({
            type: 'success',
            message: 'Đã hủy'
          });
          this.$emit('feeRequestHeaderDeleted',this.form);
          this.form.status=0;
          this.calDisable();
          if(this.coupon){
            this.coupon.Status=0;
          }
          })
          
        })
    },
    onFeeRequestAdded(h){
      this.$emit('feeRequestAdded',h);
      this.feeDetailModalVisible = false;
    },
    onFeeRequestEdited(h){
      this.$emit('feeRequestEdited',h);
      this.feeDetailModalVisible = false;
    },
    handleClose(tag) {
      this.form.items.splice(this.form.items.indexOf(tag), 1);
    },
    openIModal() {
      this.itemModalVisible = true;
    },
    openCModal() {
      this.modalCusVisible = true;
    },
    onCusAdded(cus) {
      this.form.cusName = cus.Name;
      this.form.cusNo = cus.No_;
      this.modalCusVisible = false;
    },
    onItemAdded(items) {
      items.forEach(e => {
        this.form.items.push(e.idProduct);
      });
      this.itemModalVisible = false;
    },
    openFeeTable() {
      
      if (this.form.typeCus.length == 0) {
        this.$message({
          type: "warning",
          message: "Hãy chọn ít nhất 1 mô"
        });
      } else if (!(this.form.cusNo && this.form.start && this.form.end)) {
        this.$message({
          type: "warning",
          message: "Hãy chọn đủ thông tin"
        });
      }else if(this.form.typeItem==2&&this.form.items.length==0){
        this.$message({
          type: "warning",
          message: "Hãy chọn tất cả SP hoặc ít nhất 1 SP"
        });
      }else{
      
        this.feeDetailModalVisible = true;
      }
    },
    initData(){
       if(this.coupon){
      
        this.form.cusName= this.coupon.CustomerName;
        this.form.cusNo= this.coupon.CustomerNo;
        this.form.start= this.coupon.StartTime;
        this.form.end= this.coupon.EndTime;
        this.form.items= this.coupon.Items.split(',');
        this.form.typeItem= this.coupon.TypeItem;
        this.form.typeCus= this.coupon.TypeCus.split(',');
        this.form.inventoryData=[];
        this.form.note = this.coupon.Note;
        this.form.rowID = this.coupon.RowID;
        this.form.status = this.coupon.Status;
      
    }else{
      this.form.cusName= null;
        this.form.cusNo= null;
        this.form.start= null;
        this.form.end= null;
        this.form.items= [];
        this.form.typeItem= 2;
        this.form.typeCus= [];
        this.form.inventoryData=[];
        this.form.note ='';
        this.form.rowID = null;
        this.form.status=null;
      this.form.end = Date.today().toString("yyyy-MM-dd");
      this.form.start = Date.today()
      .add(-1)
      .months()
      .toString("yyyy-MM-dd");
    }
    this.calDisable()
    }
  },
  watch:{
    coupon(){
      this.initData();
    }
  },
  created() {
    this.typeKD = TypeCus.KD.filter(e => {
      return e.type == "p";
    });
    this.initData()
    
  }
};
</script>
