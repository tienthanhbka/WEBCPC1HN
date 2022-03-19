<template>
  <div>
    <el-tooltip content="Thêm hóa dự án thầu" placement="top">
      <el-button
        style=" color: #16a085;
    padding: 16px 18px;"
        @click="openProjectModal"
        ><i class="fas fa-plus"></i
      ></el-button>
    </el-tooltip>
    <el-table
      :header-row-style="{ color: '#4834d4' }"
      :data="phanboCoupon.projects"
      v-loading="isLoading"
      fit
      style="width: 100%"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <item
            @addItemClicked="onAddItemClicked"
            :isGroupPage="isGroupPage"
            :project="scope.row"
            :phanboCoupon="phanboCoupon"
            type="TH"
          ></item>
        </template>
      </el-table-column>
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope"
          >{{ scope.$index + 1 }}
          <el-popover
            placement="top-start"
            trigger="hover"
            v-if="scope.row.status != 10"
          >
            <el-button
              style="color:#c0392b"
              type="text"
              size="medium"
              icon="el-icon-delete"
              @click="deleteProject(scope.row)"
              >Xóa</el-button
            >

            <i class="fas fa-boxes" slot="reference" style="color:#4834d4"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column width="170" label="MDA">
        <template slot-scope="{ row }">{{ row.No_ }}</template>
      </el-table-column>
      <el-table-column min-width="170" label="TDA">
        <template slot-scope="{ row }">{{ row.Name }}</template>
      </el-table-column>
      <el-table-column min-width="170" label="N">
        <template slot-scope="{ row }">
          {{
            row["Starting Date"]
              ? Date.parse(row["Starting Date"]).toString("dd/MM/yyyy")
              : ""
          }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Item from "./item";
import {
  GetProjectsOfCommissionOrderHeader,
  DeleteProjectFromCommissionOrderHeader
} from "@/api/debt";
export default {
  props: {
    phanboCoupon: Object,
    isGroupPage: Boolean
  },
  data() {
    return {
      tableData: null,
      isLoading: false
    };
  },
  components: {
    Item
  },
  created() {
    if (this.phanboCoupon.projects == null) {
      this.isLoading = true;
      GetProjectsOfCommissionOrderHeader({
        no: this.phanboCoupon.RowID
      }).then(res => {
        this.isLoading = false;
        this.phanboCoupon.projects = res.Data;
        this.tableData = this.phanboCoupon.projects;
      });
    } else {
      this.tableData = this.phanboCoupon.projects;
    }
  },
  methods: {
    deleteProject(row) {
      this.$confirm("Bạn có muốn xóa dự án này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        DeleteProjectFromCommissionOrderHeader({ RowID: row.RowID }).then(
          res => {
            var idx = this.tableData.indexOf(row);
            this.tableData.splice(idx, 1);
          }
        );
      });
    },
    onAddItemClicked(c, p) {
      this.$emit("openItemModal", c, p);
    },
    openProjectModal() {
      this.$emit("openProjectModal", this.phanboCoupon);
    }
  }
};
</script>
