<template>
  <div>
    <el-form ref="form" label-position="top" label-width="200px" size="mini">
      <div style="margin-bottom:20px;">
        Nghiên cứu: {{ research.ProductName }}
      </div>

      <el-form-item size="large">
        <el-button type="danger" @click="onSubmit">Xóa nghiên cứu</el-button>
        <el-button @click="canceldeleteResearch">Hủy</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { RemoveResearch } from "@/api/research"
import Cookies from "js-cookie"
export default {
  props: ["research"],
  created() {},
  data() {
    return {
      ActiveElement: [],
      ResearchInfo: {
        ResearchId: "",
        ProductId: "",
        IdeaId: "",
        ProductName: "",
        LinkReport: "",
        ActiveElement: "",
        Concentration: "",
        Packing: ""
      }
    }
  },
  methods: {
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        ResearchId: this.research.ResearchId
      }
      RemoveResearch(rep).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Xóa nghiên cứu thành công",
          type: "success",
          position: "top-left"
        })
        this.$emit('delResearchOK', this.RemoveResearch)
      })
    },
    canceldeleteResearch() {
      this.$emit('canceldeleteResearchOK')
    }
  }
}
</script>
