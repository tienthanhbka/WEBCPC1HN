<template>
  <modal :id="modalId" :ref="modalId" v-cloak>
    <template slot="title">Khách hàng</template>

    <div slot="body">
      <el-row :gutter="20" style="margin-bottom:10px">
          <el-col  :xs="24" :sm="8" :lg="8">
            <el-input  style="width: 100%;"
          class="inline-input"
          size="mini"
          v-model="customerNo"
          
          placeholder="Mã khách hàng"
        ></el-input>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-input style="width:100%"
          class="inline-input"
          size="mini"
          v-model="customerName"
          
          placeholder="Tên khách hàng"
        ></el-input>
          </el-col>
          <el-col :xs="24" :sm="8" :lg="8">
            <el-select v-model="typeCus" size="mini" placeholder="Chọn kiểu KH" style="width: calc(100% - 50px);">
    <el-option
      v-for="item in typeCusLst"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
        <el-button size="mini" type="primary" icon="el-icon-search"  @click="fetchData"></el-button>
          </el-col>
      </el-row>
      <el-table ref="customerBFOModal"
        size="mini"
        v-loading="isLoading"
        border
        fit=""
        highlight-current-row
        :data="tableData"
        @row-click="rowclick"
        @current-change="rowchange"
      >
        
        <el-table-column label="Mã khách hàng" width="150">
          <template slot-scope="scope">{{scope.row.No_}}</template>
        </el-table-column>
        <el-table-column label="Tên khách hàng" min-width="350">
          <template slot-scope="scope">{{scope.row.Name}}</template>
        </el-table-column>
        <el-table-column label="Loại khách hàng" width="200">
          <template slot-scope="scope">{{scope.row['Customer Template Code']}}</template>
        </el-table-column>
        
      </el-table>
      <el-pagination
        class="pagination"
        :total="dataLength"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :small="true"
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>
    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" >Hủy</el-button>
      <el-button type="success" @click="CusAdd" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import{GetCustomerBFO} from '@/api/customerBFO'

export default {
    props:{
        modalId:String
    },
    data() {
        return {
          typeCusLst:[
            {
          value: 'TH',
          label: 'TH'
        },{
          value: 'KD',
          label: 'KD'
        },{
          value: 'ALL',
          label: 'Tất cả'
        }
          ],
            isLoading: false,
      search:'',
      tableData: [],
      customerNo:'',
      customerName:'',
      typeCus:'ALL',
      selectedCus: null,
    
      currentPage: 1,
      dataLength: 1000,
      pageSize: 10,
      
      i:0
        }
    },
    methods: {
        CusAdd(){
          if(this.selectedCus==null){
            this.$message({
            message: "Bạn chưa chọn khách hàng",
            type: "error"
          });
          return;
          }
            this.$emit('cusAdded',this.selectedCus);
            VoerroModal.hide(this.modalId);
        },
        fetchData(){
            
            
            this.isLoading = true;
            GetCustomerBFO({
                PageNumber:this.currentPage,
                RowspPage:this.pageSize,
                search:{
                  customerNo:this.customerNo,
                  customerName:this.customerName,
                  typeCus:this.typeCus
                }
            }).then(res=>{
                this.tableData=res.Data
                this.isLoading = false;
                this.dataLength = res.TotalRows;
                //this.selecteRow();
            });
            
        },


        rowchange(cur){
            this.selectedCus = cur;
         
        },
        rowclick(row, col, e) {
      if (row) {
        
        this.$refs.customerBFOModal.setCurrentRow(row);
      }
    },
    },
    created(){

        
        this.fetchData()
    },
    watch: {


        pageSize(){
            this.fetchData();
        }
    },
}
</script>