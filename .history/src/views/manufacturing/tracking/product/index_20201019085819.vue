<template>
  <div class="container">
    <!-- <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        @click="ExportExcel"
        :loading="downloading"
        plain
        >Xuất danh sách</el-button
      >
    </div> -->
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
    <div class="inline-block">
      <el-button
        @click="createProduct"
        style="background-color:#02bc77;color:white;"
        plain
        icon="fas fa-plus-circle"
      >
        SẢN PHẨM</el-button
      >
    </div>
    <div class="body">
      <el-table
        class="el-mobile-table"
        v-loading="loading"
        style="width: 100%"
        :data="ProductLst"
        border
        @expand-change="expand"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table
              :data="scope.row.lines"
              border
              style="width: 100%"
              :header-row-style="{ color: '#1c456f' }"
            >
              <el-table-column>
                <template slot-scope="props">
                  <div class="dat-cell" label="STT">
                    {{ scope.$props + 1 }}
                  </div>
                </template>
              </el-table-column>

              <el-table-column label="Điều kiện lưu" align="center">
                <template slot-scope="props">
                  {{ props.row.Condition }}
                </template>
              </el-table-column>
              <el-table-column label="Số lượng">
                <template slot-scope="props">
                  {{ props.row.Quantity }}
                </template>
              </el-table-column>
              <el-table-column label="Bao bì">
                <template slot-scope="props">
                  {{ props.row.Packing }}
                </template>
              </el-table-column>
              <el-table-column label="NCV phụ trách">
                <template slot-scope="props">
                  {{ props.row.EmployeeName }}
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column width="100px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Sản phẩm" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">
              {{ scope.row.ProductName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hạn dùng" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hạn dùng">
              {{ scope.row.Expired }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thông tin sản phẩm" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thông tin sản phẩm">
              <el-link type="success" :href="scope.row.LinkURL" targer="_blank"
                >LINK</el-link
              >
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column label="Trạng thái" width="140">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái" align="center">
              <el-tag
                style="width:120px"
                :type="scope.row.Status | toStatusColor"
                effect="plain"
              >
                {{ scope.row.Status | toStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-plus-circle"></i> &#32;&#32;Sản phẩm
      </span>
      <create
        @cancel="cancelOK"
        @ProductAdded="ProductAdded"
        :Product="rowData"
        :index="rowData2"
      ></create>
    </el-dialog>

    <el-pagination
      class="pagination"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import { db, storage } from "../component/firebase";
import Create from "../component/createProduct";
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
  components: {
    Create
  },
  data() {
    return {
      SampleLst: [],
      ProductLst: [],
      currentPage: 1,
      dataLength: 10,
      pageSize: 2,
      ImageUrl: "",
      dialogVisible: false,
      dialogFormTime: false,
      dialogFormCreate: false,
      dialogFormDetail: false,
      downloading: false,
      loading: true,
      show: false,
      rowData: "",
      rowData2: "",
      TextSearch: "",
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    createProduct() {
      this.dialogFormCreate = true;
    },
    ProductAdded() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    expand2(row) {
      // let a = [];
      // db.ref("TimeList").on("value", snap => {
      //   if (snap.val()) {
      //     Object.values(snap.val()).forEach(element => {
      //       if (element.SampleName == row.SampleName) {
      //         row.lines2 = element.TargetLst;
      //       }
      //     });
      //   }
      // });
      row.lines2 = row.ProductLineLst;
    },
    delSample(row) {
      this.$confirm(
        "Xác nhận xóa mẫu " + row.ProductName + ". Continue?",
        "Xóa mẫu",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          db.ref("/SampleList/" + row.SampleID).remove();
          this.$message({
            message: "Xóa thành công ",
            type: "success"
          });
          this.fetchData();
        })
        .catch(() => {});
    },
    updateIdeaOK() {},
    cancelOK() {
      this.dialogFormCreate = false;
    },
    fetchData() {
      this.loading = true;
      let a = [];
      db.ref("ProductInfoList/").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
      });
      this.loading = false;
      this.ProductLst = a;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Sản phẩm",
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
    },
    expand(row) {
      let a = [];
      db.ref("SampleList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (element.ProductID == row.ProductID) {
              a.push(element);
            }
          });
          row.lines = a;
        }
      });
    }
  },
  created() {
    this.fetchData();
  },
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
