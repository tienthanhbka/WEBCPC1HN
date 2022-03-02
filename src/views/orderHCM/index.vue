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
        <div class="inline-block">
            <el-input placeholder="Search" v-model="TextSearch" class="input-with-select">
                <el-select slot="prepend" placeholder="Select">
                <el-option label="Tất cả" value="1"></el-option>
                <el-option label="Tên nhân viên" value="2"></el-option>
                <el-option label="Đơn vị" value="3"></el-option>
                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="fetchData()"></el-button>
            </el-input>
        </div>
        <div class="inline-block floatright">
            <el-button type="success"> <i class="fas fa-file-excel"></i> Export</el-button>
        </div>
    </div>
    <div class="orderhcm-content">
        <el-table v-loading="listLoading" :data="orderList" element-loading-text="Loading" border
        highlight-current-row>
            <el-table-column align="center" prop="No_" label="STT" min-width="50">
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label="Nhân viên" align="center" min-width="100">
                <template slot-scope="scope">
                     {{ scope.row.nameEmployee }}
                   ( {{ scope.row.idEmployee }} )
                   
                </template>
            </el-table-column>
            <el-table-column label="Tên khách hàng" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Bill_to_Name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Kế toán" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Salesperson_Code }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Sản phẩm" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Description }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Giá VAT" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.amoutVAT }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="Ngày đặt hàng" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.orderDate }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="Ngày hết hạn" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Expiration_Date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Địa chỉ" align="center" min-width="200">
                <template slot-scope="scope">
                    <span>{{ scope.row.billAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái" align="center" min-width="50">
                <template slot-scope="scope">
                    <span>{{ scope.row.Status }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Kiểu bán" align="center" min-width="50">
                <template slot-scope="scope">
                    <span>{{ scope.row.billCustomerTemplateCode }}</span>
                </template>
            </el-table-column>
        </el-table>

     <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
        background
  current-change="fetchData()"
  layout="prev, pager, next"
  :total="1000"
       
      :current-page.sync="currentPage"
     
      @current-change="handleCurrentChange"
    />
  </div>
    </div>
</div>
    
</template>

<script>
    import { getOrder } from '@/api/orderHCM'
    import Cookies from 'js-cookie'
    
    export default {
   
  props: {
    total: {
      required: true,
      type: Number,
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 15, 20, 30, 50];
      },
    },
    background: {
      type: Boolean,
      default: true,
    },
    autoScroll: {
      type: Boolean,
      default: true,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
  },
        data() {
            return {
                TextSearch:'',
                startDate:'',
                endDate :'',
                p: 0,
                listLoading: false,
                orderList: [

                ]
            };
        },
        methods: {
            fetchData() {
                
                var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                    id: Cookies.get('idEmployee'),
                    token: Cookies.get('token'),
                    p: this.p
                }
                this.listLoading = true
                getOrder(req).then(response => {
                    console.log(response);
                    this.orderList = response.Data
                    this.total= response.page
                    this.listLoading = false
                });
            },
            handleCurrentChange(val) {
                this.p = val
                this.fetchData();
            },
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
        return this.limit;
      },
      set(val) {
        this.$emit('update:limit', val);
      },
    },
  },
        created() {
            this.startDate = '2019-02-01';
            this.endDate = '2019-04-01';
            this.p = 1;
            this.fetchData()
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