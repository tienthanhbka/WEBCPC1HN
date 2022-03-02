<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-width="120px"
      size="small"
      label-position="left"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Điểm KPI">
            <el-input v-model="row.target" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="KPI tối đa">
            <el-input v-model="row.KPImax" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Tháng">
        <el-date-picker
          style="width:100%"
          v-model="row.month"
          type="month"
          placeholder="Chọn tháng..."
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item label="Mô tả chi tiết">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="row.note"
        ></el-input>
      </el-form-item>

      <el-form-item label="Quản lý duyệt">
        <el-select v-model="row.idGroupBase" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
        <div style="font-size: 10pt;">
          <p style="color:red;font-weight:700;margin:0">
            Lưu ý: Chọn đúng nhóm của quản lý trực tiếp
          </p>
          <p style="margin: 0">- Nhân viên thì Giám sát bán hàng duyệt</p>
          <p style="margin: 0">- Giám sát bán hàng thì Quản lý khu vực duyệt</p>
          <p style="margin: 0">- Quản lý khu vực thì Giám đốc duyệt</p>
        </div>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" icon="el-icon-success" @click="editTarget"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { EditTarget } from "@/api/kpiList";
export default {
  props: ["row", "groupList"],
  data() {
    return {
      form: {}
    };
  },

  methods: {
    editTarget() {
      this.form = this.$props.row;
      EditTarget(this.form).then(response => {
        if (response.ResCode == 0) {
          this.$emit("click-something", this.form);
          VoerroModal.hide("edit-target-KPI");
          this.$notify({
            title: "Thành công",
            message: "Cập nhật tiêu chí thành công",
            type: "success",
            position: "top-left"
          });
          this.listLoading = false;
        }
      });
    }
  },
  created() {}
};
</script>

<style>
.modal-box {
  /* min-width: 75%; */
  /* width: 80%; */
  max-width: 40%;
}
</style>
