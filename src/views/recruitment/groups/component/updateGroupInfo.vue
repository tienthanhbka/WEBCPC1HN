<template>
  <div class="post">
    <el-form
      v-loading="isLoading"
      :model="form"
      ref="form"
      class="demo-form-inline"
    >
      <el-form-item label="Tên nhóm">
        <el-input v-model="form.CompanyName" placeholder="Tên nhóm"></el-input>
      </el-form-item>
      <el-form-item label="Tỉnh thành phố">
        <el-select
          style="width:100%"
          v-model="form.City"
          filterable
          placeholder="Chọn tỉnh/ thành phố"
        >
          <el-option
            v-for="item in cityLst"
            :key="item.DefaultValue"
            :label="item.DefaultValue"
            :value="item.DefaultValue"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Địa chỉ">
        <el-input v-model="form.Address" placeholder="Địa chỉ"></el-input>
      </el-form-item>
      <label class="label" style="margin-bottom: 10px"
        >Mô tả thông tin nhóm</label
      >
      <br />
      <tiny-mce
        api-key="no-api-key"
        :init="{
          menubar: false
        }"
        v-model="form.MoreInfo"
      ></tiny-mce>
      <el-form-item label="Quy mô nhóm">
        <el-input v-model="form.Scale" placeholder="Quy mô nhóm"></el-input>
      </el-form-item>

      <el-form-item label="Website">
        <el-input v-model="form.LinkWeb" placeholder="Website"></el-input>
      </el-form-item>
      <el-form-item label="Link Video">
        <el-input v-model="form.LinkVideo" placeholder="Link Video"></el-input>
      </el-form-item>
      <el-form-item label="SĐT công ty">
        <el-input
          v-model="form.PhoneNumber"
          placeholder="SĐT công ty"
        ></el-input>
      </el-form-item>
      <el-form-item label="Fax">
        <el-input v-model="form.Fax" placeholder="Fax"></el-input>
      </el-form-item>
      <el-form-item label="Mã số doanh nghiệp">
        <el-input
          v-model="form.CompanyLicence"
          placeholder="Mã số doanh nghiệp"
        ></el-input>
      </el-form-item>
      <el-form-item label="Tên người đại diện">
        <el-input
          v-model="form.ContactRepresent"
          placeholder="Tên người đại diện"
        ></el-input>
      </el-form-item>
      <el-form-item label="Chức vụ">
        <el-input
          v-model="form.ContactPosition"
          placeholder="Chức vụ"
        ></el-input>
      </el-form-item>
      <el-form-item label="Email người đại diện">
        <el-input
          v-model="form.ContactEmail"
          placeholder="Email người đại diện"
        ></el-input>
      </el-form-item>
      <el-form-item label="SĐT người đại diện">
        <el-input
          v-model="form.ContactPhone"
          placeholder="SĐT người đại diện"
        ></el-input>
      </el-form-item>

      <el-form-item style="text-align:center">
        <el-button
          size="small"
          icon="fas fa-check-double"
          type="success"
          @click="approve"
        >
          Xác nhận</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import TinyMce from "@/components/Tinymce";
import { UpdateCompanyInfo } from "@/api/work-dtp/company";
import { GetDefaultValue } from "@/api/work-dtp/defaultValue";
import Cookies from "js-cookie";
export default {
  components: {
    TinyMce
  },
  props: {
    row: Object
  },
  data() {
    return {
      cityLst: [],
      form: {
        CompanyID: "",
        CompanyName: "",
        City: "",
        Address: "",
        MoreInfo: "",
        Scale: "",
        LinkWeb: "",
        LinkVideo: "",
        CompanyImage: "",
        PhoneNumber: "",
        Fax: "",
        CompanyLicence: "",
        ContactRepresent: "",
        ContactPosition: "",
        ContactEmail: "",
        ContactPhone: "",
        CreaterID: "",
        TimeCreate: "",
        Status: ""
      },
      isLoading: false
    };
  },
  methods: {
    approve() {
      UpdateCompanyInfo({ CompanyInfo: this.form }).then(res => {
        if (res.RespCode === 0) {
          this.$notify({
            title: "Thành công",
            message: "Cập nhật thông tin nhóm thành công",
            type: "success"
          });
          this.$emit("updateOK");
        }
      });
    },
    initForm() {
      if (this.row) {
        (this.form.CompanyID = this.row.CompanyID),
          (this.form.CompanyName = this.row.CompanyName),
          (this.form.City = this.row.City),
          (this.form.Address = this.row.Address),
          (this.form.MoreInfo = this.row.MoreInfo),
          (this.form.Scale = this.row.Scale),
          (this.form.LinkWeb = this.row.LinkWeb),
          (this.form.LinkVideo = this.row.LinkVideo),
          (this.form.CompanyImage = this.row.CompanyImage),
          (this.form.PhoneNumber = this.row.PhoneNumber),
          (this.form.Fax = this.row.Fax),
          (this.form.CompanyLicence = this.row.CompanyLicence),
          (this.form.ContactRepresent = this.row.ContactRepresent),
          (this.form.ContactPosition = this.row.ContactPosition),
          (this.form.ContactEmail = this.row.ContactEmail),
          (this.form.ContactPhone = this.row.ContactPhone),
          (this.form.CreaterID = this.row.CreaterID),
          (this.form.TimeCreate = this.row.TimeCreate),
          (this.form.Status = this.row.Status);
      } else {
        this.clear();
      }
    },
    clear() {
      (this.form.CompanyID = ""),
        (this.form.CompanyName = ""),
        (this.form.City = ""),
        (this.form.Address = ""),
        (this.form.MoreInfo = ""),
        (this.form.Scale = ""),
        (this.form.LinkWeb = ""),
        (this.form.LinkVideo = ""),
        (this.form.CompanyImage = ""),
        (this.form.PhoneNumber = ""),
        (this.form.Fax = ""),
        (this.form.CompanyLicence = ""),
        (this.form.ContactRepresent = ""),
        (this.form.ContactPosition = ""),
        (this.form.ContactEmail = ""),
        (this.form.ContactPhone = ""),
        (this.form.CreaterID = ""),
        (this.form.TimeCreate = ""),
        (this.form.Status = "");
    },
    fetchCity() {
      const req = {
        TableName: "City"
      };
      GetDefaultValue(req).then(res => {
        this.cityLst = res.DefaultValueLst;
      });
    }
  },

  mounted() {},
  watch: {},
  created() {
    this.fetchCity();
    this.initForm();
  }
};
</script>
<style lang="css">
.el-form-item {
  margin-bottom: 10px;
}
.el-textarea__inner {
  min-height: 100px !important;
}
</style>
<style lang="scss" scoped>
.title {
  padding: 15px;
  color: #606266;
  font-weight: 600;
  text-transform: uppercase;
  padding-left: 0;
}
.label {
  color: #606266;
  font-size: 14px;
}

@media screen and (max-width: 767px) {
  .amountType,
  .language,
  .workPosition {
    padding: 0 !important;
  }
}
.post {
  width: 100%;
  height: auto;
  .create-post {
    margin: 0 auto;
    width: 210mm;
    height: auto;

    padding: 20px;
    background: white;
  }
}
</style>
