<template>
  <div class="container">
    <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        plain
        >Xuất danh sách</el-button
      >
    </div>
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
    <!-- <div class="inline-block">
      <el-button
        @click="createTarget"
        style="background-color:#02bc77;color:white;"
        plain
        icon="fas fa-plus-circle"
        >Thêm chỉ tiêu</el-button
      >
    </div> -->
    <div class="body">
      <el-table
        class="el-mobile-table"
        :data="
          SampleLst.filter(
            data =>
              !TextSearch ||
              data.SampleName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        border
        fit
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.IndexLst" border style="width: 100%">
              <el-table-column width="100">
                <template slot-scope="props">
                  {{ props.$index + 1 }}
                  <!-- <el-tooltip content="Chỉnh sửa" v-if="props.row.Status != 3">
                    <el-button @click="editReport(props.row)" type="text"
                      ><i class="far fa-edit"></i></el-button
                  ></el-tooltip>
                  <el-tooltip content="Xóa" v-if="props.row.Status != 3">
                    <el-button
                      @click="delReport(props.row)"
                      type="text"
                      style="color:red;"
                      ><i class="far fa-trash-alt"></i></el-button
                  ></el-tooltip> -->
                </template>
              </el-table-column>
              <el-table-column prop="SampleName" label="Chỉ tiêu">
                <template slot-scope="props">
                  {{ props.row.TargetName }}
                </template>
              </el-table-column>
              <el-table-column prop="TypeIndex" label="Loại">
                <template slot-scope="props">
                  {{ props.row.TypeIndex }}
                </template>
              </el-table-column>
              <el-table-column prop="Creator" label="Mức chất lượng">
                <template slot-scope="props">
                  {{ props.row.Index }}
                </template>
              </el-table-column>
              <el-table-column prop="TimeCreate" label="Đơn vị">
                <template slot-scope="props">
                  {{ props.row.Unit }}
                </template>
              </el-table-column>
              <!-- <el-table-column prop="Note" label="Sai số">
                <template slot-scope="props">
                  {{ props.row.Error }}
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-table-column>
        <el-table-column min-width="50px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-button
                type="text"
                class="el-button-sample"
                @click="createTarget(props.row)"
                >CHỈ TIÊU</el-button
              >
              <!-- <el-tooltip content="Chỉnh sửa" v-if="scope.row.Status != 3">
                <el-button @click="editTarget(scope.row)" type="text"
                  ><i class="far fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa">
                <el-button
                  @click="delTarget(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip> -->
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Mã chỉ tiêu" min-width="80">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã mẫu">{{ scope.row.TargetID }}</div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="Chỉ tiêu" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chỉ tiêu">
              {{ scope.row.TargetName }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="Tên sản phẩm" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Tên sản phẩm">
              <el-button type="text" @click="detailTarget(scope.row)">
                <el-link> {{ scope.row.ProductName }}</el-link>
              </el-button>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Lệnh sản xuất" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lệnh sản xuất">
              {{ scope.row.ProductOrder }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column label="Điều kiện bảo quản" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Điều kiện bảo quản">
              {{ scope.row.Condition }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Thời gian theo dõi" width="200">
          <template slot-scope="scope">
            <div class="dat-cell" label="Thời gian theo dõi">
              {{ scope.row.Time }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Người tạo" width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người tạo">
              {{ scope.row.Creator }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Chỉ số tiêu chuẩn" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Chỉ số tiêu chuẩn">
              {{ scope.row.Index }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Loại chỉ số" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại chỉ số">
              {{ scope.row.TypeIndex }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Sai số" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sai số">
              {{ scope.row.Error }}
            </div>
          </template>
        </el-table-column> -->
        <!-- <el-table-column label="Người tạo" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Người tạo">
               {{ scope.row.Creator }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ngày tạo" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ngày tạo">
               {{ scope.row.TimeCreate }}
            </div>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <span
        v-if="rowData == null"
        slot="title"
        style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-plus-circle"></i> &#32;&#32;Tạo chỉ tiêu
      </span>
      <span
        v-else
        slot="title"
        style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="el-icon-edit"></i> &#32;&#32;Chỉnh sửa chỉ tiêu
      </span>
      <create
        @cancel="cancelOK"
        :target="rowData"
        @TargetAdded="targetAdded"
      ></create>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormDetail" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-plus-circle"></i> &#32;&#32;Chi tiết
      </span>
      <detail @cancelDetail="cancelDetail" :target="rowData"></detail>
    </el-dialog>
    <el-pagination
      class="pagination"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import { db } from "../component/firebase";
import Create from "../component/createTarget";
import Detail from "../component/detailTarget";
export default {
  components: {
    Create,
    Detail
  },
  data() {
    return {
      SampleLst: [],
      dialogFormCreate: false,
      dialogFormDetail: false,
      currentPage: 1,
      dataLength: 10,
      pageSize: 2,
      rowData: "",
      TextSearch: "",
      show: false
    };
  },
  methods: {
    createTarget() {
      this.dialogFormCreate = true;
      this.rowData = null;
    },
    editTarget(row) {
      this.rowData = row;
      this.dialogFormCreate = true;
    },
    targetAdded() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    detailTarget(row) {
      this.rowData = row;
      this.dialogFormDetail = true;
    },
    cancelDetail() {
      this.dialogFormDetail = false;
    },
    delTarget(row) {
      this.$confirm("Xác nhận xóa chỉ tiêu. Continue?", "Xóa chỉ tiêu", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          db.ref("/TargetList/" + row.TargetID).remove();
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
      var a = [];
      db.ref("SampleList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            a.push(element);
          });
        }
      });
      this.SampleLst = a;
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
