<template>
  <modal id="new-action-modal" ref="new-action-modal" v-cloak>
    <template slot="title"
      >Tạo mới loại công việc</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="130px" size="mini">
        <!-- <el-form-item label="Bộ phận">
                  <el-select v-model="value" placeholder="Select" @change="changeGroup">
                    <el-option
                      v-for="item in options"
                      :key="item.idGroup"
                      :label="item.idGroup"
                      :value="item.idGroup">
                    </el-option>
                  </el-select>
                </el-form-item> -->
        <!-- <el-form-item label="Mã dịch vụ">
                  <el-input v-model="form.Name" ></el-input>
                </el-form-item> -->
        <!-- <el-form-item  label="Mã">
                  <el-input v-model="row.ServiceCode" ></el-input>
                </el-form-item> -->
        <el-form-item required="" label="Nhóm việc">
          <el-input :disabled="true" v-model="row.Service"></el-input>
        </el-form-item>
        <el-form-item required="" label="Loại việc">
          <el-input v-model="form.Name"></el-input>
        </el-form-item>

        <el-form-item label="KPIcs">
          <el-row :gutter="10">
            <el-col :xs="24" :sm="8" :lg="8">
              <el-input v-model="nKPI" placeholder="Nhập KPI"></el-input>
            </el-col>
            <el-col :xs="24" :sm="1" :lg="1">
              <i class="fas fa-divide"></i>
            </el-col>
            <el-col :xs="24" :sm="7" :lg="7">
              <el-input
                v-model="nWork"
                placeholder="Nhập khối lượng công việc"
              ></el-input>
            </el-col>
            <el-col :xs="24" :sm="1" :lg="1">
              <i class="fas fa-equals"></i>
            </el-col>
            <el-col :xs="24" :sm="7" :lg="7">
              <el-input
                v-model="form.KPI"
                placeholder="KPIcs"
                disabled
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <div>
          <el-row>
            <el-col :span="12">
              <el-form-item label="Thời gian xử lý">
                <el-input v-model="form.Deadline"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="Đơn vị thời gian xử lý">
                <el-select v-model="value" placeholder="Select">
                  <el-option
                    v-for="item in Units"
                    :key="item.unit"
                    :label="item.label"
                    :value="item.unit"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <el-form-item label="Ghi chú">
          <el-input v-model="form.Note"></el-input>
        </el-form-item>
        <el-form-item label="Lỗi">
          <el-input v-model="form.Error"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Mức lỗi">
              <el-input
                min="1"
                type="number"
                v-model="form.LevelError"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Điểm phạt cs">
              <el-input
                max="0"
                type="number"
                v-model="form.PenatyScore"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Mã công việc hệ thống">
          <el-select v-model="form.code" placeholder="Chọn mã">
            <el-option
              v-for="item in codeWork"
              :key="item.WorkID"
              :label="item.Description"
              :value="item.WorkID"
            >
              <span style="float: left">{{ item.Description }}</span>
              <span style="float: right; color: #8492a6; font-size: 10px">{{
                item.Unit
              }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-switch
          v-model="autoKPI"
          active-text="Lấy tự động"
          inactive-text="Không lấy tự động"
        >
        </el-switch>
        <el-switch
          style="float:right"
          v-model="form.KPIsChoice"
          :active-value="1"
          :inactive-value="0"
          active-text="Điều chỉnh KPIcs khi giao kết"
        >
        </el-switch>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createAction"
        >Thêm</el-button
      >
    </div>
  </modal>
</template>
<script>
import {
  setOrder,
  getOffice,
  createOrderSend,
  getService,
  createServiceDefine,
  createAction
} from "@/api/order";
import Cookies from "js-cookie";
export default {
  props: ["row", "options", "groups", "codeWork"],
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
      //  options: [{
      // }],
      optionsService: [{}],
      value: "",
      actionOK: "",
      form: {
        KPI: 0,
        Deadline: 0,
        auto: 0,
        code: 0,
        Unit: "",
        IDService: "",
        Note: "",
        Name: "",
        CodeAction: "",
        Error: "",
        LevelError: 0,
        PenatyScore: 0,
        IDEmployee: Cookies.get("idEmployee"),
        groups: this.$props.groups,
        KPIsChoice: 1
      },
      nKPI: "",
      nWork: ""
    };
  },

  methods: {
    // fetchOffice() {
    //   this.listLoading = true;
    //   getOffice().then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false;
    //   });
    // },

    closeModal() {
      VoerroModal.hide("new-action-modal");
    },
    createAction() {
      if (this.autoKPI == true) {
        this.form.auto = 1;
      } else {
        this.form.auto = 0;
      }
      this.form.IDService = this.$props.row.IDService;
      // this.form.KPI = this.$props.row.KPI;
      this.form.CodeAction = this.$props.row.ServiceCode;
      this.form.Unit = this.value;
      //console.log(this.form);
      createAction(this.form).then(response => {
        if (response.ResCode == 0) {
          this.actionOK = response.Data;
          //console.log(response.ResCode);
          this.$notify({
            title: "Thành công",
            message: "Tạo công việc thành công",
            type: "success",
            position: "top-left"
          });

          this.$emit("click-something", this.actionOK);
          VoerroModal.hide("new-action-modal");
          this.listLoading = false;
        }
      });
    },
    //Tính KPIcs = KPI/Klg công việc
    CaculKPI() {
      if (this.nKPI && this.nWork) {
        let Amount = Number.parseFloat(this.nKPI / this.nWork).toFixed(3);
        this.form.KPI = Amount;
      } else {
        this.form.KPI = 0;
      }
    }
  },
  created() {
    //this.fetchOffice();
  },
  mounted() {
    //this.links = this.optionsService();
  },
  watch: {
    nKPI() {
      this.CaculKPI();
    },
    nWork() {
      this.CaculKPI();
    }
  }
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
