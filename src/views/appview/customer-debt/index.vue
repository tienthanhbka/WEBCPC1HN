<template>
  <div class="debt-customer">
    <div style="margin-bottom:5px;">
      <el-select
        class="el-select-months"
        size="mini"
        clearable
        style="width:100%"
        v-model="TextSearch"
        @change="ChangeSelect"
        placeholder="Tìm kiếm..."
      >
        <el-option
          v-for="item in SelectLst"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="debt-body" v-for="(item, index) in CurrentData" :key="index">
      <customer :row="item"></customer>
    </div>
  </div>
</template>

<script>
import { GetCustomerWarningDebt } from "@/api/appview";
import Customer from "./component/customer";
export default {
  components: {
    Customer
  },
  data() {
    return {
      UserName: "",
      Token: "",
      CustomerWarningDebtLst: [],
      CurrentData: [],
      TextSearch: "",
      SelectLst: [
        {
          label: "Quá hạn",
          value: 1
        },
        {
          label: "Gần đến hạn",
          value: 2
        }
      ]
    };
  },
  methods: {
    isBigEnough(element, index, array) {
      return element.TimeTerm > 0;
    },
    isSmallEnough(element, index, array) {
      return element.TimeTerm <= 0;
    },
    fetchData() {
      this.UserName = this.$route.params.username;
      this.Token = this.$route.params.token;
      const req = {
        UserName: this.UserName,
        Token: this.Token
      };
      GetCustomerWarningDebt(req).then(res => {
        if (res.RespCode === 0) {
          this.CustomerWarningDebtLst = res.CustomerWarningDebtLst;
          this.CustomerWarningDebtLst.sort((a, b) =>
            a.TimeTerm < b.TimeTerm ? 1 : b.TimeTerm < a.TimeTerm ? -1 : 0
          );
          this.CurrentData = this.CustomerWarningDebtLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    },
    ChangeSelect(val) {
      if (val === 1) {
        this.CurrentData = this.CustomerWarningDebtLst.filter(o => {
          return this.isBigEnough(o);
        });
      } else if (val === 2) {
        this.CurrentData = this.CustomerWarningDebtLst.filter(o => {
          return this.isSmallEnough(o);
        });
      } else {
        this.CurrentData = this.CustomerWarningDebtLst;
      }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.debt-customer {
  padding: 5px;
}
</style>
