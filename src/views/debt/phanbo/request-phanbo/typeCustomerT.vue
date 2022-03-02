<template>
  <div>
    <el-table
      :header-row-style="{color:'#341f97'}"
      :data="tableData"
      v-loading="isLoading"
      style="width: 100%"
      border
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">
          <i class="fas fa-user-nurse" style="color:#341f97"></i>
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" width="75px" label="Vai trò">
        <template slot-scope="{row}">
          <span>{{ row.typeCustomerNo }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="175px" label="Đề xuất ck">
        <template slot-scope="{row}">
          <div v-if="row.edit" class="el-input el-input--small">
            <cleave
              v-model="row.commission"
              :options="{numeral: true,
    numeralThousandsGroupStyle: 'thousand',
    }"
              class="el-input__inner"
            ></cleave>
          </div>

          <!-- <el-input v-if="row.edit" size="small" v-model="row.commision"></el-input> -->
          <span v-else>{{ row.commission|toVND }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" width="175px" label="Ngày hiệu lực">
        <template slot-scope="{row}">
          <el-date-picker
            style="width:100%"
            v-if="row.edit"
            size="small"
            v-model="row.DateStart"
            placeholder="Chọn ngày"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
          <span v-else>{{ row.DateStart | toDMY }}</span>
        </template>
      </el-table-column>
     
      <el-table-column align="center" width="175px" label="Actions" v-if="isGroupPage||(phanboCoupon.status==4||phanboCoupon.status ==1)">
        <template slot-scope="{row}"  >
          <div :key="row.key" v-if="row.status ==1||row.status ==4||row.status==null">
             <div v-if="row.edit">
            <el-button-group>
              <el-button
                class="cancel-btn"
                size="small"
                icon="el-icon-refresh"
                type="warning"
                @click="cancelEdit(row)"
              ></el-button>
              <el-button
                type="success"
                size="small"
                icon="el-icon-circle-check"
                @click="confirmEdit(row)"
              >Ok</el-button>
            </el-button-group>
          </div>

          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="editLine(row)"
          >Sửa</el-button>
          </div>
         
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="120" align="center">
          <template slot-scope="{row}">
            <el-tag slot="reference" size="small"
              :type="row.status|commissionLineStatusColor "
            > {{ row.status|commissionLineStatusText }}</el-tag>
            
          </template>
        </el-table-column>
      <el-table-column v-if="isGroupPage"  width="150" align="center" label="Duyệt"  column-key="evaluate" prop="evaluate" >
        <template slot="header">
          
          <el-tooltip content="Lưu lại" placement="top">
          <el-button @click="uploadEvaluate()" size="mini" :type="saved?'success':'warning'"><i class="el-icon-loading" v-show="uploadingEvaluate" ></i><i class="fas fa-save"></i></el-button>
          </el-tooltip>
          
          <el-checkbox style="margin-right:0px"
              @change="checkAll"
              ref="boxCheckAll"
            ></el-checkbox>
            
        </template>
         
          <template slot-scope="scope">
            
            <!-- <el-checkbox
              
              :disabled="scope.row.status<6"
              v-model="scope.row.evaluate"
              :indeterminate="scope.row."
            ></el-checkbox> -->
            <el-radio-group @change="statusChange(scope.row)" fill="#ecf0f1" :text-color="colorStatus(scope.row)"  v-model="scope.row.evaluate" size="mini">
      <el-radio-button  :label="0" :disabled="phanboCoupon.group.status<3&&scope.row.status==10" >
        <el-tooltip content="Hủy" placement="top" effect="light">
<i class="fas fa-times"></i>
</el-tooltip>
        
        </el-radio-button>
      <el-radio-button :label="1" :disabled="phanboCoupon.group.status<3&&scope.row.status==10" >
        <el-tooltip content="Chờ duyệt" placement="top" effect="light"><i class="fas fa-dot-circle"></i></el-tooltip></el-radio-button>
      <el-radio-button :label="2" :disabled="phanboCoupon.group.status>2||scope.row.status==10" >
        <el-tooltip content="Duyệt với tư cách ASM" placement="top" effect="light"><i class="fas fa-check"></i></el-tooltip></el-radio-button>
      <el-radio-button :label="3" :disabled="phanboCoupon.group.status<3"><el-tooltip content="Duyệt với tư cách GĐCN" placement="top" effect="light"><i class="fas fa-check-double"></i></el-tooltip></el-radio-button>
      
    </el-radio-group>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  GetCommissonLinesOfHeaderAndItem,
  UpsertCommissionOrderLine,
  UpdateCommissionLineLstStatus
} from "@/api/debt";
export default {
  props: {
    item: Object,
    phanboCoupon: Object
  },

  data() {
    return {
      saved:true,
      isGroupPage:false,
      tableData: [],
      isLoading: false,
      uploadingEvaluate:false,
      typeCustomers: ["Bác sĩ", "Nhà thuốc"],
      isLoading: false,
      tableData: [
        { edit: true, typeCustomer: 12, commision: 20, dateBegin: "2019-01-02" }
      ]
    };
  },

  methods: {
    statusChange(row){
      this.saved = false;
      if(row.edit){
        this.confirmEdit(row);
      }
    },
    uploadEvaluate(){
      
      var evaluateLst=[];
      this.tableData.forEach(e => {
        if(e.RowID){
          if(e.evaluate==3&&e.status!=10){
          evaluateLst.push({line:e.RowID,status:10})
        }
        if(e.evaluate==2&&e.status!=6){
          evaluateLst.push({line:e.RowID,status:6})
        }
        if(e.evaluate==1&&e.status!=1){
          evaluateLst.push({line:e.RowID,status:1})
        }
        if(e.evaluate==0&&e.status!=0){
          evaluateLst.push({line:e.RowID,status:0})
        }
        }
        
      });
      
      if(evaluateLst.length==0){
        this.$message({
            message: "Không có thông tin duyệt mới",
            type: "danger"
          });
          
          return;
      }
      this.uploadingEvaluate = true;
      UpdateCommissionLineLstStatus({data:evaluateLst}).then(res=>{
        this.uploadingEvaluate = false;
        this.saved = true;
        this.tableData.forEach(e => {

          res.Data.forEach(o => {
            if(e.RowID==o.RowID&&e.RowID!=null&&o.RowID!=null){
              e.status = o.status
              
              
              
              this.phanboCoupon.status = o.statusH
              
            }
          });

          if(e.status==1||e.status==null){
            e.evaluate = 1;
          }else if(e.status == 0){
            e.evaluate = 0;
          }else if(e.status == 6){
            e.evaluate = 2;
          }else if(e.status=10){
            e.evaluate = 3;
          }else if(e.status==undefined){
            e.status = null
          }
          
         
        });
      });

      
    },
    colorStatus(st){
    
      if(st.evaluate==2){
        return '#409EFF'
      }else if(st.evaluate==0){
        return '#F56C6C'
      }else if(st.evaluate==3){
        return '#67C23A'
      }else{
        return '#E6A23C'
      }
    },
    checkAll(e){
      this.saved =false;
      if(e){
        this.tableData.forEach(element => {
          
          if(element.status>=1&&this.phanboCoupon.group.status==2){
            element.evaluate = 2;
          }
          else if(element.status>=1&&this.phanboCoupon.group.status==3){
            element.evaluate = 3;
          }
          
          });
      }else{
        this.tableData.forEach(element => {
          if(element.status>=1)
            element.evaluate = 0;
        });
      }
     
      
    },
    confirmEdit(row) {
      row.key=row.key+1;
      
      console.log(row);
      
      UpsertCommissionOrderLine({
        RowID:row.RowID,
        idCustomer:this.phanboCoupon.idCustomer,
        idProduct:this.item.idProduct,
        typeCustomer:row.typeCustomerNo,
        DateStart:row.DateStart,
        commission:row.commission,
        headerID:this.phanboCoupon.RowID

      }).then(res=>{
        row.oCommission = row.Commission;
        row.oDateStart = row.DateStart;
        row.RowID = res.Data.RowID;
        row.status = res.Data.status;
        
        //this.phanboCoupon.status = res.Data.statusH
        
        row.key=row.key+1;
        row.edit = false;
      })
      
      
    },
    editLine(row) {
      row.key=row.key+1;
     
      row.edit = true;
    },
    cancelEdit(row) {
      row.commission = row.oCommission;
      row.DateStart = row.oDateStart;
      row.edit = false;
    },
    addNewRow() {
      this.tableData.push({
        edit: true,
        typeCustomer: 12,
        commision: 20,
        dateBegin: this.phanboCoupon.BaseDateStart
      });
    }
  },
  created() {
    if (this.$router.currentRoute.path == "/debt/phan-bo/duyet-phan-bo") {
      this.isGroupPage = true;
    }
    if (this.item.typeCustomers == null) {
      this.isLoading = true;
      GetCommissonLinesOfHeaderAndItem({
        headerID: this.phanboCoupon.RowID,
        idProduct:this.item.idProduct
      }).then(res => {
        this.isLoading = false;
        res.Data.forEach(e => {
          
          if (!e.DateStart) {
            e.DateStart = this.phanboCoupon.BaseDateStart;
          }
          if(e.status==1||e.status==null){
            e.evaluate = 1;
          }else if(e.status == 0){
            e.evaluate = 0;
          }else if(e.status == 6){
            e.evaluate = 2;
          }else if(e.status=10){
            e.evaluate = 3;
          }else if(e.status==undefined){
            e.status = null
          }
          e.key=e.RowID;
          if(!e.RowID&&(this.phanboCoupon.status==1||this.phanboCoupon.status==4)){
            e.edit = true;
          }
          
          e.oCommission = e.commission;
          e.oDateStart = e.DateStart;
        });
        this.item.typeCustomers = res.Data;
        this.tableData = res.Data;
      });
    } else {
      this.tableData = this.item.typeCustomers;
    }
  }
  
};
</script>
<style lang="css">
  .el-radio-button--mini .el-radio-button__inner {
    padding: 5px 7px;
    
}
</style>