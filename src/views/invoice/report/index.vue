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
        <el-table v-loading="listLoading" :data="shipList" element-loading-text="Loading"
        @expand-change="expandRow"
         border
        highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <p>Số điện thoại đối tác: {{ props.row.phonePartner }}</p>
                    <p>Thành phố: {{ props.row.City }}</p>
                    <p>Người nhận: {{ props.row.nameReceiver }}</p>
                    <p>Zip: {{ props.row.zip }}</p>
                </template>
                </el-table-column>
            <el-table-column label="Mã" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idInvoiceHeader }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Hạn" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.deadline | toDate}}</span>
                </template>
            </el-table-column>
           
            <el-table-column label="Địa chỉ" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.shipToAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Đối tác" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.namePartner }}</span>
                </template>
            </el-table-column>
            
            <el-table-column label="Trung tâm" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Bill_to_Name }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Liên lạc" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.contact }}</span>
                </template>
            </el-table-column>
          
            <el-table-column label="Trạng thái" align="center" min-width="50">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | shipStatusColor ">
                        {{ scope.row.status|shipStatusText }}
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
    <el-pagination
    background
    current-change="fetchData()"
    layout="prev, pager, next"
    :total="total"
    :current-page.sync="currentPage"
     
    @current-change="handleCurrentChange"
    />
  </div>
    </div>
</div>
    
</template>

<script>
    import { getShip } from '@/api/ship'
    import { getInvoiceLine } from '@/api/getInvoiceLine'
    import Cookies from 'js-cookie'
    import { getStartDate, getEndDate} from '@/api/index'

    
    export default {
        filters:{
                statusTextFilter(status) {
            return statusMap[status];
            }
        },
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
                shipList: [

                ]
            };
        },
        methods: {
            fetchData() {
                
                var req = {
                    startDate: this.startDate,
                    endDate: this.endDate,
                   
                    code: Cookies.get('employeeCode'),
                    token: Cookies.get('token'),
                   
                    
                }
                this.listLoading = true
                getShip(req).then(response => {
                    console.log(req);
                    console.log(response);
                    this.shipList = response.Data
                    this.total= response.TotalPage
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
            this.startDate = getStartDate();
            this.endDate = getEndDate();
            this.p = 1;
            this.fetchData()
        },
        watch: {
            startDate: function(){
                this.fetchData()
            },
            endDate: function(){
                this.fetchData()
            }
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