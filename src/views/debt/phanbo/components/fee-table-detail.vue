<template>
  <div>
    <el-button size="small" type="primary" @click="fetchData">
      <i class="fas fa-sync-alt"></i>
    </el-button>
    <el-table
      ref="detailCPTb"
      size="mini"
      v-loading="isLoading"
      border
      fit
      row-key="SLineID"
      :data="tableData"
      :expand-row-keys="expandLst"
      
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <template v-if="info.typeCus.includes('BS')">
            <div style="color:#2c3e50">
              <b>Chi tiết B2</b>
            </div>
            <el-table  size="mini" border fit :data="row.cusCN">
              <el-table-column label="KHCN" min-width="150">
                <template slot-scope="{row}">{{row.CustomerCNName}}</template>
              </el-table-column>
              <el-table-column label="SL" min-width="150">
                <template slot-scope="{row}">{{row.iQuantity|numbered}}</template>
              </el-table-column>
               <!-- <el-table-column label="STK" min-width="150">
                <template slot-scope="{row}">{{row.STK}}</template>
              </el-table-column> -->
               <el-table-column label="P" min-width="150">
                <template slot-scope="{row}">{{row.Pay|filCK}}</template>
              </el-table-column>
                <!-- <el-table-column label="P" min-width="150">
                <template slot-scope="{row}">
                  {{row.iQuantity|numbered}}
                </template>
              </el-table-column>
               <el-table-column label="CK" min-width="150">
                <template slot-scope="{row}">
                  <el-input v-model="row.STK"></el-input>
                  {{row.iQuantity|numbered}}
                </template>
              </el-table-column> -->
              <!-- <el-table-column label="CP" min-width="150">
                <template slot-scope="{row}">
                  {{row.cnFee|toVND}}
                </template>
              </el-table-column> -->
            </el-table>
          </template>
          <div></div>
        </template>
      </el-table-column>
      <el-table-column label="MHD" width="150">
        <template slot-scope="scope">{{scope.row.ExternalNo}}</template>
      </el-table-column>
      <el-table-column label="SP" min-width="250">
        <template slot-scope="scope">{{(scope.row.ItemCode?scope.row.ItemCode:scope.row.ItemNo)}}</template>
      </el-table-column>
      <el-table-column label="SL" min-width="100">
        <template slot-scope="scope">{{scope.row.Quantity|numbered}}</template>
      </el-table-column>
      <el-table-column label="DG" min-width="100">
        <template slot-scope="scope">{{scope.row.UnitPrice|toVND}}</template>
      </el-table-column>
      <template >
        
      </template>
      <el-table-column
        v-for="(item, index) in info.typeCus"
        :key="index"
        :label="encodeTypeCus(item)"
        min-width="100"
      >
        <template slot-scope="scope">{{scope.row[item]|numbered}}</template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetFeeRequestTable,GetKDPLOfCus } from "@/api/debt";
import { CalInventoryReportByCus } from "@/api/customer";
import TypeCus from "@/views/debt/phanbo/TH-offer/const.js";
export default {
  props: {
    info: Object
  },
  data() {
    return {
      tableData: [],
      isLoading: false,
      expandLst:[],
    };
  },
  watch: {
    "info.rowID"() {
      this.tableData = [];
    }
  },
  filters:{
      filCK: function (value) {
    if (value) return 'CK'
    else{
      return 'TM'
    }
  }
  },
  methods: {
    
    encodeTypeCus(type){
      var code ='';
      TypeCus.KD.forEach(e=>{
        if(e.col==type){
          code=e.code;
        }
      })
      return code;
      
    },
    numberFormat(e) {
      if (e) {
        return this.$options.filters.numbered(e);
      } else {
        return "---";
      }
    },
    calSLBS(dt) {
      dt.forEach(e => {
        this.info.inventoryData.forEach(o => {
          if (e.ItemNo == o.ItemNo) {
            e.selledQuantity = o.SellQuantity;
            // o.cusCN.forEach(u => {
            //   u.iQuantity = (u.Quantity / o.BuyQuantity) * e.Quantity;
            // });
            e.inventoryData = o;
            e.cusCN = JSON.parse(JSON.stringify(o.cusCN)) ;
          }
          
        });
      });
      dt.forEach(e=>{
        e.cusCN.forEach(o=>{
          //console.log((o.Quantity / e.inventoryData.BuyQuantity) * e.Quantity);
          
          if(e.inventoryData.BuyQuantity==0 ||e.inventoryData.BuyQuantity==null){
o.iQuantity = o.Quantity;
          }else{
o.iQuantity = (o.Quantity / e.inventoryData.BuyQuantity) * e.Quantity;
          }
          
          o.cnFee = o.iQuantity*Number(e.UnitPrice)*Number(e.BS)/100;
        })
      })
    },
    generateVInv(invs){
      
      this.info.inventoryData.forEach(iv=>{
            var exist = false;
            invs.forEach(row=>{
              if(iv.ItemNo==row.ItemNo){
                exist = true;
              }
              
            });
            if (!exist)
                {
                  invs.push({
                    SLineID:'BS'+iv.ItemNo,
                    ExternalNo:'Bổ sung',
                    ItemCode:iv.ItemNo,
                    ItemNo:iv.ItemNo,
                    Quantity:iv.SellQuantity,
                    UnitPrice:null,
                    BS:null
                  });
                }
          });
        if(invs.filter(o=>o.ExternalNo=='Bổ sung').length>0){
          this.isLoading =true;
          GetKDPLOfCus({
            cus:this.info.cusNo,
           date:Date.parse(this.info.end).add(1).day().toString('yyyy-MM-dd')
           })
           .then(res=>{
             this.isLoading =false;
          var plst = res.Data;
          invs.forEach(row=>{
            plst.forEach(p=>{
              if(row.ExternalNo=='Bổ sung'&&row.ItemNo==p.idProduct){
                row.UnitPrice = p.UnitPrice;
                row.BS = p.BS;
              }
            })
          })
       
      })
        }
    },
    expandRow(){
      this.expandLst=[];
      this.tableData.forEach(row=>{
        if(row.cusCN&&row.cusCN.length>0){
          this.expandLst.push(row.SLineID);
        }
      })
    },
    fetchData() {
      this.isLoading = true;
      if (this.info.inventoryData.length == 0) {
        this.isLoading = true;
        CalInventoryReportByCus({
          rowID: this.info.rowID,
          cus: this.info.cusNo,
          start: this.info.start,
          end: this.info.end,
          items: this.info.items,
          typeItem: this.info.typeItem
        }).then(res => {
          // this.isLoading = false;
          res.Data.forEach(e=>{
            if(e.cusCN==null){
              e.cusCN=[];
            }
          })
          this.info.inventoryData = res.Data;
          GetFeeRequestTable({
            cusName: this.info.cusName,
            cusNo: this.info.cusNo,
            end: this.info.end,
            items: this.info.items,
            start: this.info.start,
            typeCus: this.info.typeCus,
            typeItem: this.info.typeItem
          }).then(res => {
            this.isLoading = false;
            this.generateVInv(res.Data);

            res.Data.forEach(e => {
              e.cusCN = [];
            });
            this.calSLBS(res.Data);
            this.tableData = res.Data;
            
              this.expandRow()
            
          });
        });
      } else {
        GetFeeRequestTable({
          cusName: this.info.cusName,
          cusNo: this.info.cusNo,
          end: this.info.end,
          items: this.info.items,
          start: this.info.start,
          typeCus: this.info.typeCus,
          typeItem: this.info.typeItem
        }).then(res => {
          this.isLoading = false;
          
          this.generateVInv(res.Data);
          res.Data.forEach(e => {
            e.cusCN = [];
          });
          this.calSLBS(res.Data);
          this.tableData = res.Data;
           this.expandRow()
        });
      }
    }
  }
};
</script>
<style scoped>
/deep/ .el-table__expanded-cell[class*="cell"] {
  padding: 10px 10px !important;
}
</style>