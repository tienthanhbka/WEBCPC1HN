<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      :model="form"
      :rules="rules"
      class="form-custom"
      label-width="120px"
      size="mini"
    >
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Họ tên" prop="FullName">
            <el-input class="input-custom" v-model="form.FullName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="CMND" prop="CMND">
            <el-input class="input-custom" v-model="form.CMND"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="SĐT">
            <el-input
              class="input-custom"
              v-model="form.PhoneNumber"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Địa chỉ">
            <el-input class="input-custom" v-model="form.Address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Thời gian">
            <el-input
              class="input-custom"
              v-model="form.Time"
              placeholder="vd: 12-13..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Line">
            <el-input class="input-custom" v-model="form.Line"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-form-item label="Nhóm">
            <el-input
              class="input-custom"
              v-model="form.TypeGroup"
              placeholder="vd: xanh..."
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-form-item label="Đơn vị CT">
            <el-input class="input-custom" v-model="form.Work"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Ghi chú">
        <el-input class="input-custom" v-model="form.Note"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center;margin:10px 0">
      <el-button type="primary" size="small" icon="fas fa-plus" @click="create">
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateVaccineInfoByAdmin } from "@/api/vaccine";
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    mode: Number
  },
  components: {},
  data() {
    return {
      form: {
        FullName: "",
        CMND: "",
        PhoneNumber: "",
        Address: "",
        Note: "",
        Time: "",
        Line: "",
        Work: "",
        TypeGroup: ""
      },

      rules: {
        FullName: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ],
        CMND: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    create() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const arr = [];
          arr.push(this.form);
          CreateVaccineInfoByAdmin({
            VaccineInfoLst: arr
          }).then(response => {
            if (response.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Thêm thành công",
                type: "success",
                position: "top-left"
              });
              this.$emit("createOK");
            }
          });
        }
      });
    }
  },
  created() {},
  watch: {
    row() {}
  },
  mounted() {}
};
</script>

<style lang="scss" scoped></style>
