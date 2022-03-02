<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        @click="createIdea"
        style="background-color:#02bc77;color:white;"
        plain
        icon="fas fa-plus-circle"
      >
        Ý TƯỞNG</el-button
      >
    </div>
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
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        type="success"
        @click="ExportExcel"
        icon="el-icon-document"
        class="inline-block"
        plain
      ></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-date-picker v-model="TimeEnd" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <div class="inline-block" style="float:right;">
      <el-date-picker v-model="TimeStart" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>

    <create
      :idea="rowData"
      modalId="new-idea-modal"
      @createIdeaOK="createIdeaOK"
      @updateIdeaOK="updateIdeaOK"
    ></create>

    <div class="body">
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="IdeaLst"
        style="width: 100%"
        border
        fit
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column min-width="80px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
              <el-tooltip content="Chỉnh sửa" v-if="scope.row.Status != 3">
                <el-button @click="editIdea(scope.row)" type="text"
                  ><i class="far fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Đề xuất SP" v-if="scope.row.Status == 3">
                <router-link
                  :to="'/nghien-cuu/de-xuat-sp/' + scope.row.DocumentId"
                  ><el-button type="text" style="color: green;margin-right:5px;"
                    ><i class="fas fa-capsules"></i
                  ></el-button>
                </router-link>
              </el-tooltip>
              <el-tooltip content="Báo cáo thị trường">
                <router-link
                  :to="'/y-tuong/bao-cao-thi-truong/' + scope.row.DocumentId"
                  ><el-button type="text" style="color: green;margin-right:5px;"
                    ><i class="far fa-newspaper"></i
                  ></el-button>
                </router-link>
              </el-tooltip>
              <el-tooltip content="Xóa">
                <el-button
                  @click="del(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Mã" min-width="50">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã">{{ scope.row.DocumentId }}</div>
          </template>
        </el-table-column> -->

        <el-table-column label="Ý tưởng" min-width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ý tưởng">{{ scope.row.IdeaName }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Nội dung" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nội dung">
              {{ scope.row.IdeaContent }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hoạt chất" min-width="100">
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
        <el-table-column label="Tài liệu" min-width="50" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tài liệu">
              <el-button
                type="text"
                v-if="scope.row.MoreInfo"
                @click="downloadMoreInfo(scope.row)"
                ><i class="el-icon-document"></i>
              </el-button>
              <!-- <el-button type="success" icon="far fa-arrow-alt-circle-down" circle plain @click="downloadMoreInfo(scope.row)"></el-button> -->
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Khởi tạo" min-width="100" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Khởi tạo">
              {{
                Date.parse(scope.row.TimeCreate).toString("HH:mm dd-MM-yyyy")
              }}
            </div>
          </template>
        </el-table-column>
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
    <!-- <el-dialog title="Phê duyệt ý tưởng" :visible.sync="dialogFormAccept">
        <accept :idea="rowData" @acceptOK="acceptOK"></accept>
        <span slot="footer" class="dialog-footer"> </span>
      </el-dialog> -->
    <!-- <el-dialog title="Xóa ý tưởng" :visible.sync="dialogFormDel">
        <delete
          :idea="rowData"
          @delIdeaOK="delOK"
          @deletecancelOK="DeleteCancelOK"
        ></delete>
        <span slot="footer" class="dialog-footer"></span>
      </el-dialog> -->
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
import { GetIdeaByUser, RemoveIdeaInfo } from "@/api/idea";
import { getStartDate, getEndDate } from "@/api/index";
import Accept from "@/views/RD/idea/admin/component/acceptIdea";
import Create from "@/views/RD/idea/component/createIdea";
import Delete from "@/views/RD/idea/component/deleteIdea";
import Message from "@/views/RD/idea/component/message";
import Cookies from "js-cookie";
import baseUrl from "@/utils/baseURLRD";
import { parseTime } from "@/utils";
export default {
  components: { Create, Delete, Accept, Message },
  data() {
    return {
      IdeaLst: [],
      admin: false,
      rowData: "",
      listLoading: false,
      show: false,
      TextSearch: "",
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      fileList: "",
      currentPage: 1,
      dataLength: 10,
      pageSize: 2,
      downloading: false
    };
  },
  methods: {
    // acceptIdea(row) {
    //   this.dialogFormAccept = true
    //   this.rowData = row
    // },
    // acceptOK() {
    //   this.dialogFormAccept = false
    // },
    // UpdateCancelOK() {
    //   this.dialogFormUpdate = false
    // },
    // DeleteCancelOK() {
    //   this.dialogFormDel = false
    // },
    // updateOK() {
    //   this.fetchData()
    //   this.dialogFormUpdate = false
    // },
    createIdea() {
      VoerroModal.show("new-idea-modal");
      this.rowData = null;
    },
    editIdea(row) {
      VoerroModal.show("new-idea-modal");
      this.rowData = row;
    },
    del(row) {
      this.$confirm(
        "Xác nhận xóa ý tưởng " + row.IdeaName + ". Continue?",
        "Xóa ý tưởng",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          var rep = {
            Token: Cookies.get("token"),
            UserName: Cookies.get("idEmployee"),
            DocumentId: row.DocumentId
          };
          RemoveIdeaInfo(rep).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Xóa ý tưởng thành công",
                type: "success"
              });
              this.fetchData();
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {});
    },
    delOK() {
      this.dialogFormDel = false;
      this.fetchData();
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã ý tưởng",
        "Tên ý tưởng",
        "Nội dung",
        "Hoạt chất",
        "Cách bào chế",
        "Thời gian tạo",
        "Trạng thái"
      ];
      const filterHeader = [
        "DocumentId",
        "IdeaName",
        "IdeaContent",
        "ActiveElement",
        "Preparation",
        "TimeCreate",
        "Status"
      ];
      GetIdeaByUser({
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
          }
          // else if(j === 'Deadline'){
          //   return this.$options.filters.toDate(v[j])
          // }
          else {
            return v[j];
          }
        })
      );
    },
    fetchData() {
      this.listLoading = true;
      GetIdeaByUser({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(res => {
        this.IdeaLst = res.IdeaLst;
        this.admin = res.Admin;
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
    },
    createIdeaOK() {
      VoerroModal.hide("new-idea-modal");
      this.fetchData();
    },
    updateIdeaOK() {
      VoerroModal.hide("new-idea-modal");
      this.fetchData();
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
  padding: 20px;
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
