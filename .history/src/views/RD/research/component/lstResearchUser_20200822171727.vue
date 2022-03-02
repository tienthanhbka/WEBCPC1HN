<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker
        v-model="TimeStart"
        type="date"
        placeholder="Từ ngày"
        size="mini"
      >
      </el-date-picker>
    </div>
    <div class="inline-block">
      <el-date-picker
        v-model="TimeEnd"
        type="date"
        placeholder="Đến ngày"
        size="mini"
      >
      </el-date-picker>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        type="success"
        @click="ExportExcel"
        icon="el-icon-document"
        class="inline-block"
        plain
        size="mini"
        >Xuất danh sách</el-button
      >
    </div>
    <div class="inline-block" style="float:right;">
        <el-input
        style="width:auto;"
          placeholder="Tìm kiếm..."
          v-model="TextSearch"
          prefix-icon="el-icon-search"
          size="mini"
        >
        </el-input>
      </div>
    <div class="body">
      <el-divider></el-divider>
      <el-table
        class="el-mobile-table"
        :data="ResearchLst.filter(data => !TextSearch || data.ProductName.toLowerCase().includes(TextSearch.toLowerCase()))"
        v-loading="listLoading"
        style="width: 100%"
        border
        fit
        :header-row-style="{ color: '#1c456f' }"
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
              <el-popover
              placement="right"
              width="350"
              trigger="click">
              <detail-research :research="scope.row"></detail-research>
              <el-button slot="reference" type="text">
                <i class="far fa-eye"></i>
              </el-button>
            </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Ý tưởng" min-width="80">
          <template slot-scope="scope">
            <div class="dat-cell" label="Ý tưởng">{{ scope.row.IdeaId }}</div>
          </template>
        </el-table-column>
        <el-table-column label="Sản phẩm" min-width="150">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">
              {{ scope.row.ProductName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hoạt chất" min-width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hoạt chất">
              {{ scope.row.ActiveElement }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Hàm lượng" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Hàm lượng">
              {{ scope.row.Concentration }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Dạng đóng gói" min-width="60">
          <template slot-scope="scope">
            <div class="dat-cell" label="Dạng đóng gói">
              {{scope.row.Packing}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" align="right" min-width="80">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái">
              <el-tag :type="scope.row.Status | ideaStatusColor">
                {{ scope.row.Status | ideaStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import DetailResearch from '../component/detailResearch'
import {GetResearchByUser } from "@/api/research";
import { getStartDate, getEndDate } from "@/api/index";
import Cookies from "js-cookie";
import { parseTime } from "@/utils";
export default {
    components:{DetailResearch},
  data() {
    return {
      ResearchLst: [],
      rowData: "",
      TextSearch: "",
      listLoading: false,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      Token: Cookies.get("token"),
    UserName: Cookies.get("idEmployee"),
      downloading: false,
      currentPage: 1,
      dataLength: 0,
      pageSize: 10,
    };
  },
  methods: {
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã ý tưởng",
        "Mã sản phẩm",
        "Tên sản phẩm đề xuất",
        "Hoạt chất chính",
        "Hàm lượng",
        "Dạng đóng gói",
        "Thời gian tạo",
        "Trạng thái"
      ];
      const filterHeader = [
        "IdeaId",
        "ProductId",
        "ProductName",
        "ActiveElement",
        "Concentration",
        "Packing",
        "TimeCreate",
        "Status"
      ];
      GetResearchByUser({
        Token: this.Token,
        UserName: this.UserName,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(response => {
        var data = response.ResearchLst;
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader,
            data: this.formatJson(filterHeader, data),
            filename:
              "Danh sách đề xuất sản phẩm từ " +
              parseTime(this.TimeStart, "{d}-{m}-{y}").substring(0, 10) +
              " đến " +
              parseTime(this.TimeEnd, "{d}-{m}-{y}"), //Optional
            autoWidth: true,
            bookType: "xlsx"
          });
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "Status") {
            return this.$options.filters.ideaStatusText(v[j]);
          }
          else {
            return v[j];
          }
        })
      );
    },
    fetchData() {
      this.listLoading = true;
      GetResearchByUser({
        Token: this.Token,
        UserName: this.UserName,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(res => {
        this.ResearchLst = res.ResearchLst;
        this.listLoading = false;
      });
    }
  },
  created() {
    this.fetchData(),
      (this.TimeStart = getStartDate()),
      (this.TimeEnd = getEndDate());
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    },
    currentPage() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    }
  }
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
