<template>
  <div class="block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <el-button class="t-button" type="primary" @click="addSample" size="small"
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
      <el-table-column align="center" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}

            <!-- <el-tooltip content="Chỉnh sửa" placement="top" effect="light"
              ><el-button @click="openModalEdit(scope.row)" type="text">
                <i class="fas fa-edit" style="color: #409EFF;"></i></el-button
            ></el-tooltip>
            <el-tooltip
              :content="scope.row.Status === 0 ? 'Hiển thị' : 'Ẩn'"
              placement="top"
              effect="light"
              ><el-button @click="openModalDel(scope.row)" type="text">
                <i
                  style="color: #d10e0e"
                  class="fas fa-power-off"
                ></i></el-button
            ></el-tooltip> -->
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
      <el-table-column width="200px" prop="Language" label="Ngôn ngữ">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ngôn ngữ">
            {{ scope.row.Language }}
          </div>
        </template>
      </el-table-column>
      <el-table-column width="200px" prop="Color" label="Màu sắc">
        <template slot-scope="scope">
          <div class="dat-cell" label="Màu sắc">
            {{ scope.row.Color }}
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column
        width="150px"
        prop="Image"
        label="Ảnh đại diện"
        align="center"
      >
        <template slot-scope="scope">
          <div
            class="dat-cell"
            label="Ảnh đại diện"
            @click="showImage(scope.row.LinkImage)"
          >
            <el-avatar
              :size="60"
              :src="scope.row.LinkImage"
              alt="image"
              shape="square"
              fit="cover"
              @error="errorHandler"
            >
              <img
                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              />
            </el-avatar>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column prop="CreaterID" width="150px" label="Người tạo">
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
                  @click="openModalEdit(scope.row)"
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
import { GetSampleCVByUser, DelSampleCV } from "@/api/work-dtp/cv";
import Create from "./components/createTemplate";
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
      dialogFormEdit: false,
      loadingTableData: false,
      dialogFormCreate: false,
      downloading: false,
      LinkUrl: "",
      rowData: "",
      titleDialog: "",
      modeView: 0,
      UserName: Cookies.get("idEmployee"),
      TokenCode: Cookies.get("token"),
      dataLength: 0,
      pageSize: 10,
      currentPage: 1
    };
  },
  methods: {
    openModalEdit(row) {
      this.rowData = row;
      this.titleDialog = "Chỉnh sửa mẫu CV";
      this.dialogFormCreate = true;
      this.modeView = 3;
    },
    viewPost(row) {
      this.rowData = row;
      this.titleDialog = "Chi tiết mẫu CV";
      this.dialogFormCreate = true;
      this.modeView = 2;
    },
    fetchData() {
      this.loadingTableData = true;
      GetSampleCVByUser().then(response => {
        this.loadingTableData = false;
        if (response.RespCode == 0) {
          this.TableData = response.SampleCVLst;
        }
      });
    },
    addSample() {
      this.dialogFormCreate = true;
      this.titleDialog = "Tạo mới mẫu CV";
      this.modeView = 1;
      this.rowData = {};
    },
    AddOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    approve(line) {
      this.$confirm(
        line.Status === 1
          ? "Ẩn mẫu CV: " + line.Title + ". Continue?"
          : "Hiển thị mẫu CV: " + line.Title + ". Continue?",
        "Xác nhận",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: line.Status === 1 ? "info" : "success"
        }
      )
        .then(() => {
          const req = {
            DocumentID: line.DocumentID,
            Status: line.Status === 1 ? 0 : 1
          };
          DelSampleCV(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message:
                  line.Status === 1
                    ? "Ẩn mẫu CV thành công"
                    : "Public CV thành công",
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
