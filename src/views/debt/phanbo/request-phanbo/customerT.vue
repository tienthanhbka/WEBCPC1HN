<template>
    <div>
        <el-tooltip  content="Thêm hóa đơn trong phiếu" placement="top">
        <el-button @click="openModal" style="position:absolute;left:0; color: #273c75;
    padding: 16px 18px;" ><i class="fas fa-plus"></i></el-button>
        </el-tooltip>
        <el-table
        :header-row-style="{color:'#273c75'}"
        :data="phanboCoupon.customers"
        v-loading="isLoading"
        fit
        style="width: 100%"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <item-t @addItemClicked="addItemClicked" :customer="scope.row" :phanboCoupon="phanboCoupon"></item-t>
          </template>
        </el-table-column>
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope"><i class="fas fa-warehouse" style="color:#273c75"></i> {{ scope.$index + 1 }}
              </template>
        </el-table-column>
        <el-table-column prop="No_" width="200" label="Mã khách hàng"></el-table-column>
        <el-table-column prop="Name" min-width="500" label="Tên khách hàng"></el-table-column>
        <el-table-column prop="Customer Template Code" min-width="500" label="Kiểu mua"></el-table-column>
        
       
      </el-table>

    </div>
</template>
<script>
import {GetCustomerOfCommissionOrderHeader} from '@/api/debt'
import itemT from './itemT'
export default {
    components:{
        itemT
    },
    props:{
        phanboCoupon:Object,
        
    },
    data() {
        return {
            
            isLoading: false,
            saleHeaderModalRef:"sale-header-modal"+1
        }
    },
    methods: {
        openModal(){
            
            this.$emit('addCusClicked',this.phanboCoupon)
            
        },
        addItemClicked(cus){
            console.log('34');
            
            this.$emit('addItemClicked',cus);
        },
        deleteHeader(row){
            this.$confirm("Bạn có muốn xóa hóa đơn này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
           DeleteSaleHeader({
                no:row.rowID
            }).then(res=>{
                var idx = this.tableData.indexOf(row);
            this.tableData.splice(idx,1);
            })
        })
        .catch(() => {});
           
            
        },
        onInvoiceAdded(invoices){
           var req = []
            invoices.forEach(e => {
                req.push({
                    headerId:this.reciptCoupon.rowID,
                    no:e['No_']
                })
            });
            AddSaleHeaderLstToMoneyRecipt({data:req}).then(res=>{
                console.log(res);
                res.Data.forEach(e=>{
                    this.tableData.push(e)
                })
            })
            
        }
    },

    mounted() {
        if(this.phanboCoupon.customers==null){
            console.log('sdf');
            
            GetCustomerOfCommissionOrderHeader({
                no:this.phanboCoupon.RowID
            }).then(res=>{
                res.Data.forEach(e => {
                    e.items=null;
                });
                this.phanboCoupon.customers= res.Data;
            })
        }
        
    },
}
</script>
<style scoped >
.el-table__expanded-cell {
    padding: 0px;
}
</style>