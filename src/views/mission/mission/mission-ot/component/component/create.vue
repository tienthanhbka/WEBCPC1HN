<template>
  <div>
    <el-form
      class="custom-form"
      ref="form"
      label-position="top"
      label-width="130px"
      size="mini"
    >
      <el-form-item label="Bộ phận">
        <el-select
          style="width:100%"
          required=""
          v-model="form.GroupID"
          placeholder="Chọn nhóm"
        >
          <el-option
            v-for="item in groupLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Chọn thời gian">
        <choose-date @addDate="addDate" :row="form"></choose-date>
      </el-form-item>
      <el-form-item label="Thời gian đã chọn">
        <div v-if="form.OverTimeLineLst.length > 0">
          <ul v-for="(item, index) in form.OverTimeLineLst" :key="index">
            <li>
              {{ Date.parse(item.TimeStart).toString("HH:mm dd/MM/yyyy") }} -
              {{ Date.parse(item.TimeEnd).toString("HH:mm dd/MM/yyyy") }}

              <i
                @click="deleteDate(index)"
                style="color:red;cursor:pointer;"
                class="fas fa-backspace"
              ></i>
            </li>
          </ul>
          <span class="total-time">Số giờ đăng kí: {{ totalTime }} giờ</span>
        </div>
        <div class="blank-data" v-else>Vui lòng chọn thời gian</div>
      </el-form-item>
      <el-form-item label="Lý do">
        <el-input
          v-model="form.Reason"
          placeholder="Nhập lý do"
          type="textarea"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input v-model="form.Note" type="textarea" autosize></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="text-align:center">
      <el-button type="info" size="small" @click="cancel">Hủy</el-button>
      <el-button
        v-if="mode == 0 || mode == 2"
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
import {
  CreateDocOverTime,
  UpdateDocOverTime,
  AppproveDocOverTime
} from "@/api/mission";
import { GetGroupEmployee } from "@/api/groups";
import Cookies from "js-cookie";
import ChooseDate from "./chooseDate";
export default {
  props: ["row", "mode"],
  components: {
    ChooseDate
  },
  data() {
    return {
      groupLst: [],
      totalTime: 0,
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
      }
    };
  },

  methods: {
    cancel() {
      this.$emit("closeDialog");
    },
    submit() {
      this.form.EmployeeID = Cookies.get("idEmployee");
      this.form.EmployeeCode = Cookies.get("idEmployee");
      if (!this.form.GroupID) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Bạn chưa chọn nhóm",
          type: "error"
        });
        return;
      }
      if (this.form.OverTimeLineLst.length > 0) {
        if (this.row) {
          UpdateDocOverTime({ OverTimeHeaderInfo: this.form }).then(res => {
            if (res.RespCode === 0) {
              this.$notify({
                title: "Thành công",
                message: "Cập nhật phiếu tăng ca thành công",
                type: "success"
              });
              this.$emit("addOK");
            }
          });
        } else {
          CreateDocOverTime({ OverTimeHeaderInfo: this.form }).then(res => {
            if (res.RespCode === 0) {
              this.$notify({
                title: "Thành công",
                message: "Tạo phiếu tăng ca thành công",
                type: "success"
              });
              this.$emit("addOK");
            }
          });
        }
      } else {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Bạn chưa chọn thời gian",
          type: "error"
        });
      }
    },
    approve() {
      AppproveDocOverTime(req).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: "Duyệt phiếu tăng ca thành công",
            type: "success"
          });
          this.$emit("addOK");
        }
      });
    },
    addDate(date) {
      this.form.OverTimeLineLst.push(date);
    },
    deleteDate(index) {
      this.form.OverTimeLineLst.splice(index, 1);
    },
    fetchGroup() {
      GetGroupEmployee().then(res => {
        this.groupLst = res.Data;
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
    this.fetchGroup();
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
          // let sum = 0;
          // this.form.OverTimeLineLst.forEach(item => {
          //   sum += item.QuantityHour;
          // });
          this.totalTime = this.form.OverTimeLineLst.reduce(
            (accumulator, currentValue) =>
              accumulator + currentValue.QuantityHour,
            0
          );
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
</style>
