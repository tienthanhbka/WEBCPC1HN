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
        label-position="left"
        size="small"
        :model="form"
        :rules="infoFormRules"
        label-width="200px"
      >
        <el-form-item label="Mã sản phẩm" prop="ProductId">
          <el-input
            v-model="form.ProductId"
            style="width:100%"
            placeholder="Nhập Mã sản phẩm..."
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
    <div v-if="updateMaterial" class="border-form">
      <el-form
        :model="form"
        ref="materialForm"
        :rules="materialFormRules"
        label-position="left"
        label-width="200px"
        size="mini"
      >
        <!-- <el-tooltip content="Tạo mới" effect="light">
                  <router-link :to="'/nguyen-lieu/ca-nhan'"
                    ><el-button
                      icon="el-icon-plus"
                      style="color:green; float:right;"
                      type="text"
                    ></el-button>
                  </router-link>
                </el-tooltip> -->
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
      <div style="text-align:right;" v-if="updateMaterial">
        <el-button
          type="primary"
          @click="saveMaterial(row)"
          icon="far fa-save"
          size="mini"
        >
          Cập nhật nguyên liệu</el-button
        >
      </div>
    </div>
    <div v-if="!updateMaterial" class="border-form">
      <el-form
        :model="form"
        ref="materialForm"
        :rules="materialFormRules"
        label-position="left"
        label-width="200px"
        size="mini"
      >
        <!-- <el-tooltip content="Tạo mới" effect="light">
          <router-link :to="'/nguyen-lieu/ca-nhan'"
            ><el-button
              icon="el-icon-plus"
              style="color:green; float:right;"
              type="text"
            ></el-button>
          </router-link>
        </el-tooltip> -->
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
          @click="addMaterial(row)"
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
      style="width: 100%;"
      :header-row-style="{ color: '#1c456f' }"
    >
      <el-table-column label="STT" width="80">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
          <el-tooltip content="Chỉnh sửa" placement="top">
            <el-button type="text" @click="UpdateMaterial(scope.row)">
              <i class="el-icon-edit"></i>
            </el-button>
          </el-tooltip>
          <el-tooltip content="Xóa" placement="top">
            <el-button
              type="text"
              @click="delMaterial(scope.row)"
              style="color:red;"
            >
              <i class="el-icon-delete"></i>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="MaterialId" label="Mã nguyên liệu">
        <template slot-scope="scope">
          {{ scope.row.MaterialId }}
        </template>
      </el-table-column>
      <el-table-column prop="MaterialName" label="Tên nguyên liệu">
        <template slot-scope="scope"
          >{{ scope.row.MaterialName }}
        </template>
      </el-table-column>
      <el-table-column prop="TypeMaterial" label="Loại nguyên liệu">
        <template slot-scope="scope">
          {{ scope.row.TypeMaterial }}
        </template>
      </el-table-column>
      <el-table-column prop="Concentration" label="Hàm lượng">
        <template slot-scope="scope">
          {{ scope.row.Concentration }}
        </template>
      </el-table-column>
      <el-table-column prop="Note" label="Ghi chú">
        <template slot-scope="scope">
          {{ scope.row.Note }}
        </template>
      </el-table-column>
    </el-table>
    <el-divider></el-divider>
    <div style="text-align:center; padding:10px;">
      <el-button
        type="warning"
        @click="updateResearch('form')"
        icon="far fa-save"
      >
        Cập nhật</el-button
      >
      <el-button type="info" @click="CancelForm" icon="el-icon-error"
        >Hủy</el-button
      >
    </div>
  </div>
</template>
<script>
import {
  UpdateResearch,
  GetResearchById,
  UpdateResearchLine
} from "@/api/research";
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
        ResearchLineLst: []
      },
      Materials: {
        MaterialId: "",
        MaterialName: "",
        TypeMaterial: "",
        Concentration: "",
        Note: ""
      },
      listMaterial: [],
      updateMaterial: false,
      dialogFormAddMaterial: false,
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
    updateResearch() {
      this.$refs.infoForm.validate(valid => {
        if (valid) {
          var req = {
            UserName: this.UserName,
            Token: this.Token,
            ResearchInfo: this.form
          };
          UpdateResearch(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: " Cập nhật thành công",
                type: "success"
              });
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
          var req2 = {
            UserName: this.UserName,
            Token: this.Token,
            ResearchId: this.research.ResearchId,
            ResearchLineLst: this.listMaterial
          };
          UpdateResearchLine(req2).then(res2 => {
            if (res2.RespCode == 0) {
              this.$message({
                message: "Cập nhật thành công",
                type: "success"
              });
            } else {
              this.$message({
                message: res2.RespText,
                type: "warning"
              });
            }
          });
          this.$emit("researchUpdated");
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
      this.$confirm(
        "Xác nhận xóa nguyên liệu " + row.ProductName + ". Continue?",
        "Xóa nguyên liệu",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          this.listMaterial.splice(index, 1);
        })
        .catch(() => {});
    },
    UpdateMaterial(row) {
      this.updateMaterial = !this.updateMaterial;
      this.Materials.MaterialId = row.MaterialId;
      this.Materials.MaterialName = row.MaterialName;
      this.Materials.TypeMaterial = row.TypeMaterial;
      this.Materials.Concentration = row.Concentration;
      this.Materials.Note = row.Note;
    },
    addMaterial() {
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
    saveMaterial(row) {
      console.log(row);
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
      this.updateMaterial = false;
    },
    initForm() {
      if (this.research) {
        var req = {
          UserName: this.UserName,
          Token: this.Token,
          ResearchId: this.research.ResearchId
        };
        GetResearchById(req).then(res => {
          if (res.RespCode == 0) {
            this.listMaterial = res.ResearchInfo.ResearchLineLst;
            this.form.ResearchId = res.ResearchInfo.ResearchId;
            this.form.ProductId = res.ResearchInfo.ProductId;
            this.form.IdeaId = res.ResearchInfo.IdeaId;
            this.form.ProductName = res.ResearchInfo.ProductName;
            this.form.LinkReport = res.ResearchInfo.LinkReport;
            this.form.ActiveElement = res.ResearchInfo.ActiveElement;
            this.form.Concentration = res.ResearchInfo.Concentration;
            this.form.Packing = res.ResearchInfo.Packing;
          } else {
            this.$message({
              message: res.RespText,
              type: "warning"
            });
          }
        });
      } else {
        this.listMaterial = null;
        this.form.ResearchId = null;
        this.form.ProductId = null;
        this.form.ProductName = null;
        this.form.LinkReport = null;
        this.form.ActiveElement = null;
        this.form.Concentration = null;
        this.form.Packing = null;
        this.form.ResearchLineLst = null;
      }
    }
  }
};
</script>
<style>
.el-dialog__body {
  padding: 0px 20px;
}
</style>
