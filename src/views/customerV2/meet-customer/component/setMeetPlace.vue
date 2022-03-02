<template>
  <div>
    <modal id="new-place-modal" ref="new-place-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-project-diagram"></i>
        &#32;&#32;Đăng kí check call tổ chức
      </template>
      <div slot="body">
        <el-form
          ref="form"
          label-position="top"
          size="small"
          :model="form"
          :rules="rules"
          label-width="120px"
        >
          <el-row>
            <el-col :span="24">
              <el-form-item label="KH tổ chức">
                <el-input
                  class="selectIDGroup"
                  v-model="place.PlaceName"
                  style="width:100%"
                  placeholder="Nhập KH tổ chức..."
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item
                label="Tần suất viếng thăm"
                prop="Frequency"
                :rules="[{ type: 'number', message: 'Tần suất là kiểu số' }]"
              >
                <el-input
                  class="selectIDGroup"
                  v-model.number="form.Frequency"
                  style="width:100%"
                  placeholder="Nhập tần suất viếng thăm..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Ghi chú cá nhân" prop="NoteEm">
                <el-input
                  class="selectIDGroup"
                  v-model="form.NoteEm"
                  style="width:100%"
                  placeholder="Ghi chú cá nhân..."
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div
        slot="footer"
        style="margin:10px;margin-left:auto;margin-right:20px;text-align:center"
      >
        <el-button class="pan-btn grey-btn" @click="closeModal">Hủy</el-button>
        <el-button
          icon="el-icon-check"
          class="pan-btn blue-btn"
          @click="addMeet('form')"
          >Xác nhận</el-button
        >
      </div>
    </modal>
  </div>
</template>
<script>
import { UpdatePlaceByPId } from "@/api/KDPlace";
import Cookies from "js-cookie";
export default {
  props: ["place"],
  data() {
    return {
      City: [],
      DistrictLst: [],
      CommuneLst: [],
      rules: {
        PlaceName: [
          {
            required: true,
            message: "Hãy chọn tổ chức",
            trigger: "change"
          }
        ]
      },
      form: {
        Frequency: "",
        NoteEm: ""
      }
    };
  },
  methods: {
    addMeet(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          var req = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            PlaceInfo: Object.assign({}, this.place, this.form)
          };
          UpdatePlaceByPId(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: " Đăng kí thành công",
                type: "success"
              });
              this.$emit("meetAdded");
              this.closeModal();
              this.$refs[re].resetFields();
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    initForm() {
      (this.form.Frequency = ""), (this.form.NoteEm = "");
    },
    closeModal() {
      VoerroModal.hide("new-place-modal");
    },
    fetchData() {}
  },
  mounted() {},
  watch: {
    place() {
      this.initForm();
    }
  },
  created() {
    this.initForm();
  }
};
</script>
