<template>
  <div>
    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      style="width: 100%"
      :data="tableData"
      border
      size="mini"
      highlight-current-row
    >
      <el-table-column width="80px" label="STT" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-tooltip content="Xóa" placement="top"
              ><el-button @click="Delete(scope.row)" type="text">
                <i style="color: red" class="fas fa-trash-alt"></i></el-button
            ></el-tooltip>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Người duyệt" min-width="180">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người duyệt">
            <span>{{ scope.row.ApproveName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Phòng ban" min-width="120">
        <template slot-scope="scope">
          <div class="dat-cell" label="Phòng ban">
            <span>{{ scope.row.Office }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Chức danh" min-width="120">
        <template slot-scope="scope">
          <div class="dat-cell" label="Chức danh">
            <span>{{ scope.row.Position }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Xác nhận" align="center" width="160">
        <template slot-scope="scope" v-if="scope.row.Status">
          <div class="dat-cell" label="xác nhận">
            <el-tag
              style="width:130px"
              :type="scope.row.Status | handOverStatusColor"
            >
              {{ scope.row.Status | handOverStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Ghi chú" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ghi chú">
            <span>{{ scope.row.Note }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Thời gian" min-width="100">
        <template slot-scope="scope" v-if="scope.row.TimeApprove">
          <div class="dat-cell" label="Thời gian">
            <span>{{
              Date.parse(scope.row.TimeApprove).toString("dd/MM/yyyy")
            }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { GetApproveHandOver, DelApproveHandOver } from "@/api/handOver";
export default {
  props: ["row"],
  components: {},
  data() {
    return {
      listLoading: false,
      tableData: []
    };
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      GetApproveHandOver({ DocumentID: this.row }).then(res => {
        this.tableData = res.ApproveLst;
        this.listLoading = false;
      });
    },
    Delete(row) {
      this.$confirm("Xóa xác nhận. Continue?", "Xác nhận", {
        confirmButtonText: "Xác nhận",
        cancelButtonText: "Hủy",
        type: "error"
      })
        .then(() => {
          const req = {
            DocumentID: row.RowID
          };
          DelApproveHandOver(req).then(res => {
            if (res.RespCode == 0) {
              this.$notify({
                title: "Thành công",
                message: "Xóa bài đăng thành công",
                type: "success",
                position: "top-left"
              });
              this.fetchData();
            }
          });
        })
        .catch(() => {});
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {
    row() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped></style>
