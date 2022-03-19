<template>
  <modal id="delete-employee" ref="delete-employee" v-cloak>
    <template slot="title"
      >Xóa nhân viên khỏi nhóm</template
    >

    <div slot="body">
      <el-form ref="form" label-width="140px" size="mini">
        <el-form-item label="Xóa nhân viên">
          <el-input type="textarea" v-model="row.nameEmployee"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deleteEmployee"
        >Xác nhận</el-button
      >
    </div>
  </modal>
</template>
<script>
import { deleteEmployeeGroup } from "@/api/groups";
import Cookies from "js-cookie";
export default {
  props: ["row", "groups"],
  data() {
    return {
      tableData: [],
      selectedPlace: [],
      options: [{}],
      optionsService: [{}],
      idEmployee: "",

      form: {
        ID: "",
        name: "",
        content: "",
        sendToOffice: "",
        note: "",
        deadline: "",
        product: "",
        idEmployee: "",
        idGroup: "",
        IDService: ""
      }
    };
  },

  methods: {
    closeModal() {
      VoerroModal.hide("delete-employee");
    },
    deleteEmployee() {
      var req = {
        idEmployee: this.$props.row.idEmployee,
        idGroup: this.$props.groups
      };

      deleteEmployeeGroup(req).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Xóa nhân viên thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", this.form);
          VoerroModal.hide("delete-employee");
          this.listLoading = false;
        }
      });
    }
  }

  // watch: {
  //   employee:function(){

  //     GetPlaceByIdEmployee({idEmployee:this.employee.idEmployee}).then(res=>{
  //         console.log(res);
  //         this.tableData = res.Data;
  //     })
  //   }
  // },
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
</style>
