<template size="mini">
  <div>
    <div style="padding: 5px 0">
      <div class="label-info">
        <b style="width: 120px;">Nhân viên:</b> &nbsp;&nbsp;
        <span style="color: blue;">{{ row.nameEmployee }}</span>
      </div>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <div class="label-info">
            <b style="width: 120px;"> Nhóm việc:</b>&nbsp; &nbsp;{{
              row.Service
            }}
          </div>
        </el-col>
        <el-col :xs="24" :lg="12">
          <div class="label-info">
            <b style="width: 120px;work-break:break-work">Loại việc:</b
            >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {{ row.Name }}
          </div>
        </el-col>
      </el-row>
    </div>
    <el-form
      ref="form"
      class="form-custom"
      label-width="120px"
      size="small"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Khối lượng đích">
            <el-input
              v-model="row.Amount"
              type="number"
              placeholder="VD: Hoàn thành 240 call"
            ></el-input>
            <p>Khối lượng: {{ tCm }}</p>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Đơn vị">
            <el-select v-model="row.Unit" placeholder="Chọn đơn vị">
              <el-option
                v-for="item in units"
                :key="item.OtherId"
                :label="item.Value"
                :value="item.Value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Điểm KPI">
        <div style="display: flex">
          <el-input type="number" v-model="row.Target"></el-input>
          <div style="width: 100%;color: red; margin: auto; font-weight: bold;">
            KPIcs = {{ row.Target }} / {{ row.Amount }} = {{ KPIcs }} (điểm /
            {{ row.Unit }} )
          </div>
        </div>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input v-model="row.Note" placeholder="Nhập ghi chú"></el-input>
      </el-form-item>
    </el-form>

    <div style="text-align:center">
      <el-button type="primary" icon="el-icon-success" @click="editTargetAction"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { GetDefaultValue } from "@/api/default";
import { EditTargetAction } from "@/api/kpiList";
export default {
  props: ["row"],
  data() {
    return {
      KPIcs: 0,
      target: this.$props.row.Target,
      amount: this.$props.row.Amount,
      unit: this.$props.row.Unit,
      groups: "",
      tCm: "",
      value: "",
      form: {
        amount: 0,
        TargetRowID: 0,
        target: 0,
        unit: ""
      },
      units: []
    };
  },

  methods: {
    toCommas(value) {
      if (value != null) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    },
    editTargetAction() {
      if (this.$props.row.Target == 0 || this.$props.row.Amount == 0) {
        this.$notify({
          title: "Lỗi",
          message: "Vui lòng nhập đủ các thông tin",
          type: "warning",
          position: "top-left"
        });
      } else {
        // this.form.RowID= this.$props.row.RowID
        // this.form.amount= this.$props.row.Amount,
        // this.form.target = this.$props.row.Target,
        // this.form.unit = this.$props.row.Unit,
        //console.log(this.form);
        EditTargetAction(this.$props.row).then(response => {
          if (response.ResCode == 0) {
            this.$emit("click-something", this.form);
            //VoerroModal.hide('edit-target-KPIcs');
            this.$notify({
              title: "Thành công",
              message: "Chỉnh sửa tiêu chí thành công",
              type: "success",
              position: "top-left"
            });
            VoerroModal.hide("edit-target-KPIcs");

            this.listLoading = false;
          }
        });
      }
    },
    fetchDefault() {
      GetDefaultValue({ Table: "" }).then(res => {
        if (res.RespCode == 0) {
          let a = [];
          res.OtherLst.forEach(element => {
            if (element.Table == "WorkUnit") {
              a.push(element);
            }
          });
          this.units = a;
        }
      });
    }
  },
  created() {
    //console.log(this.toCommas(1005500))
    this.fetchDefault();
  },
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
      this.KPIcs = this.$props.row.Target / this.$props.row.Amount;
      if (this.$props.row.Amount != "") {
        this.tCm = this.toCommas(this.$props.row.Amount);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.label-info {
  width: 100%;
  color: grey;
  margin: auto;
  font-size: 14px;
  padding: 10px 0;
}
</style>
