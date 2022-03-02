<template>
  <div>
    <el-form
      ref="form"
      :model="IdeaInfor"
      label-position="top"
      label-width="200px"
      size="mini"
    >
      <div style="margin-bottom:20px;">Ý tưởng: {{ idea.IdeaName }}</div>
      <el-form-item size="large">
        <el-button type="danger" v-if="idea != null" @click="onSubmit"
          >Xóa ý tưởng</el-button
        >
        <el-button @click="cancelde">Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { RemoveIdeaInfo } from "@/api/idea";
import Cookies from "js-cookie";
export default {
  props: ["idea"],
  created() {},
  data() {
    return {
      ActiveElement: [],
      IdeaInfor: {
        IdeaName: "",
        IdeaContent: "",
        ActiveElement: "",
        Preparation: "",
        MoreInfo: ""
      }
    };
  },
  methods: {
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        DocumentId: this.idea.DocumentId
      };
      RemoveIdeaInfo(rep).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Xóa ý tưởng thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("delIdeaOK", this.IdeaInfor);
      });
    },
    cancelde() {
      this.$emit("deletecancelOK");
    }
  }
};
</script>
<style>
@media screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 95%;
  }
}
</style>
