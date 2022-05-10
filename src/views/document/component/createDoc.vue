<template>
  <div slot="body">
    <el-form
      ref="form"
      label-position="left"
      class="form-custom"
      label-width="140px"
      size="mini"
    >
      <el-form-item label="Nhóm tài liệu">
        <el-select
          v-model="form.ProductType"
          filterable
          size="small"
          placeholder="Chọn nhóm tài liệu..."
          style="width:100%"
        >
          <el-option
            v-for="item in lstType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Tên tài liệu">
        <!-- <el-select
          v-if="form.ProductType == 1"
          v-model="form.Content"
          @change="changePro"
          filterable
          clearable
          placeholder="Chọn tên sản phẩm..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in items"
            :key="index"
            :label="item.ProductName"
            :value="item"
          >
            <span style="float: left">{{ item.ProductName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.ProductID
            }}</span>
          </el-option>
        </el-select> -->
        <el-input
          v-model="form.Content"
          placeholder="Nhập tên tài liệu..."
        ></el-input>
      </el-form-item>

      <el-form-item label="Đối tượng áp dụng">
        <!-- <el-checkbox-group v-model="officeLst" size="mini">
          <el-checkbox
            v-for="(em, index) in listEmDefine"
            :key="index"
            :label="em.TypeEmployee"
            border
          ></el-checkbox>
        </el-checkbox-group> -->
        <el-select
          v-model="officeLst"
          style="width:100%"
          multiple
          filterable
          placeholder="Chọn đối tượng"
        >
          <el-option
            v-for="(item, index) in listEmDefine"
            :key="index"
            :label="item.TypeEmployee"
            :value="item.TypeEmployee"
          >
            <span style="float: left">{{ item.TypeEmployee }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.Description
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ảnh">
        <el-upload
          :action="
            'https://icpc1hn.work/Web_API/File/UploadDocumentFile?Token=' +
              token +
              '&UserName=' +
              userName
          "
          :before-upload="beforeUpload1"
          :before-remove="beforeRemove"
          :on-remove="removeOK1"
          :limit="form.ProductType == 1 ? 5 : 1"
          :on-success="uploadImageOk"
        >
          <el-button style="width: 145px" size="small" type="primary"
            >Tải ảnh</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="Tờ toa">
        <el-upload
          :action="
            'https://icpc1hn.work/Web_API/File/UploadDocumentFile?Token=' +
              token +
              '&UserName=' +
              userName
          "
          :on-remove="removeOK2"
          :before-upload="beforeUpload2"
          :before-remove="beforeRemove"
          :limit="1"
          :on-success="uploadOk"
        >
          <el-button style="width: 145px" size="small" type="primary"
            >Tải tờ toa</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="Tờ rơi">
        <el-upload
          :action="
            'https://icpc1hn.work/Web_API/File/UploadDocumentFile?Token=' +
              token +
              '&UserName=' +
              userName
          "
          :before-upload="beforeUpload3"
          :on-remove="removeOK3"
          :limit="1"
          :on-success="uploadOk2"
        >
          <el-button style="width: 145px" size="small" type="success"
            >Tải tờ rơi</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="Slide">
        <el-upload
          :action="
            'https://icpc1hn.work/Web_API/File/UploadDocumentFile?Token=' +
              token +
              '&UserName=' +
              userName
          "
          :on-remove="removeOK4"
          :before-upload="beforeUpload4"
          :before-remove="beforeRemove"
          :limit="1"
          :on-success="uploadOk3"
        >
          <el-button style="width: 145px" size="small" type="warning"
            >Tải slide</el-button
          >
        </el-upload>
      </el-form-item>
      <el-form-item label="Catalogue">
        <el-upload
          :action="
            'https://icpc1hn.work/Web_API/File/UploadDocumentFile?Token=' +
              token +
              '&UserName=' +
              userName
          "
          :on-remove="removeOK5"
          :before-upload="beforeUpload5"
          :before-remove="beforeRemove"
          :limit="1"
          :on-success="uploadOk5"
        >
          <el-button style="width: 145px" size="small" type="primary"
            >Tải catalogue</el-button
          >
        </el-upload>
      </el-form-item>

      <el-form-item v-if="form.ProductType == 1">
        <div slot="label">Thông tin chi tiết</div>
        <tiny-mce v-model="form.ProductDes"></tiny-mce>
      </el-form-item>
      <el-form-item v-if="form.ProductType == 1">
        <div slot="label">Câu hỏi tình huống</div>
        <tiny-mce v-model="form.ReviewDes"></tiny-mce>
      </el-form-item>
      <el-form-item label="Sản phẩm" v-if="form.ProductType == 1">
        <el-select
          @change="changePro"
          filterable
          clearable
          placeholder="Chọn sản phẩm..."
          style="width:100%"
        >
          <el-option
            v-for="(item, index) in items"
            :key="index"
            :label="item.ProductName"
            :value="item"
          >
            <span style="float: left">{{ item.ProductName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.ProductID
            }}</span>
          </el-option>
        </el-select>
        <el-table
          :data="form.ProductLst"
          size="small"
          border
          style="width: 100%"
        >
          <el-table-column align="center" label="STT" width="75">
            <template slot-scope="props">
              {{ props.$index + 1 }}
              <el-tooltip content="Xóa" placement="top"
                ><el-button @click="delItem(props.$index)" type="text">
                  <i style="color: red" class="fas fa-trash-alt"></i></el-button
              ></el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="Mã" align="center" width="80">
            <template slot-scope="props">
              {{ props.row.ProductID }}
            </template>
          </el-table-column>
          <el-table-column label="Tên" min-width="140">
            <template slot-scope="props">
              {{ props.row.ProductName }}
            </template>
          </el-table-column>
          <el-table-column label="ĐVT" width="80" align="center">
            <template slot-scope="props">
              {{ props.row.UnitOfMeasure }}
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="Video">
        <el-input
          v-model="form.Video"
          placeholder="Nhập link youtube..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Sway">
        <el-input
          v-model="form.LinkSway"
          placeholder="Nhập link sway..."
        ></el-input>
      </el-form-item>
      <el-form-item label="Link">
        <el-input placeholder="Nhập link..." v-model="form.Link"></el-input>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input
          v-model="form.Note"
          placeholder="Nhập ghi chú..."
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-divider></el-divider>
    <div style="text-align:center;">
      <el-button type="primary" icon="fas fa-plus" @click="create">
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateDocument, UpdateDocument } from "@/api/document";
import { getEmployeeDefine } from "@/api/regu";
import TinyMce from "@/components/Tinymce";

import Cookies from "js-cookie";
export default {
  components: { TinyMce },
  props: ["row", "items"],
  data() {
    return {
      listEmDefine: [],
      officeLst: [],
      token: Cookies.get("token"),
      userName: Cookies.get("idEmployee"),
      form: {
        Content: "",
        Office: "",
        File: "",
        File2: "",
        ProductID: "",
        ProductType: "",
        Note: "",
        Slide: "",
        Video: "",
        Link: "",
        Image: "",
        Catalogue: "",
        ProductDes: "",
        ReviewDes: "",
        LinkSway: "",
        ProductLst: []
      },
      lstType: [
        {
          label: "Sản phẩm",
          value: 1
        },
        {
          label: "Đào tạo kiến thức chuyên sâu",
          value: 2
        },
        {
          label: "Bệnh học",
          value: 3
        },
        {
          label: "Kỹ năng bán hàng",
          value: 4
        },
        {
          label: "Chia sẻ - câu hỏi lâm sàng",
          value: 5
        },
        {
          label: "Sử dụng phần mềm",
          value: 6
        },
        {
          label: "Bao bì sản phẩm",
          value: 7
        },
        {
          label: "Tờ rơi online",
          value: 8
        },
        {
          label: "Quy trình - quy định Upharma",
          value: 9
        }
      ]
    };
  },

  methods: {
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    uploadImageOk(res, file, fileList) {
      if (res.RespCode == 0) {
        if (this.form.ProductType == 1) {
          if (!this.form.Image) this.form.Image = res.FileName;
          else this.form.Image += ";" + res.FileName;
        } else {
          this.form.Image = res.FileName;
        }
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    },
    uploadOk(res, file, fileList) {
      if (res.RespCode == 0) {
        this.form.File = res.FileName;
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    },
    uploadOk2(res, file, fileList) {
      if (res.RespCode == 0) {
        this.form.File2 = res.FileName;
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    },
    uploadOk3(res, file, fileList) {
      if (res.RespCode == 0) {
        this.form.Slide = res.FileName;
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    },
    uploadOk4(res, file, fileList) {
      if (res.RespCode == 0) {
        this.form.Video = res.FileName;
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    },
    uploadOk5(res, file, fileList) {
      if (res.RespCode == 0) {
        this.form.Catalogue = res.FileName;
      } else {
        this.$message({
          message: res.RespText,
          type: "error"
        });
      }
    },
    removeOK1() {
      if (this.row) {
        this.form.Image = this.row.Image;
      } else {
        this.form.Image = "";
      }
    },
    removeOK2() {
      if (this.row) {
        this.form.File = this.row.File;
      } else {
        this.form.File = "";
      }
    },
    removeOK3() {
      if (this.row) {
        this.form.File2 = this.row.File2;
      } else {
        this.form.File2 = "";
      }
    },
    removeOK4() {
      if (this.row) {
        this.form.Slide = this.row.Slide;
      } else {
        this.form.Slide = "";
      }
    },
    removeOK5() {
      if (this.row) {
        this.form.Video = this.row.Video;
      } else {
        this.form.Video = "";
      }
    },
    removeOK5() {
      if (this.row) {
        this.form.Catalogue = this.row.Catalogue;
      } else {
        this.form.Catalogue = "";
      }
    },
    beforeUpload1(file) {
      if (
        !file.type.includes("jpeg") &&
        !file.type.includes("png") &&
        !file.type.includes("jpg")
      ) {
        this.$message.error("File không đúng định dạng");
        return false;
      }
    },
    beforeUpload2(file) {
      if (!file.type.includes("pdf")) {
        this.$message.error("File không đúng định dạng");
        return false;
      }
    },
    beforeUpload3(file) {
      if (!file.type.includes("pdf")) {
        this.$message.error("File không đúng định dạng");
        return false;
      }
    },
    beforeUpload4(file) {
      if (
        !file.type.includes("presentation") &&
        !file.type.includes("powerpoint") &&
        !file.type.includes("pdf")
      ) {
        this.$message.error("File không đúng định dạng");
        return false;
      }
    },
    beforeUpload5(file) {
      if (!file.type.includes("pdf")) {
        this.$message.error("File không đúng định dạng");
        return false;
      }
    },
    create() {
      this.form.Office = this.officeLst.join(";;");
      if (!this.row) {
        CreateDocument({ DocumentInfo: this.form }).then(response => {
          if (response.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Tạo tài liệu thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("addOK");
          }
        });
      } else {
        UpdateDocument({ DocumentInfo: this.form }).then(response => {
          if (response.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật tài liệu thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("addOK");
          }
        });
      }
    },
    getEmployeeDefine() {
      getEmployeeDefine().then(response => {
        if (response.ResCode == 0) {
          this.listEmDefine = response.Data;
        }
      });
    },
    changePro(val) {
      let obj = {
        ProductName: val.ProductName,
        ProductID: val.ProductID,
        UnitOfMeasure: val.UnitOfMeasure
      };
      let i = this.form.ProductLst.findIndex(p => p.ProductID == val.ProductID);
      if (i >= 0) {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Sản phẩm đã tồn tại",
          type: "error",
          position: "top-left"
        });
        return;
      }
      this.form.ProductLst.push(obj);
    },
    delItem(val) {
      this.form.ProductLst.splice(val, 1);
    },
    initData() {
      if (this.row) {
        this.form.DocumentID = this.row.DocumentID;
        this.form.Content = this.row.Content;
        this.form.ProductID = this.row.ProductID;
        this.form.Office = this.row.Office;
        this.form.ProductType = this.row.ProductType;
        this.form.Note = this.row.Note;
        this.form.File = this.row.File;
        this.form.Image = this.row.Image;
        this.form.File2 = this.row.File2;
        this.form.Slide = this.row.Slide;
        this.form.Video = this.row.Video;
        this.form.Link = this.row.Link;
        this.form.Catalogue = this.row.Catalogue;
        this.form.ProductDes = this.row.ProductDes;
        this.form.ReviewDes = this.row.ReviewDes;
        this.form.LinkSway = this.row.LinkSway;
        this.form.ProductLst = this.row.ProductLst ? this.row.ProductLst : [];
        this.officeLst = this.row.Office ? this.row.Office.split(";;") : [];
      } else {
        this.form.DocumentID = "";
        this.form.Content = "";
        this.form.ProductID = "";
        this.form.Office = "";
        this.form.ProductType = "";
        this.form.Note = "";
        this.form.Slide = "";
        this.form.Video = "";
        this.form.Link = "";
        this.form.Image = "";
        this.form.Catalogue = "";
        this.form.ProductDes = "";
        this.form.ReviewDes = "";
        this.form.LinkSway = "";
        this.form.ProductLst = [];

        this.officeLst = [];
      }
    }
  },
  created() {
    this.initData();
    this.getEmployeeDefine();
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {}
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
</style>
