<template>
  <modal id="add-employee" ref="add-employee" v-cloak>
    <template slot="title"
      >Thêm nhân viên vào nhóm</template
    >
    <div></div>
    <div slot="body">
      <el-form ref="form" label-width="140px" size="mini">
        <el-form-item label="Nhập số điện thoại">
          <el-input type="textarea" v-model="idEmployee"></el-input>
        </el-form-item>
      </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal">Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="addEmployee"
        >Xác nhận</el-button
      >
    </div>
  </modal>
</template>
<script>
import { AddEmployee } from "@/api/groups";
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
      VoerroModal.hide("add-employee");
    },
    addEmployee() {
      var req = {
        EmployeeID: this.idEmployee,
        GroupID: this.$props.groups
      };

      AddEmployee(req).then(response => {
        if (response.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Thêm nhân viên thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", this.$props.groups);
          VoerroModal.hide("add-employee");
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
