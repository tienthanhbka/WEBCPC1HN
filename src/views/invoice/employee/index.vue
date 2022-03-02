<template>

<div class="orderhcm-container">
     
    <div class="orderhcm-header">
        <el-button class="inline-block" type="primary" :loading="listLoading" @click="fetchData()">Cập nhật</el-button>
        <div class="inline-block">
            <span class="demonstration">Từ</span>
            <el-date-picker
            v-model="startDate"
            type="date"
            
            placeholder="Ngày bắt đầu"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="inline-block">
            <span class="demonstration">Đến</span>
            <el-date-picker
            v-model="endDate"
            type="date"
            placeholder="Ngày kết thúc"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div >
            <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                         <el-card>
                        <div >
                            <div class="title">Tổng tiền </div>
                            <div class="value" >{{ Amount | toVND}}</div>
                        </div>
                    </el-card>
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-card>
                        <div >
                            <div class="title">Tổng tiền gồm VAT</div>
                            <div class="value">{{ AmountVAT | toVND }}</div>
                        </div>
                    </el-card>
                    </div>
                </el-col>
            </el-row>
    </div>
    </div>
    
    <div class="orderhcm-content">

        <el-table v-loading="listLoading" :data="invoiceList" element-loading-text="Loading"
        @expand-change="expandRow"
         border
        highlight-current-row>
             <el-table-column type="expand">
                <template slot-scope="props">
                     <p><b>Chi tiết đặt hàng</b></p>
                        <el-table :data="props.row.lines" v-model="rowNow" style="width: 100%" v-loading="props.row.isLoading"
                    element-loading-text="Loading">
                        <el-table-column prop="Description"  label="Sản phẩm" width="180"></el-table-column>
                        <el-table-column prop="Quantity"  label="Số lượng" width="180">
                             <template slot-scope="scope">
                                <span>{{ scope.row.Quantity | quantity}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="unitMeasure"  label="Đơn vị" width="180"></el-table-column>
                        <el-table-column prop="unitPrice"  label="Giá" width="180">
                             <template slot-scope="scope">
                                <span>{{ scope.row.unitPrice | toVND}}</span>
                            </template>
                        </el-table-column>
                         <el-table-column prop="amount" label="Tổng giá" width="180">
                             <template slot-scope="scope">
                                <span>{{ scope.row.amount | toVND}}</span>
                            </template>
                         </el-table-column>
                          <el-table-column prop="amoutVAT"  label="Tổng giá VAT" width="180">
                            <template slot-scope="scope">
                                <span>{{ scope.row.amoutVAT | toVND}}</span>
                            </template>
                          </el-table-column>
                          <el-table-column prop="Gift"  label="Quà" width="180"></el-table-column>
                        </el-table>
                </template>
            </el-table-column>
            <el-table-column label="Ngày đặt" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.OrderDate | toDate}}</span>
                </template>
            </el-table-column>
             <el-table-column label="Hạn" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.ExpriationDate | toDate}}</span>
                </template>
            </el-table-column>
           
            <el-table-column label="Đơn vị" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.BillAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Loại" align="center" min-width="30">
                <template slot-scope="scope">
                    <span>{{ scope.row.templateCode }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="Người nhận" align="center" min-width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.BillToName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số điện thoại" align="center" min-width="80">
                <template slot-scope="scope">
                    <span>{{ scope.row.contact }}</span>
                </template>
            </el-table-column>
          
            <el-table-column label="Trạng thái" align="center" min-width="50">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.Status | invoiceStatusColor ">
                        {{ scope.row.Status|invoiceStatusText }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Ghi chú" align="center" min-width="50">
                <template slot-scope="scope">
                    <span>{{ scope.row.note }}</span>
                </template>
            </el-table-column>
        </el-table>

     <div :class="{'hidden':hidden}" class="pagination-container">
         <div class="block">
</div>
  <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page="currentPage"
        :page-size.sync="pageSize"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      ></el-pagination>
  </div>
    </div>
</div>
    
</template>

<script>
    import { getInvoice,getInvoiceMoney } from '@/api/invoice'
    import { getInvoiceLine } from '@/api/getInvoiceLine'
    import { getStartDate, getEndDate} from '@/api/index'
    import { Header } from '@/views/invoice/component/header';
    import Cookies from 'js-cookie'

    export default {
        components: {
            Header,
        },
        filters:{
                statusTextFilter(status) {
            return statusMap[status];
            },
             quantity(amount) {
                 var splitted = parseInt(amount)
            return splitted;
            },
        },
        data() {
            return {
                TextSearch:'',
                startDate:'',
                endDate :'',
                currentPage: 0,
                page_row: 10,
                total: 0,
                listLoading: false,
                rowNow: '',
                Amount: 0,
                AmountVAT: 0,
                values: 'abc',
                invoiceList: []
            };
        },
        methods: {
            fetchData() {
                
                var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                    token: Cookies.get('token'),
                    page: this.currentPage,
                    page_row: this.page_row
                }
                this.listLoading = true
               
                getInvoice(req).then(response => {
                  
                    this.invoiceList = response.Data
                    console.log(response);
                    this.total= response.TotalPage*response.RowspPage
                    this.listLoading = false
                    this.currentPage = response.PageNumber
                    this.page_row= response.RowspPage
                });
            },
            fetchMoney() {
                var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                     token: Cookies.get('token'),
                }
                this.listLoading = true
               
                getInvoiceMoney(req).then(response => {
                    //console.log(response);
                    this.Amount = response.Data[0].Amount;
                    this.AmountVAT= response.Data[0].AmountVAT;
                });
            },
            handleCurrentChange(val) {
                this.currentPage = val
                this.fetchData();
            },
            handleSizeChange(val){
                this.page_row = val
                this.fetchData();
            },
            expandRow(row, expandedRows){
                 if (row.lines == null) {     
                    var No_ = row.No_;
                    row.isLoading=true;
                    getInvoiceLine({ 
                        No_: No_ ,
                        token: Cookies.get('token')
                       
                    }).then(res => {
                   
                    row.lines = res.Data;
                    this.rowNow = res.Data;
                    
                    });
                    row.isLoading=false;
                }
            }
        },
        computed: {
            currentPage: {
                get() {
                    return this.page;
                },
                set(val) {
                    this.$emit('update:page', val);
                },
                },
                pageSize: {
                get() {
                    return this.TotalPage;
                },
                set(val) {
                    this.$emit('update:limit', val);
                },
            },
        },
        created() {
            this.startDate = getStartDate();
            this.endDate = getEndDate();
            this.currentPage = 1;
            this.fetchData();
            this.fetchMoney();
        },
        watch: {
            startDate: function(){
                this.fetchData();
                this.fetchMoney();
            },
            endDate: function(){
                this.fetchData();
                 this.fetchMoney();
            },
            
        }
    };
</script>

<style lang="scss" scoped>
    $bg: rgba(49, 49, 49, 0.05);
    .orderhcm-container {
        padding: 20px;
        background-color: $bg;
        min-height: 100vh;

        .inline-block {
        display: inline-block;
        margin-bottom: 5px;
        }

        .table-pagination {
            margin-top: 10px
        }     
    }  
</style>