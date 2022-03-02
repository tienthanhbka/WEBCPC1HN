<template size="mini">
  <modal id="del-target-KPIcs" ref="del-target-KPIcs" v-cloak>
    <template slot="title"
      >Xóa KPI cơ sở (KPIcs)
    </template>

    <div slot="body">
      <div>
        <div style="width: 100%;color: grey; margin: auto;font-size: 14px; ">
          <b style="width: 120px;">Nhân viên:</b> &nbsp;&nbsp;
          <span style="color: blue;">{{ row.nameEmployee }}</span>
        </div>
        <div style="width: 100%;color: grey; margin: auto;font-size: 14px; ">
          <b style="width: 120px;"> Nhóm việc:</b>&nbsp; &nbsp;{{ row.Service }}
        </div>
        <div style="width: 100%;color: grey; margin: auto;font-size: 14px; ">
          <b style="width: 120px;">Loại việc:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          {{ row.Name }}
        </div>

        <el-form
          style="margin-top:10px;"
          ref="form"
          label-position="top"
          label-width="150px"
          size="mini"
        >
          <el-row>
            <el-col :span="11">
              <el-form-item label="Khối lượng đích">
                <el-input
                  v-model="row.Amount"
                  type="number"
                  placeholder="VD: Hoàn thành 240 call"
                ></el-input>
              </el-form-item>
              <p>Khối lượng: {{ tCm }}</p>
            </el-col>

            <el-col style="margin-left: 10px;" :span="12">
              <el-form-item label="Đơn vị">
                <el-input v-model="row.Unit" placeholder="VD: call"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="11">
              <el-form-item label="Điểm KPI">
                <el-input type="number" v-model="row.Target"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style="clear: both;"></div>
      <div style="width: 100%;color: red; margin: auto; font-weight: bold;">
        KPIcs = {{ row.Target }} / {{ row.Amount }} = {{ KPIcs }} (điểm /
        {{ row.Unit }} )
      </div>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="delTargetAction"
        >Xác nhận</el-button
      >
    </div>
  </modal>
</template>
<script>
import { getEmployee } from "@/api/getEmployee";
import {
  GetKPIList,
  DelTargetAction,
  GetKPIListByGroupEmployee
} from "@/api/kpiList";
import Cookies from "js-cookie";
import { GetGroupEmployee } from "@/api/groups";
export default {
  props: ["row"],
  data() {
    return {
      tableData: [],
      KPIcs: 0,
      target: this.$props.row.Target,
      amount: this.$props.row.Amount,
      unit: this.$props.row.Unit,
      selectedPlace: [],
      listKPICode: [{}],
      groups: "",
      tCm: "",
      groupBase: "",
      listEmployee: [{}],
      value: "",
      form: {
        amount: 0,
        TargetRowID: 0,
        target: 0,
        unit: ""
      },
      links: [],
      state: ""
    };
  },

  methods: {
    closeModal() {
      VoerroModal.hide("del-target-KPIcs");
    },
    toCommas(value) {
      if (value != null) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    delTargetAction() {
      DelTargetAction(this.$props.row).then(response => {
        if (response.ResCode == 0) {
          this.$emit("click-something", this.form);
          //VoerroModal.hide('del-target-KPIcs');
          this.$notify({
            title: "Thành công",
            message: "Chỉnh sửa tiêu chí thành công",
            type: "success",
            position: "top-left"
          });
          VoerroModal.hide("del-target-KPIcs");

          this.listLoading = false;
        }
      });
    }
  },
  created() {},
  watch: {
    function() {
      this.KPIcs = this.$props.row.Target / this.$props.row.Amount;
      if (this.$props.row.Amount != "") {
        this.tCm = this.toCommas(this.$props.row.Amount);
      }
    }
  },
  computed: {
    function() {
      //alert("ok");
      this.KPIcs = this.$props.row.Target / this.$props.row.Amount;
      //this.tCm = this.toCommas(this.$props.row.Amount)
      if (this.$props.row.Amount != "") {
        this.tCm = this.toCommas(this.$props.row.Amount);
      }
      // this.$props.row.Amount = this.toCommas(this.$props.row.Amount)
    }
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 100%;
  }
}
</style>
