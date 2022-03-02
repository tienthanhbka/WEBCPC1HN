<template>
  <div class="group-block" style="padding:20px">
    <el-table
      v-loading="listLoading"
      class="el-mobile-table"
      :data="listEm"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
          </div>
        </template>
      </el-table-column>

      <el-table-column align="center" width="225px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-button-group>
              <el-tooltip content="Thông tin">
                <router-link
                  :to="'/thong-tin-nhan-vien/' + scope.row.EmployeeID"
                >
                  <el-button size="mini"><i class="far fa-eye"></i></el-button
                ></router-link>
              </el-tooltip>
              <el-tooltip content="Phê duyệt">
                <el-button @click="edit(scope.row)" size="mini" type="primary"
                  ><i class="fas fa-user-check"></i></el-button
              ></el-tooltip>
            </el-button-group>
          </div>
        </template>
      </el-table-column>

      <el-table-column label="Trạng thái" align="right" width="120">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | statusRelativeColor">
              <span>{{ scope.row.Status | statusRelativeText }}</span>
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người thân" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người thân">
            <span>{{ scope.row.RelativeName }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Mối quan hệ" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mối quan hệ">
            <span
              >{{ scope.row.RelativePosition }} -
              {{ scope.row.EmployeeName }}</span
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Giới tính" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Giới tính">
            <span>{{ scope.row.RelativeSex }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="SDT" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="SDT">
            <span>{{ scope.row.RelativePhone }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Địa chỉ" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Địa chỉ">
            <span>{{ scope.row.RelativeAddress }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Nghề nghiệp" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nghề nghiệp">
            <span>{{ scope.row.RelativeJob }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="NPT giảm trừ gia cảnh"
        align="center"
        min-width="100"
      >
        <template slot-scope="scope">
          <div class="dat-cell" label="NPT giảm trừ gia cảnh">
            <span>{{ scope.row.RelativeNPT | toText }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="MST" align="center" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="MST">
            <span>{{ scope.row.RelativeMST }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormEdit" custom-class="default-modal">
      <h3 class="title-dialog" slot="title">
        <i class="fas fa-users"></i>
        <span>{{ titleDialog }}</span>
      </h3>
      <edit :row="rowData" @editOK="editOK"></edit>
    </el-dialog>
    <!-- <el-dialog
      title="Phê duyệt thông tin gia đình"
      :visible.sync="dialogFormEdit"
    >
      <edit :row="rowData" @editOK="editOK"></edit>
      <span slot="footer" class="dialog-footer"> </span>
    </el-dialog> -->
  </div>
</template>
<script>
import { GetInforRelative } from "@/api/employeeInfor";

import Edit from "@/views/user/relative/component/acceptRelative";

export default {
  components: { Edit },
  filters: {
    statusRelativeText: function(value) {
      if (value == 1) {
        return "Chưa duyệt";
      } else if (value == 0) {
        return "Cập nhật lại";
      } else if (value == 2) {
        return "Đã duyệt";
      }
    },
    statusRelativeColor: function(value) {
      if (value == 0) {
        return "warning";
      } else if (value == 1) {
        return "primary";
      } else if (value == 2) {
        return "success";
      }
    },
    toText: function(value) {
      if (value == 1) {
        return "NPT giảm trừ gia cảnh";
      } else {
        return "";
      }
    }
  },
  data() {
    return {
      listEm: [],
      rowData: "",
      titleDialog: "",
      listLoading: false,
      dialogFormUpdate: false,
      dialogFormEdit: false,
      dialogFormDel: false
    };
  },
  methods: {
    edit(row) {
      this.rowData = row;
      this.dialogFormEdit = true;
      this.titleDialog = "Phê duyệt thông tin gia đình";
    },
    editOK() {
      this.dialogFormEdit = false;
    },
    fetchData() {
      this.listLoading = true;
      GetInforRelative({ EmployeeID: this.$route.params.id }).then(res => {
        this.listEm = res.Data;
        this.listLoading = false;
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>
<style scoped>
.group-block {
  background-color: #f0f2f5;
}
</style>
