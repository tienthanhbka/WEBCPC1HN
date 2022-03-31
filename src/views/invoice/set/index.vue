<template>
  <div class="invoice-set">
    <div class="header">
      <div class="inline-block left">
        <div class="inline-block" v-if="tableDataGroup.length > 0">
          <el-radio-group v-model="modeView" size="small">
            <el-radio-button label="0">Cá nhân</el-radio-button>
            <el-radio-button label="1">Nhóm</el-radio-button>
          </el-radio-group>
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
        <div class="inline-block">
          <el-button
            size="small"
            type="primary"
            :loading="listLoading"
            @click="fetchData"
            >Cập nhật</el-button
          >
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
      ></group>
    </div>
  </div>
</template>

<script>
import Employee from "../employee/index";
import Group from "../group/index";
import { getStartDate, getEndDate } from "@/api/index";
import { GetDetailEmployeeGroup } from "@/api/groups";

export default {
  components: { Employee, Group },
  data() {
    return {
      listLoading: false,
      startDate: getStartDate(),
      endDate: getEndDate(),
      tableDataGroup: [],
      modeView: 0
    };
  },
  methods: {
    fetchData() {},
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
.invoice-set {
  background-color: #fff;
  .header {
    padding: 10px 0;
    .right {
      float: right;
    }
  }
}
</style>
