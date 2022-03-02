<template>
  <div>
    <el-form
      class="custom-form"
      ref="form"
      label-position="top"
      label-width="130px"
      size="mini"
    >
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Nhân viên">
            <el-input
              class="selectIDGroup"
              disabled
              v-model="form.EmployeeName"
              placeholder="Nhân viên"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Số điện thoại">
            <el-input
              disabled
              class="selectIDGroup"
              v-model="form.EmployeeID"
              placeholder="Số điện thoại"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Nhóm">
            <el-input
              disabled
              class="selectIDGroup"
              v-model="form.GroupID"
              placeholder="Nhóm"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Chức danh">
            <el-input
              disabled
              class="selectIDGroup"
              v-model="form.Position"
              placeholder="Chức danh"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Thời gian đăng kí">
        <div v-if="form.OverTimeLineLst.length > 0">
          <ul v-for="(item, index) in form.OverTimeLineLst" :key="index">
            <li>
              {{ Date.parse(item.TimeStart).toString("HH:mm dd/MM/yyyy") }} -
              {{ Date.parse(item.TimeEnd).toString("HH:mm dd/MM/yyyy") }}
            </li>
          </ul>
          <span class="total-time">Số giờ đăng kí: {{ totalTime }} giờ</span>
        </div>
        <div class="blank-data" v-else>Vui lòng chọn thời gian</div>
      </el-form-item>
      <el-form-item label="Lý do">
        <el-input
          disabled
          class="selectIDGroup"
          v-model="form.Reason"
          placeholder="Nhập lý do"
          type="textarea"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input
          disabled
          class="selectIDGroup"
          v-model="form.Note"
          type="textarea"
          autosize
        ></el-input>
      </el-form-item>
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Thời gian tạo">
            <el-input
              disabled
              class="selectIDGroup"
              v-model="form.TimeCreate"
              placeholder="Thời gian tạo"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item label="Trạng thái">
            <div class="status" :style="statusStyle">
              {{ form.Status | OTStatusText }}
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="mode === 3">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item>
            <span class="title-custom" slot="label">Phê duyệt</span>
            <el-select
              style="width:100%"
              class="selectIDGroup"
              required=""
              v-model="Status"
              placeholder="Chọn kết quả"
            >
              <el-option
                v-for="item in statusLst"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item>
            <span class="title-custom" slot="label">Ghi chú</span>
            <el-input
              class="selectIDGroup"
              v-model="Note"
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40" v-if="mode !== 3">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item v-if="form.ManagerName">
            <span class="title-custom" slot="label">Người duyệt</span>
            <el-input
              class="selectIDGroup"
              disabled
              v-model="form.ManagerName"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-form-item v-if="form.ManagerName">
            <span class="title-custom" slot="label">Ghi chú</span>
            <el-input
              class="selectIDGroup"
              disabled
              v-model="form.ManagerNote"
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item v-if="form.ManagerName && mode !== 3">
        <span class="title-custom" slot="label">Thời gian duyệt</span>
        <el-input
          class="selectIDGroup"
          disabled
          v-model="form.TimeAccept"
          type="textarea"
          autosize
        ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="info" size="small" @click="cancel">Đóng</el-button>
      <el-button
        v-if="mode == 3"
        type="primary"
        size="small"
        icon="el-icon-success"
        @click="submit"
      >
        Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { AppproveDocOverTime } from "@/api/mission";
import Cookies from "js-cookie";
export default {
  props: ["row", "mode"],
  components: {},
  filters: {
    OTStatusText(val) {
      if (val == 0) {
        return "Đã hủy";
      }
      if (val == 1) {
        return "Mới tạo";
      }
      if (val == 2) {
        return "Không duyệt";
      }
      if (val == 3) {
        return "Đã duyệt";
      }
    },
    OTStatusColor(val) {
      if (val == 0) {
        return "danger";
      }
      if (val == 1) {
        return "primary";
      }
      if (val == 2) {
        return "info";
      }
      if (val == 3) {
        return "success";
      }
    }
  },
  data() {
    return {
      totalTime: 0,
      statusStyle: "",
      Status: "",
      Note: "",
      form: {
        DocumentID: "",
        EmployeeID: "",
        EmployeeName: "",
        Office: "",
        EmployeeCode: "",
        Position: "",
        GroupID: "",
        TimeCreate: "",
        TimeAccept: "",
        Reason: "",
        Note: "",
        Status: "",
        ManagerName: "",
        ManagerID: "",
        ManagerNote: "",
        OverTimeLineLst: []
      },
      statusLst: [
        {
          value: 3,
          label: "Đồng ý"
        },
        {
          value: 2,
          label: "Không đồng ý"
        }
      ]
    };
  },

  methods: {
    cancel() {
      this.$emit("closeDialogDetail");
    },
    submit() {
      const req = {
        DocumentID: this.form.DocumentID,
        Status: this.Status,
        Note: this.Note
      };
      AppproveDocOverTime(req).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: "Duyệt phiếu tăng ca thành công",
            type: "success"
          });
          this.$emit("approveOK");
        }
      });
    },
    initData() {
      if (this.row) {
        (this.form.DocumentID = this.row.DocumentID),
          (this.form.EmployeeID = this.row.EmployeeID),
          (this.form.EmployeeName = this.row.EmployeeName),
          (this.form.Office = this.row.Office),
          (this.form.EmployeeCode = this.row.EmployeeCode),
          (this.form.Position = this.row.Position),
          (this.form.GroupID = this.row.GroupID),
          (this.form.TimeCreate = this.row.TimeCreate),
          (this.form.TimeAccept = this.row.TimeAccept),
          (this.form.Reason = this.row.Reason),
          (this.form.Note = this.row.Note),
          (this.form.Status = this.row.Status),
          (this.form.ManagerName = this.row.ManagerName),
          (this.form.ManagerID = this.row.ManagerID),
          (this.form.ManagerNote = this.row.ManagerNote),
          (this.form.OverTimeLineLst = this.row.OverTimeLineLst);
        if (this.row.Status === 0) {
          this.statusStyle =
            "color:#F56C6C;background-color:#fef0f0;border-color: #fde2e2;";
        }
        if (this.row.Status === 1) {
          this.statusStyle =
            "color:#409EFF;background-color:#ecf5ff;border-color: #d9ecff;";
        }
        if (this.row.Status === 2) {
          this.statusStyle =
            "color:#909399;background-color:#f4f4f5;border-color: #e9e9eb;";
        }
        if (this.row.Status === 3) {
          this.statusStyle =
            "color:#67C23A;background-color:#e1f3d8;border-color: #e1f3d8;";
        }
      } else {
        (this.form.DocumentID = ""),
          (this.form.EmployeeID = ""),
          (this.form.EmployeeName = ""),
          (this.form.Office = ""),
          (this.form.EmployeeCode = ""),
          (this.form.Position = ""),
          (this.form.GroupID = ""),
          (this.form.TimeCreate = ""),
          (this.form.TimeAccept = ""),
          (this.form.Reason = ""),
          (this.form.Note = ""),
          (this.form.Status = ""),
          (this.form.ManagerName = ""),
          (this.form.ManagerID = ""),
          (this.form.ManagerNote = ""),
          (this.form.OverTimeLineLst = []);
      }
    }
  },
  created() {
    this.initData();
  },
  computed: {},
  mounted() {},
  watch: {
    "form.OverTimeLineLst"() {
      if (this.form.OverTimeLineLst.length > 0) {
        if (this.form.OverTimeLineLst.length === 1) {
          this.totalTime = this.form.OverTimeLineLst[0].QuantityHour;
        } else {
          let sum = 0;
          this.form.OverTimeLineLst.forEach(item => {
            sum += item.QuantityHour;
          });
          this.totalTime = sum;
        }
      }
    },
    row() {
      this.initData();
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-form .el-form-item {
  .el-form-item__label {
    font-size: 10pt;
  }
}
.blank-data {
  width: 100%;
  height: 100px;
  border: 1px dashed #ccc;
  color: #a4b0be;
  height: 100px;
  font-size: 22px;
  text-align: center;
  line-height: 100px;
}
.total-time {
  font-size: 10pt;
  color: red;
  font-style: italic;
}
.status {
  text-align: center;
  border: 1px solid transparent;
}
.title-custom {
  color: #388e3c;
  font-weight: 600;
  font-size: 10pt;
}
</style>
