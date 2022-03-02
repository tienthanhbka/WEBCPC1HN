<template>
  <div class="container">
    <div v-show="show" class="inline-block">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block">
      <el-button icon="el-icon-search" @click="show = !show" circle></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        style="background-color:#02bc77;color:white;"
        @click="ExportExcel"
        icon="el-icon-document"
        class="inline-block"
        >Xuất danh sách</el-button
      >
    </div>
    <div class="inline-block" style="float: right;">
      <el-date-picker v-model="TimeEnd" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <div class="inline-block" style="float: right;">
      <el-date-picker v-model="TimeStart" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>

    <div class="body">
      <el-table
        class="el-mobile-table"
        :data="
          IdeaLst.filter(
            data =>
              !TextSearch ||
              data.IdeaName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        v-loading="listLoading"
        style="width: 100%"
        border
        fit
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-popover placement="right" width="500" trigger="click">
                <detail-idea :idea="scope.row"></detail-idea>
                <el-button slot="reference" type="text">
                  <i class="far fa-eye"></i>
                </el-button>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="100px" label="Action">
          <template slot-scope="scope">
            <div class="dat-cell" label="Action">
              <el-dropdown size="small" split-button type="primary">
                Chọn
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>
                    <el-button
                      style="width: 100%;"
                      @click="acceptIdea(scope.row)"
                      size="mini"
                      ><i class="fas fa-check-double"></i>Phê duyệt</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      :to="'/nghien-cuu/de-xuat-sp/' + scope.row.DocumentId"
                      ><el-button size="mini" style="width: 100%;"
                        ><i class="fas fa-capsules"></i>Đề xuất SP</el-button
                      >
                    </router-link>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      style="width: 100%;"
                      @click="addUser(scope.row)"
                      size="mini"
                      ><i class="fas fa-user-plus"></i>Thêm NCV</el-button
                    >
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <router-link
                      :to="
                        '/y-tuong/phe-duyet-bao-cao-thi-truong/' +
                          scope.row.DocumentId
                      "
                      ><el-button size="mini" style="width: 100%;"
                        ><i class="far fa-newspaper"></i>BC thị
                        trường</el-button
                      >
                    </router-link>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Mã ý tưởng" width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã ý tưởng">
              {{ scope.row.ReIDIdea }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tên" min-width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên">{{ scope.row.IdeaName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Nội dung" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nội dung">
              {{ scope.row.IdeaContent }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hoạt chất" min-width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hoạt chất">
              {{ scope.row.ActiveElement }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Cách bào chế" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Cách bào chế">
              {{ scope.row.Preparation }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tài liệu" min-width="60" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tài liệu">
              <el-button type="text" @click="downloadMoreInfo(scope.row)"
                ><i class="el-icon-document"></i>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Link" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Link">
              <el-link
                :href="scope.row.LinkIdea"
                target="_blank"
                v-if="scope.row.LinkIdea"
                >LINK
              </el-link>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Khởi tạo" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Khởi tạo">
              {{ scope.row.TimeCreate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Người duyệt" align="center" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người duyệt">
              {{ scope.row.ApproveId }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="Trạng thái" align="center" min-width="80">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag :type="scope.row.Status | ideaStatusColor">
                {{ scope.row.Status | ideaStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <accept
      modalId="new-idea2-modal"
      :idea="rowData"
      @acceptOK="acceptOK"
    ></accept>
    <el-dialog :visible.sync="dialogFormAddUser" class="medium-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-user-plus"></i>&#32;&#32;Thêm nhân viên xem ý tưởng
      </span>
      <addUser
        :idea="rowData"
        @addUserOK="addUserOK"
        @cancelUser="canceladdUserOK"
      ></addUser>
    </el-dialog>
    <el-dialog title="Chi tiết ý tưởng" :visible.sync="dialogFormDetailIdea">
      <detail-idea :idea="rowData"></detail-idea>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import { db } from "@/views/manufacturing/tracking/firebase";
import { GetApprovedIdea, GetIdeaForApprove } from "@/api/idea";
import { getStartDate, getEndDate } from "@/api/index";
import Accept from "@/views/RD/idea/admin/component/acceptIdea";
import AddUser from "@/views/RD/idea/admin/component/addUser";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
import { parseTime } from "@/utils";
import detailIdea from "@/views/RD/idea/component/detailIdea";
export default {
  components: { AddUser, Accept, detailIdea },
  data() {
    return {
      IdeaLst: [],
      rowData: "",
      show: false,
      TextSearch: "",
      listLoading: false,
      dialogFormAccept: false,
      dialogFormAddUser: false,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      downloading: false,
      currentPage: 1,
      dataLength: 0,
      pageSize: 10,
      dialogFormDetailIdea: false
    };
  },
  methods: {
    acceptIdea(row) {
      VoerroModal.show("new-idea2-modal");
      this.rowData = row;
    },
    acceptOK() {
      VoerroModal.hide("new-idea2-modal");
      this.fetchData();
    },
    addUser(row) {
      this.dialogFormAddUser = true;
      this.rowData = row;
    },
    canceladdUserOK() {
      this.dialogFormAddUser = false;
    },
    addUserOK() {
      this.dialogFormAddUser = false;
      this.fetchData();
    },
    DetailIdea(row) {
      this.dialogFormDetailIdea = true;
      this.rowData = row;
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã ý tưởng",
        "Tên ý tưởng",
        "Người tạo",
        "Nội dung",
        "Hoạt chất",
        "Cách bào chế",
        "Thời gian tạo",
        "Thời gian duyệt",
        "Trạng thái"
      ];
      const filterHeader = [
        "DocumentId",
        "IdeaName",
        "CreaterId",
        "IdeaContent",
        "ActiveElement",
        "Preparation",
        "TimeCreate",
        "TimeApprove",
        "Status"
      ];
      GetIdeaForApprove({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(response => {
        var data = response.IdeaLst;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách ý tưởng từ " +
              parseTime(this.TimeStart, "{d}-{m}-{y}").substring(0, 10) +
              " đến " +
              parseTime(this.TimeEnd, "{d}-{m}-{y}"), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
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
    fetchData() {
      this.listLoading = true;
      GetIdeaForApprove({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(res => {
        res.IdeaLst.forEach(element => {
          db.ref("RDIdea").on("value", snap => {
            if (snap.val()) {
              Object.values(snap.val()).forEach(item => {
                if (element.IdeaName == item.IdeaName) {
                  Object.assign(element, item);
                }
              });
            }
          });
        });
        this.IdeaLst = res.IdeaLst;
        this.listLoading = false;
      });
    },
    downloadMoreInfo(row) {
      let url =
        baseUrl +
        "File/DownloadFileIdea" +
        "?UserName=" +
        Cookies.get("idEmployee") +
        "&Token=" +
        Cookies.get("token") +
        "&DocumentId=" +
        row.DocumentId;
      //return url;
      window.open(url);
    }
  },
  created() {
    this.fetchData(),
      (this.TimeStart = getStartDate()),
      (this.TimeEnd = getEndDate());
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    },
    currentPage() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.el-divider--horizontal {
  display: block;
  height: 1px;
  width: 100%;
  margin-bottom: 24px;
  margin-top: 5px;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  margin-top: 10px;
}
</style>
