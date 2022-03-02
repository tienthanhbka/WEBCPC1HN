<template>
  <div class="container-info">
    <el-form :model="user" v-if="user">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="12" :lg="7">
          <user-card :displayUpdate="true" :user="user" @addOK="addOK" />

          <user-bio :user="user" />
        </el-col>
        <el-col :xs="24" :sm="12" :lg="17">
          <user-activity :user="user" :update="update" />
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
import { GetEmployeeInforByToken } from "@/api/employeeInfor";
export default {
  name: "EditUser",
  components: { UserBio, UserCard, UserActivity },
  data() {
    return {
      user: {},
      update: false
    };
  },
  watch: {
    $route: "getUser"
  },
  mounted() {
    GetEmployeeInforByToken().then(response => {
      this.user = response.Data;

      if (response.Data == null) {
        this.user = [
          {
            EmployeeID: "Chưa cập nhật",
            EmployeeName: "Chưa cập nhật",
            Img:
              "0fwefZqUzNqBFiikFLmvxq5ryCJYQ9nyTO2qDsxAdInTsXMfCCTuDHhyYMfw0qg7evy8Y3dmEm7IYTqR.jpg",
            Office: "Chưa cập nhật",
            Position: "Chưa cập nhật",
            Sex: "Chưa cập nhật",
            BirthDay: "2000/01/01",
            BirthAddress: "Chưa cập nhật",
            Address: "Chưa cập nhật",
            AddressOften: "Chưa cập nhật",
            AddressNow: "Chưa cập nhật",
            Phone: "Chưa cập nhật",
            CMND: "Chưa cập nhật",
            DateCMND: "2000/01/01",
            PlaceCMND: "Chưa cập nhật",
            Email: "Chưa cập nhật",
            Matrimony: "Chưa cập nhật",
            Health: "Chưa cập nhật",
            Qualification: "Chưa cập nhật",
            TrainingPlaces: "Chưa cập nhật",
            Specialized: "Chưa cập nhật",
            Degree: "Chưa cập nhật",
            DegreeLevel: "Chưa cập nhật",
            TranningTime: "Chưa cập nhật",
            Gifted: "Chưa cập nhật",
            WorkProcess: "Chưa cập nhật",
            EmailCompany: "Chưa cập nhật",
            DateStartWork: "Chưa cập nhật",
            Status: "1",
            StatusWork: null,
            EmployeeInforFamily: [],
            EmployeeDecision: [],
            Branch: "Chưa cập nhật",
            Place: "Chưa cập nhật",
            Folk: "Chưa cập nhật"
          }
        ];
      }
    });
  },
  methods: {
    addOK() {
      GetEmployeeInforByToken().then(response => {
        this.user = response.Data;
        this.update = true;
      });
    }
  }
};
</script>

<style lang="scss">
$bg: rgba(49, 49, 49, 0.05);
.container-info {
  padding: 15px;
  background-color: $bg;
  min-height: 100vh;
}
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
    width: 100% !important;
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
