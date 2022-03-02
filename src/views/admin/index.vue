<template>
    <div>
         <div style="padding: 10px;" class="inline-block">
        <el-input size="medium" style="width: 150px; " class="search"   v-on:keyup.enter="Search" placeholder="Tìm kiếm"  v-model="search"></el-input>
         <el-button size="medium"  class="bt-search" type="infor" @click="Search"> <i class="fas fa-search"></i></el-button>
     
      </div>
        <el-table v-loading="listLoading"
         class="el-mobile-table"
         :data="listEm"
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
              <template slot-scope="scope">
               <div class="dat-cell"  label="STT">{{ (scope.$index + 1) + (currentPage - 1)*pageSize  }}</div>

          </template>

        </el-table-column>

          <el-table-column align="center" width="155px" label="Action">
          <template slot-scope="scope">
             <div class="dat-cell"  label="Action"> 
               <el-button-group>
                 <el-tooltip content="Quản lý nhóm"> <el-button @click="viewDetail(scope.row)" size="mini" type="success" ><i class="fas fa-users-cog"></i></el-button></el-tooltip>
                  <el-tooltip content="Loại nhân viên"> <el-button @click="setOTC(scope.row)" size="mini" type="primary" ><i class="fas fa-font"></i></el-button></el-tooltip>
                   <el-tooltip content="Lấy khách hàng"> <el-button @click="setKH(scope.row)" size="mini" type="warning" ><i class="fas fa-user-md"></i></el-button></el-tooltip>
            </el-button-group>
            </div>
              
           
          </template>
        </el-table-column>
         <el-table-column   label="Trạng thái">
               <template slot-scope="scope">
                   
                     <div class="dat-cell"  label="Trạng thái"> <el-tag
                    :type="scope.row.status | sta">
                    {{ scope.row.status | sta}}
                    </el-tag></div>
                </template>
          </el-table-column>
        
              <el-table-column label="Họ và tên"  min-width="100">
                <template slot-scope="scope">
                   <div class="dat-cell"  label="Họ tên">{{ scope.row.EmployeeName}}</div>
                  
                </template>
            </el-table-column>
             <el-table-column label="Số DT"  min-width="100">
                <template slot-scope="scope">
                  <div class="dat-cell"  label="DT">{{ scope.row.idEmployee}}</div>
                </template>
            </el-table-column>
              <el-table-column label="Loại nhân viên" align="right" min-width="100">
                <template slot-scope="scope">
                   <div class="dat-cell"  label="Loại NV">{{ scope.row.TypeEmployee}}</div>
                </template>
            </el-table-column>
              <el-table-column label="Mã" align="center" min-width="100">
                <template slot-scope="scope">
                  <div class="dat-cell"  label="Mã">{{ scope.row.password}}</div>
                </template>
            </el-table-column>

        </el-table>

          <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
 
          <el-dialog title="Quản lý nhóm" :visible.sync="dialogForm">
        <detail :user="user" ></detail>
        
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

      <el-dialog title="Loại nhân viên" :visible.sync="dialogFormOTC">
        <setOTC :user="user" @click-something="setOTCOK" ></setOTC>
        
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

    <el-dialog title="Lấy khách hàng" :visible.sync="dialogFormKH">
        <getKH :user="user" @click-something="setKHOK" ></getKH>
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>

       
    </div>
</template>
<script>
import { GetLstEmployee } from '@/api/employeeAdmin'
import Detail from "@/views/admin/component/detail"
import SetOTC from "@/views/admin/component/setOTC"
import GetKH from "@/views/admin/component/getKH"

import Cookies from 'js-cookie'
export default {
    components:{ Detail,SetOTC,GetKH },
    filters: {
        sta: function (value) {
            if(value == 1){
                return 'Đang hoạt động';
            }
            else{
                return 'Khóa'
            }
           
        }
        },
    data(){
        return{
            report:1,
             total: 0,
            currentPage: 1,
            pageSize: 10,
            listEm:[],
            search:'',
            user:[],
            listLoading: false,
            dialogForm: false,
            dialogFormOTC: false,
            dialogFormKH: false

        }
    }
    ,methods:{
      nosetOTCOK(){
        this.dialogFormNoAccept=false
      },
      cancelInfo(){
        this.dialogForm= false
        this.dialogFormNoAccept=true
      },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => {
                 if(j==='Status'){
                  return this.$options.filters.inforStatusText(v[j])
                } 
                 else {
                  return v[j] 
                }
              }))
            },

        viewDetail(row){
            this.user=row
            this.dialogForm=true
        },
          setKH(row){
            this.user=row
            this.dialogFormKH=true
        },
          setKHOK(){
             this.dialogFormKH=false
             this.fetchData();
        },
         setOTC(row){
            this.user=row
            this.dialogFormOTC=true
        },
        setOTCOK(){
             this.dialogFormOTC=false
             this.fetchData();
        },
        Search(){
          Cookies.set('search', this.search)
          Cookies.set('page', this.currentPage)
          Cookies.set('pageSize', this.pageSize)
            this.fetchData()
        },
        fetchData(){
            this.listLoading= true
            GetLstEmployee({search: this.search,
                            pageSize: this.pageSize,
                            page: this.currentPage}).then(res=>{
                            this.listEm = res.Data
                   this.currentPage= res.PageNumber;
            this.pageSize = res.RowspPage
            this.total = (res.TotalPage)*(res.RowspPage)
                this.listLoading=false
            })
        },
        updateHC(){

        }
    },
    created(){
      if(Cookies.get('search')){
        this.search= Cookies.get('search')
      }

      if(Cookies.get('page')){
        this.currentPage= Cookies.get('page')
      }

      if(Cookies.get('pageSize')){
        this.pageSize= Cookies.get('pageSize')
      }
        this.fetchData()
    },
    watch:{
         pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
   
    }
}
</script>
<style >
.el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 40%;
}

.el-range-editor.el-input__inner {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: 3px 10px;
    width: 100%;
}

.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}

.el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
}

@media only screen and ( max-width: 600px) {
    .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
}

.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}

.el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
}
}
</style>