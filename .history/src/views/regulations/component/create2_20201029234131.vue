<template>
  <div slot="body">
    <el-form ref="form" label-position="top" label-width="120px" size="mini">
      <el-form-item label="Loại học tập">
        <el-radio v-model="form.productType" label="1">Sản phẩm</el-radio>
        <el-radio v-model="form.productType" label="2"
          >Kiến thức chuyên sâu</el-radio
        >
        <el-radio v-model="form.productType" label="3">Bệnh học</el-radio>
        <el-radio v-model="form.productType" label="4">Bán hàng</el-radio>
      </el-form-item>
      <el-form-item label="Sản phẩm">
        <el-input v-model="form.content"></el-input>
      </el-form-item>
      <div style="margin-top: 15px;">
        Ảnh sản phẩm
        <el-upload
          class="upload-demo"
          action="https://icpc1hn.work/api/File/UploadImageProduct"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :on-success="uploadImageOk"
          :file-list="image"
        >
          <el-button size="small" type="primary"
            >Click to upload image</el-button
          >
          <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
        </el-upload>
      </div>
      <el-form-item label="Link đào tạo">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Số hướng dẫn">
                  <el-input v-model="form.number" ></el-input>
                </el-form-item> -->

      <!-- <el-form-item label="Hiệu lực">
                  <el-input type="date" v-model="form.timeEnd" ></el-input>
               
                  </el-form-item> -->
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
      Tờ toa
      <el-upload
        class="upload-demo"
        action="https://icpc1hn.work/api/File/UploadFileRegu2"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :on-success="uploadOk"
        :file-list="fileList"
      >
        <el-button size="small" type="primary"
          >Click to upload tờ toa</el-button
        >
        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
    </div>

    <div style="margin-top: 15px;">
      Tờ rơi
      <el-upload
        class="upload-demo"
        action="https://icpc1hn.work/api/File/UploadFileRegu2"
        multiple
        :limit="3"
        :on-success="uploadOk2"
        :file-list="fileList2"
      >
        <el-button size="small" type="success"
          >Click to upload tờ rơi</el-button
        >
        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
    </div>

    <div style="margin-top: 15px;">
      Slide
      <el-upload
        class="upload-demo"
        action="https://icpc1hn.work/api/File/UploadFileRegu2"
        multiple
        :limit="3"
        :on-success="uploadOk3"
        :file-list="fileList3"
      >
        <el-button size="small" type="warning">Click to upload slide</el-button>
        <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
      </el-upload>
    </div>

    <div style="margin-top: 15px;">
      Video
      <el-upload
        class="upload-demo"
        action="https://icpc1hn.work/api/File/UploadFileRegu2"
        multiple
        :limit="3"
        :on-success="uploadOk4"
        :file-list="fileList4"
      >
        <el-button size="small" type="danger">Click to upload video</el-button>
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
import { createRegu2, getEmployeeDefine } from "@/api/regu";
import Cookies from "js-cookie";
export default {
  props: [],
  data() {
    return {
      listEmDefine: [],
      selectedPlace: [],
      checkboxGroup2: [],
      fileImage: [],
      fileList: [],
      fileList2: [],
      fileList3: [],
      fileList4: [],
      //  options: [{
      // }],
      token: Cookies.get("token"),
      optionsService: [{}],
      value: Cookies.get("idGroup"),
      form: {
        productType: null,
        office: [],
        timeEnd: "",
        content: "",
        IDGroup: "",
        number: "",
        file: [],
        file2: [],
        file3: [],
        file4: [],
        link: "",
        image: []
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
    uploadImageOk(res, file, fileList) {
      this.fileImage.push(res.Data.fileName);
    },
    uploadOk(res, file, fileList) {
      this.fileList.push(res.Data.fileName);
    },
    uploadOk2(res, file, fileList) {
      this.fileList2.push(res.Data.fileName);
    },
    uploadOk3(res, file, fileList) {
      this.fileList3.push(res.Data.fileName);
    },
    uploadOk4(res, file, fileList) {
      this.fileList4.push(res.Data.fileName);
    },

    createRegu() {
      // this.form.ServiceCode = this.$props.serviceCode + this.form.ServiceCode;
      //console.log(this.form);
      this.form.image = this.fileImage;
      this.form.file = this.fileList;
      this.form.file2 = this.fileList2;
      this.form.file3 = this.fileList3;
      this.form.file4 = this.fileList4;
      createRegu2(this.form).then(response => {
        //console.log(response);
        if (response.ResCode == 0) {
          // this.$emit('click-something',this.form)
          this.$notify({
            title: "Thành công",
            message: "Đăng hướng dẫn thành công",
            type: "success",
            position: "top-left"
          });
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
