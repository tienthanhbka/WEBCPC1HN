<template>
  <div class="app-container">
    <div style="float:right; margin-bottom:10px">
      <el-date-picker
        v-model="startDate"
        size="small"
        type="date"
        placeholder="Từ ngày"
      >
      </el-date-picker>
      <el-date-picker
        v-model="endDate"
        size="small"
        type="date"
        placeholder="Đến ngày"
      >
      </el-date-picker>
      <el-button
        type="success"
        size="small"
        v-loading="downloading"
        @click="tabletoExcel('tbldata', 'Dữ liệu khảo sát')"
        ><i class="fas fa-file-excel"></i> Xuất Excel</el-button
      >
    </div>
    <el-table
      :data="dataTable"
      v-loading="loadingTable"
      id="tbldata"
      element-loading-text="Loading"
      border
      highlight-current-row
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">{{ scope.$index + 1 }}</template>
      </el-table-column>
      <el-table-column label="SĐT" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.IDEmployee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tên" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.NameEmployee }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Thời gian" align="center" min-width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.Time }}</span>
        </template>
      </el-table-column>
      <div v-for="(content, a) in contents" :key="a">
        <el-table-column :label="content" align="center" min-width="100">
          <template slot-scope="scope">
            <div v-for="(ans, index) in scope.row.Answer" :key="index">
              <span v-if="index == a">{{ ans }}</span>
            </div>
          </template>
        </el-table-column>
      </div>
    </el-table>
  </div>
</template>

<script>
import { GetResult } from "@/api/survey";
import { getStartMonth, getEndMonth } from "@/api/index";

export default {
  data() {
    return {
      lines: [],
      contents: [],
      dataTable: [],
      loadingTable: false,
      downloading: false,
      startDate: getStartMonth(),
      endDate: getEndMonth()
    };
  },
  methods: {
    fetchResponse() {
      this.loadingTable = true;
      var req = {
        ID: this.$route.params.id,
        DateStart: this.startDate,
        DateEnd: this.endDate
      };
      GetResult(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data;
          this.contents = response.Data[0];
          this.dataTable = response.Data[1];
          this.loadingTable = false;
        }
      });
    },

    tabletoExcel(table, filename) {
      this.downloading = true;
      // var uri = "data:application/vnd.ms-excel;base64,",
      //   template =
      //     '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>',
      //   base64 = function(s) {
      //     return window.btoa(unescape(encodeURIComponent(s)));
      //   },
      //   format = function(s, c) {
      //     return s.replace(/{(\w+)}/g, function(m, p) {
      //       return c[p];
      //     });
      //   };
      // if (!table.nodeType) table = document.getElementById(table);
      // var ctx = { worksheet: name || "Worksheet", table: table.innerHTML };

      // window.location.href = uri + base64(format(template, ctx));
      var downloadLink;
      var dataType = "application/vnd.ms-excel";
      var tableSelect = document.getElementById(table);
      var tableHTML = tableSelect.outerHTML.replace(/ /g, "%20");

      // Specify file name
      filename = filename ? filename + ".xls" : "excel_data.xls";

      // Create download link element
      downloadLink = document.createElement("a");

      document.body.appendChild(downloadLink);

      if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(["\ufeff", tableHTML], {
          type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        // Create a link to the file
        downloadLink.href = "data:" + dataType + ", " + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
      }
      this.downloading = false;
    }
  },
  created() {
    this.fetchResponse();
  },
  watch: {
    $route: "fetchResponse",
    startDate() {
      this.fetchResponse();
    },
    endDate() {
      this.fetchResponse();
    }
  }
};
</script>
