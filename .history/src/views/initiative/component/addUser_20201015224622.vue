<template>
  <div>
    <div class="text item">
      <el-form
        ref="formLine"
        label-position="left"
        size="small"
        :model="form"
        :rules="rules"
        label-width="180px"
      >
        <el-form-item label="Người thực hiện" prop="EmployeeName">
          <el-autocomplete
            class="selectIDGroup"
            style="width:100%"
            v-model="form.EmployeeName"
            :fetch-suggestions="querySearch2"
            placeholder="Chọn người phụ trách..."
            @select="handleSelect"
          >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              @click="handleIconClick2"
            >
            </i>
            <template slot-scope="{ item }">
              <div class="value">
                {{ item.nameEmployee }}
              </div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="Kế hoạch" prop="WorkDes">
          <el-input
            class="selectIDGroup"
            v-model="form.WorkDes"
            style="width:100%"
            placeholder="Nhập tên đề xuất..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>

        <el-form-item label="Thời gian hoàn thành" prop="TimeEnd">
          <el-date-picker
            v-model="form.TimeEnd"
            type="date"
            format="dd/MM/yyyy"
            placeholder="Chọn ngày"
            style="width:100%"
            class="selectIDGroup"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div style="text-align:center;">
        <el-button
          icon="el-icon-plus"
          @click="add"
          size="mini"
          style="background-color:#02bc77;color:#fff;"
          >THÊM</el-button
        >
      </div>
      <el-row>
        <el-col :span="24">
          <div>
            <el-table style="width: 100%" :data="UserList">
              <el-table-column label="Nhân viên phụ trách">
                <template slot-scope="scope">
                  {{ scope.row.EmployeeName }}
                </template>
              </el-table-column>
              <el-table-column label="Kế hoạch" width="180">
                <template slot-scope="scope">
                  {{ scope.row.WorkDes }}
                </template>
              </el-table-column>
              <el-table-column label="Thời gian hoàn thành" width="160">
                <template slot-scope="scope">
                  {{ scope.row.TimeEnd.toString("dd/MM/yyyy") }}
                </template>
              </el-table-column>
              <el-table-column width="80">
                <template slot-scope="scope">
                  <el-button
                    @click="del(scope.$index)"
                    type="text"
                    style="color:red;"
                    ><i class="far fa-trash-alt"></i
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
    </div>
    <div slot="footer" style="text-align:center; margin-top: 10px;">
      <el-button
        style="background-color:#B5C5C6;color:white;"
        icon="el-icon-circle-close"
        @click="cancel"
        >HỦY</el-button
      >
      <el-button
        icon="el-icon-check"
        style="background-color:#19B5FE;color:white;"
        @click="AddUserOffer"
        >XÁC NHẬN</el-button
      >
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { getEmployeesByIdGroup } from "@/api/groups";
import { AddEmpInfoOfferIdea } from "@/api/offerIT";
export default {
  props: ["offer"],
  components: {},
  computed: {},
  data() {
    return {
      emLst: [],
      lstGroup: [],
      UserList: [],
      emLst: [],
      UserName: Cookies.get("name"),
      UserID: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      form: {
        OfferID: "",
        EmployeeName: "",
        EmployeeID: "",
        WorkDes: "",
        TimeEnd: ""
      },
      rules: {
        EmployeeName: [
          {
            required: true,
            message: "Hãy chọn người phụ trách",
            trigger: "change"
          }
        ],
        WorkDes: [
          {
            required: true,
            message: "Hãy nhập kế hoạch",
            trigger: "change"
          }
        ],
        TimeEnd: [
          {
            required: true,
            message: "Hãy chọn thời gian hoàn thành",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    initForm() {
      if (this.offer) {
        this.form.OfferID = this.offer.OfferID;
      } else {
        this.form = {
          OfferID: "",
          EmployeeName: "",
          EmployeeID: "",
          WorkDes: "",
          TimeEnd: ""
        };
        this.UserList = [];
      }
    },
    cancel() {
      this.$emit("cancel");
    },
    querySearch2(queryString, cb) {
      var links = this.emLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      cb(results);
    },
    handleSelect(item) {
      this.form.EmployeeName = item.nameEmployee;
      this.form.EmployeeID = item.idEmployee;
    },
    handleIconClick2(ev) {},
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.nameEmployee.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    AddUserOffer() {
      const req = {
        UserName: this.UserID,
        OfferID: this.offer.OfferID,
        OfferIdeaLineLst: this.UserList
      };
      AddEmpInfoOfferIdea(req).then(res => {
        if (res.RespCode == 0) {
          this.$message({
            message: "Thêm người phụ trách thành công",
            type: "success"
          });
        } else {
          this.$message({
            message: res.RespText,
            type: "success"
          });
        }
      });
    },
    fetchEmployee(group) {
      getEmployeesByIdGroup({
        idGroup: "CNHBP-IT",
        token: this.Token
      }).then(res => {
        this.emLst = res.Data;
      });
    },
    changeUser(val) {
      console.log(val);
    },
    add() {
      this.$refs.formLine.validate(valid => {
        if (valid) {
          this.UserList.push({
            OfferID: this.offer.OfferID,
            EmployeeID: this.form.EmployeeID,
            EmployeeName: this.form.EmployeeName,
            WorkDes: this.form.WorkDes,
            TimeEnd: this.form.TimeEnd.toLocaleString()
          });
          this.$refs.formLine.resetFields();
        }
      });
    },
    del(index) {
      this.UserList.splice(index, 1);
    }
  },
  mounted() {},
  watch: {
    offer() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
    this.fetchEmployee();
  }
};
</script>
<style>
.el-dialog__body {
  padding: 0px 20px;
}
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
</style>
