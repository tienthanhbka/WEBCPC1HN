<template>
  <div>
    <modal id="new-customer-modal" ref="new-customer-modal" v-cloak>
      <template slot="title"
        ><i class="fas fa-project-diagram"></i>
        &#32;&#32;Đăng kí check call cá nhân
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
          <el-row :gutter="20">
            <el-form-item label="KH cá nhân" prop="CustomerId">
              <el-input
                class="selectIDGroup"
                v-model="customer.CustomerName"
                style="width:100%"
              >
              </el-input>
            </el-form-item>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Số ngày gặp" prop="MeetDay">
                <el-input
                  class="selectIDGroup"
                  v-model.number="form.MeetDay"
                  style="width:100%"
                  placeholder="Nhập số ngày gặp..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Số Call thực hiện" prop="QuantiyCall">
                <el-input
                  class="selectIDGroup"
                  v-model.number="form.QuantiyCall"
                  style="width:100%"
                  placeholder="Nhập Số Call thực hiện..."
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
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
import { GetCustomerByPId } from "@/api/KDCustomer";
import { GetPlaceByUId } from "@/api/KDPlace";
import { SetMetCustomerByCId } from "@/api/appview";
import Cookies from "js-cookie";
export default {
  props: ["place", "customer"],
  data() {
    return {
      rules: {
        PlaceName: [
          {
            required: true,
            message: "Hãy chọn tổ chức",
            trigger: "change"
          }
        ],
        CustomerName: [
          {
            required: true,
            message: "Hãy chọn KH cá nhân",
            trigger: "change"
          }
        ],
        MeetDay: [
          {
            required: true,
            message: "Hãy nhập số ngày cần gặp",
            trigger: "change"
          },
          { type: "number", message: "Số ngày gặp là kiểu số" }
        ],
        QuantiyCall: [
          {
            required: true,
            message: "Hãy nhập số call cần check",
            trigger: "change"
          },
          { type: "number", message: "Số call là kiểu số" }
        ]
      },
      form: {
        CustomerId: "",
        PlaceID: "",
        PlaceName: "",
        MeetDay: "",
        QuantiyCall: "",
        NoteEm: ""
      },
      PlaceLst: [],
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      UserCode: Cookies.get("idEmployee"),
      CustomerLst: []
    };
  },
  methods: {
    addMeet(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          var req = {
            Token: this.Token,
            UserName: this.UserName,
            CustomerId: this.customer.CustomerId,
            PlaceID: this.place,
            MeetDay: this.form.MeetDay,
            QuantiyCall: this.form.QuantiyCall,
            NoteEm: this.form.NoteEm
          };
          SetMetCustomerByCId(req).then(res => {
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
      (this.form.CustomerId = ""),
        (this.form.NoteEm = ""),
        (this.form.MeetDay = ""),
        (this.form.PlaceID = ""),
        (this.form.QuantiyCall = "");
    },
    closeModal() {
      VoerroModal.hide("new-customer-modal");
    }
  },
  mounted() {},
  watch: {},
  created() {}
};
</script>
<style lang="scss">
.el-autocomplete-suggestion {
  li {
    line-height: normal;
    padding: 7px;

    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
