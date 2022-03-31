<template>
  <div class="result-employee">
    <div class="result--header">
      <div class="left">
        <div class="inline-block" v-if="tableDataGroup.length > 0">
          <el-radio-group v-model="modeView" size="small">
            <el-radio-button label="0">Cá nhân</el-radio-button>
            <el-radio-button label="1">Nhóm</el-radio-button>
          </el-radio-group>
        </div>

        <div class="inline-block">
          <el-date-picker
            value-format="MM-yyyy"
            value="2019-07"
            v-model="month"
            type="month"
            size="small"
            placeholder="Chọn tháng"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-input
            v-if="modeView == 1"
            v-model="search"
            size="small"
            placeholder="Tên nhân viên | SĐT"
          ></el-input>
        </div>
      </div>
    </div>
    <div class="right"></div>
    <div class="clear-both"></div>
    <div v-if="modeView == 0">
      <employee :month="month"></employee>
    </div>
    <div v-else>
      <group
        :tableDataGroup="tableDataGroup"
        :month="month"
        :search="search"
      ></group>
    </div>
  </div>
</template>

<script>
import { getMonth } from "@/api/index";
import Employee from "./component/employee";
import Group from "./component/group";
import { GetDetailEmployeeGroup } from "@/api/groups";

export default {
  components: { Employee, Group },
  data() {
    return {
      tableDataGroup: [],
      month: "",
      employee: "",
      search: "",
      isLoading: false,
      modeView: 0
    };
  },
  methods: {
    fetchDataGroup() {
      GetDetailEmployeeGroup().then(res => {
        if (res.RespCode == 0) {
          let arr = [];
          res.Data.forEach(e => {
            if (
              e.OTC == 0 ||
              e.OTC == 1 ||
              e.OTC == 15 ||
              e.OTC == 16 ||
              e.OTC == 52 ||
              e.OTC == 56
            ) {
              arr.push(e);
            }
          });
          this.tableDataGroup = arr;
        }
      });
    }
  },
  created() {
    this.month = getMonth();
    this.fetchDataGroup();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.result-employee {
  .result--header {
    padding: 10px;
    .left {
    }
    .right {
      float: right;
    }
  }
}
</style>
