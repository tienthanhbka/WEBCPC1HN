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
      <div>
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

      <el-radio v-model="form.RelativeNPT" label="1"
        >NPT giảm trừ gia cảnh</el-radio
      >

      <el-form-item v-if="form.RelativeNPT == 1" label="Mã số thuế">
        <el-input v-model="form.RelativeMST"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align:center;padding: 10px">
      <el-button size="small" type="success" @click="modalOK"
        >Xác nhận</el-button
      >
      <el-button size="small" type="warning" @click="cancelOK"
        >Sai thông tin, Cập nhật lại</el-button
      >
    </div>
  </div>
</template>
<script>
import { UpdateInforRelative } from "@/api/employeeInfor";
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
  props: ["row"],
  data() {
    return {
      City: [],
      District: [],
      Commune: [],
      form: {
        RelativeName: "",
        EmployeeID: "",
        RelativePosition: "",
        RelativeBirth: "",
        RelativeJob: "",
        RelativeAddress: "",
        RelativeAddressCity: "",
        RelativeAddressDistrict: "",
        RelativeAddressCommune: "",
        RelativePhone: "",
        RelativeSex: "",
        RelativeMST: "",
        RelativeNPT: 0,
        RowID: 0,
        Status: 2
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
          value: "Bố",
          id: 1
        },
        {
          value: "Mẹ",
          id: 2
        },
        {
          value: "Chồng",
          id: 3
        },
        {
          value: "Vợ",
          id: 4
        },
        {
          value: "Anh trai",
          id: 5
        },
        {
          value: "Em trai",
          id: 6
        },
        {
          value: "Chị gái",
          id: 7
        },
        {
          value: "Em gái",
          id: 8
        },
        {
          value: "Con trai",
          id: 9
        },
        {
          value: "Con gái",
          id: 10
        }
      ]
    };
  },
  methods: {
    initForm() {
      this.form.EmployeeID = this.row.EmployeeID;
      this.form.RelativeName = this.row.RelativeName;
      this.form.RelativePosition = this.row.RelativePosition;
      this.form.RelativeBirth = this.row.RelativeBirth;
      this.form.RelativeJob = this.row.RelativeJob;
      this.form.RelativeAddress = this.row.RelativeAddress;
      this.form.RelativeMST = this.row.RelativeMST;
      this.form.RelativeNPT = this.row.RelativeNPT;

      this.form.RelativeAddressCity = this.row.RelativeAddress.split(", ")[2];
      this.getDistrict();
      this.form.RelativeAddressDistrict = this.row.RelativeAddress.split(
        ", "
      )[1];
      this.getCommune();
      this.form.RelativeAddressCommune = this.row.RelativeAddress.split(
        ", "
      )[0];

      this.form.RelativePhone = this.row.RelativePhone;
      this.form.RelativeSex = this.row.RelativeSex;
      this.form.RowID = this.row.RowID;
    },
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
    cancelOK() {
      this.form.Status = 0;
      this.form.RelativeAddress =
        this.form.RelativeAddressCommune +
        ", " +
        this.form.RelativeAddressDistrict +
        ", " +
        this.form.RelativeAddressCity;
      UpdateInforRelative(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Yêu cầu cập nhật thông tin thành công",
          type: "success",
          position: "top-left"
        });
        this.row.RelativeName = this.form.RelativeName;
        this.row.RelativePosition = this.form.RelativePosition;
        this.row.RelativeBirth = this.form.RelativeBirth;
        this.row.RelativeJob = this.form.RelativeJob;
        this.row.RelativeAddress = this.form.RelativeAddress;
        this.row.RelativePhone = this.form.RelativePhone;
        this.row.RelativeSex = this.form.RelativeSex;
        this.row.RelativeMST = this.form.RelativeMST;
        this.row.RelativeNPT = this.form.RelativeNPT;
        this.row.Status = 0;

        this.$emit("editOK", "ok");
      });
    },
    modalOK() {
      //this.form.Img = this.image.join()
      this.form.RelativeAddress =
        this.form.RelativeAddressCommune +
        ", " +
        this.form.RelativeAddressDistrict +
        ", " +
        this.form.RelativeAddressCity;
      UpdateInforRelative(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Phê duyệt thông tin thành công",
          type: "success",
          position: "top-left"
        });
        this.row.RelativeName = this.form.RelativeName;
        this.row.RelativePosition = this.form.RelativePosition;
        this.row.RelativeBirth = this.form.RelativeBirth;
        this.row.RelativeJob = this.form.RelativeJob;
        this.row.RelativeAddress = this.form.RelativeAddress;
        this.row.RelativePhone = this.form.RelativePhone;
        this.row.RelativeSex = this.form.RelativeSex;
        this.row.RelativeMST = this.form.RelativeMST;
        this.row.RelativeNPT = this.form.RelativeNPT;
        this.row.Status = 2;

        this.$emit("editOK", "ok");
      });
    }
  },
  created() {
    //this.getOffice()
    this.initForm();
    GetCity().then(res => {
      this.City = res.Data;
    });
  },
  watch: {
    row() {
      this.initForm();
    }
  }
};
</script>
