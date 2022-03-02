<template>
  <div class="my-mission-container">
    <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
        >Thêm hướng dẫn</el-button
      >
    </div>
    <div class="inline-block">
      <el-input
        style="width: 70%; "
        class="search"
        placeholder="Tìm kiếm"
        v-model="search"
      ></el-input>
      <el-button class="bt-search" type="infor" @click="fetchData">
        <i class="fas fa-search"></i
      ></el-button>
    </div>
    <div class="inline-block">
      <span style="margin-left:15px;">Loại học tập: </span>
      <el-select
        style="width: 200px;"
        v-model="type"
        placeholder="Chọn loại học tập"
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

    <div>
      <el-table
        :data="tableData"
        class="el-mobile-table"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}

              <!-- <el-tooltip
                style="margin-left: 10px; color: #58ACFA;"
                content="Xem tờ toa"
                placement="top"
              >
                <router-link :to="'/xem-to-toa/' + scope.row.RowID">
                  <i class="fas fa-map"></i> </router-link
              ></el-tooltip>

              <el-tooltip
                style="margin-left: 10px;color: #FA8258;"
                content="Xem tờ rơi"
                placement="top"
              >
                <router-link :to="'/xem-to-roi/' + scope.row.RowID">
                  <i class="fas fa-scroll"></i> </router-link
              ></el-tooltip>

              <el-tooltip
                style="margin-left: 10px;color:#FA8258;"
                content="Xem slide"
                placement="top"
              >
                <router-link :to="'/xem-slide/' + scope.row.RowID">
                  <i class="far fa-file-powerpoint"></i> </router-link
              ></el-tooltip>

              <el-tooltip
                style="margin-left: 10px;color: #58ACFA;"
                content="Xem video"
                placement="top"
              >
                <router-link :to="'/xem-video/' + scope.row.RowID">
                  <i class="fas fa-photo-video"></i> </router-link
              ></el-tooltip> -->
            </div>
            <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
            <!-- <el-tooltip content="Xóa" placement="top"><el-button @click="openModalDeleteDefine(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column width="200px;" label="Ảnh" align="center">
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
        <el-table-column prop="Content" label="Sản phẩm">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ảnh">
              {{ scope.row.Content }}
            </div>
          </template>
        </el-table-column>

        <!-- <el-table-column prop="Number"  label="Số hướng dẫn"></el-table-column> -->
        <el-table-column label="Ngày văn bản">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày ban hành">
              <span>{{ scope.row.TimeCreate | toDate }}</span>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="TimeEnd" label="Hiệu lực"></el-table-column> -->

        <el-table-column prop="Office" label="Các BP liên quan">
          <template slot-scope="scope">
            <div class="dat-cell" label="Các BP liên quan">
              <span>{{ scope.row.Office.replace(/;;/g, ",") }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Link" width="120" align="center">
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
        </el-table-column>
        <el-table-column prop="Note" label="Ghi chú">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ghi chú">
              <span>{{ scope.row.Note }}</span>
            </div>
          </template>
        </el-table-column>
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
                  <el-dropdown-item v-if="type === 5 && scope.row.Link">
                    <!-- <el-button style="width: 100%;color: #F56C6C;" size="mini"
                        ><i class="fas fa-photo-video"></i>Xem video</el-button
                      > -->
                    <el-link
                      :href="scope.row.Link"
                      :underline="false"
                      target="_blank"
                      style="font-size:12px;padding:1px 10px;color:#fbbc04;border:1px solid #ccc;border-radius:4px;"
                    >
                      <i class="fab fa-google-drive"></i> Xem Link
                      Drive</el-link
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      style="width: 100%;color:#58ACFA;"
                      size="mini"
                      @click="FeedbackProduct(scope.row)"
                      ><i class="el-icon-chat-dot-round"></i>Phản hồi</el-button
                    ></el-dropdown-item
                  >
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

      <!-- <el-dialog title="Công bố hướng dẫn mới" :visible.sync="dialogFormCreate" custom-class="default-modal">
        <create @click-something="addOK"></create>
        <span slot="footer" class="dialog-footer">
        </span>
      </el-dialog> -->
      <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <create @click-something="addOK"></create>
      </el-dialog>
      <el-dialog :visible.sync="dialogFormEdit" custom-class="default-modal">
        <h3 class="title-dialog" slot="title">
          <i class="fas fa-marker"></i>
          <span>{{ titleDialog }}</span>
        </h3>
        <edit :row="rowData" @click-something="editOK"></edit>
      </el-dialog>
      <!-- <el-dialog title="Chỉnh sửa" :visible.sync="dialogFormEdit">
        <edit :row="rowData" @click-something="editOK"></edit>

        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog> -->
      <el-dialog
        :visible.sync="dialogFormFeedback"
        custom-class="default-modal"
      >
        <span
          slot="title"
          style="font-weight:700;color: #02bc77;font-size: 20pt;"
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
  </div>
</template>

<script>
import Create from "@/views/regulations/component/create2";
import Feedback from "@/views/regulations/component/feedback";
import ListFeedback from "@/views/regulations/component/listFeedback";
import Edit from "@/views/regulations/component/edit2";
import { parseTime } from "@/utils/index";
import { GetReguDefine2 } from "@/api/regu";
import Cookies from "js-cookie";
import { getStartDate, getEndDate } from "@/api/index";
import { GetGroupEmployee } from "@/api/groups";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    publicTextFilter(Public) {
      if (Public == 1) return "Toàn bộ";
      else return "Trong nhóm";
    },
    publicColorFilter(Public) {
      if (Public == 1) return "success";
      else return "danger";
    },

    requireTextFilter(Require) {
      if (Require == 1) return "Bắt buộc";
      else return "Không bắt buộc";
    },
    requireColorFilter(Require) {
      if (Require == 1) return "success";
      else return "danger";
    }
  },
  components: {
    Create,
    Edit,
    Feedback,
    ListFeedback
  },
  data() {
    return {
      tableData: [],
      type: 1,
      titleDialog: "",
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
        }
      ],
      options: [{}],
      token: Cookies.get("token"),
      ReportID: 0,
      dialogFormCreate: false,
      dialogFormStart: false,
      dialogFormEdit: false,
      dialogFormFeedback: false,
      dialogFormListFeedback: false,
      groupList: [{}],
      codeWork: "",
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      rowData: [],
      rowAction: [],
      rowDefine: [],
      IDService: 0,
      service: [],
      search: "",
      obj: "",
      groups: "",
      visiable: false,
      serviceCode: Cookies.get("otc"),
      token: Cookies.get("token")
    };
  },
  methods: {
    fetchGroup() {
      var req = {
        idEmployee: Cookies.get("idEmployee"),
        token: Cookies.get("token")
      };
      GetGroupEmployee(req).then(response => {
        this.groupList = response.Data;
        this.groups = response.Data[0].idGroup;
      });
    },
    create() {
      this.dialogFormCreate = true;
      this.titleDialog = "Công bố hướng dẫn mới";
    },
    addOK() {
      this.dialogFormCreate = false;
      this.fetchData();
    },

    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
      this.titleDialog = "Chỉnh sửa hướng dẫn";
    },
    editOK() {
      this.dialogFormEdit = false;
      this.fetchData();
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
    fetchOffice() {
      this.listLoading = true;
      getOffice().then(response => {
        this.options = response.Data;
        this.listLoading = false;
      });
    },
    getFeedBackAll() {
      this.dialogFormListFeedback = true;
      this.rowData = "ALL";
    },
    fetchData() {
      var req = {
        token: Cookies.get("token"),
        search: this.search,
        type: this.type,
        pageSize: this.pageSize,
        page: this.currentPage
      };
      this.loadingTableData = true;
      GetReguDefine2(req).then(response => {
        if (response.ResCode == 0) {
          this.tableData = response.Data.sort((a, b) =>
            a.Content.localeCompare(b.Content)
          );
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

    startReport(row) {
      this.ReportID = row.ReportID;
      this.dialogFormStart = true;
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
    this.fetchGroup();
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
  padding: 5px;
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
