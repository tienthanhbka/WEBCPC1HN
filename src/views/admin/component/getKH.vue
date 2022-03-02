<template>
  <div>
    <div>
      <span style="font-weight: bold;"> Nhân viên: </span>
      {{ userDetail[0].nameEmployee }}
    </div>
    <div>
      <span style="font-weight: bold;"> Loại nhân viên:</span>
      {{ userDetail[0].TypeEmployee }}
    </div>
    <div><span style="font-weight: bold;"> Nhóm:</span> {{ idGroup }}</div>
    <div>
      <span style="font-weight: bold;"> Quản lý cấp 2:</span> {{ Sta2 }}
    </div>
    <div><span style="font-weight: bold;">Quản lý cấp 3:</span> {{ Sta3 }}</div>
    <div><span style="font-weight: bold;">Quản lý cấp 4:</span> {{ Sta4 }}</div>

    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="150px"
    >
      <el-form-item label="Lấy KH từ nhân viên">
        <el-input
          class="selectIDGroup"
          placeholder="Nhập sdt nhân viên cần lấy"
          v-model="form.idEmployeeGet"
        ></el-input>
      </el-form-item>

      <div v-if="nameUser != ''">
        Lấy KH từ NV {{ nameUser }} sang NV {{ userDetail[0].nameEmployee }}
      </div>
    </el-form>
    <div style="text-align:center">
      <el-button
        type="primary"
        size="small"
        @click="getInfor"
        icon="el-icon-search"
        >Kiểm tra</el-button
      >

      <el-button type="success" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  GetDetailEmployee,
  GetEmployeeDefine,
  GetLstGroup,
  GetKH
} from "@/api/employeeAdmin";
export default {
  props: ["user"],
  data() {
    return {
      lstGroup: [],
      form: {
        idEmployeeGet: "",
        idEmployee: ""
      },
      options: [],
      nameUser: "",
      userDetail: "",
      idGroup: "",
      Sta2: "",
      Sta3: "",
      Sta4: ""
    };
  },
  methods: {
    fetchOTC() {
      GetEmployeeDefine().then(res => {
        // alert('ok')
        this.options = res.Data;
      });
    },
    getInfor() {
      GetInfor(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Lấy khách hàng thành công",
          position: "top-left",
          type: "success"
        });
        this.nameUser = "";
        this.$emit("click-something", "ok");
      });
    },
    fetchData() {
      var req = {
        idEmployee: this.user.idEmployee
      };
      GetDetailEmployee(req).then(res => {
        this.userDetail = res.Data;
        var this_ = this;
        this.userDetail.forEach(function(item, index, arr) {
          if (item.status == 1) {
            this_.idGroup = item.idGroup;
          }

          if (item.status == 2) {
            this_.Sta2 += item.idGroup + ", ";
          }

          if (item.status == 3) {
            this_.Sta3 += item.idGroup + ", ";
          }

          if (item.status == 4) {
            this_.Sta4 += item.idGroup + ", ";
          }
        });
      });
    },

    getInfor() {
      var req = {
        idEmployee: this.form.idEmployeeGet
      };
      GetDetailEmployee(req).then(res => {
        this.nameUser = res.Data[0].nameEmployee;
      });
    },
    modalOK() {
      this.form.idEmployee = this.user.idEmployee;

      GetKH(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Lấy khách hàng thành công",
          position: "top-left",
          type: "success"
        });
        this.$emit("click-something", "ok");
      });
    },
    initForm() {
      this.idGroup = "";
      this.Sta2 = "";
      this.Sta3 = "";
      this.Sta4 = "";
      this.fetchData();
    }
  },
  created() {
    this.fetchOTC();
    this.initForm();
  },
  watch: {
    user() {
      this.initForm();
      this.fetchOTC();
    }
  }
};
</script>
