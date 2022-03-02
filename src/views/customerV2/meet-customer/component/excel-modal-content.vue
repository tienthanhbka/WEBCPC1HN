<template>
  <div>
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :modeImport="modeImport"
    />
    <div style="margin-top:20px;color:#ff7675" v-if="dataError">
      Có lỗi dữ liệu trong file excel, hãy kiểm tra lại các ô màu đỏ!!!
    </div>

    <el-table
      size="mini"
      :data="tableData"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column
        v-for="item of tableHeader"
        :key="item"
        :prop="item"
        :label="item"
      />
    </el-table>
    <el-pagination
      class="pagination"
      :total="tableData.length"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import UploadExcelComponent from "./ImportExcel";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  props: ["modeImport"],
  created() {
    this.tableData = [];
  },
  data() {
    return {
      tableData: [],
      currentTableData: [],
      tableHeader: [],
      pageSize: 10,
      dataError: false,
      currentPage: 1
    };
  },
  watch: {
    pageSize() {
      this.fetchData();
    },
    modeImport() {
      this.tableData = [];
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      console.log(rowIndex, columnIndex);
      var regex = /^[0-9]+$/;
      if (this.modeImport === "place") {
        if (columnIndex === 8) {
          let prop = this.table.KD.cols[columnIndex - 9];
          if (!(row[prop] == null) && !(Number(row[prop]) >= 0)) {
            this.dataError = true;
            return { padding: "0px 0", background: "#ff7675" };
          }
          return { padding: "0px 0" };
        } else if (columnIndex == 17) {
          if (
            !/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(
              row[this.table.KD.headers[16]]
            )
          ) {
            this.dataError = true;
            return { padding: "0px 0", background: "#ff7675" };
          }
        }
        return { padding: "0px 0" };
      }

      if (x.match(regex)) {
        alert("Must input numbers");
        return false;
      }
      // if (this.type == "KD") {
      //   if (columnIndex > 8 && columnIndex < 17) {
      //     let prop = this.table.KD.cols[columnIndex - 9];
      //     if (!(row[prop] == null) && !(Number(row[prop]) >= 0)) {
      //       this.dataError = true;
      //       return { padding: "0px 0", background: "#ff7675" };
      //     }
      //     return { padding: "0px 0" };
      //   } else if (columnIndex == 17) {
      //     if (
      //       !/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(
      //         row[this.table.KD.headers[16]]
      //       )
      //     ) {
      //       this.dataError = true;
      //       return { padding: "0px 0", background: "#ff7675" };
      //     }
      //   }
      //   return { padding: "0px 0" };
      // } else {
      //   if (columnIndex > 9) {
      //     let prop = this.table.TH.cols[columnIndex - 10];
      //     if (!(row[prop] == null) && !(Number(row[prop]) >= 0)) {
      //       this.dataError = true;
      //       return { padding: "0px 0", background: "#ff7675" };
      //     }
      //     return { padding: "0px 0" };
      //   }
      // }
    },
    fetchData() {
      this.currentTableData = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 1;
      if (isLt1M) {
        return true;
      }
      this.$message({
        message: "Please do not upload files larger than 1m in size.",
        type: "warning"
      });
      return false;
    },
    handleSuccess({ results, header }) {
      this.dataError = false;
      // this.tableData = results.filter(o => {
      //   return Number(o.MS) > 1;
      // });
      this.tableData = results;
      this.tableHeader = header;
      this.fetchData();
    }
  }
};
</script>
