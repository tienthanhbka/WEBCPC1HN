<template>
  <div style="background-color: #ffffff;font-family: arial,sans-serif,tahoma;">
    <el-divider content-position="left"
      ><span style="font-size:10pt;font-weight:700;"
        >Thông tin sản phẩm</span
      ></el-divider
    >
    <div class="border-form">
      <el-form
        ref="infoForm"
        size="mini"
        label-position="left"
        label-width="200px"
        :model="form"
        :rules="infoFormRules"
      >
        <el-form-item label="Mã sản phẩm" prop="ProductId">
          <el-input
            v-model="form.ProductId"
            style="width:100%"
            placeholder="Nhập mã sản phẩm..."
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Tên sản phẩm tham khảo" prop="ProductName">
          <el-input
            v-model="form.ProductName"
            style="width:100%"
            placeholder="Nhập tên sản phẩm..."
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="Hoạt chất chính" prop="ActiveElement">
          <el-autocomplete
            style="width:100%"
            v-model="form.ActiveElement"
            :fetch-suggestions="querySearch"
            placeholder="Chọn hoạt chất..."
            @select="handleSelect"
          >
            <template slot-scope="{ item }">
              <div class="value">{{ item.ActiveElement }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="Hàm lượng" prop="Concentration">
          <el-input
            v-model="form.Concentration"
            style="width:100%"
            placeholder="Nhập hàm lượng..."
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Dạng đóng gói" prop="Packing">
          <el-select
            v-model="form.Packing"
            placeholder="Chọn dạng đóng gói..."
            style="width:100%"
          >
            <el-option
              v-for="item in PackLst"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="Link báo cáo">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            auto-upload="false"
            :limit="3"
          >
            <el-button size="small" type="info">Tải lên</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <el-divider content-position="left"
      ><span style="font-size:10pt;font-weight:700;"
        >Thông tin nguyên liệu</span
      ></el-divider
    >
    <div class="border-form">
      <el-form
        :model="Materials"
        ref="materialForm"
        :rules="materialFormRules"
        label-position="left"
        label-width="200px"
        size="mini"
      >
        <el-form-item label="Nguyên liệu" prop="MaterialName">
          <el-autocomplete
            v-model="Materials.MaterialName"
            style="width:100%"
            :fetch-suggestions="querySearch2"
            placeholder="Chọn nguyên liệu..."
            @select="handleSelect2"
          >
            <template slot-scope="{ item }">
              <div class="value">{{ item.TypeMaterial }}</div>
              <div class="value">{{ item.MaterialName }}</div>
            </template>
          </el-autocomplete>
        </el-form-item>
        <el-form-item label="Loại nguyên liệu" prop="TypeMaterial" required>
          <el-input
            v-model="Materials.TypeMaterial"
            placeholder="Nhập loại nguyên liệu..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Hàm lượng" prop="Concentration" required>
          <el-input
            v-model="Materials.Concentration"
            placeholder="Nhập Hàm lượng..."
          >
          </el-input>
        </el-form-item>
        <el-form-item label="Ghi chú">
          <el-input
            v-model="Materials.Note"
            placeholder="Nhập ghi chú..."
            type="textarea"
            autosize
          >
          </el-input>
        </el-form-item>
      </el-form>

      <div style="text-align:right;">
        <el-button
          type="success"
          @click="saveMaterial"
          icon="far fa-save"
          size="mini"
        >
          Thêm nguyên liệu</el-button
        >
      </div>
    </div>
    <el-table
      :data="listMaterial"
      border
      style="width: 100%;padding-top:10px;"
      :header-row-style="{ color: '#1c456f' }"
    >
      <el-table-column label="STT" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
          <el-tooltip content="Xóa" placement="top">
            <el-button
              type="text"
              @click="delMaterial(scope.$index)"
              style="color:red;"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="MaterialId" label="Mã nguyên liệu">
      </el-table-column>
      <el-table-column prop="MaterialName" label="Tên nguyên liệu">
      </el-table-column>
      <el-table-column prop="TypeMaterial" label="Loại nguyên liệu">
      </el-table-column>
      <el-table-column prop="Concentration" label="Hàm lượng">
      </el-table-column>
      <el-table-column prop="Note" label="Ghi chú"> </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="text-align:center; padding:10px;">
      <el-button type="primary" @click="addResearch('form')" icon="far fa-save">
        Lưu lại</el-button
      >
      <el-button type="info" @click="CancelForm" icon="el-icon-error"
        >Hủy</el-button
      >
    </div>
  </div>
</template>
<script>
import { CreateResearch, UpdateResearch } from "@/api/research";
import { GetMaterial } from "@/api/material";
import { GetActiveElement } from "@/api/defaultRD";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
import { setTimeout } from "timers";
export default {
  props: ["research", "idea"],
  created() {
    this.initForm();
    GetActiveElement({
      Token: this.Token,
      UserName: this.UserName,
      Search: ""
    }).then(res => {
      this.ActiveElementLst = res.ActiveElementLst;
    });
    GetMaterial({
      Token: this.Token,
      UserName: this.UserName,
      ActiveElement: ""
    }).then(res => {
      if (res.RespCode == 0) {
        this.MaterialLst = res.MaterialLst;
      } else {
        this.$message({
          message: res.RespText,
          type: "warning"
        });
      }
    });
  },
  watch: {
    research() {
      this.initForm();
    }
  },
  data() {
    return {
      infoFormRules: {
        ProductId: [
          {
            required: true,
            message: "Hãy nhập mã sản phẩm",
            trigger: "change"
          }
        ],
        ProductName: [
          {
            required: true,
            message: "Hãy nhập tên sản phẩm",
            trigger: "change"
          }
        ],
        ActiveElement: [
          {
            required: true,
            message: "Hãy chọn hoạt chất",
            trigger: "change"
          }
        ],
        Concentration: [
          {
            required: true,
            message: "Hãy nhập hàm lượng",
            trigger: "change"
          }
        ],
        Packing: [
          {
            required: true,
            message: "Hãy chọn dạng đóng gói",
            trigger: "change"
          }
        ]
      },
      materialFormRules: {
        MaterialName: [
          {
            required: true,
            message: "Hãy chọn nguyên liệu",
            trigger: "change"
          }
        ]
      },
      PackLst: [
        {
          value: "1",
          label: "Túi"
        },
        {
          value: "2",
          label: "Ống"
        },
        {
          value: "3",
          label: "Vỉ"
        },
        {
          value: "4",
          label: "Hộp"
        }
      ],
      AvtiveElementLst: [],
      form: {
        ResearchId: "",
        ProductId: "",
        IdeaId: "",
        ProductName: "",
        LinkReport: "",
        ActiveElement: "",
        Concentration: "",
        Packing: "",
        ResearchLineLst: {}
      },
      Materials: {
        MaterialId: "",
        MaterialName: "",
        TypeMaterial: "",
        Concentration: "",
        Note: ""
      },
      listMaterial: [],
      lines: [],
      MaterialLst: [],
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    querySearch(queryString, cb) {
      var links = this.ActiveElementLst;
      var results = queryString
        ? links.filter(this.createFilter2(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    handleSelect(item) {
      this.form.ActiveElement = item.ActiveElement;
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
    querySearch2(queryString, cb) {
      var links = this.MaterialLst;
      var results = queryString
        ? links.filter(this.createFilter3(queryString))
        : links;
      // call callback function to return suggestion objects
      cb(results);
    },
    handleSelect2(item) {
      this.Materials.MaterialName = item.MaterialName;
      this.Materials.MaterialId = item.MaterialId;
      this.Materials.TypeMaterial = item.TypeMaterial;
    },
    createFilter3(queryString) {
      return link => {
        link = JSON.parse(JSON.stringify(link));
        return (
          link.MaterialName.toLowerCase().includes(
            queryString.toLowerCase()
          ) === 0
        );
      };
    },
    CancelForm() {
      this.$emit("cancelForm");
    },
    addResearch() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          var req = {
            UserName: this.UserName,
            Token: this.Token,
            ResearchInfo: this.form
          };
          this.form.ResearchLineLst = this.listMaterial;
          CreateResearch(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: " Thêm đề xuất thành công",
                type: "success"
              });
              this.$emit("addResearched", this.idea);
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
          // this.form = {
          //   ProductId: "",
          //   ProductName: "",
          //   LinkReport: "",
          //   ActiveElement: "",
          //   Concentration: "",
          //   Packing: ""
          // },
          // this.$refs.infoForm.resetFields();
        }
      });
    },
    CancelForm() {
      this.$emit("cancelForm");
    },
    delMaterial(index) {
      this.listMaterial.splice(index, 1);
    },
    saveMaterial() {
      this.$refs.materialForm.validate(valid => {
        if (valid) {
          this.listMaterial.push({
            MaterialId: this.Materials.MaterialId,
            MaterialName: this.Materials.MaterialName,
            TypeMaterial: this.Materials.TypeMaterial,
            Concentration: this.Materials.Concentration,
            Note: this.Materials.Note
          });
          this.Materials = {
            MaterialId: "",
            MaterialName: "",
            TypeMaterial: "",
            Concentration: "",
            Note: ""
          };
          this.$refs.materialForm.resetFields();
        }
      });
    },
    initForm() {
      if (this.research) {
        this.Materials = this.research.ResearchLineLst;
        this.form.ResearchId = this.research.ResearchId;
        this.form.ProductId = this.research.ProductId;
        this.form.IdeaId = this.research.IdeaId;
        this.form.ProductName = this.research.ProductName;
        this.form.LinkReport = this.research.LinkReport;
        this.form.ActiveElement = this.research.ActiveElement;
        this.form.Concentration = this.research.Concentration;
        this.form.Packing = this.research.Packing;
        this.form.ResearchLineLst = this.research.ResearchLineLst;
      } else {
        this.form.ResearchId = null;
        this.form.ProductId = null;

        this.form.ProductName = null;
        this.form.LinkReport = null;
        this.form.ActiveElement = null;
        this.form.Concentration = null;
        this.form.Packing = null;
        this.form.ResearchLineLst = {};
        if (this.$route.params.id) {
          this.form.IdeaId = this.$route.params.id;
        } else {
          this.form.IdeaId = this.idea.DocumentId;
        }
      }
    }
  }
};
</script>
<style lang="scss">
.el-dialog__body {
  padding: 0px 20px;
}
</style>
