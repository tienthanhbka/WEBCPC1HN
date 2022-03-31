<template>
  <div class="invoice-output">
    <div class="header">
      <div class="inline-block left">
        <div class="inline-block" v-if="tableDataGroup.length > 0">
          <el-radio-group v-model="modeView" size="small">
            <el-radio-button label="0">Cá nhân</el-radio-button>
            <el-radio-button label="1">Nhóm</el-radio-button>
          </el-radio-group>
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
      <div class="inline-block right">
        <div class="inline-block">
          <el-date-picker
            v-model="startDate"
            type="date"
            size="small"
            placeholder="Ngày bắt đầu"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="inline-block">
          <el-date-picker
            v-model="endDate"
            type="date"
            size="small"
            placeholder="Ngày kết thúc"
            format="dd/MM/yyyy"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="clear-both"></div>
    </div>
    <div v-if="modeView == 0">
      <employee :startDate="startDate" :endDate="endDate"></employee>
    </div>
    <div v-else>
      <group
        :tableDataGroup="tableDataGroup"
        :startDate="startDate"
        :endDate="endDate"
        :search="search"
      ></group>
    </div>
  </div>
</template>

<script>
import { getStartDate, getEndDate } from "@/api/index";
import { GetDetailEmployeeGroup } from "@/api/groups";
import Employee from "./component/employee";
import Group from "./component/group";
export default {
  components: { Employee, Group },
  data() {
    return {
      listLoading: false,
      startDate: getStartDate(),
      endDate: getEndDate(),
      tableDataGroup: [],
      modeView: 0,
      search: ""
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
    this.fetchDataGroup();
  }
};
</script>

<style lang="scss" scoped>
.invoice-output {
  background-color: #fff;
  .header {
    padding: 10px 0;
    .right {
      float: right;
    }
  }
}
</style>
