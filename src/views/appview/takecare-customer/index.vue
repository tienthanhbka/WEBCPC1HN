<template>
  <div class="takecare-customer">
    <div class="inline-block">
      <el-input
        class="el-select-months"
        v-model="DayDiff"
        size="mini"
        placeholder="Lọc KH theo số ngày chưa tới thăm..."
      />
      <el-button
        type="text"
        circle
        size="mini"
        class="el-button-search"
        @click="fetchData"
        ><i class="el-icon-search"></i>
      </el-button>
    </div>
    <div v-if="CustomerCityLst.length > 0">
      <div v-for="(item, index) in CustomerCityLst" :key="index">
        <div class="customer">
          <!-- <div class="customer-top" @click="selectCustemer(item)">
          <i class="fas fa-map-marker-alt"></i>
          <p class="customer--name">{{ item.CityName }}</p>
          <a href="#" class="detail">Chi tiết</a>
        </div>
        <span class="quantity">Số KH chưa viếng thăm: {{ item.Quantity }}</span> -->
          <p class="customer__detail" @click="selectCustemer(item)">
            {{ item.CityName }} ({{ item.Quantity }})
          </p>
        </div>
      </div>
    </div>
    <div class="blank-table" v-else>Không có dữ liệu</div>
    <el-dialog :visible.sync="dialogDetail" custom-class="small--modal">
      <span slot="title" class="title-dialog">{{ dialogTitle }}</span>
      <detail :data="rowData" :daydiff="DayDiff"></detail>
    </el-dialog>
  </div>
</template>

<script>
import { GetLastTakeCareCustomer } from "@/api/KDCustomer";

import Detail from "./component/detail";
export default {
  components: { Detail },
  data() {
    return {
      Token: "",
      UserName: "",
      DayDiff: "",
      CustomerCityLst: [],
      loadingTable: false,
      dialogDetail: false,
      selectSearch: false,
      dialogTitle: "",
      TextSearch: "",
      rowData: ""
    };
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        DayDiff: this.DayDiff
      };
      this.loadingTable = true;
      GetLastTakeCareCustomer(req).then(res => {
        if (res.RespCode === 0) {
          this.CustomerCityLst = res.CustomerCityLst;
          this.loadingTable = false;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    },
    selectCustemer(val) {
      this.dialogDetail = true;
      this.dialogTitle = val.CityName;
      this.rowData = val.CityName;
    }
  },
  created() {
    this.UserName = this.$route.params.username;
    this.Token = this.$route.params.token;
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
.takecare-customer {
  width: 100%;
  padding: 5px 8px;
  background-color: #fff;
  .customer {
    width: 100%;
    // padding: 10px;
    // margin-bottom: 5px;
    // border: 1px solid #ccc;
    // border-radius: 10px;
    // box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    //   rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
    // &-top {
    //   border-bottom: 1px solid #ccc;
    //   display: flex;
    //   margin-bottom: 5px;
    //   padding: 5px 0px;
    //   cursor: pointer;
    //   .fas {
    //     color: #02bc77;
    //     margin-right: 10px;
    //   }
    //   .customer--name {
    //     margin: 0;
    //     font-weight: 600;
    //     font-size: 14px;
    //     color: #0b0c0cad;
    //   }
    //   .detail {
    //     margin-left: auto;
    //     color: #0277bc;
    //     font-size: 10pt;
    //   }
    // }
    // .quantity {
    //   display: inline-block;
    //   font-size: 10pt;
    // }
    &__detail {
      margin: 0;
      padding: 8px;
      border-bottom: 1px solid #ccc;
    }
  }
}
.inline-block {
  padding-bottom: 5px;
  display: flex;
  border-bottom: 1px solid #ccc;
}
.title-dialog {
  font-size: 10pt;
  font-weight: 700;
  color: #02bc77;
}
</style>
<style lang="scss">
.small--modal {
  width: 580px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 0;
  }
}
.el-select-months {
  .el-input__inner {
    text-align: center;
  }
}
</style>
