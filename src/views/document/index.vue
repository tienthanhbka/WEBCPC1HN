<template>
  <div class="container-doc" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <div class="inline-block">
        <el-select
          v-model="type"
          filterable
          size="small"
          placeholder="Chọn nhóm..."
          style="width:100%"
        >
          <el-option
            v-for="item in lstType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-select
          v-model="typeDoc"
          filterable
          clearable
          size="small"
          placeholder="Chọn loại tài liệu..."
          style="width:100%"
        >
          <el-option
            v-for="item in lstTypeDoc"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-input
          size="small"
          v-model="search"
          placeholder="Nhập để tìm kiếm..."
        ></el-input>
      </div>
      <div class="inline-block">
        <el-button
          class="t-button"
          size="small"
          icon="el-icon-search"
          @click="fetchData"
          circle
        ></el-button>
      </div>
      <div style="float:right" v-if="isAdmin">
        <div class="inline-block">
          <el-button
            class="t-button"
            type="primary"
            size="small"
            @click="create"
            ><i class="fas fa-plus-circle"></i> Thêm mới tài liệu</el-button
          >
        </div>
      </div>
    </div>
    <el-table
      v-loading="loadingTableData"
      :data="tableData"
      style="width:100%"
      border
      fit
      show-header
      class="el-mobile-table"
    >
      <el-table-column align="center" width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="180px" label="Tên">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tên">
            {{ scope.row.Content }}
          </div>
        </template>
      </el-table-column>

      <!-- <el-table-column label="Link" width="120" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Link">
            <el-link
              type="primary"
              v-if="scope.row.Link"
              :href="scope.row.Link"
              target="_blank"
              >FILE</el-link
            >
          </div>
        </template>
      </el-table-column> -->
      <el-table-column width="160px" label="Cập nhật" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cập nhật">
            <span v-if="scope.row.TimeCreate">{{
              Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" label="Đối tượng" v-if="isAdmin">
        <template slot-scope="scope">
          <div class="dat-cell" label="Đối tượng">
            <span v-if="scope.row.Office">{{
              scope.row.Office.replace(/;;/g, ",")
            }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column width="140px" label="Ghi chú">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            {{ scope.row.Note }}
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Actions" width="250px" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Actions">
            <!-- <div class="inline-block">
              <el-tooltip content="Ảnh" placement="top" effect="light">
                <el-button
                  size="mini"
                  :type="scope.row.Image ? 'success' : 'info'"
                  icon="fas fa-images"
                  @click="showImg(scope.row)"
                ></el-button
              ></el-tooltip>
            </div> -->
            <div class="inline-block">
              <el-dropdown
                size="mini"
                split-button
                type="primary"
                @click="view(scope.row, '1')"
              >
                <i class="fas fa-file-alt"></i> Tài liệu
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="scope.row.Image">
                    <el-button
                      style="width: 100%;color:#58ACFA;"
                      size="mini"
                      @click="view(scope.row, '1')"
                      ><i class="fas fa-map"></i>Xem Ảnh</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.File">
                    <el-button
                      style="width: 100%;color:#58ACFA;"
                      size="mini"
                      @click="view(scope.row, '3')"
                      ><i class="fas fa-map"></i>Xem tờ toa</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item v-if="scope.row.File2">
                    <el-button
                      style="width: 100%;color: #67A23C;"
                      size="mini"
                      @click="view(scope.row, '4')"
                      ><i class="fas fa-scroll"></i>Xem tờ rơi</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item v-if="scope.row.Slide">
                    <el-button
                      style="width: 100%;color: #FA8258;"
                      size="mini"
                      @click="view(scope.row, '5')"
                      ><i class="far fa-file-powerpoint"></i>Xem
                      slide</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item v-if="scope.row.Video">
                    <el-button
                      style="width: 100%;color: #F56C6C;"
                      size="mini"
                      @click="view(scope.row, '7')"
                      ><i class="fas fa-photo-video"></i>Xem video</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item v-if="scope.row.Catalogue">
                    <el-button
                      style="width: 100%;color: #67A23C;"
                      size="mini"
                      @click="view(scope.row, '6')"
                      ><i class="fas fa-images"></i>Xem catalogue</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item v-if="scope.row.ProductDes">
                    <el-button
                      style="width: 100%;color: #FA8258;"
                      size="mini"
                      @click="view(scope.row, '2')"
                      ><i class="el-icon-warning-outline"></i>Thông tin chi
                      tiết</el-button
                    ></el-dropdown-item
                  >
                  <el-dropdown-item v-if="scope.row.Link">
                    <el-button
                      style="width: 100%;color: #58ACFA;"
                      size="mini"
                      @click="view(scope.row, '8')"
                      ><i class="el-icon-link"></i>Link</el-button
                    ></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="inline-block" v-if="isAdmin">
              <el-tooltip content="Chỉnh sửa" placement="top" effect="light">
                <el-button
                  size="mini"
                  type="warning"
                  icon="el-icon-edit"
                  @click="edit(scope.row)"
                ></el-button
              ></el-tooltip>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      style="padding:5px;background-color:#fff;margin:0 1px"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-marker"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <create :row="rowData" :items="items" @addOK="addOK"></create>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormImg" custom-class="default-modal">
      <img
        :src="linkImg"
        alt="ảnh tài liệu"
        style="width:100%"
        onerror="this.onerror = null; this.src = 'https://lamdong.gov.vn/Shared%20Documents/images/noPhoto.jpg';"
      />
    </el-dialog>
    <el-drawer
      title=""
      :visible.sync="dialogFormDetail"
      direction="ttb"
      custom-class="drawer-modal"
    >
      <detail :row="rowData" @closeTab="closeTab" :typeView="typeView"></detail>
    </el-drawer>
  </div>
</template>

<script>
import { GetDocument } from "@/api/document";
import { GetItemFast } from "@/api/product";
import Create from "./component/createDoc";
import Detail from "./component/detail";

import Cookies from "js-cookie";
export default {
  components: {
    Create,
    Detail
  },
  data() {
    return {
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      titleDialog: "",
      type: 1,
      search: "",
      linkImg: "",
      rowData: "",
      typeDoc: "",
      typeView: "",
      items: [],
      dialogFormDetail: false,
      titleDrawer: "",
      token: Cookies.get("token"),
      typeEm: Cookies.get("otc"),
      isAdmin: false,
      dialogFormCreate: false,
      dialogFormImg: false,
      loadingTableData: false,
      tableData: [],
      lstType: [
        {
          label: "Sản phẩm",
          value: 1
        },
        {
          label: "Đào tạo kiến thức chuyên sâu",
          value: 2
        },
        {
          label: "Bệnh học",
          value: 3
        },
        {
          label: "Kỹ năng bán hàng",
          value: 4
        },
        {
          label: "Chia sẻ - câu hỏi lâm sàng",
          value: 5
        },
        {
          label: "Sử dụng phần mềm",
          value: 6
        },
        {
          label: "Bao bì sản phẩm",
          value: 7
        },
        {
          label: "Tờ rơi online",
          value: 8
        },
        {
          label: "Quy trình - quy định Upharma",
          value: 9
        }
      ],
      lstTypeDoc: [
        {
          label: "Tờ toa",
          value: 1
        },
        {
          label: "Tờ rơi",
          value: 2
        },
        {
          label: "Slide",
          value: 3
        },
        {
          label: "Video",
          value: 4
        },
        {
          label: "Catalogue",
          value: 5
        }
      ]
    };
  },
  filters: {
    toTypeText(val) {
      if (val == 1) {
        return "Sản phẩm";
      } else if (val == 2) {
        return "Đào tạo kiến thức chuyên sâu";
      } else if (val == 3) {
        return "Bệnh học";
      } else if (val == 4) {
        return "Kỹ năng bán hàng";
      } else if (val == 5) {
        return "Chia sẻ - câu hỏi lâm sàng";
      } else if (val == 6) {
        return "Sử dụng phần mềm";
      } else if (val == 7) {
        return "Bao bì sản phẩm";
      } else if (val == 8) {
        return "Tờ rơi online";
      } else if (val == 9) {
        return "Quy trình - quy định Upharma";
      }
    }
  },
  methods: {
    fetchData() {
      this.tableData = [];
      this.loadingTableData = true;
      const req = {
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        Search: this.search,
        Type: this.type,
        TypeDoc: this.typeDoc ? this.typeDoc : 0
      };
      GetDocument(req).then(res => {
        if (res.RespCode == 0) {
          this.tableData = res.DocumentLst;
          this.dataLength = res.TotalRows;
          this.loadingTableData = false;
        }
      });
    },
    create() {
      this.dialogFormCreate = true;
      this.rowData = "";
      this.titleDialog = "Thêm mới tài liệu";
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    edit(val) {
      this.dialogFormCreate = true;
      this.rowData = val;
      this.titleDialog = "Chỉnh sửa tài liệu";
    },
    view(val, type) {
      this.dialogFormDetail = true;
      this.titleDrawer = val.Content;
      this.rowData = val;
      this.typeView = type;
    },
    showImg(val) {
      this.dialogFormImg = true;
      this.linkImg =
        "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=" +
        val.Image +
        "&Token=" +
        this.token +
        "&TypeFile=0";
    },
    fetchItem() {
      GetItemFast().then(res => {
        if (res.RespCode == 0) {
          this.items = res.ItemLst;
        }
      });
    },
    closeTab() {
      this.dialogFormDetail = false;
    }
  },
  created() {
    this.fetchData();
    this.fetchItem();
    if (this.typeEm == 19 || this.typeEm == 10) {
      this.isAdmin = true;
    }
  },
  watch: {
    type() {
      this.PageNumber = 1;
    },
    pageSize() {
      this.fetchData();
    },
    currentPage() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.container-doc {
  background-color: #f0f2f5;
  .inline-block {
    display: inline-block;
  }
}
</style>
<style lang="scss">
.drawer-modal {
  //width: 80% !important;
  height: auto !important;
  margin: 0 auto;
  padding: 15px;
  .el-drawer__header {
    padding: 0;
    margin: 0;
  }
}
</style>
