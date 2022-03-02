<template>
  <div>
    <upload-excel-component
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
    />
    <div style="margin-top:20px;color:#ff7675" v-if="dataError">
      Có lỗi dữ liệu trong file excel, hãy kiểm tra lại các ô màu đỏ!!!
    </div>
    <el-table
      size="mini"
      :cell-style="cellStyle"
      :data="currentTableData"
      border
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column align="center" width="50px" label="STT">
        <template slot-scope="scope">{{
          scope.$index + 1 + (currentPage - 1) * pageSize
        }}</template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in table[type].headers"
        :min-width="table[type].colMinWidth[index]"
        :width="table[type].colWidth[index]"
        :key="item"
        :prop="item"
        :label="item"
      >
        <template slot-scope="{ row }">
          <span>{{ row[item] }}</span>
        </template>
      </el-table-column>
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
import TypeCus from "../const";
export default {
  name: "UploadExcel",
  components: { UploadExcelComponent },
  props: { type: String },
  data() {
    return {
      tableData: [],
      currentTableData: [],
      tableHeader: [],
      pageSize: 10,
      dataError: false,
      currentPage: 1,
      table: {
        KD: {
          cols: TypeCus.KD.map(function(i) {
            return i["text"];
          }),
          headers: [
            "Loại",
            "MS",
            "Mã KH",
            "Tên KH",
            "Mã SP",
            "Tên SP",
            "DV",
            "Đơn giá"
          ].concat(
            TypeCus.KD.map(function(i) {
              return i["text"];
            })
          ),
          colWidth: [
            50,
            52,
            75,
            null,
            70,
            null,
            60,
            100,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          colMinWidth: [
            null,
            null,
            null,
            120,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        },
        TH: {
          cols: TypeCus.TH.map(function(i) {
            return i["text"];
          }),
          headers: [
            "Loại",
            "MS",
            "Mã KH",
            "Tên KH",
            "Mã dự án",
            "Mã SP",
            "Tên SP",
            "DV",
            "Đơn giá"
          ].concat(
            TypeCus.TH.map(function(i) {
              return i["text"];
            })
          ),
          colWidth: [
            50,
            55,
            74,
            null,
            124,
            65,
            null,
            58,
            91,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ],
          colMinWidth: [
            null,
            null,
            null,
            269,
            null,
            null,
            124,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null
          ]
        }
      }
    };
  },
  watch: {
    pageSize() {
      this.fetchData();
    }
  },
  methods: {
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (this.type == "KD") {
        if (columnIndex > 8 && columnIndex < 17) {
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
      } else {
        if (columnIndex > 9) {
          let prop = this.table.TH.cols[columnIndex - 10];
          if (!(row[prop] == null) && !(Number(row[prop]) >= 0)) {
            this.dataError = true;
            return { padding: "0px 0", background: "#ff7675" };
          }
          return { padding: "0px 0" };
        }
      }
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
      this.tableData = results.filter(o => {
        return Number(o.MS) > 1;
      });

      this.fetchData();
    }
  }
};
</script>
