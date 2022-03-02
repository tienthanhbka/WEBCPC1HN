<template>
  <div class="my-mission-container">
    <div class="inline-block">
      <el-input
        style="width: 70%; "
        class="item-date-picker"
        placeholder="Tìm kiếm"
        v-model="search"
      ></el-input>
      <el-button class="bt-search" type="infor" circle @click="fetchData">
        <i class="fas fa-search"></i
      ></el-button>
    </div>
    <el-button size="small" @click="sort" type="success"><span v-if="sort_content">Sản mới nhất</span><span v-else>Sắp xếp</span></el-button>
    <div class="inline-block" style="float:right;">
      <el-button
        style="color:#fff;background-color:#02bc77;"
        @click="getFeedBackAll"
        >Danh sách phản hồi
      </el-button>
    </div>

    <div>
      <el-table
        :data="tableData"
        class="el-mobile-table"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="80px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            </div>
            <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
            <!-- <el-tooltip content="Xóa" placement="top"><el-button @click="openModalDeleteDefine(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column width="300px;" label="Ảnh">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ảnh">
              <img
                style="width: 100%;"
                :src="
                  'https://icpc1hn.work/api/' +
                    'File/GetImageProduct/' +
                    scope.row.Image +
                    '?token=' +
                    token
                "
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Content" label="Sản phẩm" min-width="150px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">
              {{ scope.row.Content }}
            </div>
          </template></el-table-column
        >

        <!-- <el-table-column prop="Number"  label="Số hướng dẫn"></el-table-column> -->
        <el-table-column label="Ngày văn bản" width="130px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày văn bản">
              <span>{{ scope.row.TimeCreate | toDate }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="TimeEnd" label="Hiệu lực"></el-table-column> -->

        <el-table-column label="Các BP liên quan" width="170px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Các BP liên quan">
              {{ scope.row.Office.replace(/;;/g, ",") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Note" label="Ghi chú" width="120px">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div>
          </template></el-table-column
        >
        <el-table-column width="140px;" label="Action" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
              <el-dropdown size="small" split-button type="primary">
                Chọn
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <router-link :to="'/xem-to-toa/' + scope.row.RowID">
                      <el-button style="width: 100%;color:#58ACFA;" size="mini"
                        ><i class="fas fa-map"></i>Xem tờ toa</el-button
                      ></router-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link :to="'/xem-to-roi/' + scope.row.RowID">
                      <el-button style="width: 100%;color: #67A23C;" size="mini"
                        ><i class="fas fa-scroll"></i>Xem tờ rơi</el-button
                      ></router-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <router-link :to="'/xem-slide/' + scope.row.RowID">
                      <el-button style="width: 100%;color: #FA8258;" size="mini"
                        ><i class="far fa-file-powerpoint"></i>Xem
                        slide</el-button
                      ></router-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><router-link :to="'/xem-video/' + scope.row.RowID">
                      <el-button style="width: 100%;color: #F56C6C;" size="mini"
                        ><i class="fas fa-photo-video"></i>Xem video</el-button
                      ></router-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item>
                    <el-button
                      style="width: 100%;color:#58ACFA;"
                      size="mini"
                      @click="FeedbackProduct(scope.row)"
                      ><i class="el-icon-chat-dot-round"></i>Phản hồi</el-button
                    ></el-dropdown-item
                  >
                  <!-- <el-dropdown-item>
                    <el-button
                      v-if="visiable"
                      style="width: 100%;color:#67A23C;"
                      size="mini"
                      @click="ListFeedback(scope.row)"
                      ><i class="fas fa-list"></i>DS phản hồi</el-button
                    ></el-dropdown-item
                  > -->
                  <el-dropdown-item>
                    <el-button
                      style="width: 100%;color:#909399;"
                      size="mini"
                      @click="edit(scope.row)"
                      ><i class="fas fa-edit"></i>Chỉnh sửa</el-button
                    ></el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
    <el-dialog :visible.sync="dialogFormFeedback" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="far fa-comment-dots"></i> &#32;&#32;Phản hồi sản phẩm
      </span>
      <feedback
        :product="rowData"
        @FeedbackAdded="FeedbackAdded"
        @cancel="cancelOK"
      ></feedback>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogFormListFeedback"
      custom-class="fullscreen-modal"
    >
      <span slot="title" style="font-weight:700;color:#02bc77">
        &#32;&#32;Danh s&aacute;ch phản hồi về sản phẩm {{ rowData.Content }}
      </span>
      <list-feedback :product="rowData" @cancel="cancelList"></list-feedback>
    </el-dialog>
  </div>
</template>

<script>
import { GetReguDefine2 } from "@/api/regu";
import Cookies from "js-cookie";
import Feedback from "@/views/regulations/component/feedback";
import ListFeedback from "@/views/regulations/component/listFeedback";
import { getStartDate, getEndDate } from "@/api/index";

export default {
  components: { Feedback, ListFeedback },
  data() {
    return {
      tableData: [],
      type: 1,
      sort_content: true,
      token: Cookies.get("token"),
      loadingTableData: false,
      dialogFormListFeedback: false,
      dialogFormFeedback: false,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: "",
      rowData: "",
      serviceCode: Cookies.get("otc"),
      token: Cookies.get("token")
    };
  },
  methods: {
    sort(){
      this.sort_content = !this.sort_content
      this.fetchData()
    },
    fetchData() {
      this.loadingTableData = true;
      var req = {
        token: Cookies.get("token"),
        search: this.search,
        type: this.type,
        pageSize: this.pageSize,
        page: this.currentPage,
        sort_content: this.sort_content
      };
      GetReguDefine2(req).then(response => {
        if (response.ResCode == 0) {
          this.tableData = response.Data;
          this.currentPage = response.PageNumber;
          this.pageSize = response.RowspPage;
          this.total = response.TotalPage * response.RowspPage;

          this.tableData.forEach(myFunction);
          function myFunction(item, index, arr) {
            if (item.File != "") {
              item.File = item.File.split(";;", 100);
            }
          }
          this.loadingTableData = false;
        }
      });
    },
    FeedbackProduct(row) {
      this.dialogFormFeedback = true;
      this.rowData = row;
    },
    FeedbackAdded() {
      this.dialogFormFeedback = false;
      this.fetchData();
    },
    ListFeedback(row) {
      this.dialogFormListFeedback = true;
      this.rowData = row;
    },
    cancelList() {
      this.dialogFormListFeedback = false;
    },
    cancelOK() {
      this.dialogFormFeedback = false;
    },
    getFeedBackAll() {
      this.dialogFormListFeedback = true;
      this.rowData = "ALL";
    }
  },
  watch: {
    type: function() {
      this.fetchData();
    },
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.my-mission-container {
  background-color: $bg;
  padding: 5px;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}

.el-dialog {
  -webkit-transform: none;
  transform: none;
  left: 0;
  position: relative;
  margin: 0 auto;
  width: 50%;
}
</style>
