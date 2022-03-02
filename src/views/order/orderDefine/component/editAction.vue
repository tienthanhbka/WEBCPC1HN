<template>
  <modal id="edit-action-modal" ref="edit-action-modal" v-cloak>
    <template slot="title"
      >Chỉnh sửa loại công việc</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="130px" size="mini">
        <el-form-item label="Mã">
          <el-input v-model="row.CodeAction"></el-input>
        </el-form-item>
        <el-form-item label="Công việc">
          <el-input v-model="row.Name"></el-input>
        </el-form-item>
        <el-form-item label="KPIcs (VD: làm 1 đơn hàng được 3đ KPI)">
          <el-input v-model="row.KPI"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Thời gian xử lý">
              <el-input v-model="row.Deadline"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Đơn vị thời gian xử lý">
              <el-select v-model="row.Unit" placeholder="Select">
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
        <el-form-item label="Ghi chú">
          <el-input v-model="row.Note"></el-input>
        </el-form-item>
        <el-form-item label="Lỗi">
          <el-input v-model="row.Error"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="Mức lỗi">
              <el-input
                min="1"
                type="number"
                v-model="row.LevelError"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Điểm phạt cs">
              <el-input
                max="0"
                type="number"
                v-model="row.PenatyScore"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="Mã công việc hệ thống">
          <el-select v-model="row.CodeWork" placeholder="Chọn mã">
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
          v-model="row.KPIsChoice"
          :active-value="1"
          :inactive-value="0"
          active-text="Điều chỉnh KPIcs khi giao kết"
        >
        </el-switch>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="danger" @click="LockUp">Khóa chỉnh sửa</el-button>
      <el-button type="warning" icon="el-icon-success" @click="LockOff"
        >Bỏ khóa</el-button
      >
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="editAction"
        >Xác nhận</el-button
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
  editAction,
  lockUp,
  lockOff
} from "@/api/order";
import Cookies from "js-cookie";
export default {
  props: ["row", "options", "codeWork"],
  data() {
    return {
      tableData: [],
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
      optionsService: [{}],
      value: "",
      form: {
        KPI: 0,
        Deadline: 0,
        IDService: "",
        code: "",
        auto: false,
        Note: "",
        Name: "",
        CodeAction: "",
        IDAction: 0,
        IDEmployee: Cookies.get("idEmployee"),
        Status: "",
        Unit: "",
        KPIsChoice: 1
      }
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
    LockUp() {
      this.form.IDAction = this.$props.row.IDAction;
      this.form.IDService = this.$props.row.IDService;
      this.form.Status = 10;
      lockUp(this.form).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Khóa chỉnh sửa thành công",
            type: "success",
            position: "top-left"
          });
          this.$props.row.Status = 2;
          this.$emit("click-something", this.form);
          VoerroModal.hide("edit-action-modal");
          this.listLoading = false;
        }
      });
    },
    LockOff() {
      this.form.IDAction = this.$props.row.IDAction;
      this.form.IDService = this.$props.row.IDService;
      this.form.Status = 2;
      lockOff(this.form).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Mở khóa chỉnh sửa thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", this.form);
          VoerroModal.hide("edit-action-modal");
          this.listLoading = false;
        }
      });
    },
    closeModal() {
      VoerroModal.hide("edit-action-modal");
    },
    editAction() {
      if (this.$props.row.Status == 10) {
        this.$notify({
          title: "Không thể chỉnh sửa",
          message: "Nhóm việc đã ở trạng thái chốt",
          type: "warning",
          position: "top-left"
        });
      } else if (this.$props.row.Status < 10) {
        if (this.autoKPI == true) {
          this.form.auto = 1;
        } else {
          this.form.auto = 0;
        }
        this.form.IDAction = this.$props.row.IDAction;
        this.form.IDService = this.$props.row.IDService;
        this.form.KPI = this.$props.row.KPI;
        this.form.CodeAction = this.$props.row.CodeAction;
        this.form.Deadline = this.$props.row.Deadline;
        this.form.Name = this.$props.row.Name;
        this.form.Note = this.$props.row.Note;
        this.form.Error = this.$props.row.Error;
        this.form.LevelError = this.$props.row.LevelError;
        this.form.PenatyScore = this.$props.row.PenatyScore;
        this.form.Unit = this.$props.row.Unit;
        this.form.code = this.$props.row.CodeWork;
        this.form.KPIsChoice = this.$props.row.KPIsChoice
          ? this.$props.row.KPIsChoice
          : 0;

        //this.form.auto = this.$props.row.Auto;
        //console.log(this.form);
        editAction(this.form).then(response => {
          if (response.ResCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Chỉnh sửa công việc thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("click-something", this.form);
            VoerroModal.hide("edit-action-modal");
            this.listLoading = false;
          }
        });
      }
    }
  },
  created() {
    //this.fetchOffice();
    //console.log(this.$props.row);
  },
  mounted() {
    //this.links = this.optionsService();
  },
  watch: {
    function() {
      if (this.$props.row.Auto == 1) {
        this.autoKPI = true;
      } else {
        this.autoKPI = false;
      }
    }
  },
  computed: {
    function() {
      if (this.$props.row.Auto == 1) {
        this.autoKPI = true;
      } else {
        this.autoKPI = false;
      }
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
