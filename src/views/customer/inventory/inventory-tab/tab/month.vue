<template>
    <div>
        <div>
             <el-date-picker  size="small" v-model="startDate" format="dd/MM/yyyy" value-format="yyyy-MM-dd" type="date" placeholder="Ngày đầu kì"></el-date-picker>
              <el-date-picker  size="small" v-model="endDate" format="dd/MM/yyyy" value-format="yyyy-MM-dd" type="date" placeholder="Ngày cuối kì"></el-date-picker>
              
              <el-button size="small" style="margin-bottom:5px" type="primary" @click="fetchData()"><i class="fas fa-sync-alt"></i></el-button>
        </div>
          <el-table
          size="small"
      class=""
      :data="tableData"
      v-loading="loadingTableData"
      border
      show-header
    >
      <el-table-column label="Mã SP" width="130">
        <template slot-scope="{row}">
          <div class="dat-cell" label="Mã SP">
            <span>{{row.ItemNo}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tên SP" min-width="150">
        <template slot-scope="{row}">
          <div class="dat-cell" label="Tên SP">
            <span>{{row.Name}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Số tồn đầu kì" min-width="150">
        <template slot-scope="{row}">
          <div class="dat-cell" label="SL">
            <span>{{numberFormat(row.InvenFirstQuantity,row)}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="Nhập mua trong kì" min-width="150">
        <template slot-scope="{row}">
          <div class="dat-cell" label="SL">
            <span>{{numberFormat(row.BuyQuantity,row)}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="SL Kê đơn" min-width="150">
        <template slot-scope="{row}">
          <div class="dat-cell" label="SL">
            <span>{{numberFormat(row.SellQuantity,row)}}</span>
          </div>
        </template>
      </el-table-column>
       <el-table-column label="Tồn cuối kì" min-width="150">
        <template slot-scope="{row}">
          <div class="dat-cell" label="SL">
            <span>{{numberFormat(row.InvenLastQuantity,row)}}</span>
          </div>
        </template>
      </el-table-column>
      
    </el-table>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="getData"
      background
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
    </div>
</template>
<script>
import {CalInventoryReportByCus} from '@/api/customer'
export default {
    props:{
        customer:Object
    },
    methods: {
        numberFormat(val,row){
            if(val!=null){
                return this.$options.filters.numbered(val)+' '+row.Unit;
            }else{
                return '---';
            }
        },
        fetchData(){
            this.loadingTableData = true;
            CalInventoryReportByCus({
                cus:this.customer.No_,
                start:this.startDate,
                end: this.endDate
            }).then(res=>{
                this.dataLength = res.Data.length
                this.allData = res.Data;
                this.loadingTableData = false;
                this.getData();
            })
        },
        getData(){
            console.log('a');
            
            this.tableData=this.allData.slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
        }
    },
    created() {
        this.startDate = Date.today().toString('yyyy-MM-dd');
        this.endDate = Date.today().toString('yyyy-MM-dd');
    },
    
    data() {
        return {
            allData:[],
            tableData:[],
            loadingTableData:false,
            startDate:null,
            endDate:null,
            dataLength:0,
            pageSize:5,
            currentPage:1,

        }
    },
}
</script>