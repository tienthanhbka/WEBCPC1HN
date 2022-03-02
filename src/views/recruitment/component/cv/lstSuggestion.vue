<template>
  <div class="block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <el-button
        class="t-button"
        type="primary"
        @click="addSuggestion"
        size="small"
        ><i class="fas fa-plus-circle"></i> Tạo mới</el-button
      >
      <el-button
        class="t-button"
        style="float:right"
        type="success"
        @click="ExportExcel"
        :loading="downloading"
        size="small"
        ><i class="fas fa-file-excel"></i> xuất Excel</el-button
      >
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="TableData"
      size="small"
      style="width:100%"
      border=""
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="120">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Title" min-width="120px;" label="Tiêu đề">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tiêu đề">
            {{ scope.row.Title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="200px" prop="CVTitle" label="Loại CV">
        <template slot-scope="scope">
          <div class="dat-cell" label="Loại CV">
            {{ scope.row.CVTitle }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="Curator" width="150px" label="Người tạo">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterID }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        width="150px"
        prop="TimeCreate"
        label="Ngày tạo"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngày tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:ss dd/MM/yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="Status"
        width="120px"
        label="Trạng thái"
        align="center"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag
              :type="scope.row.Status | toStatusColor"
              style="width:100px"
              effect="plain"
              >{{ scope.row.Status | toStatusText }}</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" label="Actions" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Actions">
            <el-button-group>
              <el-tooltip content="Chi tiết" placement="top" effect="light">
                <el-button
                  type="primary"
                  @click="viewPost(scope.row)"
                  icon="el-icon-view"
                  size="small"
                ></el-button>
              </el-tooltip>

              <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                <el-button
                  type="warning"
                  icon="el-icon-edit"
                  @click="openEdit(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
              <el-tooltip
                :content="scope.row.Status === 1 ? 'Ẩn' : 'Hiển thị'"
                placement="top"
                effect="light"
              >
                <el-button
                  :type="scope.row.Status === 1 ? 'info' : 'success'"
                  icon="fas fa-dot-circle"
                  @click="approve(scope.row)"
                  size="small"
                ></el-button
              ></el-tooltip>
            </el-button-group>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="pagination"
      style="padding:0;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      :pager-count="5"
      layout="-> , prev, pager, next"
    ></el-pagination>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <span slot="title" class="title-dialog">
        <i class="fas fa-marker"></i> {{ titleDialog }}</span
      >
      <create
        :row="rowData"
        @AddOK="AddOK"
        :mode="modeView"
        @cancelOK="cancelOK"
      ></create>
    </el-dialog>
  </div>
</template>

<script>
import { GetSuggestionLst, DelSuggestionCV } from "@/api/work-dtp/cv";
import Create from "./components/createSuggest";
import Cookies from "js-cookie";
export default {
  filters: {
    toStatusText: function(value) {
      if (value == 0) {
        return "Ẩn";
      }
      if (value == 1) {
        return "Hiển thị";
      }
    },
    toStatusColor: function(value) {
      if (value == 0) {
        return "info";
      }
      if (value == 1) {
        return "success";
      }
    }
  },
  components: { Create },
  props: {},
  data() {
    return {
      TableData: [],
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      titleDialog: "",
      rowData: "",
      UserName: Cookies.get("UserName"),
      Tokencode: Cookies.get("TokenCode"),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      modeView: 0
    };
  },
  methods: {
    openEdit(row) {
      this.rowData = row;
      this.modeView = 3;
      this.dialogFormCreate = true;
      this.titleDialog = "CHỈNH SỬA GỢI Ý CV";
    },
    fetchData() {
      this.loadingTableData = true;
      GetSuggestionLst().then(response => {
        this.loadingTableData = false;
        if (response.RespCode == 0) {
          this.TableData = response.SuggestionLst;
        }
      });
    },
    addSuggestion() {
      this.dialogFormCreate = true;
      this.titleDialog = "TẠO MỚI GỢI Ý CV";
      this.modeView = 1;
    },
    AddOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    viewPost(row) {
      this.dialogFormCreate = true;
      this.titleDialog = "CHI TIẾT GỢI Ý CV";
      this.rowData = row;
      this.modeView = 2;
    },
    approve(row) {
      this.$confirm(
        row.Status === 1
          ? "Đóng gợi ý: " + row.Title + ". Continue?"
          : "Public gợi ý: " + row.Title + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: row.Status === 1 ? "info" : "success"
        }
      )
        .then(() => {
          const req = {
            DocumentID: row.RowID,
            Status: row.Status === 1 ? 0 : 1
          };
          DelSuggestionCV(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message:
                  row.Status === 1
                    ? "Đóng gợi ý thành công"
                    : "Public thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Tiêu đề",
        "Mô tả",
        "Phân loại",
        "Trạng thái",
        "Người tạo",
        "Thời gian tạo",
        "Người chỉnh sửa",
        "Thời gian chỉnh sửa"
      ];
      const filterHeader = [
        "Title",
        "Description",
        "TypeDoc",
        "Status",
        "CreaterID",
        "TimeCreate",
        "ModifyID",
        "TimeModify"
      ];
      var data = this.TableData;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách bài đăng tin", //Optional
          autoWidth: true,
          bookType: "xlsx"
        });
      });
      this.downloading = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.toStatusText(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    cancelOK() {
      this.dialogFormCreate = false;
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.block {
  background-color: #f0f2f5;
}
</style>
