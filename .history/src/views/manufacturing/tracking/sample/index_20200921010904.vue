<template>
  <div class="container">
    <div class="inline-block" style="float:right;">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        class="inline-block"
        @click="ExportExcel"
        :loading="downloading"
        plain
        >Xuất danh sách</el-button
      >
    </div>
    <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo sản phẩm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <!-- <div class="inline-block">
      <el-button
        @click="createSample"
        style="background-color:#02bc77;color:white;"
        plain
        icon="fas fa-plus-circle"
      >
        THÊM MẪU</el-button
      >
    </div> -->
    <div class="body">
      <el-table
        class="el-mobile-table"
        v-loading="loading"
        :data="
          ProductionOrderBFOLst.filter(
            data =>
              !TextSearch ||
              data.ProductName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        border
        @expand-change="expand"
      >
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-table :data="scope.row.lines" border style="width: 100%">
              <el-table-column width="100">
                <template slot-scope="props">
                  {{ props.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="Mã mẫu">
                <template slot-scope="props">
                  {{ props.row.SampleName }}
                </template>
              </el-table-column>
              <el-table-column label="Phân loại">
                <template slot-scope="props">
                  {{ props.row.TypeSample }}
                </template>
              </el-table-column>
              <el-table-column label="Điều kiện bảo quản">
                <template slot-scope="props">
                  {{ props.row.Condition }}
                </template>
              </el-table-column>
              <el-table-column label="Số lượng">
                <template slot-scope="props">
                  {{ props.row.SampleCount }}
                </template>
              </el-table-column>
              <el-table-column label="Người tạo">
                <template slot-scope="props">
                  {{ props.row.Creator }}
                </template>
              </el-table-column>
              <!-- <el-table-column
                prop="TimeCreate"
                label="Thời gian báo cáo"
                width="180"
              >
              </el-table-column> -->
              <!-- <el-table-column prop="Note" label="GT chuẩn"> </el-table-column>
              <el-table-column prop="Note" label="Đơn vị"> </el-table-column>
              <el-table-column prop="Note" label="Sai số"> </el-table-column>
              <el-table-column prop="Note" label="Người đo"> </el-table-column>
              <el-table-column prop="Note" label="Ngày đo"> </el-table-column> -->
              <!-- <el-table-column prop="Status" label="Sai số" width="100">
                <template slot-scope="props">
                  <el-tag :type="props.row.Status | ideaStatusColor">
                    {{ props.row.Status | ideaStatusText }}
                  </el-tag>
                </template>
              </el-table-column> -->
            </el-table>
          </template>
        </el-table-column>
        <el-table-column width="100px" label="STT" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">
              {{ scope.$index + 1 }}
            </div>
          </template>
        </el-table-column>
        <el-table-column width="100px" label="Actions" align="center">
          <template slot-scope="scope">
            <div class="dat-cell" label="Actions">
              <!-- <el-tooltip content="Chỉnh sửa">
                <el-button @click="editSample(scope.row)" type="text"
                  ><i class="far fa-edit"></i></el-button
              ></el-tooltip>
              <el-tooltip content="Xóa">
                <el-button
                  @click="delSample(scope.row)"
                  type="text"
                  style="color:red;"
                  ><i class="far fa-trash-alt"></i></el-button
              ></el-tooltip> -->
              <el-button
                type="text"
                class="el-button-sample"
                @click="createSample(scope.row)"
                >LẤY MẪU</el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Lệnh sản xuất" width="140">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lệnh sản xuất">
              <el-button type="text" @click="viewSample(scope.row)">
                <el-link>{{ scope.row.No_ }}</el-link></el-button
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Mã sản phẩm" width="120">
          <template slot-scope="scope">
            <div class="dat-cell" label="Mã sản phẩm">
              {{ scope.row.ProductID }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Sản phẩm" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Sản phẩm">
              {{ scope.row.Description }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Lô sản xuất" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Lô sản xuất">
              {{ scope.row.Location_Code }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Trạng thái" width="140">
          <template slot-scope="scope">
            <div class="dat-cell" label="Trạng thái" align="center">
              <el-tag :type="scope.row.StatusSample | toStatusColor">
                {{ scope.row.StatusSample | toStatusText }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog :visible.sync="dialogFormCreate" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="fas fa-plus-circle"></i> &#32;&#32;Tạo mẫu
      </span>
      <create
        @cancel="cancelOK"
        @SampleAdded="SampleAdded"
        :sample="rowData"
        @SampleUpdated="SampleUpdated"
      ></create>
    </el-dialog>
    <el-dialog :visible.sync="dialogFormDetail" custom-class="default-modal">
      <span slot="title" style="font-weight:700;color: #02bc77;font-size: 20pt;"
        ><i class="el-icon-document-copy"></i> &#32;&#32;Chi tiết mẫu
      </span>
      <detail :sample="rowData" @cancel="cancelDetailOK"></detail>
    </el-dialog>
    <el-pagination
      class="pagination"
      background
      layout="total,-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import { db, storage } from "../component/firebase";
import { GetProductionOrderBFO } from "@/api/productionOrder";
import Create from "../component/createSample";
import Detail from "../component/detailSample";
import Cookies from "js-cookie";

export default {
  filters: {
    toStatusText(val) {
      if (val == 1) {
        return "Chưa lấy mẫu";
      } else if (val == 2) {
        return "đã lấy mẫu";
      }
    },
    toStatusColor(val) {
      if (val == 1) {
        return "info";
      } else if (val == 2) {
        return "success";
      }
    }
  },
  components: {
    Create,
    Detail
  },
  data() {
    return {
      SampleLst: [],
      ProductionOrderBFOLst: [],
      currentPage: 1,
      dataLength: 10,
      pageSize: 2,
      ImageUrl: "",
      dialogVisible: false,
      dialogFormCreate: false,
      dialogFormDetail: false,
      downloading: false,
      loading: true,
      show: false,
      rowData: "",
      TextSearch: "",
      UserName: Cookies.get("idEmployee")
    };
  },
  methods: {
    createSample(row) {
      this.dialogFormCreate = true;
      this.rowData = row;
    },
    editSample(row) {
      this.rowData = row;
      this.dialogFormCreate = true;
    },
    delSample(row) {
      this.$confirm(
        "Xác nhận xóa mẫu " + row.ProductName + ". Continue?",
        "Xóa mẫu",
        {
          confirmButtonText: "Xác nhận",
          cancelButtonText: "Hủy",
          type: "error"
        }
      )
        .then(() => {
          db.ref("/SampleList/" + row.SampleID).remove();
          this.$message({
            message: "Xóa thành công ",
            type: "success"
          });
          this.fetchData();
        })
        .catch(() => {});
    },
    showImg(row) {
      this.dialogVisible = true;
      this.ImageUrl = row;
    },
    SampleAdded() {
      this.dialogFormCreate = false;
      this.fetchData();
    },
    updateIdeaOK() {},
    cancelOK() {
      this.dialogFormCreate = false;
    },
    cancelDetailOK() {
      this.dialogFormDetail = false;
    },
    viewSample(row) {
      this.dialogFormDetail = true;
      this.rowData = row;
    },
    SampleUpdated() {
      (this.dialogFormCreate = false), this.fetchData();
    },
    fetchData() {
      this.loading = true;
      // let a = [];
      // let b = [];
      // db.ref("SampleList").on("value", snap => {
      //   if (snap.val()) {
      //     Object.values(snap.val()).forEach(element => {
      //       a.push(element);
      //     });
      //   }
      // });
      let req = {
        token: Cookies.get("token"),
        Search: ""
      };
      GetProductionOrderBFO(req).then(res => {
        if (res.RespCode == 0) {
          res.ProductionOrderBFOLst.forEach(item => {
            db.ref("SampleList").on("value", snap => {
              if (snap.val()) {
                Object.values(snap.val()).forEach(element => {
                  if (element.ProductID == item.ProductID) {
                    Object.assign(item, { StatusSample: 2 });
                  } else {
                    Object.assign(item, { StatusSample: 1 });
                  }
                });
              }
            });
            this.loading = false;
          });

          this.ProductionOrderBFOLst = res.ProductionOrderBFOLst;
          console.log(this.ProductionOrderBFOLst);
        } else {
          this.$message({
            message: res.RespText,
            type: "warning"
          });
        }
      });
    },
    ExportExcel() {
      this.downloading = true;
      const tHeader = [
        "Mã mẫu",
        "Mã sản phẩm",
        "Tên sản phẩm",
        "Lô sản xuất",
        "Điều kiện bảo quản",
        "Tình trạng ban đầu",
        "Người chọn mẫu",
        "Ngày tạo",
        "Trạng thái"
      ];
      const filterHeader = [
        "SampleName",
        "ProductID",
        "ProductName",
        "Batch",
        "Condition",
        "Original",
        "Creator",
        "TimeCreate",
        "Status"
      ];
      var data = this.SampleLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách mẫu ",
          autoWidth: true,
          bookType: "xlsx"
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
    expand(row) {
      let a = [];
      db.ref("SampleList").on("value", snap => {
        if (snap.val()) {
          Object.values(snap.val()).forEach(element => {
            if (element.ProductID == row.ProductID) a.push(element);
          });
        }
      });
      row.lines = a;
    }
  },
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
.pagination {
  margin-top: 10px;
}
.el-button-sample {
  color: #409eff;
}
.el-button-sample:hover {
  color: #e6a23c;
}
</style>
