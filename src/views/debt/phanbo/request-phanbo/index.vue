<template>
  <div class="employee-mission-container">
    <div style="margin-top:3px" id="couponTabHeaderBtn"></div>
    <el-select v-if="isGroupPage" v-model="currentGroup" placeholder="Chọn nhóm">
      <el-option
        v-for="item in groupLst"
        :key="item.idGroup"
        :label="item.idGroup"
        :value="item.idGroup"
      >
      <span style="float: left">{{ item.idGroup }}</span>
      <span style="float: right; color: #ff7675; font-size: 13px">{{ item.numNew }}</span></el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-refresh" class="inline-block" @click="fetchData"></el-button>
    <el-button
      v-if="!isGroupPage"
      style="margin-left:0px"
      @click="OpenModal"
      type="warning"
      icon="el-icon-circle-plus-outline"
      class="inline-block"
    >Phiếu mới</el-button>
    <el-badge type="primary">
      <el-button type="success" :icon="'el-icon-loading'" class="inline-block">Báo cáo</el-button>
    </el-badge>
    <el-tooltip content="Xem hướng dân">
      <router-link to="/help/phieu-nop-tien">
        <el-button size="small" type="primary" icon="el-icon-question" circle></el-button>
      </router-link>
    </el-tooltip>

    <!-- </div> -->
    <phanbo-modal modalId="phanbo-modal" :coupon="currentEditCoupon" @newCoupon="AddCoupon"></phanbo-modal>
    <item-modal modalId="item-modal" @itemAdded="ItemAdded"></item-modal>

    <el-table
      :data="tableData"
      v-loading="isLoading"
      :max-height="tableHeight"
      fit
      :header-row-style="{color:'#2f3640'}"
      style="width: 100%"
      @expand-change="expandRow"
      border
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <item-t
            :phanboCoupon="scope.row"
            @addCusClicked="OpenCusModal"
            @addItemClicked="OpenItemModal"
          ></item-t>
        </template>
      </el-table-column>
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column align="center" width="97px" label="STT">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1)*pageSize}}
          <!-- <el-tooltip content="Sửa phiếu" placement="top">
            <el-button
              style="color:#f1c40f"
              type="text"
              size="medium"
              icon="el-icon-edit"
              @click="editCoupon(scope.row)"
            ></el-button>
          </el-tooltip> -->

          <el-popover placement="top-start"  trigger="hover" v-if="scope.row.status!=10">
            <div>
              <el-button
                style="color:#f1c40f"
                type="text"
                size="medium"
                icon="el-icon-edit"
                @click="editCoupon(scope.row)"
              >Sửa</el-button>
              
              <el-button
              v-if="scope.row.status!=10&&scope.row.status!=1&&scope.row.group&&scope.row.group.status>=2"
                style="color:#e17055"
                type="text"
                size="medium"
                
                @click="pauseCoupon(scope.row)"
              ><i class="fas fa-pause"></i> Treo</el-button>
              <el-button
              v-if="scope.row.status!=10&&((scope.row.group&&scope.row.group.status>=2)||(scope.row.status==1))"
                style="color:#c0392b"
                type="text"
                size="medium"
                icon="el-icon-delete"
                @click="deleteCoupon(scope.row)"
              >Xóa</el-button>
              <el-button
              v-if="scope.row.group&&scope.row.group.status>=2"
                style="color:#00b894"
                type="text"
                size="medium"
                icon="el-icon-check"
                @click="approveCoupon(scope.row)"
              >Duyệt phiếu</el-button>
            </div>
            <el-button
              style="color:#2980b9"
              type="text"
              size="medium"
              icon="el-icon-s-operation"
              slot="reference"
            ></el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="Khách hangf" label="Khách hàng" min-width="140" align="center">
        <template slot-scope="scope">{{scope.row.idCustomer}} - {{scope.row.CusName}}</template>
      </el-table-column>
      <el-table-column prop="evaluate" label="Loại" width="100" align="center">
        <template slot-scope="scope">{{scope.row.type}}</template>
      </el-table-column>
      <el-table-column prop="evaluate" label="Người tạo" width="140" align="center">
        <template slot-scope="scope">{{scope.row.nameEmployee}}</template>
      </el-table-column>
      <el-table-column prop="note" label="Ghi chú" min-width="140" align="center">
        <template slot-scope="scope">{{scope.row.note}}</template>
      </el-table-column>
      <el-table-column width="110" label="Ngày tạo">
        <template
          slot-scope="{row}"
        >{{row.CreateDate?Date.parse(row.CreateDate).toString('dd/MM/yyyy'):''}}</template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="120" align="center">
        <template slot-scope="{row}">
          <el-tag slot="reference" :type="row.status|phanBoStatusColor ">
            <i class="fas fa-info"></i>
            {{ row.status|phanBoStatusText }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      :total="dataLength"
      :small="true"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import phanboModal from "../components/phanbo-modal";
import itemModal from "../components/item-modal";
import itemT from "./itemT";
import {  getEmployeesByIdGroup } from "@/api/groups";
import { GetCommissionOrderHeader, AddCommissionOrderHeader ,GetCommissionOrderHeaderByIdGroup,ChangeStatusCommissionOrderHeader,GetListGroupAdminWithCMHInfo} from "@/api/debt";
export default {
  components: {
    phanboModal,
    itemT,
    itemModal
  },
  data() {
    return {
      isGroupPage: false,
      cardNumber: "",
      curCoupon: null,
      groupLst: [],
      currentGroup: null,
      
      tableHeight: "",
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      isLoading: false,
      dataLength: 1,
      isExporting: false,
      selectedCoupons: [],
      currentEditCoupon: null
    };
  },
  watch:{
    currentGroup(){
      this.fetchData();
    }
  },
  computed:{
    currentGroupObj(){
      for(var i in this.groupLst){
        if(this.groupLst[i].idGroup==this.currentGroup){
          return this.groupLst[i];
        }
      }
    }
  }
  ,
  
  created() {
    if (this.$router.currentRoute.path == "/debt/phan-bo/duyet-phan-bo") {
      this.isGroupPage = true;
    }
    if (this.isGroupPage) {
      GetListGroupAdminWithCMHInfo().then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
      });
    }

    this.fetchData();
  },
  methods: {
    approveCoupon(row){
       this.$confirm("Bạn có muốn áp dụng chính sách trong phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(()=>{
        ChangeStatusCommissionOrderHeader({rowID:row.RowID,status:10}).then(res=>{
          row.status = 10;
        })
      })
    },
    editCoupon(row){
      console.log(row);
      
      if(row.status ==1 || row.status ==4){
        this.currentEditCoupon = row;
        VoerroModal.show("phanbo-modal");
      }else{
        this.$message({
            message: "Không thể sửa phiếu này",
            type: "error"
          });
      }
    },
    deleteCoupon(row){
      this.$confirm("Bạn có muốn xóa phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(()=>{
ChangeStatusCommissionOrderHeader({rowID:row.RowID,status:0}).then(res=>{
          row.status = 0;
        })
        
      })
        
      
    },
    pauseCoupon(row){
      if(row.status!=1){
        this.$confirm("Bạn có muốn treo phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(()=>{
        ChangeStatusCommissionOrderHeader({rowID:row.RowID,status:4}).then(res=>{
          row.status = 4;
        })
      })
        
      }else{
        this.$message({
            message: "Không thể treo phiếu này",
            type: "error"
          });
      }
    },
    AddCoupon(data) {
      data.items=[]
      this.tableData.unshift(data);
    },

    ItemAdded(selectedItem) {
      selectedItem.forEach(e => {
        e.idProduct = e.No_;
        e.commission = 0;
        e.edit = true;
        var existed = false;
        this.curCoupon.items.forEach(o => {
          if (e.No_ == o.idProduct) {
            existed = true;
          }
        });
        if (!existed) {
          this.curCoupon.items.push(e);
        }
      });

      // this.curCoupon.items = this.curCoupon.items.concat(selectedItem);
    },
    OpenModal() {
      this.currentEditCoupon = null;
      VoerroModal.show("phanbo-modal");
    },
    OpenCusModal(data) {
      this.curCoupon = data;
      VoerroModal.show("customer-modal");
    },
    OpenItemModal(p) {
      this.curCoupon = p;
      VoerroModal.show("item-modal");
    },
    expandRow() {},
    handleSelectionChange() {},
    fetchData() {
      if(!this.isGroupPage){
        this.isLoading = true;
        GetCommissionOrderHeader().then(res => {
          this.isLoading = false;
          res.Data.forEach(e => {
            e.items = null;
          });
          this.tableData = res.Data;
        });
      }else{
        if(this.currentGroup){
          this.isLoading = true;
        var groupT = this.currentGroupObj;
        GetCommissionOrderHeaderByIdGroup({
          idGroup:this.currentGroup
        }).then(res => {
          this.isLoading = false;
          res.Data.forEach(e => {
            e.items = null;
            e.group = groupT
          });
          this.tableData = res.Data;
        });
        }
        
      }
      
    }
  }
};
</script>
<style>

</style>
