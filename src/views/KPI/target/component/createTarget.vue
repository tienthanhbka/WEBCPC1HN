<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-width="120px"
      size="small"
      label-position="left"
    >
      <el-form-item label="Quản lý duyệt">
        <el-select v-model="groupBase" placeholder="Chọn nhóm">
          <el-option
            v-for="item in groupList"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Chỉ tiêu">
        <el-select v-model="form.KPICode" placeholder="Chọn chỉ tiêu">
          <el-option
            v-for="item in listKPICode"
            :key="item.IDService"
            :label="item.Service"
            :value="item.IDService"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tháng">
        <el-date-picker
          style="width:100%"
          v-model="form.month"
          type="month"
          placeholder="Chọn tháng..."
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Mô tả chỉ tiêu">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          v-model="form.note"
        ></el-input>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Điểm KPI">
            <el-input v-model="form.target" type="number"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="KPI tối đa">
            <el-input v-model="form.KPImax" type="number"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" icon="el-icon-success" @click="createTarget"
        >Thêm</el-button
      >
    </div>
  </div>
</template>
<script>
import { CreateTarget, GetKPIListByGroupEmployee } from "@/api/kpiList";
export default {
  props: ["id", "groupList"],
  data() {
    return {
      listKPICode: [{}],
      groups: "",
      groupBase: "",
      value: "",
      form: {
        KPICode: "",
        amount: "",
        idGroupBase: "",
        month: "",
        target: "",
        KPImax: "",
        note: "",
        unit: "",
        status: ""
      },
      state: ""
    };
  },

  methods: {
    fetchKPICode() {
      this.listLoading = true;
      var req = {
        admin: this.groupBase
      };
      GetKPIListByGroupEmployee(req).then(response => {
        this.listKPICode = response.Data;
        this.listLoading = false;
      });
    },
    createTarget() {
      this.form.month.setDate(this.form.month.getDate() + 1);
      this.form.idGroupBase = this.groupBase;
      //console.log(this.form);
      CreateTarget(this.form).then(response => {
        if (response.ResCode == 0) {
          this.$emit("click-something", this.form);
          //VoerroModal.hide('new-target-KPI');
          this.$notify({
            title: "Thành công",
            message: "Thêm tiêu chí thành công",
            type: "success",
            position: "top-left"
          });
          this.listLoading = false;
        }
      });
    }
  },
  created() {
    this.fetchKPICode();
  },
  mounted() {},

  watch: {
    state: function() {
      this.fetchKPICode();
    },
    groupBase: function() {
      this.fetchKPICode();
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
.month .el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
  width: 120px;
}

.kpi .el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
  width: 80px;
}
.chi-tieu .el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
  width: 200px;
}

.detail .el-input--mini .el-input__inner {
  height: 28px;
  line-height: 28px;
  width: 480px;
}

.modal-box {
  /* min-width: 75%; */
  /* width: 80%; */
  max-width: 70%;
}
</style>
