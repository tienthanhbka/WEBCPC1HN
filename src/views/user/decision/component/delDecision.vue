<template>
  <div slot="body">
    <el-form
      ref="form"
      class="form-custom"
      label-position="left"
      label-width="140px"
      size="mini"
    >
      <div style="margin-bottom: 15px;">
        <el-upload
          class="upload-demo"
          action="https://icpc1hn.work/api/File/UploadFileEmployeeDecision"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="1"
          :data="data"
          :on-exceed="handleExceed"
          :on-success="uploadOk"
          :file-list="fileList"
        >
          <el-button size="small" type="primary"
            >upload file pdf nội dung</el-button
          >
          <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
        </el-upload>
      </div>
      <el-form-item label="Loại quyết định">
        <el-select
          class="selectIDGroup"
          v-model="form.DecisionName"
          placeholder="Chọn loại"
          style="width:100%"
        >
          <el-option
            v-for="item in DecisionName"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="Số quyết định">
        <el-input
          class="selectIDGroup"
          v-model="form.DecisionNumber"
        ></el-input>
      </el-form-item>
      <el-form-item label="Nội dung">
        <el-input class="selectIDGroup" v-model="form.Content"></el-input>
      </el-form-item>
      <el-form-item label="Ngày ra quyết định">
        <el-input
          class="selectIDGroup"
          type="date"
          v-model="form.Date"
        ></el-input>
      </el-form-item>

      <el-form-item label="Ngày hiệu lực">
        <el-input
          class="selectIDGroup"
          type="date"
          v-model="form.DateStart"
        ></el-input>
      </el-form-item>
      <!-- <el-form-item label="Lý do ra quyết định">
                  <el-input  v-model="form.DecisionReason" ></el-input>
                  </el-form-item> -->
    </el-form>

    <div style="text-align:center">
      <el-button
        type="warning"
        size="small"
        icon="fas fa-plus"
        @click="createRegu"
      >
        Xóa quyết định
      </el-button>
    </div>
  </div>
</template>
<script>
import { DelEmployeeDecision } from "@/api/employeeInfor";
import Cookies from "js-cookie";
export default {
  props: ["row"],
  data() {
    return {
      DecisionName: [
        { value: "Khen Thưởng" },
        { value: "Kỷ luật" },
        { value: "Điều chỉnh thu nhập" },
        { value: "Miễn nhiệm" },
        { value: "Bổ nhiệm" },
        { value: "Thuyên chuyển" }
      ],
      listEmDefine: [],
      selectedPlace: [],
      checkboxGroup2: [],
      fileList: [],
      data: {
        EmployeeID: ""
      },
      //  options: [{
      // }],
      token: Cookies.get("token"),
      optionsService: [{}],
      value: Cookies.get("idGroup"),
      form: {
        EmployeeID: "",
        DecisionName: "",
        Date: "",
        Type: "",
        DecisionReason: "",
        DecisionNumber: "",
        DateStart: "",
        FilePath: [],
        Content: "",
        RowID: 0
      },
      radio: "1"
    };
  },

  methods: {
    handleRemove(file, fileList) {
      //console.log(file, fileList);
    },
    handlePreview(file) {
      // console.log(file);
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
      this.form.FilePath = this.fileList;
    },

    createRegu() {
      this.form.RowID = this.row.RowID;
      this.form.EmployeeID = this.$route.params.id;

      DelEmployeeDecision(this.form).then(response => {
        // console.log(response);
        if (response.ResCode == 0) {
          // this.$emit('click-something',this.form)
          this.$notify({
            title: "Thành công",
            message: "Chỉnh sửa quyết định NS thành công",
            type: "success",
            position: "top-left"
          });

          this.$emit("addOK", this.form);
          // VoerroModal.hide('new-define-modal');
          this.listLoading = false;
        }
      });
    },
    initForm() {
      this.form.EmployeeID = this.row.EmployeeID;
      this.form.DecisionName = this.row.DecisionName;
      this.form.Date = this.row.Data;
      this.form.Type = this.row.Type;
      this.form.DecisionReason = this.row.DecisionReason;
      this.form.DecisionNumber = this.row.DecisionNumber;
      this.form.DateStart = this.row.DateStart;
      this.form.FilePath = this.row.FilePath;
      this.form.Content = this.row.Content;
      this.form.RowID = this.row.RowID;
      console.log(this.form);
    }
  },
  created() {
    //this.getEmployeeDefine();
    this.data.EmployeeID = this.$route.params.id;
    this.initForm();
  },
  mounted() {
    //this.links = this.optionsService();
  },
  watch: {
    row: function() {
      this.initForm();
    }
  }
};
</script>

<style>
.my-autocomplete {
  width: 500px;
}
</style>
