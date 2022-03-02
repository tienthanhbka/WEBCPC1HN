<template>
  <div>
    <div class="inine-block" style="padding:5px">
      <el-date-picker
        class="month-roll"
        style="width:100%;text-align:center"
        v-model="month"
        type="month"
        placeholder="Chọn tháng"
      >
      </el-date-picker>
    </div>
    <div
      v-loading="loading"
      class="content-roll"
      v-if="data.ContentHtml"
      v-html="data.ContentHtml"
    ></div>
    <div class="blank-table" v-else style="margin:5px">
      Không có dữ liệu
    </div>
  </div>
</template>

<script>
import { GetPayrollEm } from "@/api/employeeInfor";
import { getLastMonth } from "@/api/index";
export default {
  data() {
    return {
      data: "",
      month: getLastMonth(),
      username: "",
      token: ""
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      this.username = this.$route.params.username;
      this.token = this.$route.params.token;
      const req = {
        UserName: this.username,
        Token: this.token,
        Month: Date.parse(this.month).toString("MM"),
        Year: Date.parse(this.month).toString("yyyy")
      };
      GetPayrollEm(req).then(res => {
        if (res.RespCode == 0) {
          this.data = res.Data ? res.Data : null;
          this.loading = false;
        }
      });
    }
  },
  created() {
    this.fetchData();
    console.log(getLastMonth());
  },
  watch: {
    month() {
      this.fetchData();
    }
  }
};
</script>

<style>
.month-roll .el-input__inner {
  text-align: center;
}
.content-roll {
  padding: 5px;
  padding-bottom: 100px;
}
.content-roll img {
  width: 100%;
}
.content-roll p {
  font-size: 10pt;
}
</style>
