<template>
  <modal id="delete-target-KPI" ref="delete-target-KPI" v-cloak>
    <template slot="title"
      >Xóa tiêu chí</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="120px" size="mini">
        <div>
          <div class="inline-block">
            <el-form-item label="Điểm KPI">
              <el-input v-model="row.target" type="number"></el-input>
            </el-form-item>
          </div>
          <div style="clear: both;"></div>
        </div>

        <el-form-item label="Tháng">
          <el-date-picker
            v-model="row.month"
            type="month"
            placeholder="Pick a month"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="Ghi chú">
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
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteTarget"
        >Xác nhận</el-button
      >
    </div>
  </modal>
</template>
<script>
import { getEmployee } from "@/api/getEmployee";
import { GetKPIList, DeleteTarget } from "@/api/kpiList";
import Cookies from "js-cookie";
export default {
  props: ["row", "groupList"],
  data() {
    return {
      tableData: [],
      selectedPlace: [],
      listKPICode: [{}],
      listEmployee: [{}],
      value: "",
      form: {},
      links: [],
      state: ""
    };
  },

  methods: {
    closeModal() {
      VoerroModal.hide("delete-target-KPI");
    },
    deleteTarget() {
      this.form = this.$props.row;

      DeleteTarget(this.form).then(response => {
        if (response.ResCode == 0) {
          this.$emit("click-something", this.form);
          VoerroModal.hide("delete-target-KPI");
          this.$notify({
            title: "Thành công",
            message: "Xóa tiêu chí thành công",
            type: "success",
            position: "top-left"
          });
          //alert('Thêm thành công');
          this.listLoading = false;
        }
      });
    }
  }
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
.el-autocomplete {
  width: 500px;
}
</style>
