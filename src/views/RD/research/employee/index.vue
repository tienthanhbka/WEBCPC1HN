<template>
  <div class="container">
    <div v-show="show" class="inline-block">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block">
      <el-button icon="el-icon-search" @click="show = !show" circle></el-button>
    </div>
    <div class="inline-block" style="float:right;">
      <router-link :to="'/nghien-cuu/danh-sach-de-xuat'">
        <el-button
          style="background-color:#02bc77;color:white;"
          icon="el-icon-document"
          >Danh sách sản phẩm đề xuất</el-button
        ></router-link
      >
    </div>
    <div class="inline-block" style="float:right;">
      <el-date-picker
        v-model="TimeEnd"
        type="date"
        placeholder="Đến ngày"
        default-value="2030-10-01"
      >
      </el-date-picker>
    </div>
    <div class="inline-block" style="float:right;">
      <el-date-picker
        v-model="TimeStart"
        type="date"
        placeholder="Từ ngày"
        default-value="2020-01-01"
      >
      </el-date-picker>
    </div>

    <el-table
      class="el-mobile-table"
      v-loading="listLoading"
      :data="IdeaLst"
      style="width: 100%"
      border
      fit
      highlight-current-row
      @expand-change="expand"
      stripe
    >
      <el-table-column min-width="100" type="expand">
        <template slot-scope="scope">
          <el-tooltip content="Thêm đề xuất" placement="top">
            <el-button
              @click="createResearch(scope.row)"
              style="position:absolute;left:0; color: red;
            padding: 16px 18px;"
              ><i class="fas fa-plus"></i
            ></el-button>
          </el-tooltip>
          <el-table
            class="el-mobile-table"
            border
            v-loading="listLoading1"
            style="width: 100%"
            :data="scope.row.lines"
            fit
            highlight-current-row
            :header-row-style="{ color: '#1c456f' }"
          >
            <el-table-column width="100px" align="center">
              <template slot-scope="props">
                <el-tooltip content="Chỉnh sửa" placement="top">
                  <el-button
                    type="text"
                    @click="UpdateResearch(scope.row, props.row)"
                  >
                    <i class="el-icon-edit-outline"></i>
                  </el-button>
                </el-tooltip>
                <el-tooltip content="Báo cáo tiêu chuẩn">
                  <router-link
                    :to="'/y-tuong/bao-cao-sua-doi/' + props.row.ResearchId"
                    ><el-button
                      type="text"
                      style="color: green;margin-right:5px;"
                      ><i class="far fa-newspaper"></i
                    ></el-button>
                  </router-link>
                </el-tooltip>
                <el-tooltip content="Xóa" placement="top">
                  <el-button
                    type="text"
                    @click="delResearch(scope.row, props.row)"
                    style="color:red;"
                  >
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column label="Mã sản phẩm" align="center">
              <template slot-scope="props">
                <div class="dat-cell" label="Mã sản phẩm">
                  {{ props.row.ProductId }}
                </div>
              </template>
            </el-table-column>

            <el-table-column label="Tên sản phẩm" align="center">
              <template slot-scope="props">
                <div class="dat-cell" label="Tên sản phẩm">
                  {{ props.row.ProductName }}
                </div>
              </template>
            </el-table-column>
            <!-- <el-table-column label="Hoạt chất chính" align="center">
              <template slot-scope="props">
                <div class="dat-cell" label="Hoạt chất chính">
                  {{ props.row.ActiveElement }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Hàm lượng" align="center">
              <template slot-scope="props">
                <div class="dat-cell" label="Hàm lượng">
                  {{ props.row.Concentration }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Dạng đóng gói" align="center">
              <template slot-scope="props">
                <div class="dat-cell" label="Dạng đóng gói">
                  {{ props.row.Packing }}
                </div>
              </template>
            </el-table-column> -->
            <el-table-column label="Link báo cáo" align="center">
              <template slot-scope="props">
                <div class="dat-cell" label="Link báo cáo">
                  <el-link
                    type="primary"
                    :href="props.row.LinkReport"
                    targer="_blank"
                  >
                    {{ props.row.LinkReport }}
                  </el-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Trạng thái" align="center" min-width="80">
              <template slot-scope="scope">
                <div class="dat-cell" label="Trạng thái">
                  <el-tag :type="scope.row.Status | ideaStatusColor">
                    {{ scope.row.Status | ideaStatusText }}
                  </el-tag>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column min-width="80px" label="STT" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="STT">
            {{ scope.$index + 1 }}
            <!-- <el-tooltip content="Chỉnh sửa">
                  <el-button @click="editResearch(scope.row)" type="text"
                    ><i class="far fa-edit"></i></el-button
                ></el-tooltip>
                <el-tooltip content="Xóa">
                  <el-button @click="delResearch(scope.row)" type="text" style="color:red;"
                    ><i class="far fa-trash-alt"></i></el-button
                ></el-tooltip> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Mã" width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="Mã">{{ scope.row.ReIDIdea }}</div>
        </template>
      </el-table-column>

      <el-table-column label="Ý tưởng" min-width="150">
        <template slot-scope="scope">
          <div class="dat-cell" label="Ý tưởng">{{ scope.row.IdeaName }}</div>
        </template>
      </el-table-column>
      <el-table-column label="Nội dung" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Nội dung">
            {{ scope.row.IdeaContent }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Hoạt chất" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Hoạt chất">
            {{ scope.row.ActiveElement }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Cách bào chế" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Cách bào chế">
            {{ scope.row.Preparation }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Tài liệu" width="80" align="center">
        <template slot-scope="scope">
          <div class="dat-cell" label="Tài liệu">
            <el-button type="text" @click="downloadMoreInfo(scope.row)"
              ><i class="el-icon-document"></i>
            </el-button>
            <!-- <el-button type="success" icon="far fa-arrow-alt-circle-down" circle plain @click="downloadMoreInfo(scope.row)"></el-button> -->
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Link" width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Link">
            <el-link :href="scope.row.LinkIdea" type="primary" target="_blank">
              LINK
            </el-link>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Khởi tạo" min-width="100">
        <template slot-scope="scope">
          <div class="dat-cell" label="Khởi tạo">
            {{ Date.parse(scope.row.TimeCreate).toString("HH:mm dd-MM-yyyy") }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" min-width="80">
        <template slot-scope="scope">
          <div class="dat-cell" label="Trạng thái">
            <el-tag :type="scope.row.Status | ideaStatusColor">
              {{ scope.row.Status | ideaStatusText }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="medium-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-capsules"></i>&#32;&#32;Đề xuất sản phẩm
      </span>
      <create-research
        :research="rowData"
        :idea="rowData2"
        :value="value"
        @addResearched="addResearched"
        @cancelForm="cancelForm"
      ></create-research>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormUpdate" custom-class="medium-modal">
      <span slot="title" style="font-weight:700;color:#02bc77;font-size:20pt;"
        ><i class="fas fa-capsules"></i> &#32;&#32;Cập nhật sản phẩm
      </span>
      <update-research
        :research="rowData"
        :idea="rowData2"
        @researchUpdated="updateResearched"
        @cancelForm="cancelForm2"
      ></update-research>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetResearchByUser,
  GetResearchForApprove,
  GetResearchByIdea,
  RemoveResearch
} from "@/api/research";
import { getStartDate, getEndDate } from "@/api/index";
import CreateResearch from "../component/createResearch";
import UpdateResearch from "../component/updateResearch";
import { GetIdeaByUser } from "@/api/idea";
import { db } from "@/views/manufacturing/tracking/firebase";

import Cookies from "js-cookie";
export default {
  components: { CreateResearch, UpdateResearch },
  data() {
    return {
      rowData: "",
      rowData2: "",
      value: "",
      show: false,
      TextSearch: "",
      IdeaLst: [],
      ResearchLst: [],
      listLoading: false,
      listLoading1: false,
      dialogFormCreate: false,
      dialogFormUpdate: false,
      UserName: Cookies.get("idEmployee"),
      Token: Cookies.get("token"),
      TimeStart: getStartDate(),
      TimeEnd: getEndDate()
    };
  },
  methods: {
    createResearch(row) {
      this.rowData2 = row;
      this.rowData = null;
      this.dialogFormCreate = true;
    },

    UpdateResearch(idea, row) {
      this.rowData2 = idea;
      this.rowData = row;
      this.dialogFormUpdate = true;
    },
    updateResearched(row) {
      this.dialogFormUpdate = false;
      this.expand(row);
    },
    addResearched(row) {
      this.dialogFormCreate = false;
      this.expand(row);
    },
    cancelForm() {
      this.dialogFormCreate = false;
    },
    cancelForm2() {
      this.dialogFormUpdate = false;
    },
    delResearch(idea, row) {
      this.$confirm(
        "Xác nhận xóa đề xuất " + row.ProductName + ". Continue?",
        "Xóa đề xuất",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          var rep = {
            Token: this.Token,
            UserName: this.UserName,
            ResearchId: row.ResearchId
          };
          RemoveResearch(rep).then(res => {
            if (res.RespCode == 0) {
              this.$message({
                message: "Xóa đề xuất thành công",
                type: "success"
              });
              this.expand(idea);
            } else {
              this.$message({
                message: res.RespText,
                type: "warning"
              });
            }
          });
        })
        .catch(() => {});
    },
    fetchData() {
      this.listLoading = true;
      var req = {
        Token: this.Token,
        UserName: this.UserName,
        TimeStart: this.TimeStart,
        TimeEnd: this.TimeEnd
      };
      GetIdeaByUser(req).then(res => {
        if (res.RespCode == 0) {
          res.IdeaLst.forEach(element => {
            db.ref("RDIdea").on("value", snap => {
              if (snap.val()) {
                Object.values(snap.val()).forEach(item => {
                  if (element.IdeaName == item.IdeaName) {
                    Object.assign(element, item);
                  }
                });
              }
            });
          });
          this.IdeaLst = res.IdeaLst;
        }
        this.listLoading = false;
      });
    },
    expand(row) {
      this.listLoading1 = true;
      GetResearchByIdea({
        Token: this.Token,
        UserName: this.UserName,
        IdeaId: row.DocumentId
      }).then(response => {
        if (response.RespCode == 0) {
          row.lines = response.ResearchLst;
          this.value = response.ResearchLst.length + 1;
          this.listLoading1 = false;
        } else {
          this.$message({
            message: response.RespText,
            type: "warning"
          });
        }
      });
    },
    downloadMoreInfo(row) {
      let url =
        baseUrl +
        "File/DownloadFileIdea" +
        "?UserName=" +
        this.UserName +
        "&Token=" +
        this.Token +
        "&DocumentId=" +
        row.DocumentId;
      //return url;
      window.open(url);
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    TimeStart() {
      this.fetchData();
    },
    TimeEnd() {
      this.fetchData();
    }
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 10px 20px;
  background-color: $bg;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
</style>
