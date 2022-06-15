<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-position="left"
      label-width="130px"
      size="mini"
    >
      <el-form-item label="Bộ phận" prop="IDGroup">
        <el-select v-model="form.IDGroup" placeholder="Chọn nhóm">
          <el-option
            v-for="item in options"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Kế hoạch" prop="Type">
        <el-select
          v-model="form.Type"
          @change="changeType"
          placeholder="Chọn loại đăng kí"
        >
          <el-option
            v-for="item in typeList"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Lý do">
        <el-select
          v-if="form.Type == 'Nghỉ việc riêng có hưởng lương'"
          v-model="form.Reason"
          @change="changeReason"
          placeholder="Nhập lý do"
        >
          <el-option
            v-for="item in ReasonLst"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-input
          v-else
          v-model="form.Reason"
          placeholder="Nhập lý do"
          type="textarea"
          autosize
        ></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian bắt đầu">
            <el-date-picker
              v-model="form.TimeStart"
              style="width:100%"
              type="date"
              :clearable="false"
              placeholder="Chọn ngày"
              :picker-options="OptionsTimeStart"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :lg="12">
          <el-form-item label="Thời gian kết thúc">
            <el-date-picker
              v-model="form.TimeEnd"
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              @change="selectTimeEnd"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <div
        style="margin-left:130px;"
        v-if="listDate.length > 0 && form.Type != 'Nghỉ thai sản'"
      >
        <p
          style="color:red;font-style:italic;margin: 0 0 10px 0px;font-size:10pt"
        >
          Vui lòng chọn thời gian đăng kí !
        </p>
        <div
          v-for="(item, index) in listDate"
          :key="index"
          style="margin-bottom:5px"
        >
          <span
            v-if="item.Index != 0"
            style="font-weight:600;font-size:10pt;margin-right:20px"
            >Thứ {{ item.Index + 1 }}: {{ item.Date }}</span
          >
          <span v-else style="font-size:10pt;font-weight:600;color:red"
            >Chủ nhật: {{ item.Date }}</span
          >
          <!-- item.Index (0->CN;1->T2;2->T3;3->T4;4->T5;5->T6;6->T7) -->
          <!-- Chiều T7, Chủ nhật nghỉ-->

          <!-- <el-radio-group v-model="item.Half" v-if="item.Index != 0">
            <el-radio :label="1">Sáng</el-radio>
            <el-radio :label="2" v-if="item.Index != 6">Chiều</el-radio>
            <el-radio :label="3" v-if="item.Index != 6">Cả ngày</el-radio>
          </el-radio-group>
          <span v-else style="font-size:10pt;font-weight:600;color:red"
            >Chủ nhật !</span
          > -->
          <el-radio-group v-model="item.Half">
            <el-radio :label="1">Sáng</el-radio>
            <el-radio :label="2">Chiều</el-radio>
            <el-radio :label="3">Cả ngày</el-radio>
          </el-radio-group>
        </div>
        <p
          style="color:red;font-style:italic;margin: 0 0 10px 0px;font-size:10pt;font-weight:700"
        >
          Số ngày đăng kí : {{ NumberNP }}
        </p>
      </div>
      <el-form-item label="Ghi chú">
        <el-input v-model="form.Note" type="textarea" autosize></el-input>
      </el-form-item>

      <el-form-item label="Gửi mail đến">
        <el-select
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
    <div style="text-align:center">
      <el-button size="small" type="info" @click="closeModal">Hủy</el-button>
      <el-button
        size="small"
        type="primary"
        icon="el-icon-success"
        @click="creatrMissionNP"
      >
        Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { GetEmailLst } from "@/api/mission";
import { CreateMissionVacation } from "@/api/missionVacation";
import { GetGroupEmployee } from "@/api/groups";
import { getYesterday } from "@/api/index";
export default {
  props: ["row", "typeList"],
  data() {
    return {
      ReasonLst: [
        { value: "Bản thân kết hôn (03 ngày)" },
        {
          value: "Con kết hôn (01 ngày)"
        },
        {
          value: "Vợ sinh con (02 ngày)"
        }
      ],
      options: [],
      emailLst: [],

      value: "",
      form: {
        Reason: "",
        Type: "",
        Note: "",
        TimeStart: "",
        TimeEnd: "",
        IDGroup: "",
        Email: "",
        Detail: "",
        Number: ""
      },
      listDate: [],
      NumberNP: 0,
      lstSelect: [],
      OptionsTimeStart: {
        disabledDate(time) {
          return time.getTime() < getYesterday();
        }
      },
      OptionsTimeEnd: {
        disabledDate(time) {
          return time.getTime() <= this.TimeStart;
        }
      },
      rules: {
        IDGroup: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        Type: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    changeType() {
      this.form.Reason = "";
      if (this.form.Type == 499) {
        this.ReasonLst = this.ReasonLst2;
      }
    },
    changeReason() {
      this.form.TimeStart = Date.parse(
        this.form.TimeStart.toString("yyyy-MM-dd")
      );
      if (this.form.Reason == "Bản thân kết hôn (03 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 3);
        this.form.TimeEnd = a;
      }
      if (this.form.Reason == "Con kết hôn (01 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 1);
        this.form.TimeEnd = a;
      }
      // if (
      //   this.form.Reason ==
      //   "Bố mẹ 2 bên vợ chồng chết; vợ, chồng, con chết (03 ngày )"
      // ) {
      //   var a = new Date(this.form.TimeStart);
      //   a.setDate(this.form.TimeStart.getDate() + 3);
      //   this.form.TimeEnd = a;
      // }
      if (this.form.Reason == "Vợ sinh con (02 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 2);
        this.form.TimeEnd = a;
      }
    },
    closeModal() {
      this.$emit("cancel");
    },
    fetchOffice() {
      this.listLoading = true;
      GetGroupEmployee().then(response => {
        this.options = response.Data;
        this.listLoading = false;
      });
    },
    creatrMissionNP() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let ArrayDate = [];
          this.listDate.forEach(item => {
            if (item.Half > 0) {
              let obj = {
                Date: item.Date,
                Half: item.Half
              };
              ArrayDate.push(obj);
            }
          });
          if (
            this.form.Type != "Nghỉ thai sản" &&
            this.form.Type != "Nghỉ việc" &&
            this.form.Type != "Bàn giao nghỉ việc" &&
            ArrayDate.length == 0
          ) {
            this.$notify({
              title: "Xảy ra lỗi",
              message: "Bạn chưa chọn thời gian",
              type: "error",
              position: "top-left"
            });
            return;
          }
          this.form.Detail =
            ArrayDate.length > 0 ? JSON.stringify(ArrayDate) : "";
          this.form.Email = this.form.Email
            ? this.form.Email.join(";")
            : this.form.Email;
          this.form.TimeStart = Date.parse(this.form.TimeStart).toString(
            "yyyy-MM-dd"
          );
          this.form.TimeStart = this.form.TimeStart + " 00:00:00";
          this.form.TimeEnd = Date.parse(this.form.TimeEnd).toString(
            "yyyy-MM-dd HH:mm:ss"
          );
          this.form.Number = this.NumberNP;
          CreateMissionVacation({ MissionVacationInfo: this.form }).then(
            response => {
              if (response.RespCode == 0) {
                this.$notify({
                  title: "Thành công",
                  message: "Tạo phiếu thành công",
                  type: "success",
                  position: "top-left"
                });
                this.$emit("click-something");
                this.clear();
                this.listLoading = false;
              }
            }
          );
        }
      });
    },
    chooseDate() {
      this.listDate = [];
      var dt1 = new Date(this.form.TimeStart);
      var dt2 = new Date(this.form.TimeEnd);
      var day = Math.floor(
        (Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) -
          Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) /
          (1000 * 60 * 60 * 24)
      );
      for (var i = 0; i <= day; i++) {
        let Day = new Date(
          this.form.TimeStart.getFullYear(),
          this.form.TimeStart.getMonth(),
          this.form.TimeStart.getDate() + i
        );
        let day_convert = Date.parse(Day).toString("dd-MM-yyyy");
        let day_index = Day.getDay();
        this.listDate.push({ Date: day_convert, Half: 0, Index: day_index });
      }
    },
    //Hàm tính số ngày nghỉ
    CaculNP() {
      let NumberNP = 0;
      this.listDate.forEach(item => {
        let count = 0;
        switch (item.Half) {
          case 1:
            count = 0.5;
            break;
          case 2:
            count = 0.5;
            break;
          case 3:
            count = 1;
            break;
          default:
            0;
        }
        NumberNP += count;
      });
      this.NumberNP = NumberNP;
    },
    //kiểm tra ngày kết thúc phải lớn hơn ngày bắt đầu
    selectTimeEnd(val) {
      const TimeE = val.getTime();
      const TimeS = this.form.TimeStart.getTime();
      if (TimeS > TimeE + 86400000) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu !",
          type: "warning"
        });
        this.form.TimeEnd = "";
      }
    },
    clear() {
      this.form.Reason = "";
      (this.form.Type = ""),
        (this.form.Note = ""),
        (this.form.TimeStart = ""),
        (this.form.TimeEnd = ""),
        (this.form.IDGroup = ""),
        (this.form.Email = ""),
        (this.form.Detail = ""),
        (this.listDate = []);
    }
  },
  created() {
    this.fetchOffice();
    this.form.TimeStart = new Date();
    GetEmailLst().then(res => {
      this.emailLst = res.Data;
    });
  },
  mounted() {
    //this.links = this.optionsService();
  },
  watch: {
    "form.TimeStart"() {
      this.chooseDate();
    },
    "form.TimeEnd"() {
      this.chooseDate();
    },
    listDate: {
      deep: true,
      // We have to move our method to a handler field
      handler() {
        this.CaculNP();
      }
    }
  }
};
</script>

<style></style>
