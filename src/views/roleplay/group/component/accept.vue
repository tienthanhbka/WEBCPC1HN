<template>
  <div>
    <div>
      <el-row
        ><el-col :span="12"
          ><span style="font-weight: bold;">Role:</span> {{ row.Title }}
        </el-col>
        <el-col :span="12">
          <span style="font-weight: bold;">Sản phẩm:</span>
          {{ row.Product }}</el-col
        ></el-row
      >
      <el-row
        ><el-col :span="12"
          ><span style="font-weight: bold;">TDV:</span> {{ row.NameEmployee }}
        </el-col>
        <el-col :span="12">
          <span style="font-weight: bold;">Người kiểm tra:</span>
          {{ row.NameTeacher }}</el-col
        ></el-row
      >
      <el-row
        ><el-col :span="12"
          ><span style="font-weight: bold;">Thời gian:</span>
          {{ row.TimeStart }} - {{ row.TimeEnd }}
        </el-col>
        <el-col :span="12"
          ><span style="font-weight: bold;"> Ngày: </span> {{ row.Date }}
        </el-col></el-row
      >
    </div>
    <div>
      <span style="font-weight: bold;">Link 1:</span>
      <a :href="row.Link" target="_blank">{{ row.Link }}</a>
    </div>
    <div>
      <span style="font-weight: bold;">Link 2:</span>
      <a :href="row.Link2" target="_blank">{{ row.Link2 }}</a>
    </div>

    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Nhận xét">
        <el-input v-model="form.CommentAccept"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="modalNoAccept">Không đạt</el-button>
    <el-button type="success" @click="modalAccept">Xác nhận đạt</el-button>
  </div>
</template>
<script>
import { GetGroupEmployee, GetAllEmployeesByIdGroup } from "@/api/groups";
import Cookies from "js-cookie";
import { AcceptRole, NoAcceptRole } from "@/api/roleplay";
export default {
  props: ["row"],
  components: {},
  created() {},

  methods: {
    modalAccept() {
      this.form.RowID = this.$props.row.RowID;
      AcceptRole(this.form).then(res => {
        if (res.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Đánh giá thành công",
            position: "top-left",
            type: "success"
          });
          this.$emit("click", "ok");
        }
      });
    },

    modalNoAccept() {
      this.form.RowID = this.$props.row.RowID;
      NoAcceptRole(this.form).then(res => {
        if (res.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Đánh giá thành công",
            position: "top-left",
            type: "success"
          });
          this.$emit("click", "ok");
        }
      });
    }
  },
  watch: {},
  data() {
    return {
      form: {
        CommentAccept: "",
        RowID: 0
      },
      placeModalVisible: false,
      teacherLst: [],
      proLst: []
    };
  }
};
</script>

<style>
@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
