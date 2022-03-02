<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        @click="createInitiative"
        style="background-color:#19B5FE;color:white;"
        plain
        icon="fas fa-plus-circle"
      >
        Ý TƯỞNG</el-button
      >
    </div>
    <!-- <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#19B5FE;color:white;"
        icon="el-icon-document"
        class="inline-block"
        plain
      ></el-button>
    </div> -->
    <div style="float:right;">
      <div class="block">
        <date-picker v-model="TimeStart"></date-picker>
      </div>
      <div class="block">
        <date-picker v-model="TimeStart"></date-picker>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <div v-show="show" class="inline-block" style="float:right;">
        <el-input
          style="width:auto;"
          placeholder="Tìm kiếm theo ý tưởng..."
          v-model="TextSearch"
          prefix-icon="el-icon-search"
        >
        </el-input>
      </div>
    </transition>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <div class="body" style="background-color:#fff;">
      <el-table
        class="el-mobile-table"
        :data="
          OfferList.filter(
            data =>
              !TextSearch ||
              data.OfferName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        stripe
        border
        fit
      >
        <el-table-column width="100px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip content="Chỉnh sửa">
                <el-button @click="editOffer(scope.row)" type="text"
                  ><i class="far fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa">
                <el-button
                  @click="delOffer(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tên ý tưởng" min-width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên ý tưởng">
              <el-button type="text" @click="viewInitiative(scope.row)">
                <el-link>{{ scope.row.OfferName }}</el-link></el-button
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Phân loại" width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Phân loại">
              {{ scope.row.OfferType | toTypeText }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Người đề xuất" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người đề xuất">
              {{ scope.row.CreaterName }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Nhóm" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhóm">
              {{ scope.row.GroupID }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="Thời gian đề xuất" width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian đề xuất">
              {{
                Date.parse(scope.row.TimeCreate).toString("HH:mm dd/MM/yyyy")
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Tài liệu" width="120" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tài liệu">
              <el-link
                type="primary"
                v-if="scope.row.UpFile"
                @click="downloadFile(scope.row)"
                >FILE</el-link
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="120" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <!-- <el-badge :value="1" class="item" v-if="scope.row.Status == 3">
                <el-popover
                  placement="bottom"
                  title="Đánh giá"
                  width="200"
                  trigger="hover"
                >
                  <span style="font-size: 10pt; font-weight: 700;"
                    >{{ scope.row.Comment }}
                  </span>
                  <el-tag
                    effect="plain"
                    style="width:100px;"
                    :type="scope.row.Status | ideaStatusColor"
                    slot="reference"
                    >{{ scope.row.Status | ideaStatusText }}</el-tag
                  >
                </el-popover>
              </el-badge>

              <el-badge :value="1" class="item" v-if="scope.row.Status == 5">
                <el-popover
                  placement="bottom"
                  title="Đánh giá"
                  width="200"
                  trigger="hover"
                >
                  <span style="font-size: 10pt; font-weight: 700;"
                    >{{ scope.row.Comment }}
                  </span>
                  <el-tag
                    effect="plain"
                    style="width:100px;"
                    :type="scope.row.Status | ideaStatusColor"
                    slot="reference"
                    >{{ scope.row.Status | ideaStatusText }}</el-tag
                  >
                </el-popover>
              </el-badge> -->

              <el-tag
                style="width:100px;"
                effect="plain"
                :type="scope.row.Status | toStatusColor"
              >
                {{ scope.row.Status | toStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :page-size="10"
        :total="30"
        background
        layout="total,-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>

    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <span
        v-if="rowData == null"
        slot="title"
        style="font-weight:700;color: #19B5FE;font-size: 20pt;"
        ><i class="far fa-lightbulb"></i> &#32;&#32;Đề xuất cải tiến mới
      </span>
      <span
        v-else
        slot="title"
        style="font-weight:700;color: #F3825B;font-size: 20pt;"
        ><i class="el-icon-edit"></i> &#32;&#32;Chỉnh sửa đề xuất
      </span>
      <create
        :offer="rowData"
        @cancel="cancelOK"
        @OfferAdded="OfferAdded"
        @OfferUpdated="OfferUpdated"
      ></create>
      <span slot="footer"></span>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormDetail" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #19B5FE;font-size: 20pt;"
        ><i class="far fa-lightbulb"></i> &#32;&#32;Chi tiết
      </span>
      <detail :offer="rowData" @cancel="cancelView"></detail>
      <span slot="footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { db, storage } from "../firebase";
import {
  GetOfferIdeaByUser,
  GetOfferIdeaByID,
  GetOfferIdeaByGID,
  DelOfferIdea
} from "@/api/offerIT";
import Cookies from "js-cookie";
import Create from "../component/createInitiative";
import Detail from "../component/detailInitiative";
import DatePicker from "../component/date-picker";
import { getStartDate, getEndDate } from "@/api/index";
export default {
  filters: {
    toTypeText(val) {
      if (val == 2) {
        return "Đề xuất cải tiến";
      } else if (val == 1) {
        return "Phát hiện vấn đề";
      }
    },
    toStatusText(val) {
      if (val == 5) {
        return "Đã đánh giá";
      } else if (val == 3) {
        return "Đã duyệt";
      } else if (val == 1) {
        return "Mới tạo";
      } else if (val == 2) {
        return "Đang chuyển nhóm";
      }
    },
    toStatusColor(val) {
      if (val == 5) {
        return "info";
      } else if (val == 3) {
        return "success";
      } else if (val == 1) {
        return "primary";
      } else if (val == 2) {
        return "warning";
      }
    }
  },
  components: {
    Create,
    Detail,
    DatePicker
  },
  data() {
    return {
      OfferList: [],
      a: {},
      test: "",
      FileUrl: "",
      show: false,
      rowData: "",
      TextSearch: "",
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      dialogFormCreate: false,
      dialogFormDetail: false,
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token")
    };
  },
  methods: {
    downloadFile(row) {
      const Link =
        "https://icpc1hn.work/QLTS/File/DownloadOfferIdea?UserName=" +
        this.UserName +
        "&Token=" +
        this.Token +
        "&OfferID=" +
        row.OfferID;
      window.open(Link);
    },
    createInitiative() {
      this.rowData = null;
      this.dialogFormCreate = true;
    },
    editOffer(row) {
      this.rowData = row;
      this.dialogFormCreate = true;
    },
    OfferAdded() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    OfferUpdated() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    viewInitiative(row) {
      this.rowData = row;
      this.dialogFormDetail = true;
    },
    cancelView() {
      this.dialogFormDetail = false;
    },
    cancelOK() {
      this.dialogFormCreate = false;
    },
    delOffer(row) {
      this.$confirm(
        "Xác nhận xóa đề xuất " + row.OfferName + ". Continue?",
        "Xóa đề xuất",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          const req = {
            UserName: this.UserName,
            Token: this.Token,
            OfferID: row.OfferID
          };
          DelOfferIdea(req).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Xóa thành công ",
                type: "success"
              });
              this.fetchData();
            } else {
              this.$message({
                message: res.RespText,
                type: "error"
              });
            }
          });
          // db.ref("/OfferList/" + row.OfferID).update({
          //   Status: 0,
          //   UserDel: this.UserName
          // });
        })
        .catch(() => {});
    },
    fetchData() {
      const req = {
        UserName: this.UserName,
        Token: this.Token,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      };
      GetOfferIdeaByUser(req).then(res => {
        if (res.RespCode == 0) {
          this.OfferList = res.OfferIdeaLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "error"
          });
        }
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
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
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  padding: 10px;
}
</style>
