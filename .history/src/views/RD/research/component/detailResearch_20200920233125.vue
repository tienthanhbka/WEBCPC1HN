<template>
  <div>
    <div
      style="background-color: #ffffff;font-family: arial,sans-serif,tahoma;"
    >
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
        >
          <el-form-item label="Mã sản phẩm" prop="ProductId">
            <el-input
              class="selectIDGroup"
              v-model="form.ProductId"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Tên sản phẩm tham khảo" prop="ProductName">
            <el-input
              class="selectIDGroup"
              v-model="form.ProductName"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Hoạt chất chính" prop="ActiveElement">
            <el-input
              class="selectIDGroup"
              v-model="form.ActiveElement"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Hàm lượng" prop="Concentration">
            <el-input
              class="selectIDGroup"
              v-model="form.Concentration"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item label="Dạng đóng gói" prop="Packing">
            <el-input
              class="selectIDGroup"
              v-model="form.Packing"
              style="width:100%"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Người tạo">
                <el-input
                  class="selectIDGroup"
                  v-model="form.Creator"
                  style="width:100%"
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :lg="12">
              <el-form-item label="Thời gian tạo">
                <el-input
                  class="selectIDGroup"
                  v-model="form.TimeCreate"
                  style="width:100%"
                  disabled
                >
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <el-divider content-position="left"
        ><span style="font-size:10pt;font-weight:700;"
          >Thông tin nguyên liệu</span
        ></el-divider
      >
      <!-- <div class="border-form">
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
    </div> -->
      <div>
        <el-table
          :data="form.ResearchLineLst"
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
      </div>

      <el-divider></el-divider>
      <div style="text-align:center; padding:10px;">
        <el-button type="info" @click="CancelForm" icon="el-icon-error"
          >Đóng</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { ApproveResearch, GetResearchById } from "@/api/research";
import Cookies from "js-cookie";
export default {
  props: ["research"],
  components: {},
  created() {
    this.initForm();
  },
  watch: {
    research() {
      this.initForm();
    }
  },
  data() {
    return {
      ActiveElement: [],
      form: {
        ResearchId: "",
        ProductId: "",
        IdeaId: "",
        ProductName: "",
        LinkReport: "",
        ActiveElement: "",
        Concentration: "",
        Packing: "",
        Creator: "",
        TimeCreate: "",
        ResearchLineLst: []
      }
    };
  },
  methods: {
    onSubmit() {
      var rep = {
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        ResearchId: this.form.ResearchId,
        Status: 3
      };
      ApproveResearch(rep).then(res => {
        this.$notify({
          title: "Thành công",
          message: "Phê duyệt thành công",
          type: "success",
          position: "top-left"
        });
        this.$emit("acceptResearchOK", this.ResearchInfo);
      });
    },
    initForm() {
      if (this.research == null) {
        this.ResearchInfo.ProductId = null;
        this.ResearchInfo.ProductName = null;
        this.ResearchInfo.LinkReport = null;
        this.ResearchInfo.ActiveElement = null;
        this.ResearchInfo.Concentration = null;
        this.ResearchInfo.Packing = null;
      } else {
        const req = {
          Token: Cookies.get("token"),
          UserName: Cookies.get("idEmployee"),
          ResearchId: this.research.ResearchId
        };
        GetResearchById(req).then(res => {
          if (res.RespCode == 0) {
            this.form.ResearchId = res.ResearchInfo.ResearchId;
            this.form.ProductId = res.ResearchInfo.ProductId;
            this.form.ProductName = res.ResearchInfo.ProductName;
            this.form.LinkReport = res.ResearchInfo.LinkReport;
            this.form.ActiveElement = res.ResearchInfo.ActiveElement;
            this.form.Concentration = res.ResearchInfo.Concentration;
            this.form.Packing = res.ResearchInfo.Packing;
            this.form.IdeaId = res.ResearchInfo.IdeaId;
            this.form.Creator = res.ResearchInfo.CreaterId;
            this.form.TimeCreate = res.ResearchInfo.TimeCreate;
            this.form.ResearchLineLst = res.ResearchInfo.ResearchLineLst;
          }
        });
      }
      console.log(this.form.ResearchLineLst);
    },
    CancelForm() {
      this.$emit("CancelFormDetail");
    }
  }
};
</script>
<style>
.el-dialog__body {
  padding: 0px 20px;
}
</style>
