<template>
  <div style="margin-top:-35px">
    <el-row :gutter="20" style="margin-bottom:10px">
      <el-col :xs="24" :sm="8" :lg="8">
        <el-input
          style="width: 100%;"
          class="inline-input"
          size="mini"
          v-model="customerNo"
          placeholder="Mã dự án"
        ></el-input>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <el-input
          style="width:100%"
          class="inline-input"
          size="mini"
          v-model="customerName"
          placeholder="Tên dựa án"
        ></el-input>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <el-select
          v-model="typeCus"
          size="mini"
          placeholder="Chọn kiểu KH"
          style="width: calc(100% - 50px);"
        >
          <el-option
            v-for="item in typeCusLst"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
          size="mini"
          type="primary"
          icon="el-icon-search"
          @click="fetchData"
        ></el-button>
      </el-col>
    </el-row>
    <el-table
      ref="customerBFOModal"
      size="mini"
      v-loading="isLoading"
      border
      fit=""
      highlight-current-row
      :data="tableData"
      @row-click="rowclick"
      @current-change="rowchange"
    >
      <el-table-column label="Mã Dự án" width="150">
        <template slot-scope="scope">{{ scope.row.No_ }}</template>
      </el-table-column>
      <el-table-column label="Tên Dự án" min-width="350">
        <template slot-scope="scope">{{ scope.row.Name }}</template>
      </el-table-column>
      <el-table-column label="Loại dự án" width="200">
        <template slot-scope="scope">{{
          scope.row["Project Posting Group"]
        }}</template>
      </el-table-column>
      <el-table-column label="Ngày bắt đầu" width="200">
        <template slot-scope="scope" v-if="scope.row['Starting Date']">{{
          Date.parse(scope.row["Starting Date"]).toString("dd/MM/yyyy")
        }}</template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
    <div style="text-align:right;margin-bottom:-10px;margin-top:15px">
      <el-button @click="$emit('closeModal')">Cancel</el-button>
      <el-button @click="chooseProject">OK</el-button>
    </div>
  </div>
</template>
<script>
import { GetBFOProject } from "@/api/project";
import { AddProjectToCommissionOrderHeader } from "@/api/debt";
export default {
  props: {
    visible: Boolean,
    type: String,
    coupon: Object
  },
  data() {
    return {
      typeCusLst: [
        {
          value: "ATH",
          label: "ATH"
        },
        {
          value: "THA",
          label: "THA"
        },
        {
          value: "AT_Virtual",
          label: "Áp thầu ảo"
        },
        {
          value: "ALL",
          label: "Tất cả"
        }
      ],
      isLoading: false,
      search: "",
      tableData: [],
      customerNo: "",
      customerName: "",
      typeCus: "ALL",
      selectedCus: null,

      currentPage: 1,
      dataLength: 1000,
      pageSize: 10,

      i: 0
    };
  },
  methods: {
    chooseProject() {
      if (this.selectedCus == null) {
        this.$message({
          message: "Bạn chưa chọn dự án",
          type: "error"
        });
        return;
      }
      //this.$emit('projectAdded',this.selectedCus);

      if (this.coupon.projects == null) {
        this.coupon.projects = [];
      }
      var isExist = false;
      this.coupon.projects.forEach(e => {
        if (e.No_ == this.selectedCus.No_) {
          isExist = true;
        }
      });

      if (!isExist) {
      } else {
        this.$message({
          message: "Dự án đã tồn tại trong phiếu này",
          type: "error"
        });
        return;
      }
      AddProjectToCommissionOrderHeader({
        headerId: this.coupon.RowID,
        prj: this.selectedCus.No_
      }).then(res => {
        var pr = {
          No_: res.Data.ProjectNo,
          Name: this.selectedCus.Name,
          "Starting Date": this.selectedCus["Starting Date"],
          RowID: res.Data.RowID
        };

        this.coupon.projects.unshift(pr);
        this.$emit("closeModal");
      });
    },

    fetchData() {
      if (this.coupon == null) return;
      this.isLoading = true;
      GetBFOProject({
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        cus: this.coupon.idCustomer,
        search: {
          customerNo: this.customerNo,
          customerName: this.customerName,
          typeCus: this.typeCus
        }
      }).then(res => {
        this.tableData = res.Data;
        this.isLoading = false;
        this.dataLength = res.TotalRows;
        //this.selecteRow();
      });
    },

    rowchange(cur) {
      this.selectedCus = cur;
    },
    rowclick(row, col, e) {
      if (row) {
        this.$refs.customerBFOModal.setCurrentRow(row);
      }
    }
  },
  created() {
    this.fetchData();
    if (this.type) {
      this.typeCus = this.type;
    }

    //this.fetchData()
  },

  watch: {
    coupon() {
      this.fetchData();
    },

    pageSize() {
      this.fetchData();
    }
  }
};
</script>
