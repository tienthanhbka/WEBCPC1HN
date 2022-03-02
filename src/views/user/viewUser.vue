<template>
  <div style="padding:5px">
    <el-form :model="user" v-if="user">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="6">
          <user-card :displayUpdate="false" :user="user" @addOK="addOK" />
          <user-bio :user="user" />
        </el-col>
        <el-col :xs="24" :sm="12" :lg="18">
          <user-activity :user="user" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import UserBio from "./components/UserBio";
import UserCard from "./components/UserCard";
import UserActivity from "./components/UserActivity";

import { getInfo } from "@/api/user";
import { GetEmployeeInforByID } from "@/api/employeeInfor";
export default {
  name: "EditUser",
  components: { UserBio, UserCard, UserActivity },
  data() {
    return {
      user: {}
    };
  },
  watch: {
    $route: "getUser"
  },
  mounted() {},
  methods: {
    fetchData() {
      GetEmployeeInforByID({ EmployeeID: this.$route.params.id }).then(
        response => {
          this.user = response.Data;
        }
      );
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style>
.el-dialog {
  -webkit-transform: none;
  transform: none;
  left: 0;
  position: relative;
  margin: 0 auto;
  width: 80%;
}

.el-range-editor.el-input__inner {
  display: -webkit-inline-box;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 3px 10px;
  width: 100%;
}

.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}

.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}

@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }

  .el-select {
    display: inline-block;
    position: relative;
    width: 100%;
  }

  .el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
  }
}
</style>
