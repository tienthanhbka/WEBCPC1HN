<template>
  <div class="container">
    <div class="inline-block">
      <el-date-picker v-model="TimeStart" type="date" placeholder="Từ ngày">
      </el-date-picker>
    </div>
    <div class="inline-block">
      <el-date-picker v-model="TimeEnd" type="date" placeholder="Đến ngày">
      </el-date-picker>
    </div>
    <div v-show="show" class="inline-block">
      <el-select
        v-model="IdeaSearch"
        filterable
        placeholder="Lọc theo ý tưởng..."
        @change="getbyIdea"
      >
        <el-option
          v-for="item in IdeaLst"
          :key="item.DocumentId"
          :label="item.IdeaName"
          :value="item.DocumentId"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-button
        icon="far fa-lightbulb"
        class="inline-block"
        @click="show = !show"
        plain
      ></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        :loading="downloading"
        @click="ExportExcel"
        icon="el-icon-document"
        style="background-color:#02bc77;color:#fff"
        >Xuất danh sách</el-button
      >
    </div>
    <div class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <el-table
      class="el-mobile-table"
      :data="
        ResearchLst.filter(
          data =>
            !TextSearch ||
            data.ProductName.toLowerCase().includes(TextSearch.toLowerCase())
        )
      "
      v-loading="listLoading"
      style="width: 100%"
      border
    >
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <el-popover placement="right" width="450" trigger="click">
              <detail-research :research="scope.row"></detail-research>
              <el-button slot="reference" type="text">
                <i class="far fa-eye"></i>
              </el-button>
            </el-popover>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="Action">
        <template slot-scope="scope">
          <div class="dat-cell" label="Action">
            <el-dropdown size="small" split-button type="primary">
              Chọn
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <el-button
                    style="width: 100%;"
                    @click="acceptResearch(scope.row)"
                    size="mini"
                    ><i class="fas fa-check-double"></i>Phê duyệt</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link :to="'/nghien-cuu/'"
                    ><el-button size="mini" style="width: 100%;"
                      ><i class="el-icon-document"></i>Hồ sơ đăng kí</el-button
                    >
                  </router-link>
                </el-dropdown-item>
                <el-dropdown-item>
                  <router-link
                    :to="
                      '/y-tuong/phe-duyet-bao-cao-sua-doi/' +
                        scope.row.ResearchId
                    "
                    ><el-button size="mini" style="width: 100%;"
                      ><i class="far fa-newspaper"></i>BC tiêu chuẩn</el-button
                    >
                  </router-link>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
      <el-table-column label="Dạng đóng gói" min-width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="Dạng đóng gói">
            {{ scope.row.Packing }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Người tạo" min-width="60">
        <template slot-scope="scope">
          <div class="dat-cell" label="Người tạo">
            {{ scope.row.CreaterId }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" min-width="60">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | ideaStatusColor">
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormAccept" custom-class="medium-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-capsules"></i>&#32;&#32;Phê duyệt đề xuất
      </span>
      <accept-research
        :research="rowData"
        @acceptResearched="addResearched"
        @CancelFormAccept="CancelFormAccept"
      ></accept-research>
    </el-dialog>
  </div>
</template>
<script>
import { GetIdeaForApprove } from "@/api/idea";
import {
  GetResearchForApprove,
  ApproveResearch,
  GetResearchByIdea
} from "@/api/research";
import { getStartDate, getEndDate } from "@/api/index";
import DetailResearch from "../component/detailResearch";
import AcceptResearch from "../component/acceptResearch";
import Cookies from "js-cookie";
import { parseTime } from "@/utils";
export default {
  components: { DetailResearch, AcceptResearch },
  data() {
    return {
      TextSearch: "",
      IdeaSearch: "",
      rowData: "",
      show: false,
      ResearchLst: [],
      IdeaLst: [],
      listLoading: false,
      dialogFormAccept: false,
      TimeStart: getStartDate(),
      TimeEnd: getEndDate(),
      downloading: false,
      Token: Cookies.get("token"),
      UserName: Cookies.get("idEmployee")
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
      GetResearchForApprove({
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
          } else {
            return v[j];
          }
        })
      );
    },
    CancelFormAccept() {
      this.dialogFormAccept = false;
    },
    fetchData() {
      this.listLoading = true;
      GetResearchForApprove({
        Token: Cookies.get("token"),
        UserName: Cookies.get("idEmployee"),
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(res => {
        this.ResearchLst = res.ResearchLst;
        this.listLoading = false;
      });
    },

    acceptResearch(row) {
      this.dialogFormAccept = true;
      this.rowData = row;
    },
    acceptResearched() {
      this.dialogFormAccept = false;
      this.fetchData();
    },
    getbyIdea() {
      if (this.IdeaSearch) {
        GetResearchByIdea({
          Token: this.Token,
          UserName: this.UserName,
          IdeaId: this.IdeaSearch
        }).then(response => {
          if (response.RespCode == 0) {
            this.ResearchLst = response.ResearchLst;
          } else {
            this.$message({
              message: response.RespText,
              type: "warning"
            });
          }
        });
      }
    }
  },
  created() {
    this.fetchData(),
      GetIdeaForApprove({
        Token: this.Token,
        UserName: this.UserName,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      }).then(res => {
        if (res.RespCode == 0) {
          this.IdeaLst = res.IdeaLst;
        }
      });
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    },
    show() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 10px 20px;
  background-color: #e9ebee;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
</style>
