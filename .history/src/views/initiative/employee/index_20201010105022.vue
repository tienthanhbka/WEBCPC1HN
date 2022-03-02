<template>
  <div class="container">
    <div class="inline-block">
      <el-button
        @click="createInitiative"
        style="background-color:#02bc77;color:white;"
        plain
        icon="fas fa-plus-circle"
      >
        Ý TƯỞNG</el-button
      >
    </div>
    <!-- <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        plain
      ></el-button>
    </div> -->
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
              data.NameOffer.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        border
        fit
      >
        <el-table-column width="80px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-tooltip content="Chỉnh sửa">
                <el-button
                  @click="editOffer(scope.row)"
                  v-if="scope.row.Status == 1 || scope.row.Status == 5"
                  type="text"
                  ><i class="far fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa">
                <el-button
                  v-if="scope.row.Status != 3"
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
                <el-link>{{ scope.row.NameOffer }}</el-link></el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Phân loại" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Phân loại">
              {{ scope.row.TypeOffer }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Người đề xuất" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người đề xuất">
              {{ scope.row.Creator }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Nhóm" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Nhóm">
              {{ scope.row.IDGroup }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="Thời gian đề xuất" width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian đề xuất">
              {{ Date.parse(scope.row.TimeCreate).toString("dd/MM/yyyy") }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="120" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-badge :value="1" class="item" v-if="scope.row.Status == 3">
                <el-popover
                  placement="bottom"
                  title="Đánh giá"
                  width="200"
                  trigger="click"
                >
                  <span style="font-size: 10pt; font-weight: 700;"
                    >{{ scope.row.Comment }}
                  </span>
                  <el-tag
                    :effect="plain"
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
                  trigger="click"
                >
                  <span style="font-size: 10pt; font-weight: 700;"
                    >{{ scope.row.Comment }}
                  </span>
                  <el-tag
                    :effect="plain"
                    :type="scope.row.Status | ideaStatusColor"
                    slot="reference"
                    >{{ scope.row.Status | ideaStatusText }}</el-tag
                  >
                </el-popover>
              </el-badge>

              <el-tag
                style="width:100px;"
                :effect="plain"
                :type="scope.row.Status | ideaStatusColor"
                v-if="
                  scope.row.Status == 1 ||
                    scope.row.Status == 2 ||
                    scope.row.Status == 0
                "
              >
                {{ scope.row.Status | ideaStatusText }}
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
        style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="far fa-lightbulb"></i> &#32;&#32;Đề xuất cải tiến mới
      </span>
      <span
        v-else
        slot="title"
        style="font-weight:700;color: #02bc77;font-size: 20pt;"
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
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="far fa-lightbulb"></i> &#32;&#32;Chi tiết
      </span>
      <detail :offer="rowData" @cancel="cancelView"></detail>
      <span slot="footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { db, storage } from "../firebase";
import Cookies from "js-cookie";
import Create from "../component/createInitiative";
import Detail from "../component/detailInitiative";
export default {
  components: {
    Create,
    Detail
  },
  data() {
    return {
      OfferList: [],
      a: {},
      test: "",
      show: false,
      rowData: "",
      TextSearch: "",
      dialogFormCreate: false,
      dialogFormDetail: false,
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
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
        "Xác nhận xóa đề xuất " + row.NameOffer + ". Continue?",
        "Xóa đề xuất",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          db.ref("/OfferList/" + row.OfferID).update({
            Status: 0,
            UserDel: this.UserName
          });
          this.$message({
            message: "Xóa thành công ",
            type: "success"
          });
          this.fetchData();
        })
        .catch(() => {});
    },
    fetchData() {
      var a = [];
      try {
        db.ref("OfferList").on("value", snap => {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
          this.OfferList = a;
        });
      } catch {}
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
