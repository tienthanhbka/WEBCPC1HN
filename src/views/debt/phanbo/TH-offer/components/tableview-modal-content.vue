<template>
  <div style="margin-top:-20px">
    <el-button
      type="primary"
      icon="el-icon-refresh"
      class="inline-block"
      @click="fetchData"
    ></el-button>
    <el-button
      style="margin-left:0px"
      @click="SaveChange"
      type="primary"
      class="inline-block"
    >
      <i class="far fa-save"></i> Lưu lại
      <i v-if="uploading" class="el-icon-loading"></i>
    </el-button>
    <el-table
      :span-method="objectSpanMethod"
      size="mini"
      :data="currentTableData"
      border
      v-loading="isLoading"
      highlight-current-row
      :cell-style="CellStyle"
      style="width: 100%;margin-top:20px;"
    >
      <el-table-column align="center" width="50px" label="STT" prop>
        <template slot-scope="scope">{{
          scope.$index + 1 + (currentPage - 1) * pageSize
        }}</template>
      </el-table-column>
      <el-table-column
        label="KH"
        min-width="200"
        align="center"
        prop="idCustomer"
      >
        <template slot-scope="{ row }"
          >{{ row.idCustomer }}
        </template>
      </el-table-column>
      <el-table-column
        v-if="type == 'TH'"
        label="DA"
        min-width="200"
        align="center"
        prop="idCustomer"
      >
        <template slot-scope="{ row }"
          >{{ row.ProjectNo }} - {{ row.PName }}</template
        >
      </el-table-column>
      <el-table-column
        label="S"
        min-width="300"
        align="center"
        prop="idProduct"
      >
        <template slot-scope="{ row }"
          >{{ row.idProduct }} - {{ row.ItemCode }} -
          {{ row.Unit.substring(0, 1) }} -
          {{ row["Unit Price"] | toVND }}</template
        >
      </el-table-column>

      <el-table-column
        v-for="(item, index) in allTypeCus"
        :key="index"
        :width="item.width"
        :label="item.code"
      >
        <template slot-scope="{ row }">
          <template v-if="item.type == 'p'">
            <el-input-number
              v-if="allowInput(row)"
              style="width: calc(100% - 14px)"
              v-model="row[item.col]"
              size="mini"
              controls-position="right"
              @change="onInput(row, item.col)"
              :precision="2"
              :step="0.01"
              :max="100"
            ></el-input-number>
            <span v-else>{{ row[item.col] | toPercent }}</span>

            <el-popover placement="right" trigger="click">
              <div>
                <i class="fas fa-arrows-alt-h"></i> VNĐ
                <div>
                  <el-input-number
                    v-if="allowInput(row)"
                    style="width: 100% - 14px"
                    v-model="row[item.col + 'm']"
                    size="mini"
                    controls-position="right"
                    @change="onInput(row, item.col, 'm')"
                    :precision="2"
                    :step="1"
                  ></el-input-number>
                  <span v-else>{{ row[item.col + "m"] | toVND }}</span>
                  <i class="fas fa-check-square"></i>
                </div>
              </div>
              <i slot="reference" class="fas fa-calculator"></i>
            </el-popover>
          </template>
          <template v-else-if="item.type == 'm'">
            <el-input-number
              v-if="allowInput(row)"
              @change="row.edited = true"
              style="width: 100%"
              v-model="row[item.col]"
              size="mini"
              controls-position="right"
              :precision="2"
              :step="0.01"
            ></el-input-number>
            <span v-else>{{ row[item.col] | toVND }}</span>
          </template>
          <template slot-scope="{ row }" v-else>
            <el-date-picker
              v-if="allowInput(row)"
              @change="row.edited = true"
              style="width:100%"
              size="mini"
              v-model="row[item.col]"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span v-else>{{
              row[item.col] == null
                ? ""
                : Date.parse(row[item.col]).toString("dd/MM/yyyy")
            }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="Tol" width="80" align="center" prop="idProduct">
        <template slot-scope="{ row }">{{ row.SumP | toPercent }}</template>
      </el-table-column>
      <el-table-column
        v-if="isGroupPage == true"
        width="180"
        align="center"
        label="Duyệt"
        column-key="evaluate"
        prop="evaluate"
      >
        <template slot="header">
          <el-checkbox
            style="margin-right:0px"
            @change="checkAll"
            ref="boxCheckAll"
          ></el-checkbox>
        </template>

        <template slot-scope="scope">
          <el-radio-group
            @change="statusChange(scope.row)"
            fill="#ecf0f1"
            :text-color="colorStatus(scope.row)"
            v-model="scope.row.Nstatus"
            size="mini"
          >
            <el-radio-button :label="4" :disabled="disable0(scope.row)">
              <el-tooltip content="Treo" placement="top" effect="light">
                <i class="fas fa-times"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button :label="1" :disabled="disable1(scope.row)">
              <el-tooltip content="Chờ duyệt" placement="top" effect="light">
                <i class="fas fa-dot-circle"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button :label="5" :disabled="disable5(scope.row)">
              <el-tooltip
                content="Duyệt với tư cách SS"
                placement="top"
                effect="light"
                ><i class="fas fa-check-circle"></i></el-tooltip
            ></el-radio-button>
            <el-radio-button :label="6" :disabled="disable6(scope.row)">
              <el-tooltip
                content="Duyệt với tư cách ASM"
                placement="top"
                effect="light"
              >
                <i class="fas fa-check"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button :label="8" :disabled="disable8(scope.row)">
              <el-tooltip
                content="Duyệt với tư cách GĐCN"
                placement="top"
                effect="light"
              >
                <i class="fas fa-check-double"></i>
              </el-tooltip>
            </el-radio-button>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column label="Trạng thái" width="120" align="center">
        <template slot-scope="{ row }">
          <el-tag
            slot="reference"
            size="mini"
            :type="row.status | commissionLineStatusColor"
            >{{ row.status | commissionLineStatusText }}</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="tableData.length"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="getData"
      background
      :small="true"
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>

<script>
import UploadExcelComponent from "./ImportExcel";
import {
  GetPhanBoCouponReport,
  UpdateLstCommissionOrderLine
} from "@/api/debt";
import TypeCus from "../const.js";
import {
  InitOValue,
  UndoEdit,
  CalSumP,
  CalValueP,
  CalAllValueMoneyP
} from "../c-method";
export default {
  name: "TableView",
  components: { UploadExcelComponent },
  props: {
    isGroupPage: Boolean,
    selectedCoupons: Array,
    tableViewModalVisible: Boolean,
    type: String,
    idGroup: String
  },
  data() {
    return {
      isLoading: false,
      tableData: [],
      currentTableData: [],
      tableHeader: [],
      pageSize: 10,
      currentPage: 1,
      mergeData: [],
      uploading: false,
      allTypeCus: TypeCus[this.type]
    };
  },
  watch: {
    pageSize() {
      this.getData();
    },
    tableViewModalVisible() {
      this.fetchData();
    }
  },
  created() {
    this.allTypeCus = TypeCus[this.type];
    this.fetchData();
  },
  methods: {
    allowInput(row) {
      if (row.lv == 5) {
        if (row.status > 8) {
          return false;
        }
        return true;
      } else if (row.lv == 4) {
        if (row.status > 6) {
          return false;
        }
        return true;
      } else if (row.lv == 2) {
        if (row.status > 5) {
          return false;
        }
        return true;
      } else {
        if (row.status >= 6) return false;
        return true;
      }
    },
    checkAll(val) {
      if (val) {
        this.tableData.forEach(e => {
          if (e.lv == 5) {
            if (e.status < 8) {
              e.Nstatus = 8;
              e.edited = true;
            }
          } else if (e.lv == 4) {
            if (e.status < 6) {
              e.Nstatus = 6;
              e.edited = true;
            }
          } else if (e.lv == 2) {
            if (e.status < 5) {
              e.Nstatus = 5;
              e.edited = true;
            }
          }
        });
      } else {
        this.tableData.forEach(e => {
          e.Nstatus = e.status;
        });
      }
    },
    disable8(row) {
      if (row.status == 0) {
        return true;
      }
      if (row.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (row.lv == 4) {
        return true;
      } else if (row.lv == 2) {
        return true;
      } else {
        return true;
      }
    },
    disable6(row) {
      if (row.status == 0) {
        return true;
      }
      if (row.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (row.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable5(row) {
      if (row.status == 0) {
        return true;
      }
      if (row.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (row.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else if (row.lv == 2) {
        if (row.status >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable1(row) {
      if (row.status == 0) {
        return true;
      }
      if (row.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (row.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else if (row.lv == 2) {
        if (row.status >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable0(row) {
      if (row.status == 0) {
        return true;
      }
      if (row.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (row.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else if (row.lv == 2) {
        if (row.status >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    colorStatus(st) {
      if (st.Nstatus == 6) {
        return "#409EFF";
      } else if (st.Nstatus == 0) {
        return "#F56C6C";
      } else if (st.Nstatus == 8) {
        return "#67C23A";
      } else {
        return "#E6A23C";
      }
    },
    SaveChange() {
      var req = [];
      var sef = this;
      this.tableData.forEach(e => {
        let obj = {
          RowID: e.RowID,

          idProduct: e.idProduct,
          type: e.type,
          signature: e.signature,
          DateStart: e.DateStart,
          status: e.Nstatus
        };
        sef.allTypeCus.forEach(o => {
          obj[o.col] = e[o.col];
        });

        if (e.edited) {
          req.push(obj);
        }
      });
      if (req.length == 0) return;
      for (let j in req) {
        if (this.type == "KD" && req[j].DateStart == null) {
          this.$message({
            message: "Hãy chọn ngày bắt đầu hiệu lực",
            type: "error"
          });
          return;
        }
      }
      this.uploading = true;
      UpdateLstCommissionOrderLine({
        type: this.type,
        idGroup: this.idGroup,
        data: req
      })
        .then(res => {
          this.uploading = false;
          var newDt = res.Data;
          var sef = this;
          this.tableData.forEach(e => {
            e.edited = false;
            newDt.forEach(o => {
              if (e.RowID == o.RowID) {
                sef.allTypeCus.forEach(t => {
                  e[t] = o[t];
                });
                e.status = o.status;
                e.Nstatus = o.status;
              }
            });
          });
          //this.$emit("Updated");
          this.$message({
            message: "Cập nhật thành công " + res.Data.length + " dòng dữ liệu",
            type: "success"
          });
        })
        .catch(e => {
          this.uploading = false;
          this.$message({
            message: "Có lỗi xảy ra, hãy thử lại sau",
            type: "error"
          });
        });
    },
    statusChange(row) {
      row.edited = true;
    },
    CellStyle({ row, column, rowIndex, columnIndex }) {
      let b = 2;
      if (this.type == "TH") b = 3;
      if (columnIndex == 0 && row.edited) {
        return { background: "#f6e58d" };
      }
      if (columnIndex > b && columnIndex < this.allTypeCus.length + b + 1) {
        let prop = this.allTypeCus[columnIndex - b - 1].col;
        let type = this.allTypeCus[columnIndex - b - 1].type;
        if (type != "d" && Number(row[prop]) == 0) {
          return { background: "#faf3e1" };
        } else if (row[prop] == null) {
          return { background: "#e17055" };
        }
      }
    },
    calSumP(row) {
      CalSumP(row, this.type);
    },
    calValueP(row, col, m) {
      CalValueP(row, col, m);
    },

    onInput(row, col, m) {
      this.calValueP(row, col, m);
      this.calSumP(row);
      if (!row.edited) {
        row.edited = true;
      }
    },
    cancelEdit(row) {},
    confirmEdit(row) {},
    editLine(row) {
      row.isEdit = true;
    },
    fetchData() {
      if (
        !this.selectedCoupons.length > 0 ||
        this.tableViewModalVisible != true
      )
        return;
      var rows = [];
      this.selectedCoupons.forEach(e => {
        rows.push(e.RowID);
      });
      this.isLoading = true;
      GetPhanBoCouponReport({
        idGroup: this.idGroup,
        rows: rows,
        type: this.type
      }).then(res => {
        var sef = this;
        this.isLoading = false;
        res.Data.forEach(e => {
          e.isEdit = true;
          e.edited = false;
          e.Nstatus = e.status;
          sef.calSumP(e);

          CalAllValueMoneyP(e, this.type);
          //e.SumP =Number(e.SumP)
        });
        this.tableData = res.Data;
        this.getData();
      });
    },
    getData() {
      var arr = this.tableData.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      );
      this.getMerge(arr);
      this.currentTableData = arr;
    },
    getMerge(arr) {
      var mergeData = null;
      if (this.type == "TH") {
        mergeData = {
          idCustomer: [[0, 1]],
          idProduct: [[0, 1]],
          ProjectNo: [[0, 1]]
        };
      } else {
        mergeData = {
          idCustomer: [[0, 1]],
          idProduct: [[0, 1]]
        };
      }

      for (let i = 0; i < arr.length - 1; i++) {
        let row1 = arr[i];
        let row2 = arr[i + 1];
        for (var j in mergeData) {
          if (
            row1[j] == row2[j] &&
            (j != "idProduct" || row1.idCustomer == row2.idCustomer)
          ) {
            var mergeObj = mergeData[j];
            var obj = mergeObj[mergeObj.length - 1];
            obj[1] += 1;
          } else {
            var mergeObj = mergeData[j];
            mergeObj.push([i + 1, 1]);
          }
        }
      }
      this.mergeData = mergeData;
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      var mergeObj = null;
      if (this.type == "TH") {
        if (columnIndex === 1) {
          mergeObj = this.mergeData["idCustomer"];
        } else if (columnIndex === 2) {
          mergeObj = this.mergeData["ProjectNo"];
        } else if (columnIndex === 3) {
          mergeObj = this.mergeData["idProduct"];
        }
      } else {
        if (columnIndex === 1) {
          mergeObj = this.mergeData["idCustomer"];
        } else if (columnIndex === 2) {
          mergeObj = this.mergeData["idProduct"];
        }
      }

      if (mergeObj) {
        for (var i in mergeObj) {
          var e = mergeObj[i];
          if (e[0] == rowIndex) {
            return {
              rowspan: e[1],
              colspan: 1
            };
          }
        }

        return {
          rowspan: 0,
          colspan: 0
        };
      }
    }
  }
};
</script>
