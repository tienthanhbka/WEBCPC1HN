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
          <el-button size="small" type="primary" icon="el-icon-document"
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
      <!-- <el-form-item label="Vị trí mới">
                    <el-input v-model="form.Title" ></el-input>
                </el-form-item> -->
      <el-form-item label="Vị trí mới">
        <!-- <el-input v-model="form.name" ></el-input> -->
        <el-select
          class="selectIDGroup"
          v-model="form.Title"
          placeholder="Chọn vị trí"
          style="width:100%"
        >
          <el-option
            v-for="item in PoLst"
            :key="item.Position"
            :label="item.Position"
            :value="item.Position"
          ></el-option>
        </el-select>
        <!-- <el-autocomplete
          popper-class="my-autocomplete"
          style="width:100%;"
          v-model="form.Title"
          :fetch-suggestions="querySearch2"
          placeholder="Gõ gợi ý và chọn"
          @select="handleSelect2"
        >
          <i
            class="el-icon-edit el-input__icon"
            slot="suffix"
            @click="handleIconClick2"
          >
          </i>
          <template slot-scope="{ item }">
            <div class="idGroup">{{ item.Position }}</div>
          </template>
        </el-autocomplete> -->
      </el-form-item>
      <el-form-item label="Mô tả">
        <el-input class="selectIDGroup" v-model="form.Description"></el-input>
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
        type="primary"
        size="small"
        icon="fas fa-plus"
        @click="createRegu"
      >
        Xác nhận
      </el-button>
    </div>
  </div>
</template>
<script>
import { CreateEmployeeDecision, GetPositionAll } from "@/api/employeeInfor";
import Cookies from "js-cookie";
export default {
  props: [],
  data() {
    return {
      DecisionName: [
        { value: "Khen Thưởng" },
        { value: "Kỷ luật" },
        { value: "Điều chỉnh thu nhập" },
        { value: "Miễn nhiệm" },
        { value: "Bổ nhiệm" },
        { value: "Thuyên chuyển" },
        { value: "Hợp đồng chính thức" }
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
        Title: "",
        Description: ""
      },
      radio: "1",
      PoLst: []
    };
  },

  methods: {
    querySearch2(queryString, cb) {
      var links = this.PoLst;
      //console.log(links)
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },

    handleSelect2(item) {
      this.form.Title = item.Position;
      //this.changeGroup();
      //this.IDService = item.IDService;
      //console.log(item);
    },
    createFilter2(queryString) {
      return link => {
        //console.log(link)
        link = JSON.parse(JSON.stringify(link));
        //console.log(link)
        return (
          link.Position.toLowerCase().includes(queryString.toLowerCase()) ===
          true
        );
      };
    },

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
      this.fileList = [];
      this.fileList.push(res.Data.fileName);
    },

    createRegu() {
      // this.form.ServiceCode = this.$props.serviceCode + this.form.ServiceCode;
      //console.log(this.form);
      this.form.EmployeeID = this.$route.params.id;
      this.form.FilePath = this.fileList;
      CreateEmployeeDecision(this.form).then(response => {
        console.log(response);
        if (response.ResCode == 0) {
          // this.$emit('click-something',this.form)
          this.$notify({
            title: "Thành công",
            message: "Thêm quyết định NS thành công",
            type: "success",
            position: "top-left"
          });
          // this.fileList=[]
          // this.form.office=[]
          // this.form.file=[]
          //  this.form.timeEnd= ''
          //    this.form.content= ''
          //    this.form.IDGroup= ''
          //    this.form.number= ''
          this.$emit("addOK", this.form);
          // VoerroModal.hide('new-define-modal');
          this.listLoading = false;
        }
      });
    }
    // getEmployeeDefine(){
    //    getEmployeeDefine().then(response => {
    //     if(response.ResCode == 0){
    //         this.listEmDefine = response.Data
    //     }
    //   });
    // }
  },
  created() {
    //this.getEmployeeDefine();
    this.data.EmployeeID = this.$route.params.id;
    GetPositionAll().then(res => {
      this.PoLst = res.Data;
    });
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
