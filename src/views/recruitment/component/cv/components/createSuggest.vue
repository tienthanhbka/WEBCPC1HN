<template>
  <div>
    <div style="margin-top: 10px;">
      <span class="t-form-label">Tiêu đề:</span>
      <el-select
        style="width:100%"
        v-model="SuggestionInfo.Title"
        placeholder="Chọn mục soạn gợi ý"
      >
        <el-option
          v-for="item in CVTitleLst"
          :key="item.DefaultValue"
          :label="item.DefaultValue"
          :value="item.DefaultValue"
        ></el-option>
      </el-select>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 10px;">
          <span class="t-form-label" style="display:block;">Loại CV:</span>
          <el-select
            style="width:100%"
            v-model="SuggestionInfo.IdCV"
            placeholder="Chọn CV"
          >
            <el-option
              v-for="item in SampleCVLst"
              :key="item.DocumentID"
              :label="item.Title"
              :value="item.DocumentID"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div style="margin-top: 10px;">
          <span class="t-form-label" style="display:block;">Trạng thái:</span>
          <el-select
            style="width:100%;"
            v-model="SuggestionInfo.Status"
            placeholder="Trạng thái bài đăng"
          >
            <el-option
              v-for="item in StatusLst"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <div style="margin-top: 10px;">
      <span style="margin-top: 10px;" class="t-form-label">Nội dung:</span>
      <editor
        api-key="no-api-key"
        v-model="SuggestionInfo.Description"
        :init="{
          menubar: false
        }"
      />
    </div>
    <div style="margin-top:20px;text-align:center">
      <el-button type="info" @click="cancel" size="small"> Đóng</el-button>
      <el-button
        v-if="mode !== 2"
        size="small"
        class="t-button"
        type="primary"
        icon="fas fa-check-double"
        @click="createNewSuggest"
      >
        Xác nhận</el-button
      >
    </div>
  </div>
</template>

<script>
import { GetDefaultValue } from "@/api/work-dtp/defaultValue";
import {
  CreateSuggestionCV,
  UpdateSuggestionCV,
  GetSampleCVByUser
} from "@/api/work-dtp/cv";
import Editor from "@/components/Tinymce/index";
export default {
  name: "",
  components: {
    Editor
  },
  computed: {},
  props: {
    row: {
      type: Object,
      required: true
    },
    mode: Number
  },
  data() {
    return {
      editorData: "<p>Content of the editor.</p>",
      CVTitleLst: [],
      SampleCVLst: [],
      DocumentID: "",
      SuggestionInfo: {
        RowID: "",
        Title: "",
        IdCV: "",
        Description: "",
        Status: "",
        Image: "",
        CVTitle: ""
      },
      StatusLst: [
        {
          label: "Hiển thị",
          value: 1
        },
        {
          label: "Không hiển thị",
          value: 0
        }
      ]
    };
  },
  watch: {},
  methods: {
    fetchDefaultValue() {
      GetDefaultValue({ TableName: "CVTitle" }).then(res => {
        if (res.RespCode === 0) {
          this.CVTitleLst = res.DefaultValueLst;
        }
      });
    },
    fetchSampleCV() {
      GetSampleCVByUser().then(res => {
        if (res.RespCode === 0) {
          this.SampleCVLst = res.SampleCVLst;
        }
      });
    },
    cancel() {
      this.$emit("cancelOK");
    },
    createNewSuggest() {
      var req = {
        SuggestionInfo: this.SuggestionInfo
      };
      if (this.row) {
        UpdateSuggestionCV(req).then(respon => {
          if (respon.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Cập nhật gợi ý thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("AddOK");
          }
        });
      } else {
        CreateSuggestionCV(req).then(respon => {
          if (respon.RespCode == 0) {
            this.$notify({
              title: "Thành công",
              message: "Tạo gợi ý thành công",
              type: "success",
              position: "top-left"
            });
            this.$emit("AddOK");
          }
        });
      }
    },
    initData() {
      if (this.row) {
        (this.SuggestionInfo.RowID = this.row.RowID),
          (this.SuggestionInfo.Title = this.row.Title),
          (this.SuggestionInfo.IdCV = this.row.IdCV),
          (this.SuggestionInfo.Description = this.row.Description),
          (this.SuggestionInfo.CVTitle = this.row.CVTitle),
          (this.SuggestionInfo.Status = this.row.Status);
      } else {
        (this.SuggestionInfo.RowID = ""),
          (this.SuggestionInfo.Title = ""),
          (this.SuggestionInfo.IdCV = ""),
          (this.SuggestionInfo.Description = ""),
          (this.SuggestionInfo.CVTitle = ""),
          (this.SuggestionInfo.Status = "");
      }
    }
  },
  watch: {
    row() {
      this.initData();
    }
  },
  mounted() {},
  created() {
    this.fetchDefaultValue();
    this.initData();
    this.fetchSampleCV();
  }
};
</script>
<style scoped>
.t-form-label {
  font-size: 10pt;
  font-weight: 600;
  color: gray;
  line-height: 20px;
}
</style>
