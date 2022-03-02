<template>
  <div class="overview-container">
    <!-- <div>
      <el-select v-model="currentGroup" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupsLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          ></el-option>
        </el-select>
          
    </div> -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="nerver" class="overview-item" :body-style="	{ padding: '10px' }" >
          <!-- <img class="image" > -->
          <div class="content">
            
            <div class="title">{{values.SumAmountText}}</div>
            <div class="value">Trước VAT: {{values.SumAmount|toVND}}</div>
            <div class="value">Sau VAT: {{values.SumAmountVAT|toVND}}</div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="nerver" class="overview-item"  :body-style="	{ padding: '10px' }">
          
          <div class="content">
            <div class="title">
              Tổng giá trị hàng trả 
              
            </div>
            <div class="value">
              {{values.SumSaleReturn|toVND}}
            </div>
            <el-button v-if="showSaleReturnDetail"  type="info" style="float:right" size="mini" round @click="btnSalesReturnClick">Đóng</el-button>
              <el-button v-else  type="primary" style="float:right" size="mini" round @click="btnSalesReturnClick">Chi tiết</el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="nerver" class="overview-item"  :body-style="	{ padding: '10px' }">
          
          <div class="content">
            <div class="title">Tổng tiền đã trả</div>
            <div class="value">{{values.SumRecipt|toVND}}</div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="6">
        <el-card shadow="nerver" class="overview-item"  :body-style="	{ padding: '10px' }">
          
          <div class="content">
            <div class="title">Còn nợ</div>
            <div class="value">{{values.Desc=='Thống kê tất cả'?(values.SumAmount-(values.SumSaleReturn?values.SumSaleReturn:0)-values.SumRecipt):(values.SumAmount-values.SumRecipt)|toVND}}</div>
          </div>
        </el-card>
      </el-col>
      
    </el-row>
  </div>
</template>

<script>
import { GetListGroupAdminByToken,getEmployeesByIdGroup } from "@/api/groups";
export default {
  props:{
    values:Object
  },
  name: "HeaderReport",
  data() {
    return {
      groupsLst:[],
      currentGroup:'',
      mode: "New York",
      showSaleReturnDetail:false
    };
  },
  computed: {
    
  },
  methods: {
    btnSalesReturnClick: function(){
      this.showSaleReturnDetail = !this.showSaleReturnDetail;
      this.$emit('showSaleReturnDetail',this.showSaleReturnDetail);
    }
  },
  // created(){
  //   GetListGroupAdminByToken().then(res=>{
  //     this.groupsLst = res.Data;
  //   })
  // }
};
</script>
<style lang="scss" scoped>
    .overview-container{
        margin-top: -10px;
        height: 30px;

        .overview-item{
            height: 100px;
            background: #fff;
            margin-bottom: 15px !important;
            .image{
              position: absolute;
            float: left;
            width: 70px;
            height: 70px;
            vertical-align: center;
            background-color:#3d5a96;
            border-radius: 10px;
            padding: 15px;
            }

            .content{
                float:right;
                height: 80px;
                // max-width: 100px;

                .title{
                    font-size: 16px;
                    color: darkgray;
                    font-style: bold;
                }

                .value{
                    font-size: 18px;
                    margin-top:10px;
                    color: rgba(0, 0, 0, 0.7);
                    font-style: bold;
                }
            }
            
        }
    }
</style>
