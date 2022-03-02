<template>
  <modal id="create-mission-vacation" ref="create-mission-vacation" v-cloak>
    <template slot="title"
      >Tạo phiếu nghỉ phép/ làm bù</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="130px" size="mini">
        <el-form-item label="Bộ phận">
          <el-select required="" v-model="form.IDGroup" placeholder="Chọn nhóm">
            <el-option
              v-for="item in options"
              :key="item.idGroup"
              :label="item.idGroup"
              :value="item.idGroup"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Loại giấy">
          <el-select
            v-model="form.Type"
            @change="changeType"
            placeholder="Chọn mã"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item required=""  label="Lý do">
                  <el-input type="textarea"
  :rows="2" v-model="form.Reason" ></el-input>
                </el-form-item> -->

        <el-form-item label="Lý do">
          <el-select
            v-model="form.Reason"
            filterable
            allow-create
            default-first-option
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
        </el-form-item>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Thời gian bắt đầu">
                <el-date-picker
                  v-model="form.TimeStart"
                  type="date"
                  placeholder="Chọn ngày"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Thời gian kết thúc">
                <el-date-picker
                  v-model="form.TimeEnd"
                  type="date"
                  placeholder="Chọn ngày"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-radio v-model="form.Half" label="1">Sáng</el-radio>
          <el-radio v-model="form.Half" label="2">Chiều</el-radio>
          <el-radio v-model="form.Half" label="0">Cả ngày</el-radio>
        </div>
        <el-form-item label="Ghi chú">
          <el-input v-model="form.Note"></el-input>
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

        <!-- <el-switch
                    v-model="autoKPI"
                    active-text="Lấy tự động"
                    inactive-text="Không lấy tự động">
                  </el-switch> -->
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="creatrMissionNP"
        >Thêm</el-button
      >
    </div>
  </modal>
</template>
<script>
import { CreateMissionVacation, GetEmailLst } from "@/api/mission";
import { GetGroupEmployee } from "@/api/groups";
import Cookies from "js-cookie";
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
          value: "Bố mẹ 2 bên vợ chồng chết; vợ, chồng, con chết (03 ngày )"
        },
        {
          value: "Vợ sinh con (02 ngày)"
        },
        {
          value: "Đi công tác trong và ngoài nước"
        }
      ],
      ReasonLst2: [
        {
          value: "Đi khám thai"
        },
        {
          value: "Sinh con"
        },
        {
          value: "Dưỡng sức, phục hồi sức khỏe sau thai sản"
        }
      ],
      options: [],
      emailLst: [],
      tableData: [],
      code: 0,
      autoKPI: false,
      selectedPlace: [],
      Units: [
        {
          unit: "min",
          label: "phút"
        },
        {
          unit: "hour",
          label: "giờ"
        },
        {
          unit: "day",
          label: "ngày"
        },
        {
          unit: "week",
          label: "tuần"
        },
        {
          unit: "month",
          label: "tháng"
        }
      ],
      value: "",
      actionOK: "",
      form: {
        Reason: "",
        Half: "0",
        Type: "",
        Note: "",
        TimeStart: "",
        TimeEnd: "",
        IDGroup: "",
        Email: []
      }
    };
  },

  methods: {
    changeType() {
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
      if (
        this.form.Reason ==
        "Bố mẹ 2 bên vợ chồng chết; vợ, chồng, con chết (03 ngày )"
      ) {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 3);
        this.form.TimeEnd = a;
      }
      if (this.form.Reason == "Vợ sinh con (02 ngày)") {
        var a = new Date(this.form.TimeStart);
        a.setDate(this.form.TimeStart.getDate() + 2);
        this.form.TimeEnd = a;
      }
    },
    closeModal() {
      VoerroModal.hide("create-mission-vacation");
    },
    fetchOffice() {
      this.listLoading = true;
      GetGroupEmployee().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },
    creatrMissionNP() {
      //alert('ok')
      this.form.TimeStart.setHours(this.form.TimeStart.getHours() + 7);
      this.form.TimeEnd.setHours(this.form.TimeStart.getHours() + 7);
      CreateMissionVacation(this.form).then(response => {
        if (response.ResCode == 0) {
          //console.log(response.ResCode);
          this.$notify({
            title: "Thành công",
            message: "Tạo phiếu thành công",
            type: "success",
            position: "top-left"
          });

          this.$emit("click-something", "OK");
          VoerroModal.hide("create-mission-vacation");
          this.listLoading = false;
        }
      });
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
  }
  // watch: {
  //   employee:function(){

  //     GetPlaceByIdEmployee({idEmployee:this.employee.idEmployee}).then(res=>{
  //         console.log(res);
  //         this.tableData = res.Data;
  //     })
  //   }
  // },
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
.el-select {
  display: inline-block;
  position: relative;
  width: 100%;
}
</style>
