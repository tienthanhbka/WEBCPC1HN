<template>
<div class="orderhcm-container">
    <div class="orderhcm-header">
        <div class="inline-block">
          <div class="block">
                <span class="demonstration">Tháng</span>
                <el-date-picker
                v-model="value"
                type="month"
                placeholder="Pick a month">
                </el-date-picker>
            </div>
        </div>
    </div>
    <div class="orderhcm-content">
        <el-table v-loading="listLoading"
         :data="WorkList"
          element-loading-text="Loading"
         border
        highlight-current-row>
            <!-- <el-table-column type="expand">
                <template slot-scope="props">
                   <el-row>
                     <el-col span="6">
                    <p>Người giao việc: {{ props.row.NameManager }}</p>
                    <p>Ghi chú: {{ props.row.Note }}</p>
                    </el-col>
                   
                  
                  </el-row>
                </template>
                </el-table-column> -->
            <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1)  }}</template>
        </el-table-column>
        <!-- <el-table-column align="center" width="75px" label="">
           <template slot-scope="scope">
        <el-tooltip content="Chỉnh sửa" placement="top"><el-button @click="openModalEditAdminOrderSend(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip>
         <el-tooltip content="Xóa" placement="top"><el-button @click="openModalDeleteAdminOrderSend(scope.row)" type="text" > <i style="color: red;" class="fas fa-trash-alt"></i></el-button></el-tooltip>
        
</template>
        </el-table-column> -->
        
       
            
            
              <el-table-column label="Công việc"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Description }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Khối lượng" align="right" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Quantity | setSize | toCommas }}</span>
                </template>
            </el-table-column>

              <el-table-column label="Đơn vị" align="center" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Unit }}</span>
                </template>
            </el-table-column>
            
           
          
            <el-table-column label="Thời gian cập nhật gần nhất" align="center" width="250">
                <template slot-scope="scope">
                    <span>{{ scope.row.TimeUpdate }}</span>
                </template>
            </el-table-column>
        </el-table>
     <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
       
      ></el-pagination>
  </div>
    </div>
</div>
    
</template>

<script>

    import { getWork } from '@/api/work'
    import Cookies from 'js-cookie'
    import { getMonth} from '@/api/index'

    export default {
  filters:{
        statusTextFilter(status) {
      return statusMap[status];
    },
     setSize: function (value) {
    if (!value) return ''
    var a = parseFloat(value) 
    return a.toFixed(1)
  },
   toCommas: function(value) {
       if(value != null){
         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
       }
    
  }
   },
   components:{
    
   },
  props: {
   
    limit: {
      type: Number,
      default: 20,
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
                startDate:'',
                endDate :'',
                value: '',
                listLoading: false,    
                month: '',
                year: '',
                WorkList: []
                    };
        },
        methods: {
        
            fetchData() {
                
                var req = {
                    month: this.month,
                    year: this.year,
                    token: Cookies.get('token')
                }
                this.listLoading = true
              
                getWork(req).then(response => {
                    this.WorkList = response.Data
                     this.listLoading = false
                });
            }
        },
        computed: {
      
  },
        created() {
        this.value = new Date()
      
        this.month = this.value.getMonth() + 1
        this.year = this.value.getFullYear()
        this.fetchData();
       // alert(this.value)
        },
         watch: {
        value: function(){
        this.month = this.value.getMonth() + 1
        this.year = this.value.getFullYear()
        this.fetchData();
    }
  },
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

    @media only screen and (max-width: 600px) {
       .inline-block {
        display: block;
        margin-bottom: 5px;
        width: 100%;
        }

        .el-date-editor.el-input, .el-date-editor.el-input__inner {
            width: 100%;
        }
    }
</style>