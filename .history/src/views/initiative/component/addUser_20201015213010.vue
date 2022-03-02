<template>
  <div>
    <div class="text item">
      <el-form
        ref="formLine"
        label-position="top"
        size="small"
        :model="form"
        label-width="120px"
      >
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Người thực hiện">
              <el-select
                class="selectIDGroup"
                style="width:100%"
                v-model="TeammateLst"
                multiple
                filterable
                allow-create
                default-first-option
                placeholder="Chọn hoặc nhập thành viên.."
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
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
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
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :lg="12">
            <el-form-item label="Kinh phí dự trù">
              <el-input
                class="selectIDGroup"
                v-model="form.formName"
                style="width:100%"
                placeholder="Nhập kinh phí..."
                type="textarea"
                autosize
              >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="12">
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
          </el-col>
        </el-row>
        <el-row :gutter="20">
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
        </el-row>
        <el-row :gutter="20">
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
        </el-row>
      </el-form>
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
      groupList: [],
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
