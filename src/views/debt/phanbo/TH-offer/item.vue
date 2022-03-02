<template>
  <div>
    <el-tooltip
      v-if="phanboCoupon.status == 1 || phanboCoupon.status == 4"
      content="Thêm sản phẩm"
      placement="top"
    >
      <el-button
        style="position:absolute;left:0; color: #16a085;
    padding: 16px 18px;"
        @click="openModal"
      >
        <i class="fas fa-plus"></i>
      </el-button>
    </el-tooltip>
    <el-table
      size="small"
      :key="tKey"
      :header-row-style="{ color: '#16a085' }"
      :data="tableData"
      :cell-style="cellStyle"
      v-loading="isLoading"
      fit
      style="width: 100%"
      border
    >
      <el-table-column align="center" width="52" label="STT">
        <template slot-scope="scope">
          {{ scope.$index + 1 }}
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
              @click="deleteItem(scope.row)"
              >Xóa</el-button
            >

            <i class="fas fa-pills" slot="reference" style="color:#16a085"></i>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        label="Trạng thái"
        width="120"
        align="center"
        prop="status"
        :filters="[
          { text: 'Chờ duyệt', value: '1' },
          { text: 'Treo', value: '4' },
          { text: 'SSD', value: '5' },
          { text: 'ASMD', value: '6' },
          {
            text: 'GĐD',
            value: '8'
          },
          { text: 'KTD', value: '10' }
        ]"
        :filter-method="filterHandler"
      >
        <template slot-scope="{ row }">
          <el-tag
            slot="reference"
            size="mini"
            :type="row.status | commissionLineStatusColor"
            >{{ row.status | commissionLineStatusText }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column
        v-if="isGroupPage == true && phanboCoupon.status != 0"
        width="180"
        align="center"
        label="Duyệt"
        column-key="evaluate"
        prop="evaluate"
      >
        <template slot="header">
          <el-tooltip content="Lưu lại" placement="top">
            <el-button
              @click="uploadEvaluate()"
              size="mini"
              :type="saved ? 'success' : 'warning'"
              ><i class="el-icon-loading" v-show="uploadingEvaluate"></i
              ><i class="fas fa-save"></i
            ></el-button>
          </el-tooltip>

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
              <el-tooltip content="Chờ duyệt" placement="top" effect="light"
                ><i class="fas fa-dot-circle"></i></el-tooltip
            ></el-radio-button>
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
                ><i class="fas fa-check"></i></el-tooltip
            ></el-radio-button>
            <el-radio-button :label="8" :disabled="disable8(scope.row)"
              ><el-tooltip
                content="Duyệt với tư cách GĐCN"
                placement="top"
                effect="light"
                ><i class="fas fa-check-double"></i></el-tooltip
            ></el-radio-button>
          </el-radio-group>
        </template>
      </el-table-column>
      <el-table-column
        v-if="phanboCoupon.status != 0"
        align="center"
        width="131"
        label="Actions"
      >
        <template slot-scope="{ row }">
          <div :key="row.key" v-if="allowEdit(row)">
            <div v-if="row.isEdit">
              <el-button-group>
                <el-button
                  class="cancel-btn"
                  size="mini"
                  icon="el-icon-refresh"
                  type="warning"
                  @click="cancelEdit(row)"
                ></el-button>
                <el-button type="success" size="mini" @click="confirmEdit(row)"
                  ><i class="fas fa-check"></i
                ></el-button>
              </el-button-group>
            </div>

            <el-button
              v-else
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="row.isEdit = true"
              >Sửa</el-button
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column width="70" label="M">
        <template slot-scope="{ row }">{{ row.idProduct }}</template>
      </el-table-column>
      <el-table-column min-width="150" label="S">
        <template slot-scope="{ row }">{{ row.ItemCode }}</template>
      </el-table-column>
      <el-table-column width="60" label="QC">
        <template slot-scope="{ row }">{{
          row["Unit"].substring(0, 1)
        }}</template>
      </el-table-column>
      <el-table-column width="120" label="G (no V)">
        <template slot-scope="{ row }">{{
          row["Unit Price"] | toVND
        }}</template>
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
              v-if="row.isEdit"
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
                <div v-if="row.isEdit">
                  <el-input-number
                    style="width: 100% - 14px"
                    v-model="row[item.col + 'm']"
                    size="mini"
                    :min="0"
                    controls-position="right"
                    @change="onInput(row, item.col, 'm')"
                    :precision="2"
                    :step="1"
                  ></el-input-number>
                  <i class="fas fa-check-square"></i>
                </div>

                <span v-else>{{ row[item.col + "m"] | toVND }}</span>
              </div>
              <i slot="reference" class="fas fa-calculator"></i>
            </el-popover>
          </template>
          <template v-else-if="item.type == 'm'">
            <el-input-number
              v-if="row.isEdit"
              style="width: 100%"
              v-model="row[item.col]"
              size="mini"
              controls-position="right"
              :precision="2"
              :step="0.01"
              :min="0"
            ></el-input-number>
            <span v-else>{{ row[item.col] | toVND }}</span>
          </template>
          <template v-else slot-scope="{ row }">
            <el-date-picker
              style="width:100%"
              v-if="row.isEdit"
              size="small"
              v-model="row[item.col]"
              placeholder="Chọn ngày"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <span v-else>{{ row[item.col] | toDMY }}</span>
          </template>
        </template>
      </el-table-column>
      <el-table-column label="Tol">
        <template slot-scope="{ row }">
          <span>{{ row.SumP | toPercent }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {
  GetItemOfCommissionOrderHeader,
  DeleteItemInCommissionOrderLine,
  UpdateCommissionOrderLine,
  UpdateCommissionOrderLineLstStatus,
  GetItemOfComHeaderProject
} from "@/api/debt";
import TypeCustomerT from "./type-customer-t";
import TypeCus from "./const";
import {
  InitOValue,
  UndoEdit,
  CalSumP,
  CalValueP,
  CalAllValueMoneyP
} from "./c-method";

export default {
  components: {
    TypeCustomerT
  },
  props: {
    phanboCoupon: Object,
    project: Object,
    type: String,
    isGroupPage: Boolean
  },
  data() {
    return {
      tKey: 1,
      tableData: [],
      isLoading: false,
      uploadingEvaluate: false,
      allTypeCus: TypeCus[this.type],
      saved: true
    };
  },
  methods: {
    evaluateVisible() {
      if (this.isGroupPage && this.phanboCoupon.status != 0) {
        return true;
      }
      return false;
    },
    uploadEvaluate() {
      var lst = [];
      this.tableData.forEach(e => {
        if (e.status != e.Nstatus) {
          lst.push({ RowID: e.RowID, status: e.Nstatus });
        }
      });
      var req = {
        data: lst,
        idGroup: this.phanboCoupon.idGroup,
        type: this.type
      };
      this.uploadingEvaluate = true;
      UpdateCommissionOrderLineLstStatus(req).then(res => {
        this.saved = true;
        this.uploadingEvaluate = false;
        if (this.phanboCoupon.lv == 5 && this.phanboCoupon.status < 8) {
          this.phanboCoupon.status = 8;
        } else if (this.phanboCoupon.lv == 4 && this.phanboCoupon.status < 6) {
          this.phanboCoupon.status = 6;
        } else if (this.phanboCoupon.lv == 2 && this.phanboCoupon.status < 5) {
          this.phanboCoupon.status = 5;
        }
        var newStt = res.Data;
        let MT = 0;
        let Treo = 0;
        let ASMD = 0;
        let GĐD = 0;
        let KTD = 0;
        let SSD = 0;
        newStt.forEach(e => {
          this.tableData.forEach(o => {
            if (o.RowID == e.RowID) {
              o.status = e.status;
              o.Nstatus = e.status;
            }
          });
        });
        this.tableData.forEach(o => {
          if (o.status == 1) MT++;
          else if (o.status == 4) Treo++;
          else if (o.status == 5) SSD++;
          else if (o.status == 6) ASMD++;
          else if (o.status == 8) GĐD++;
          else if (o.status == 10) KTD++;
        });
        MT > 0
          ? (this.phanboCoupon.StatusWait = "Chờ duyệt (" + MT + ")")
          : (this.phanboCoupon.StatusWait = "");
        Treo > 0
          ? (this.phanboCoupon.StatusTreo = "Treo (" + Treo + ")")
          : (this.phanboCoupon.StatusTreo = "");
        ASMD > 0
          ? (this.phanboCoupon.StatusASMD = "ASMD (" + ASMD + ")")
          : (this.phanboCoupon.StatusASMD = "");
        GĐD > 0
          ? (this.phanboCoupon.StatusGĐD = "GĐD (" + GĐD + ")")
          : (this.phanboCoupon.StatusGĐD = "");
        KTD > 0
          ? (this.phanboCoupon.StatusKTD = "KTD (" + KTD + ")")
          : (this.phanboCoupon.StatusKTD = "");
        SSD > 0
          ? (this.phanboCoupon.StatusSSD = "SSD (" + SSD + ")")
          : (this.phanboCoupon.StatusSSD = "");
      });
    },
    checkAll(val) {
      if (val) {
        if (this.phanboCoupon.status == 0) {
          return;
        }
        if (this.phanboCoupon.lv == 5) {
          this.tableData.forEach(e => {
            if (e.status < 10) {
              e.Nstatus = 8;
            }
          });
          this.saved = false;
        } else if (this.phanboCoupon.lv == 4) {
          this.tableData.forEach(e => {
            if (e.status < 8) {
              e.Nstatus = 6;
            }
          });
          this.saved = false;
        } else if (this.phanboCoupon.lv == 2) {
          this.tableData.forEach(e => {
            if (e.status < 6) {
              e.Nstatus = 5;
            }
          });
          this.saved = false;
        }
      } else {
        this.tableData.forEach(e => {
          e.Nstatus = e.status;
        });
      }
    },
    allowEdit(row) {
      if (this.phanboCoupon.status == 0) {
        return false;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.status == 10) {
          return false;
        }
        return true;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.status >= 8) {
          return false;
        }
        return true;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.status >= 6) {
          return false;
        }
        return true;
      } else {
        if (row.status == 1 || row.status == 4) {
          return true;
        }
        return false;
      }
    },
    disable8(row) {
      if (this.phanboCoupon.status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        return true;
      } else if (this.phanboCoupon.lv == 2) {
        return true;
      } else {
        return true;
      }
    },
    disable6(row) {
      if (this.phanboCoupon.status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable5(row) {
      if (this.phanboCoupon.status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.status >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable1(row) {
      if (this.phanboCoupon.status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.status >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable0(row) {
      if (this.phanboCoupon.status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.status == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.status >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.status >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },

    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex > 4 && columnIndex < this.allTypeCus.length + 5) {
        let prop = this.allTypeCus[columnIndex - 5].col;
        if (Number(row[prop]) == 0) {
          return { background: "#faf3e1" };
        }
      }
    },
    statusChange(row) {
      this.saved = false;
      if (row.isEdit) {
        this.confirmEdit(row);
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
    onInput(row, col, m) {
      this.calValueP(row, col, m);
      this.calSumP(row);
    },
    calValueP(row, col, m) {
      CalValueP(row, col, m);
    },
    calSumP(row) {
      CalSumP(row, this.type);
    },
    confirmEdit(row) {
      if (row.DateStart == null && this.type == "KD") {
        this.$message({
          message: "Hãy chọn ngày bắt đầu hiệu lực",
          type: "error"
        });
        return;
      }
      var req = {
        RowID: row.RowID,
        type: this.type
      };

      this.allTypeCus.forEach(e => {
        if (e.type != "d") {
          req[e.col] = Number(row[e.col]) > 0 ? Number(row[e.col]) : null;
        } else {
          req[e.col] = row[e.col];
        }
        row[e.col] = req[e.col];
      });

      UpdateCommissionOrderLine(req).then(res => {
        InitOValue(row, this.type);
        row.isEdit = false;
      });
    },
    cancelEdit(row) {
      UndoEdit(row, this.type);
      this.calSumP(row);
      row.isEdit = false;
    },
    openModal() {
      this.$emit("addItemClicked", this.phanboCoupon, this.project);
    },
    deleteItem(row) {
      this.$confirm("Bạn có muốn xóa SP này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        DeleteItemInCommissionOrderLine({
          type: this.type,
          no: row.RowID
        }).then(res => {
          var idx = this.tableData.indexOf(row);
          this.tableData.splice(idx, 1);
        });
      });
    },
    filterHandler(value, row) {
      return row.status === value;
    }
  },

  mounted() {
    if (this.type == "TH") {
      if (this.project.items == null) {
        this.isLoading = true;
        GetItemOfComHeaderProject({
          headerId: this.project.RowID
        }).then(res => {
          this.isLoading = false;
          var sef = this;
          res.Data.forEach(e => {
            e.Nstatus = e.status;

            e.isEdit = false;

            e.SumP = 0;
            sef.calSumP(e);
            var calValueP = sef.calValueP;

            InitOValue(e, this.type);
            CalAllValueMoneyP(e, this.type);
          });
          this.project.items = res.Data;
          this.tableData = this.project.items;
        });
      } else {
        this.tableData = this.project.items;
      }
    } else {
      if (this.phanboCoupon.items == null) {
        this.isLoading = true;
        GetItemOfCommissionOrderHeader({
          headerId: this.phanboCoupon.RowID
        }).then(res => {
          this.isLoading = false;
          var sef = this;
          res.Data.forEach(e => {
            if (e.DateStart == null) {
              e.DateStart = this.phanboCoupon.BaseDateStart;
            }

            e.Nstatus = e.status;
            e.isEdit = false;
            e.typeCustomers = null;
            e.SumP = 0;
            sef.calSumP(e);
            var calValueP = sef.calValueP;

            InitOValue(e, this.type);
            CalAllValueMoneyP(e, this.type);
          });
          this.phanboCoupon.items = res.Data;
          this.tableData = this.phanboCoupon.items;
        });
      } else {
        this.tableData = this.phanboCoupon.items;
      }
    }
  },
  created() {},
  watch: {
    "project.items": function() {
      this.tableData = project.items;
    }
  }
};
</script>
<style lang="css">
.el-input-number.is-controls-right .el-input__inner {
  padding-left: 0px;
  padding-right: 0px;
}
.el-input-number--mini .el-input-number__decrease,
.el-input-number--mini .el-input-number__increase {
  width: 14px;
  font-size: 12px;
}
</style>
