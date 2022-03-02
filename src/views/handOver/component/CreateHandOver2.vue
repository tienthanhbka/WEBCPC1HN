<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Chọn nhóm" prop="IDGroup">
        <el-select
          class="selectIDGroup"
          v-model="form.IDGroup"
          placeholder="Chọn nhóm"
          @change="changeGroup"
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
          <el-form-item label="Ngày xin nghỉ">
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
          <el-form-item label="Ngày bàn giao">
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
        <div>
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
        </div>
      </div>
    </div>
    <!-- <div ><el-button type="primary" icon="fas fa-plus"  @click="addLine" > Tạo phiếu khảo sát</el-button> </div> -->
    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button type="primary" icon="fas fa-plus" @click="addDefine">
        Xác nhận</el-button
      >
    </div>
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
import { GetType, CreateHandOver } from "@/api/handOver";
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
    Type7
  },

  data() {
    return {
      TypeLst: [],
      lines: [],
      emailLst: [],
      acc: 0,
      typeQuestion: "",
      TimeStart: "",
      TimeEnd: "",
      KPI: 0,
      Public: true,
      //currentComponent: 'question1',
      title: "",
      blockRemoval: true,
      lstEmployee: [],
      form: {
        IDGroup: "",
        lines: [],
        DateStart: "",
        DateEnd: "",
        Reason: "",
        Email: []
      }
    };
  },
  watch: {
    lines() {
      this.blockRemoval = this.lines.length <= 1;
    },
    row() {
      this.initData();
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
      this.form.lines = this.lines;
      CreateHandOver(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Tạo phiếu bàn giao thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("createOK", this.form);
        //this.initForm()
      });
    },
    changeGroup() {
      GetLstEmployeeHandOver({ idGroup: this.form.IDGroup }).then(res => {
        this.lstEmployee = res.Data;
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
      //console.log(this.lines)
      //console.log(selects);
      var parsedobj = JSON.parse(JSON.stringify(selects));
      this.lines[parsedobj[0].arr].select = parsedobj;
      //console.log(parsedobj[0].arr)
      //alert('6454')
    },
    modalOK() {
      CreateHandOver(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Tạo phiếu bàn giao thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("addOK", this.form);
        //this.initForm()
      });
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
        (this.form.IDGroup = this.row.IDGroup),
          (this.form.DateStart = this.row.DateStart),
          (this.form.DateEnd = this.row.DateEnd),
          (this.form.Reason = this.row.Reason),
          (this.form.Email = this.row.Email);
      } else {
        (this.form.IDGroup = ""),
          (this.form.DateStart = ""),
          (this.form.DateEnd = ""),
          (this.form.Reason = ""),
          (this.form.Email = "");
      }
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
</style>
