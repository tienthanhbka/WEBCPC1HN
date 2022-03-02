<template>
  <div>
    <el-tabs type="border-card">
        <el-tab-pane>
            <span slot="label"><i class="fas fa-flask"></i> Nguyên liệu</span>
            <Material></Material>
        </el-tab-pane>
        <el-tab-pane>
            <span slot="label"><i class="fas fa-warehouse"></i> Nhà cung cấp</span>
            <Supplier></Supplier>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { GetMaterial } from "@/api/material"
import Material from "@/views/RD/material/admin/material/index"
import Supplier from "@/views/RD/material/admin/supplier/index"
import Cookies from "js-cookie"
export default {
  components: { Material, Supplier },
  data() {
    return {
      MaterialLst: [],
      admin: false,
      rowData: "",
      listLoading: false,
      dialogFormAccept: false,
      dialogFormUpdate: false,
      dialogFormDel: false
    }
  },
  methods: {
  },
  created() {
  },
  watch: {}
}
</script>
<style>
.el-autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
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
