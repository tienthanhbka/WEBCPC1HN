<template>
  <modal id="confirm-mission-vacation" ref="confirm-mission-vacation" v-cloak>
    <template slot="title"
      >Duyệt phiếu nghỉ phép/ làm bù</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="130px" size="mini">
        <el-form-item label="Bộ phận">
          <el-select required="" v-model="row.IDGroup" placeholder="Chọn nhóm">
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
          <el-select v-model="row.Type" placeholder="Chọn mã">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.value"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item required="" label="Lý do">
          <el-input v-model="row.Reason"></el-input>
        </el-form-item>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Thời gian bắt đầu">
                <el-date-picker
                  v-model="row.TimeStart"
                  type="date"
                  placeholder="Chọn ngày"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Thời gian kết thúc">
                <el-date-picker
                  v-model="row.TimeEnd"
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
          <el-input v-model="row.Note"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Không đồng ý</el-button>
      <el-button type="success" icon="el-icon-success" @click="editMission"
        >Đồng ý</el-button
      >
    </div>
  </modal>
</template>
<script>
import { ConfirmMissionVacation } from "@/api/mission";
import { GetGroupEmployee } from "@/api/groups";
import Cookies from "js-cookie";
export default {
  props: ["row", "typeList"],
  data() {
    return {
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

      options: [{}],
      value: "",
      actionOK: "",
      form: {
        Reason: "",
        Type: "",
        Note: "",
        TimeStart: "",
        TimeEnd: "",
        IDGroup: "",
        Half: "0"
      }
    };
  },

  methods: {
    closeModal() {
      VoerroModal.hide("confirm-mission-vacation");
    },
    fetchOffice() {
      this.listLoading = true;
      GetGroupEmployee().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false;
      });
    },
    editMission() {
      ConfirmMissionVacation(this.$props.row).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Duyệt phiếu thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", "OK");
          VoerroModal.hide("confirm-mission-vacation");
          this.listLoading = false;
        }
        this.$props.row.Status = 3;
      });
    }
  },
  created() {
    this.fetchOffice();
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

@media only screen and (max-width: 600px) {
  .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 100%;
  }
}
</style>
