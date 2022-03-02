<template>
  <div>
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      size="small"
      :model="form"
      label-width="120px"
    >
      <div></div>
      <!-- <el-form-item label="Người thân" prop="RelativePosition">
        <el-select v-model="form.RelativePosition" placeholder="Chọn"  style="width:100%">
          <el-option
            v-for="item in RelativePosition"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="Mối quan hệ" prop="RelativePosition">
        <el-select
          v-model="form.RelativePosition"
          placeholder="Chọn"
          style="width:100%"
        >
          <el-option
            v-for="item in RelativePosition"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Họ và tên">
        <el-input v-model="form.RelativeName"></el-input>
      </el-form-item>
      <el-form-item label="Chọn giới tính" prop="Sex">
        <el-select
          v-model="form.RelativeSex"
          placeholder="Chọn giới tính"
          style="width:100%"
        >
          <el-option
            v-for="item in Sex"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ngày sinh" prop="date">
        <el-date-picker
          style="width:100%"
          type="date"
          placeholder="Chọn ngày"
          v-model="form.RelativeBirth"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>

      <!-- <el-form-item label="Địa chỉ thường trú">
        <el-input v-model="form.RelativeAddress"></el-input>
      </el-form-item> -->
      <div>
        <!-- <span style="font-weight:600;color:#0277bc;margin-bottom:5px"
          >Hộ khẩu thường trú:</span
        > -->
        <el-form-item label="Tỉnh/ Thành phố" prop="Matrimony">
          <el-select
            v-model="form.RelativeAddressCity"
            @change="getDistrict"
            placeholder="Chọn tỉnh thành phố"
          >
            <el-option
              v-for="item in City"
              :key="item.city"
              :label="item.city"
              :value="item.city"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Quận (huyện)" prop="Matrimony">
          <el-select
            v-model="form.RelativeAddressDistrict"
            @change="getCommune"
            placeholder="Chọn quận huyện"
          >
            <el-option
              v-for="item in District"
              :key="item.District"
              :label="item.District"
              :value="item.District"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Xã (Phường)" prop="Matrimony">
          <el-select
            v-model="form.RelativeAddressCommune"
            placeholder="Chọn xã phường"
          >
            <el-option
              v-for="item in Commune"
              :key="item.Commune"
              :label="item.Commune"
              :value="item.Commune"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="Nghề nghiệp">
        <el-input v-model="form.RelativeJob"></el-input>
      </el-form-item>
      <el-form-item label="Số điện thoại">
        <el-input v-model="form.RelativePhone"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" size="small" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { CreateInforRelative } from "@/api/employeeInfor";
import {
  GetCity,
  GetDistrictByCity,
  GetCommuneByCityAndDistrict,
  GetDH,
  GetSpecialized,
  GetDegree,
  GetSpecializedFather
} from "@/api/default";
export default {
  props: [""],
  data() {
    return {
      City: [],
      District: [],
      Commune: [],
      form: {
        RelativeName: "",
        RelativePosition: "",
        RelativeBirth: "",
        RelativeJob: "",
        RelativeAddress: "",
        RelativeAddressCity: "",
        RelativeAddressDistrict: "",
        RelativeAddressCommune: "",
        RelativePhone: "",
        RelativeSex: "",
        EmployeeID: null
      },
      Sex: [
        {
          value: "Nam"
        },
        {
          value: "Nữ"
        },
        {
          value: "Khác"
        }
      ],

      RelativePosition: [
        {
          value: "01. Bố",
          id: 1
        },
        {
          value: "02. Mẹ",
          id: 2
        },
        {
          value: "07. Chồng",
          id: 3
        },
        {
          value: "08. Vợ",
          id: 4
        },
        {
          value: "03. Anh trai",
          id: 5
        },
        {
          value: "05. Em trai",
          id: 6
        },
        {
          value: "04. Chị gái",
          id: 7
        },
        {
          value: "06. Em gái",
          id: 8
        },
        {
          value: "09. Con trai",
          id: 9
        },
        {
          value: "10. Con gái",
          id: 10
        }
      ]
    };
  },
  methods: {
    getDistrict() {
      this.form.RelativeAddressDistrict = null;
      this.form.RelativeAddressCommune = null;
      GetDistrictByCity({ City: this.form.RelativeAddressCity }).then(res => {
        this.District = res.Data;
      });
    },
    getCommune() {
      this.form.RelativeAddressCommune = null;
      GetCommuneByCityAndDistrict({
        City: this.form.RelativeAddressCity,
        District: this.form.RelativeAddressDistrict
      }).then(res => {
        this.Commune = res.Data;
      });
    },
    check() {
      if (
        this.form.RelativeName == "" ||
        this.form.RelativePosition == "" ||
        this.form.RelativeBirth == "" ||
        this.form.RelativeAddressCity == "" ||
        this.form.RelativeAddressDistrict == "" ||
        this.form.RelativeAddressCommune == "" ||
        this.form.RelativeSex == ""
      )
        return false;
      else return true;
    },
    modalOK() {
      if (this.$route.params.id != null) {
        this.form.EmployeeID = this.$route.params.id;
      }
      //this.form.Img = this.image.join()
      if (this.check()) {
        this.form.RelativeAddress =
          this.form.RelativeAddressCommune +
          ", " +
          this.form.RelativeAddressDistrict +
          ", " +
          this.form.RelativeAddressCity;
        CreateInforRelative(this.form).then(res => {
          this.$notify({
            title: "Thành công",
            message: "Cập nhật thông tin thành công",
            type: "success",
            position: "top-left"
          });
          this.$emit("click-something", this.form);
        });
      } else {
        this.$notify({
          title: "Lỗi",
          message: "Vui lòng điền đủ thông tin",
          type: "warning",
          position: "top-left"
        });
      }
    }
  },
  created() {
    //this.getOffice()
    GetCity().then(res => {
      this.City = res.Data;
    });
  }
};
</script>
