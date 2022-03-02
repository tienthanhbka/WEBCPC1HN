<template>
  <div
    style="background-color: #ffffff;font-family: arial,sans-serif,tahoma;padding=10px;"
  >
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="12">
        <el-divider content-position="left">Thông tin tổng quát</el-divider>
        <el-form
          ref="form"
          :rules="rules"
          :model="IdeaInfo"
          label-position="left"
          label-width="200px"
          size="mini"
          style="padding: 10px;"
        >
          <!-- <el-row :gutter="20">
     <el-col :xs="24" :sm="12" :lg="12"> -->
          <!-- <el-form-item label="Người order" prop="IdeaName">
      <el-input
        class="selectIDGroup"
        placeholder="Nhập người order..."
        v-model="IdeaInfo.IdeaName"
        @keyup.native.enter="handleEnter"
      ></el-input>
    </el-form-item> -->
          <el-form-item label="Tên sản phẩm tham khảo" prop="IdeaContent">
            <el-input
              class="selectIDGroup"
              placeholder="Nhập tên sản phẩm tham khảo..."
              v-model="IdeaInfo.IdeaContent"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Link tham khảo" prop="IdeaContent">
            <el-input
              class="selectIDGroup"
              placeholder="Nhập link tham khảo..."
              v-model="IdeaInfo.IdeaContent"
              type="textarea"
              autosize
            >
            </el-input>
          </el-form-item>
          <!-- </el-col>
     <el-col :xs="24" :sm="12" :lg="12"> -->
          <el-form-item label="Phân nhóm" prop="IdeaContent">
            <el-select
              v-model="a"
              placeholder="Phân nhóm..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in WorkOlds3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Dạng bào chế" prop="IdeaContent">
            <el-select
              placeholder="Chọn dạng bào chế..."
              class="selectIDGroup"
              style="width:100%"
              v-model="b"
            >
              <el-option
                v-for="item in WorkOlds1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Nhóm dược lý" prop="IdeaContent">
            <el-select
              v-model="c"
              placeholder="Chọn nhóm dược lý..."
              class="selectIDGroup"
              style="width:100%"
            >
              <el-option
                v-for="item in WorkOlds2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Ghi chú">
            <el-input
              class="selectIDGroup"
              placeholder="Ghi chú..."
              v-model="IdeaInfo.Preparation"
              type="textarea"
              autosize
            ></el-input>
          </el-form-item>
          <!-- </el-col> -->
          <!-- </el-row> -->
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <el-divider content-position="left">Thông tin hoạt chất</el-divider>
        <el-form
          ref="form"
          :rules="rules"
          :model="IdeaInfo"
          label-position="top"
          label-width="200px"
          size="mini"
          style="padding:10px;"
        >
          <el-row>
            <el-col :xs="24" :sm="24" :lg="24">
              <el-form-item label="Hoạt chất" prop="IdeaContent">
                <el-autocomplete
                  class="selectIDGroup"
                  style="width:100%"
                  v-model="d"
                  :fetch-suggestions="querySearch"
                  placeholder="Chọn hoạt chất..."
                  @select="handleSelect"
                >
                  <i class="el-icon-user-solid" slot="prefix"> </i>
                  <template slot-scope="{ item }">
                    <div class="value">{{ item.ActiveElement }}</div>
                  </template>
                </el-autocomplete>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Mã số CAS" prop="IdeaContent">
                <el-input
                  class="selectIDGroup"
                  placeholder="Nhập mã số CAS..."
                  v-model="IdeaInfo.IdeaContent"
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Hàm lượng" prop="IdeaContent">
                <el-input
                  class="selectIDGroup"
                  placeholder="Nhập hàm lượng..."
                  v-model="IdeaInfo.IdeaContent"
                  type="textarea"
                  autosize
                >
                </el-input>
              </el-form-item>
            </el-col>
            <div style="text-align:right; padding:10px;">
              <el-button
                type="primary"
                @click="onSubmit"
                icon="far fa-save"
                size="mini"
              >
                Lưu lại</el-button
              >
              <el-button
                type="warning"
                @click="onSubmit"
                icon="el-icon-edit"
                size="mini"
                >Chỉnh sửa</el-button
              >
            </div>
            <!-- </el-col> -->
          </el-row>
        </el-form>
        <el-table
          :data="list"
          border
          style="width: 100%"
          :header-row-style="{ color: '#1c456f' }"
        >
          <el-table-column prop="STT" label="STT" width="80"> </el-table-column>
          <el-table-column prop="Name" label="Tên hoạt chất" width="180">
          </el-table-column>
          <el-table-column prop="CAS" label="Mã số CAS"> </el-table-column>
          <el-table-column prop="HL" label="Hàm lượng"> </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-divider></el-divider>
    <div style="text-align:center; padding:10px;">
      <el-button type="primary" @click="onSubmit('form')" icon="far fa-save">
        Lưu lại</el-button
      >
      <el-button type="info" @click="CancelForm" icon="el-icon-error"
        >Hủy</el-button
      >
    </div>
  </div>
</template>
<script>
import { CreateIdeaInfo, UpdateIdeaInfo } from "@/api/idea";
import { uploadFile } from "@/api/file";
import { GetActiveElement } from "@/api/defaultRD";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
import { setTimeout } from "timers";
export default {
  props: ["idea"],
  created() {
    this.initForm();
    GetActiveElement({
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee"),
      Search: ""
    }).then(res => {
      this.ActiveElement = res.ActiveElementLst;
    });
  },
  watch: {
    idea() {
      this.initForm();
    }
  },
  data() {
    return {
      WorkOlds1: [
        {
          value: "3",
          label: "Dung Dịch Uống"
        },
        {
          value: "6",
          label: "Dung Dịch Tiêm"
        },
        {
          value: "10",
          label: "Dung Dịch Dùng Ngoài"
        },
        {
          value: "20",
          label: "Dung Dịch Nhỏ Mắt"
        },
        {
          value: "30",
          label: "Dung Dịch Thụt Trực Tràng"
        },
        {
          value: "40",
          label: "....."
        }
      ],
      WorkOlds2: [
        {
          value: "3",
          label: "A01A B"
        },
        {
          value: "6",
          label: "A01A C"
        },
        {
          value: "10",
          label: "A01A D"
        },
        {
          value: "20",
          label: "A02A A"
        },
        {
          value: "30",
          label: "A02A B"
        }
      ],
      WorkOlds3: [
        {
          value: "3",
          label: "Thuốc"
        },
        {
          value: "6",
          label: "Thực Phẩm Chức Năng"
        },
        {
          value: "10",
          label: "Mỹ Phẩm"
        },
        {
          value: "20",
          label: "Trang Thiết Bị Y Tế"
        },
        {
          value: "30",
          label: "Hóa Chất Diệt Côn Trùng"
        }
      ],
      rules: {
        IdeaName: [
          {
            required: true,
            message: "Hãy nhập nội dung",
            trigger: "change"
          }
        ],
        IdeaContent: [
          {
            required: true,
            message: "Hãy nhập nội dung",
            trigger: "change"
          }
        ],
        WorkOld: [
          {
            required: true,
            message: "Hãy nhập tuổi nghề",
            trigger: "change"
          }
        ],
        EmTypeTxt: [
          {
            required: true,
            message: "Hãy chọn nhân viên",
            trigger: "change"
          }
        ],
        EvalueTypeTxt: [
          {
            required: true,
            message: "Hãy nhập người đánh giá",
            trigger: "change"
          }
        ],
        ReferenceCode: [
          {
            required: true,
            message: "Hãy nhập mã tham chiếu",
            trigger: "change"
          }
        ],
        EvalueLevel: [
          {
            required: true,
            message: "Hãy nhập cấp bậc người đánh giá",
            trigger: "change"
          }
        ],
        EmLevel: [
          {
            required: true,
            message: "Hãy nhập cấp bậc nhân viên",
            trigger: "change"
          }
        ]
      },
      list: [
        {
          STT: "1",
          Name: "Acetaminophen",
          CAS: "7732-18-5",
          HL: "10%"
        },
        {
          STT: "2",
          Name: "L-ornithin L-aspartat",
          CAS: "8007-40-7",
          HL: "20%"
        },
        {
          STT: "3",
          Name: "Triamcinolon",
          CAS: "26655-34-5",
          HL: "30%"
        }
      ],
      ActiveElement: [],
      IdeaInfo: {
        IdeaName: "",
        IdeaContent: "",
        ActiveElement: "",
        Preparation: "",
        MoreInfo: "",
        DocumentId: null
      },
      a: "",
      b: "",
      c: "",
      d: "",
      fileList: [],
      file: null
    };
  },
  computed: {
    uploadFile() {
      return (
        baseUrl +
        "File/UploadFileIdea" +
        "?DocumentId=" +
        this.IdeaInfo.DocumentId +
        "&Token=" +
        Cookies.get("token") +
        "&UserName=" +
        Cookies.get("idEmployee") +
        "&FileName=" +
        (this.file ? this.file.name.split(".", 100)[0] : "")
      );
    }
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.ActiveElement;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    onFileChange(file, fileList) {
      this.file = file;
    },
    handleEnter() {
      alert("hello word");
    },
    handleIconClick2(ev) {
      //console.log(ev);
    },
    handleSelect(item) {
      this.d = item.ActiveElement;
    },
    createFilter2(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.ActiveElement.toLowerCase().includes(
            queryString.toLowerCase()
          ) === 0
        );
      };
    },
    cancelup() {},
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    },
    onSubmit(re) {
      this.$refs[re].validate(valid => {
        if (valid) {
          this.$message({
            message: " Tính năng này đang được phát triển",
            type: "success"
          });
        } else {
          return false;
        }
      });
    },
    CancelForm() {
      this.$emit("cancelForm");
    },
    initForm() {}
  }
};
</script>
<style>
.selectIDGroup .el-input__inner {
  border: 0 !important;
  border-radius: 0 !important;
  border-bottom: 1px solid #dcdfe6 !important;
}
.selectIDGroup .el-textarea__inner {
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid #dcdfe6;
}
</style>
