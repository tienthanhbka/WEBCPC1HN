<template>
  <div class="container">
    <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        @click="ExportExcel"
        :loading="downloading"
        plain
        >Xuất danh sách</el-button
      >
    </div>
    <!-- <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div> -->
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
      <!-- <el-table-column width="100px" label="Actions" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Actions">
              <el-button
                type="text"
                class="el-button-sample"
                @click="createSample(scope.row, scope.$index)"
                >LẤY MẪU</el-button
              >
            </div>
          </template>
        </el-table-column> -->
      <!-- <el-table-column label="Lệnh sản xuất" width="140">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lệnh sản xuất">
              <el-button type="text" @click="viewSample(scope.row)">
                <el-link>{{ scope.row.No_ }}</el-link></el-button
              >
            </div>
          </template>
        </el-table-column> -->
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
              :type="scope.row.FeedbackType | toTypeColor"
              effect="plain"
              style="width:100px"
            >
              {{ scope.row.FeedbackType | toTypeText }}
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
            {{ scope.row.Frequency }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hình ảnh lỗi" width="100" height="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hình ảnh lỗi">
            <img
              v-if="scope.row.LinkImageErr"
              style="width: 100%;"
              :src="scope.row.LinkImageErr"
              @click="showImage(scope.row.LinkImageErr)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Lô SP lỗi" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Lô SP lỗi">
            {{ scope.row.BatchError }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Ảnh lô lỗi" width="100" height="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ảnh lô lỗi">
            <img
              v-if="scope.row.LinkBatchImage"
              style="width: 100%;"
              :src="scope.row.LinkBatchImage"
              @click="showImage(scope.row.LinkBatchImage)"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người tạo" width="200">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            [{{ scope.row.CreaterID }}]-{{ scope.row.Creator }}
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
      <!-- <el-table-column label="Trạng thái" width="140">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái" align="center">
              <el-tag
                style="width:120px"
                :type="scope.row.StatusSample | toStatusColor"
                effect="plain"
              >
                {{ scope.row.StatusSample | toStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column> -->
    </el-table>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img :src="dialogImageUrl" alt="" style="width:100%" />
    </el-dialog>
  </div>
</template>
<script>
import { db, storage } from ".//firebase";
import Cookies from "js-cookie";

export default {
  filters: {
    toTypeText(val) {
      if (val == 0) {
        return "Báo lỗi";
      } else if (val == 1) {
        return "Tích cực";
      }
    },
    toTypeColor(val) {
      if (val == 0) {
        return "danger";
      } else if (val == 1) {
        return "success";
      }
    }
  },
  props: ["product"],
  components: {},
  data() {
    return {
      FeedbackProductLst: [],
      TextSearch: "",
      dialogVisible: false,
      dialogImageUrl: "",
      show: false,
      downloading: false,
      loading: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      let a = [];

      if (this.product == "ALL") {
        // db.ref("FeedbackProduct/").on("value", snap => {
        //   if (snap.val()) {
        //     Object.values(snap.val()).forEach(element => {
        //       a = a.concat(Object.values(element));
        //       console.log(a);
        //     });
        //   }
        // });
        var startDate = 14200000000;
        var endDate = 1608483600000;

        db.ref
          .orderByChild("TimeCreate")
          .startAt(startDate)
          .endAt(endDate)
          .on("FeedbackProduct/64/", function(snapshot) {
            console.log("got the data!", snapshot);
          });
      } else {
        db.ref("FeedbackProduct/" + this.product.RowID).on("value", snap => {
          if (snap.val()) {
            Object.values(snap.val()).forEach(element => {
              a.push(element);
            });
          }
        });
      }
      setTimeout(() => {
        this.FeedbackProductLst = a;
      }, 1000);

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
        "ID",
        "Số điện thoại",
        "Ngày tạo"
      ];
      const filterHeader = [
        "ProductName",
        "FeedbackType",
        "Description",
        "Frequency",
        "LinkImageErr",
        "BatchError",
        "LinkBatchImage",
        "Creator",
        "CreaterID",
        "ID",
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
          if (j === "FeedbackType") {
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
      return row.FeedbackType === value;
    },
    cancel() {
      this.$emit("cancel");
    },
    toTypeText(val) {
      if (val == 0) {
        return "Báo lỗi";
      } else if (val == 1) {
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
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.inline-block {
  display: inline-block;
  max-width: 100vh;
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
