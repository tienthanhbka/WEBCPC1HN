<template>
  <div class="debt-table-report">
    <el-card shadow="never" :body-style="{padding:'0px'}">
      <div slot="header">
        Trả hàng
        <i v-if="isLoading" class="el-icon-loading"></i>
      </div>

      <el-table
        :data="sReturnData"
        v-loading="isLoading"
        element-loading-text="Loading"
        border
        style="margin:-21px;width:100%"
        @expand-change="expandRow"
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            <p class="salesline-header">Chi tiết {{props.row.No}}</p>
            <el-table border=""
              :data="props.row.lines"
              style="width: 100%"
              v-loading="props.row.isLoading"
              element-loading-text="Loading"
            >
              <el-table-column prop="No_" label="Mã" width="100"></el-table-column>
              <el-table-column prop="Description" label="Tên" width="180"></el-table-column>
              <el-table-column prop="Unit of Measure" label="Đơn vị" width="70"></el-table-column>
              <el-table-column
                prop="Quantity"
                label="Số lượng"
                :formatter="numberedformat"
                width="180"
              ></el-table-column>
              <el-table-column
                prop="Unit Price"
                label="Đơn giá"
                :formatter="cellformat"
                width="180"
              ></el-table-column>

              <el-table-column prop="VAT %" label="VAT" :formatter="numberedformat" width="70"></el-table-column>
              <el-table-column
                prop="Amount Including VAT"
                :formatter="cellformat"
                label="Thành tiền"
                width="180"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="No_" label="Mã hồ sơ" width="180"></el-table-column>
        <el-table-column prop="Document Date" :formatter="dateformat" width="180" label="Ngày hóa đơn"></el-table-column>
        <el-table-column prop="Bill-to Name" label="Khách hàng"></el-table-column>
        <el-table-column prop="Posting Description" label="Chi tiết"></el-table-column>
        <el-table-column
          prop="sumAmount"
          label="Tổng tiền"
          align="right"
          :formatter="cellformat"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<style scoped>
.salesline-header {
  font-weight: bold;
  color: #0984e3;
}
</style>

<script>
import {GetSalesReturn, GetSalesReturnLineByDocNo} from "@/api/debt";

export default {
  props:{
    isGroupPage:Boolean,
    currentEm:String
  },
  data() {
    return {
      x: 10000,
      sReturnData: [],
      isLoading: false,
    };
  },
  methods: {
    expandRow(row, expandedRows) {
      if (row.lines == null) {
        var No = row.No_;
        var otc = row.otc;
        row.isLoading=true;
        GetSalesReturnLineByDocNo({ No: No,otc:0 }).then(res => {
          row.isLoading=false;
          row.lines = res.Data;
         
          
        });
      }
    },
   
    cellformat(row, column, cellval) {
      return this.$options.filters.toVND(cellval);
    },
    numberedformat(row, column, cellval) {
      return this.$options.filters.numbered(cellval);
    },
    dateformat(row, column, cellval){
        return this.$options.filters.toDate(cellval);
    },
    fetchData() {
      var req={};
      if(this.isGroupPage&&this.currentEm==''){
        return;
        
      }else if(this.isGroupPage&&this.currentEm!=''){
        req.idEmployee=this.currentEm
      }
      GetSalesReturn(req).then(res=>{
         

          var SumReturn = 0;
          res.Data.forEach(e => {
            SumReturn+=Number(e['sumAmount']);
            e.isLoading = false;
          });
           this.sReturnData = res.Data;
          console.log(SumReturn);
          
          this.$emit('SaleReturnChanged',SumReturn);
        })
      
    }
  },
  created() {
    
      this.fetchData();
  },
  watch: {
    currentEm(){
        if(this.isGroupPage&&this.currentEm!=''){
          this.fetchData();
        }
    }
  }
};
</script>
<style scoped>
.debt-table-report {
  margin-top: 20px;
}
</style>
