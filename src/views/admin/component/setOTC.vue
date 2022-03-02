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
      <span style="font-weight: bold;"> Quản lý loại 2:</span> {{ Sta2 }}
    </div>
    <div>
      <span style="font-weight: bold;">Quản lý loại 3:</span> {{ Sta3 }}
    </div>
    <div>
      <span style="font-weight: bold;">Quản lý loại 4:</span> {{ Sta4 }}
    </div>

    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Loại nhân viên">
        <el-select
          class="selectIDGroup"
          v-model="form.otc"
          placeholder="Chọn loại"
        >
          <el-option
            v-for="item in options"
            :key="item.TypeCode"
            :label="item.Description"
            :value="item.TypeCode"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" size="small" @click="modalOK">
        Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  GetDetailEmployee,
  GetEmployeeDefine,
  GetLstGroup,
  UpdateOTC
} from "@/api/employeeAdmin";
export default {
  props: ["user"],
  data() {
    return {
      lstGroup: [],
      form: {
        otc: "",
        idEmployee: ""
      },
      options: [],
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
    modalOK() {
      this.form.idEmployee = this.user.idEmployee;
      UpdateOTC(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Cập nhật loại NV thành công",
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
