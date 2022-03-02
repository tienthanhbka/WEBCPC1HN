<template>
  <div>
    <el-dialog
      title="Lịch  sử tồn kho"
      :visible.sync="inventoryModalVisible"
      custom-class="modal-class"
    >
    </el-dialog>
    <el-row v-if="isGroupPage" :gutter="10">
      <el-col :xs="24" :sm="12" :lg="12">
        <el-select style="width:100%; margin-bottom:10px" v-model="currentGroup" placeholder="Select">
          <el-option
            v-for="group in groupLst"
            :key="group.idGroup"
            :label="group.idGroup"
            :value="group.idGroup"
          ></el-option>
        </el-select>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="12">
        <el-select style="width:100%;margin-bottom:10px" v-model="currentEm" placeholder="Select">
        <el-option
          v-for="em in emLst"
          :key="em.idEmployee"
          :label="em.nameEmployee"
          :value="em.idEmployee"
        ></el-option>
      </el-select>
      </el-col>
    </el-row>
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :xs="24" :sm="8" :lg="8">
        <el-input
          style="width: 100%;"
          class="inline-input"
         
          v-model="customerNo"
          placeholder="Mã khách hàng"
        ></el-input>
      </el-col>

      <el-col :xs="24" :sm="8" :lg="8">
        <el-input
          style="width:100%"
          class="inline-input"
          
          v-model="customerName"
          placeholder="Tên khách hàng"
        ></el-input>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <el-select
          v-model="typeCus"
          
          placeholder="Chọn kiểu KH"
          style="width: calc(100% - 61px);"
        >
          <el-option
            v-for="item in typeCusLst"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search" @click="fetchData"></el-button>
      </el-col>
    </el-row>
    <el-table
      class=""
      :data="tableData"
      v-loading="isLoading"
      border
      show-header
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <inventory-tab :customer="row" :idEmployee="currentEm"></inventory-tab>
        </template>
      </el-table-column>
      <el-table-column label="Mã khách hàng" width="130">
        <template slot-scope="{row}">
          <span>{{row.No_}}</span>
        </template>
      </el-table-column>
       <el-table-column label="Tên khách hàng" min-width="150">
        <template slot-scope="{row}">
          <span>{{row.Name}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="Upload file KH" min-width="150">
        <template slot-scope="scope">
           <el-tooltip content="Upload file"> <el-button @click="uploadFile(scope.row)" size="mini" type="success" ><i class="fas fa-cloud-upload-alt"></i></el-button></el-tooltip>
        </template>
      </el-table-column> -->
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
</template>
<script>
import InventoryTab from "./inventory-tab/index";
import { GetCustomerBFO } from "@/api/customerBFO";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
export default {
  components: {
    InventoryTab
  },
  data() {
    return {
      groupLst:[],
      emLst:[],
      currentGroup:'',
      currentEm:'',
      isGroupPage:false,
        typeCusLst: [
        {
          value: "TH",
          label: "TH"
        },
        {
          value: "KD",
          label: "KD"
        },
        {
          value: "AT",
          label: "AT"
        },
        {
          value: "ALL",
          label: "Tất cả"
        }
      ],
      isLoading:false,
        dataLength:0,
        pageSize:10,
        currentPage:1,
        customerNo:'',
        customerName:'',
        typeCus:'',
      tableData: [],
      inventoryModalVisible: false,
      dialogFormUpload: false,
      row:''
    };
  },
  
  methods: {
    uploadOK(){
      this.dialogFormUpload = false
    },
    uploadFile(row){
      this.row = row
      this.dialogFormUpload = true
    },
    fetchData() {
        this.isLoading = true;
        var req = {
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        search: {
          customerNo: this.customerNo,
          customerName: this.customerName,
          typeCus: this.typeCus
        }
      }
      if(this.isGroupPage&&this.currentEm!=null){
        req.em = this.currentEm
      }
      GetCustomerBFO(req).then(res => {
          this.isLoading = false;
          res.Data.forEach(e=>{
            e.history=null
          })
          this.tableData = res.Data;
        this.isLoading = false;
        this.dataLength = res.TotalRows;
      });
    }
  },
  created() {
    if(this.$router.currentRoute.path.includes('nhom')){
      this.isGroupPage = true;
    }
    if (this.isGroupPage) {
      GetListGroupAdminByToken().then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
      });
    }
      this.typeCus = this.typeCusLst[3].value
    this.fetchData();
    
    
  },
  watch: {
     currentGroup() {

      if (this.isGroupPage&&this.currentGroup != "") {
        getEmployeesByIdGroup({
          idGroup: this.currentGroup
        }).then(res => {
          this.emLst = res.Data;
          this.currentEm = this.emLst[0].idEmployee;
        });
      }
    },
    currentEm(){
      if (this.isGroupPage&&this.currentGroup != null) {
        this.fetchData();
      }
    }
  },
};
</script>
<style scoped>


/deep/ .el-table__expanded-cell[class*="cell"] {
  padding: 15px 5px;
}
/deep/ .el-tabs--border-card > .el-tabs__content {
  padding: 5px;
}
.modal-class {
  max-width: 960px;
  width: 98%;
}
</style>