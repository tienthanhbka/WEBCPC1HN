<template>
  <div slot="body">
    <el-form ref="form" label-position="top" label-width="120px" size="mini">
      <el-form-item label="Tiêu đề">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="Số văn bản">
        <el-input v-model="form.number"></el-input>
      </el-form-item>

      <el-form-item label="Hiệu lực">
        <el-input type="date" v-model="form.timeEnd"></el-input>
      </el-form-item>
      <el-form-item label="Đối tượng áp dụng">
        <el-checkbox-group v-model="form.office" size="mini">
          <el-checkbox
            v-for="(em, index) in listEmDefine"
            :key="index"
            :label="em.TypeEmployee"
            border
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div style="margin-top: 15px;">
      <el-upload
        class="upload-demo"
        action="https://icpc1hn.work/api/File/UploadFileRegu"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :on-success="uploadOk"
        :file-list="fileList"
      >
        <el-button size="small" type="primary">Click to upload</el-button>
        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
    </div>

    <div style="float: right">
      <el-button type="primary" icon="fas fa-plus" @click="createRegu">
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { createRegu, getEmployeeDefine } from "@/api/regu";
import Cookies from "js-cookie";
export default {
  props: [],
  data() {
    return {
      listEmDefine: [],
      selectedPlace: [],
      checkboxGroup2: [],
      fileList: [],
      //  options: [{
      // }],
      token: Cookies.get("token"),
      optionsService: [{}],
      value: Cookies.get("idGroup"),
      form: {
        office: [],
        timeEnd: "",
        content: "",
        IDGroup: "",
        number: "",
        file: []
      },
      radio: "1"
    };
  },

  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    uploadOk(res, file, fileList) {
      this.fileList.push(res.Data.fileName);
    },

    createRegu() {
      // this.form.ServiceCode = this.$props.serviceCode + this.form.ServiceCode;
      //console.log(this.form);
      this.form.file = this.fileList;
      createRegu(this.form).then(response => {
        console.log(response);
        if (response.ResCode == 0) {
          // this.$emit('click-something',this.form)
          this.$notify({
            title: "Thành công",
            message: "Tạo quy định thành công",
            type: "success",
            position: "top-left"
          });
          this.fileList = [];
          this.form.office = [];
          this.form.file = [];
          this.form.timeEnd = "";
          this.form.content = "";
          this.form.IDGroup = "";
          this.form.number = "";
          this.$emit("click-something", this.form);
          // VoerroModal.hide('new-define-modal');
          this.listLoading = false;
        }
      });
    },
    getEmployeeDefine() {
      getEmployeeDefine().then(response => {
        if (response.ResCode == 0) {
          this.listEmDefine = response.Data;
        }
      });
    }
  },
  created() {
    this.getEmployeeDefine();
  },
  mounted() {
    //this.links = this.optionsService();
  }
  // watch: {
  //   radio:function(){
  //     alert(this.radio)
  //   }
  // },
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
</style>
