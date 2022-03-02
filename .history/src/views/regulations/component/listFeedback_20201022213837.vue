<template>
  <div class="container">
    <div class="inline-block">
      <el-input
        placeholder="-- Theo sản phẩm --"
        v-model="ProductNameKey"
      ></el-input>
    </div>
    <div class="inline-block">
      <el-select
        class="selectIDGroup"
        v-model="TypeResKey"
        placeholder="Theo loại phản hồi --"
        style="width:100%"
      >
        <el-option
          v-for="item in TypeLst"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-button icon="el-icon-search" @click="fetchData"> Tìm kiếm</el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        @click="ExportExcel"
        :loading="downloading"
        plain
        >Xuất danh sách</el-button
      >
    </div>
    <div class="inline-block" style="float:right;">
      <span class="demonstration" style="font-size:10pt;font-weight:700;"
        >Từ</span
      >
      <el-date-picker
        v-model="TimeStart"
        type="date"
        format="dd/MM/yyyy"
        placeholder="Từ ngày"
      >
      </el-date-picker>
      <el-date-picker
        v-model="TimeEnd"
        format="dd/MM/yyyy"
        type="date"
        placeholder="Đến ngày"
      >
      </el-date-picker>
    </div>

    <el-table
      class="el-mobile-table"
      v-loading="loading"
      :data="FeedbackProductLst"
      style="width: 100%"
      size="mini"
      border
    >
      <el-table-column width="100px" label="STT" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Loại phản hồi"
        width="120"
        align="center"
        :filters="[
          { text: 'Tích cực', value: 1 },
          { text: 'Báo lỗi', value: 0 }
        ]"
        :filter-method="filterType"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại phản hồi">
            <el-tag
              :type="scope.row.TypeRes | toTypeColor"
              effect="plain"
              style="width:100px"
            >
              {{ scope.row.TypeRes | toTypeText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="Sản phẩm"
        v-if="product == 'ALL'"
        min-width="150"
        prop="ProductName"
        sortable
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Sản phẩm">
            {{ scope.row.ProductName }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Mô tả" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mô tả">
            {{ scope.row.Description }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tần suất lỗi" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tần suất lỗi">
            {{ scope.row.FrequencyError }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hình ảnh lỗi" width="100" height="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hình ảnh lỗi">
            <img
              v-if="scope.row.Image"
              style="width: 100%;"
              :src="scope.row.LinkImage"
              @click="showImage(scope.row.LinkImage)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Lô SP lỗi" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lô SP lỗi">
            {{ scope.row.LotCode }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ảnh lô lỗi" width="100" height="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ảnh lô lỗi">
            <img
              v-if="scope.row.ImageLotCode"
              style="width: 100%;"
              :src="scope.row.LinkLotCodeImage"
              @click="showImage(scope.row.LinkLotCodeImage)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người tạo" width="200">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreateID }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Thời gian tạo" width="150">
        <template slot-scope="scope">
          <div class="dat-cell" label="Thời gian tạo">
            {{ scope.row.TimeCreate }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img :src="dialogImageUrl" alt="" style="width:100%" />
    </el-dialog>
  </div>
</template>
<script>
import { db, storage } from "./firebase";
import Cookies from "js-cookie";
import { GetResponseProduct } from "@/api/product";
import { getStartDate, getEndDate } from "@/api/index";

export default {
  filters: {
    toTypeText(val) {
      if (val == "0") {
        return "Báo lỗi";
      } else if (val == "1") {
        return "Tích cực";
      }
    },
    toTypeColor(val) {
      if (val == "0") {
        return "danger";
      } else if (val == "1") {
        return "success";
      }
    }
  },
  props: ["product"],
  components: {},
  data() {
    return {
      ProductNameKey: "",
      TypeResKey: "",
      FeedbackProductLst: [],
      TextSearch: "",
      dialogVisible: false,
      dialogImageUrl: "",
      show: false,
      downloading: false,
      loading: false,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      ProductName: "",
      TypeRes: "",
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      TypeLst: [
        {
          value: "1",
          label: "Tích cực"
        },
        {
          value: "0",
          label: "Báo lỗi"
        }
      ]
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd,
        ProductName: this.ProductName,
        TypeRes: this.TypeRes
      };
      GetResponseProduct(req).then(res => {
        if (res.RespCode == 0) {
          res.ResponseProductLst.forEach(item => {
            let LinkImage =
              "http://icpc1hn.work/QLTS/File/DownloadProductError?UserName=" +
              this.UserName +
              "&Token=" +
              this.Token +
              "&RowID=" +
              item.RowID;
            let LinkLotCodeImage =
              "http://icpc1hn.work/QLTS/File/DownloadLotProductError?UserName=" +
              this.UserName +
              "&Token=" +
              this.Token +
              "&RowID=" +
              item.RowID;
            const link = {
              LinkImage: LinkImage,
              LinkLotCodeImage: LinkLotCodeImage
            };
            if (item.Image || item.ImageLotCode) {
              item = Object.assign(item, link);
            }
          });
          console.log(res.ResponseProductLst);
          this.FeedbackProductLst = res.ResponseProductLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "error"
          });
        }
      });
      this.loading = false;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Sản phẩm",
        "Loại phản hồi",
        "Mô tả",
        "Tần suất lỗi",
        "Hình ảnh lỗi",
        "Lô sản phẩm lỗi",
        "Ảnh lô sản phẩm lỗi",
        "Người tạo",
        "Ngày tạo"
      ];
      const filterHeader = [
        "ProductName",
        "TypeRes",
        "Description",
        "FrequencyError",
        "Image",
        "LotCode",
        "ImageLotCode",
        "CreateID",
        "TimeCreate"
      ];
      var data = this.FeedbackProductLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename:
            "Danh sách phản hồi về sản phẩm " +
            (this.product.Content ? this.product.Content : ""),
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "TypeRes") {
            return this.toTypeText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    showImage(value) {
      this.dialogImageUrl = value;
      this.dialogVisible = true;
    },
    filterType(value, row) {
      return row.TypeRes === value;
    },
    cancel() {
      this.$emit("cancel");
    },
    toTypeText(val) {
      if (val == "0") {
        return "Báo lỗi";
      } else if (val == "1") {
        return "Tích cực";
      }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    product() {
      this.fetchData();
    },
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.inline-block {
  display: inline-block;
  max-width: 100vh;
  padding: 10px 0px;
}
.pagination {
  margin-top: 10px;
}
.el-button-sample {
  color: #409eff;
}
.el-button-sample:hover {
  color: #e6a23c;
}
</style>
