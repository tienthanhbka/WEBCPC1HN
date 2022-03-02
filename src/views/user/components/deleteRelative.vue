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
      <div>Xóa thông tin: {{ row.RelativePosition }}</div>
    </el-form>
    <div style="text-align:center;padding:10px">
      <el-button size="small" type="danger" @click="modalOK"
        >Xác nhận</el-button
      >
    </div>
  </div>
</template>
<script>
import { DelInforRelative } from "@/api/employeeInfor";
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
        RelativePosition: "",
        RelativeBirth: "",
        RelativeJob: "",
        RelativeAddress: "",
        RelativeAddressCity: "",
        RelativeAddressDistrict: "",
        RelativeAddressCommune: "",
        RelativePhone: "",
        RelativeSex: "",
        RowID: 0
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
      this.form.RelativeName = this.row.RelativeName;
      this.form.RelativePosition = this.row.RelativePosition;
      this.form.RelativeBirth = this.row.RelativeBirth;
      this.form.RelativeJob = this.row.RelativeJob;
      this.form.RelativeAddress = this.row.RelativeAddress;

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
    modalOK() {
      //this.form.Img = this.image.join()
      this.form.RelativeAddress =
        this.form.RelativeAddressCommune +
        ", " +
        this.form.RelativeAddressDistrict +
        ", " +
        this.form.RelativeAddressCity;
      DelInforRelative(this.form).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Xóa thông tin thành công",
          type: "success",
          position: "top-left"
        });
        this.row.RelativeName = "";
        this.row.RelativePosition = "";
        this.row.RelativeBirth = "";
        this.row.RelativeJob = "";
        this.row.RelativeAddress = "";
        this.row.RelativePhone = "";
        this.row.RelativeSex = "";

        this.$emit("click-something", "ok");
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
