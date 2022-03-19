<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="Loại bàn giao" prop="TypeHandOver">
        <el-select
          class="selectIDGroup"
          style="width:100%"
          @change="changeTypeHandOver"
          v-model="form.TypeHandOver"
          placeholder="Chọn hình thức bàn giao"
        >
          <el-option
            v-for="item in typeLst"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Chọn nhóm" prop="IDGroup">
        <el-select
          class="selectIDGroup"
          v-model="form.IDGroup"
          placeholder="Chọn nhóm"
          style="width:100%"
        >
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Ngày xin nghỉ" prop="DateStart">
            <el-date-picker
              class="selectIDGroup"
              style="width:100%"
              v-model="form.DateStart"
              type="date"
              placeholder="Chọn ngày xin nghỉ"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Ngày bàn giao" prop="DateStart">
            <el-date-picker
              class="selectIDGroup"
              style="width:100%"
              v-model="form.DateEnd"
              type="date"
              placeholder="Chọn ngày dự kiến bàn giao xong"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Lý do">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập lý do xin nghỉ"
          type="textarea"
          :rows="1"
          v-model="form.Reason"
        ></el-input>
      </el-form-item>
      <el-form-item label="Gửi mail đến">
        <el-select
          class="selectIDGroup"
          style="width:100%"
          v-model="form.Email"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="Nhập email người nhận"
        >
          <el-option
            v-for="item in emailLst"
            :key="item.EmailCompany"
            :label="item.EmailCompany"
            :value="item.EmailCompany"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div class="box-component">
          <el-card>
            <el-row style="margin-bottom: 20px;">
              <el-col :span="1">
                <el-tooltip v-if="index > 0" content="Up">
                  <el-button type="text" @click="up(index)">
                    <i class="fas fa-arrow-up"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip
                  v-if="index == 0 && lines.length > 1"
                  content="Down"
                >
                  <el-button type="text" @click="dow(index)">
                    <i class="fas fa-arrow-down"></i>
                  </el-button>
                </el-tooltip>
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 0px; margin-left: 3px;"
                ></div>
              </el-col>
              <el-col :span="1">
                <div
                  class="grid-content bg-purple-light"
                  style="padding-top: 10px; margin-left: 3px;"
                >
                  <span style="font-weight:700;color:#0277bc"
                    >{{ index }}.</span
                  >
                </div>
              </el-col>
              <el-col :span="6" class="label-box">Chọn loại bàn giao</el-col>
              <el-col style="margin-left: 20px;" :span="14">
                <div class="grid-content bg-purple">
                  <el-select
                    class="selectIDGroup"
                    v-model="line.TypeHandOver"
                    placeholder="Chọn loại bàn giao"
                    @change="changeType(index)"
                    style="width:100%"
                  >
                    <el-option
                      v-for="item in TypeLst"
                      :key="item.TypeID"
                      :label="item.NameType"
                      :value="item.TypeID"
                    ></el-option>
                  </el-select>
                </div>
              </el-col>
            </el-row>
            <component
              :data="index"
              :lstEmployee="lstEmployee"
              :line="line"
              :is="line.currentComponent"
              @change="addOK"
            ></component>
            <el-tooltip content="Thêm bàn giao" placement="top">
              <el-button
                v-if="index + 1 === lines.length"
                @click="addLine"
                type="text"
              >
                <i class="fas fa-plus"></i>
              </el-button>
            </el-tooltip>
          </el-card>
          <el-button
            class="btn-del"
            type="text"
            icon="el-icon-circle-close"
            @click="delComponent(index)"
          ></el-button>
        </div>
      </div>
    </div>
    <div style="text-align:center;padding:10px">
      <el-button
        type="primary"
        size="small"
        icon="fas fa-check"
        @click="addDefine"
      >
        Xác nhận</el-button
      >
    </div>
    <el-dialog
      :visible.sync="dialogVisibleSurvey"
      append-to-body
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      custom-class="default-modal"
    >
      <!-- <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3> -->
      <el-alert
        title="Vui lòng thực hiện khảo sát để tiếp tục"
        type="warning"
        style="margin-bottom:10px"
      >
      </el-alert>
      <survey :id="84" @submitOK="submitOK"></survey>
    </el-dialog>
  </div>
</template>

<script>
import Type1 from "@/views/handOver/component/Type1";
import Type2 from "@/views/handOver/component/Type2";
import Type3 from "@/views/handOver/component/Type3";
import Type4 from "@/views/handOver/component/Type4";
import Type5 from "@/views/handOver/component/Type5";
import Type6 from "@/views/handOver/component/Type6";
import Type7 from "@/views/handOver/component/Type7";
import Survey from "@/views/survey/component/startSurvey/index";
import {
  GetType,
  CreateHandOver,
  GetDetailHandOver,
  UpdateHandOver
} from "@/api/handOver";
import { GetLstEmployeeHandOver } from "@/api/getEmployee";
import { GetEmailLst } from "@/api/mission";
export default {
  name: "PhoneNumberLine",
  props: ["groupList", "row"],
  components: {
    Type1,
    Type2,
    Type3,
    Type4,
    Type5,
    Type6,
    Type7,
    Survey
  },

  data() {
    return {
      TypeLst: [],
      lines: [],
      emailLst: [],
      acc: 0,
      TimeStart: "",
      TimeEnd: "",
      title: "",
      blockRemoval: true,
      dialogVisibleSurvey: false,
      lstEmployee: [],
      typeLst: [
        {
          value: 1,
          label: "Nghỉ việc"
        },
        {
          value: 2,
          label: "Nghỉ tạm thời"
        },
        {
          value: 3,
          label: "Chuyển bộ phận"
        }
      ],
      form: {
        RowID: "",
        IDGroup: "",
        HandOverLineLst: [],
        DateStart: "",
        TypeHandOver: "",
        NewGroup: "",
        DateEnd: "",
        Reason: "",
        Email: ""
      },
      rules: {
        TypeHandOver: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        IDGroup: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        DateStart: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        DateEnd: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ]
      }
    };
  },
  watch: {
    lines() {
      this.blockRemoval = this.lines.length <= 1;
    },
    row() {
      this.initData();
    },
    "form.IDGroup"() {
      GetLstEmployeeHandOver({ idGroup: this.form.IDGroup }).then(res => {
        this.lstEmployee = res.Data;
      });
    }
  },
  methods: {
    changeGroup() {
      GetLstEmployeeHandOver({ idGroup: this.form.IDGroup }).then(res => {
        this.lstEmployee = res.Data;
      });
    },

    addLine() {
      let checkEmptyLines = this.lines.filter(line => line.question === null);
      if (checkEmptyLines.length >= 1 && this.lines.length > 0) return;
      this.lines.push({
        TypeHandOver: 1,
        currentComponent: "type1",
        HandOver: "",
        Unit: "",
        Number: "",
        CurrentStatus: "",
        LinkFile: "",
        Address: "",
        Phone: "",
        StepNext: "",
        Note: "",
        EmployeeIDNext: ""
      });
    },
    addDefine() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.form.DateStart = Date.parse(this.form.DateStart).toString(
            "yyyy-MM-dd HH:mm:ss"
          );
          this.form.DateEnd = Date.parse(this.form.DateEnd).toString(
            "yyyy-MM-dd HH:mm:ss"
          );
          this.form.HandOverLineLst = this.lines;
          this.form.Email = this.form.Email.join(";");
          const req = {
            HandOverInfo: this.form
          };
          if (this.row) {
            UpdateHandOver(req).then(res => {
              this.$notify({
                title: "Thành công",
                message: "Cập nhật phiếu bàn giao thành công",
                type: "success",
                position: "top-left"
              });
              this.$emit("createOK", this.row.RowID);
              this.clear();
            });
          } else {
            CreateHandOver(req).then(res => {
              this.$notify({
                title: "Thành công",
                message: "Tạo phiếu bàn giao thành công",
                type: "success",
                position: "top-left"
              });

              this.$emit("createOK", res.DocumentID);
              this.clear();
            });
          }
        }
      });
    },
    removeLine(lineId) {
      if (!this.blockRemoval) this.lines.splice(lineId, 1);
    },
    changeType(index) {
      this.lines[index].currentComponent =
        "type" + this.lines[index].TypeHandOver;
    },
    addOK(selects) {
      var parsedobj = JSON.parse(JSON.stringify(selects));
      this.lines[parsedobj[0].arr].select = parsedobj;
    },
    up(index) {
      //alert(index)
      var b = this.lines[index];
      this.lines[index] = this.lines[index - 1];
      this.lines[index - 1] = b;
      this.acc++;
      //console.log(this.lines)
    },
    dow(index) {
      var b = this.lines[index];
      this.lines[index] = this.lines[index + 1];
      this.lines[index + 1] = b;
      this.acc++;
    },
    initData() {
      if (this.row) {
        const req = {
          DocumentID: this.row.RowID
        };
        GetDetailHandOver(req).then(res => {
          this.form.RowID = res.HandOverInfo.RowID;
          this.form.IDGroup = res.HandOverInfo.IDGroup;
          this.form.DateStart = res.HandOverInfo.DateStart;
          this.form.DateEnd = res.HandOverInfo.DateEnd;
          this.form.Reason = res.HandOverInfo.Reason;
          this.form.Email = res.HandOverInfo.Email
            ? res.HandOverInfo.Email.split(";")
            : [];
          this.form.HandOverLineLst = res.HandOverInfo.HandOverLineLst;
          this.lines = this.form.HandOverLineLst.map(item => {
            return {
              TypeHandOver: item.TypeHandOver,
              currentComponent: "type" + item.TypeHandOver,
              HandOver: item.HandOver,
              Unit: item.Unit,
              Number: item.Number,
              CurrentStatus: item.CurrentStatus,
              LinkFile: item.LinkFile,
              Address: item.Address,
              Phone: item.Phone,
              StepNext: item.StepNext,
              Note: item.Note,
              EmployeeIDNext: item.EmployeeIDNext
            };
          });
          if (this.lines.length == 0) this.addLine();
        });
      } else {
        this.clear();
      }
    },
    delComponent(index) {
      if (this.lines.length > 1) {
        this.lines.splice(index, 1);
      }
    },
    clear() {
      (this.form.RowID = ""),
        (this.form.IDGroup = ""),
        (this.form.DateStart = ""),
        (this.form.DateEnd = ""),
        (this.form.Reason = ""),
        (this.form.Email = ""),
        (this.lines = []);
    },
    changeTypeHandOver(val) {
      if (val == "Nghỉ việc") {
        this.dialogVisibleSurvey = true;
        // this.$notify({
        //   title: "Khảo sát nghỉ việc",
        //   message: "Vui lòng thực hiện khảo sát để tiếp tục",
        //   type: "warning",
        //   position: "top-left"
        // });
      }
    },
    submitOK() {
      this.dialogVisibleSurvey = false;
    }
  },
  mounted() {
    this.addLine();
  },
  created() {
    this.initData();
    GetType().then(res => {
      this.TypeLst = res.TypeLst;
    });

    GetEmailLst().then(res => {
      this.emailLst = res.Data;
    });
  }
};
</script>

<style lang="scss" scoped>
.label-box {
  font-size: 10pt;
  font-weight: 600;
  padding: 10px;
}
.box-component {
  position: relative;
  .btn-del {
    position: absolute;
    margin: 0 10px;
    color: red;
    top: 0;
    right: 0;
  }
}
</style>
