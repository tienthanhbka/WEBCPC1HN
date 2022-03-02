<template>
  <div>
    <div class="text item">
      <el-form
        ref="formLine"
        label-position="left"
        size="small"
        :model="form"
        :rules="rules"
        label-width="150px"
      >
        <el-form-item label="Người thực hiện">
          <el-select
            class="selectIDGroup"
            style="width:100%"
            v-model="form.EmployeeName"
            placeholder="Chọn người phụ trách.."
            @change="changeUser"
          >
            <el-option
              v-for="item in emLst"
              :key="item.nameEmployee"
              :label="item.nameEmployee"
              :value="item.nameEmployee"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Kế hoạch">
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

        <el-form-item label="Thời gian hoàn thành">
          <el-date-picker
            v-model="form.TimeComplete"
            type="date"
            placeholder="Chọn ngày"
            style="width:100%"
            class="selectIDGroup"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Chuyển nhóm" v-if="Role == 5">
          <el-select
            class="selectIDGroup"
            style="width:100%"
            v-model="TranGroup"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Chọn hoặc nhập thành viên.."
          >
            <el-option
              v-for="item in lstGroup"
              :key="item.idGroup"
              :label="item.idGroup"
              :value="item.idGroup"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Ghi chú">
          <el-input
            class="selectIDGroup"
            v-model="form.Comment"
            style="width:100%"
            placeholder="Nhập ghi chú..."
            type="textarea"
            autosize
          >
          </el-input>
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
                  {{ scope.row.TimeEnd }}
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
        @click="ApproveOffer"
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
        TimeEnd: "",
        Comment: ""
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
      } else {
        this.form = {
          EmployeeName: "",
          EmployeeID: "",
          WorkDes: "",
          TimeEnd: "",
          Comment: ""
        };
      }
      this.form = {
        EmployeeName: "",
        EmployeeID: "",
        WorkDes: "",
        TimeEnd: "",
        Comment: ""
      };
      this.TeammateLst = [];
    },
    cancel() {
      this.$emit("cancel");
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
      this.$refs.form.validate(valid => {
        if (valid) {
          this.UserList.push({
            EmployeeID: this.form.EmployeeID,
            EmployeeName: this.form.EmployeeName,
            WorkDes: this.form.WorkDes,
            TimeEnd: this.form.TimeEnd
          });
          this.$refs.formLine.resetFields();
        }
      });
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
