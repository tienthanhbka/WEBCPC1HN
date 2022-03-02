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
    <div v-show="show" class="inline-block" style="float:right;">
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
    </div>
    <div class="body">
      <el-table
        class="el-mobile-table"
        v-loading="loading"
        :data="FeedbackProductLst"
        style="width: 100%"
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
        <el-table-column label="Loại phản hồi" width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại phản hồi">
              {{ scope.row.FeedbackType }}
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
        <el-table-column label="Hình ảnh lỗi" width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hình ảnh lỗi">
              Ảnh
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
        <el-table-column label="Ảnh lô lỗi" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ảnh lô lỗi">
              Ảnh
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Người tạo" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người tạo">
              {{ scope.row.Creator }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian tạo" width="100">
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
    </div>
  </div>
</template>
<script>
import { db, storage } from ".//firebase";
import Cookies from "js-cookie";

export default {
  filters: {
    toStatusText(val) {
      if (val) {
        return "ĐẪ LẤY MẪU";
      } else if (!val) {
        return "Chưa lấy mẫu";
      }
    },
    toStatusColor(val) {
      if (!val) {
        return "info";
      } else if (val) {
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
      show: false
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      let a = [];
      db.ref("FeedbackProduct/" + this.product.RowID).on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
      });
      this.loading = false;
      this.FeedbackProductLst = a;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã mẫu",
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Lô sản xuất",
        "Điều kiện bảo quản",
        "Tình trạng ban đầu",
        "Người chọn mẫu",
        "Ngày tạo",
        "Trạng thái"
      ];
      const filterHeader = [
        "SampleName",
        "ProductID",
        "ProductName",
        "Batch",
        "Condition",
        "Original",
        "Creator",
        "TimeCreate",
        "Status"
      ];
      var data = this.SampleLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách mẫu ",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.ideaStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    }
  },
  created() {},
  watch: {}
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
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
