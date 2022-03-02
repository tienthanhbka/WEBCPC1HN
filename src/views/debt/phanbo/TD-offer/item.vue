<template>
  <el-table border fit :data="tableData" size="small">
    <el-table-column label="STT" width="70">
      <template slot-scope="scope">
        {{ scope.$index + 1 }}
      </template>
    </el-table-column>
    <el-table-column label="Mã sản phẩm" width="120">
      <template slot-scope="scope">{{ scope.row.LItemNo }}</template>
    </el-table-column>
    <el-table-column label="Tên sản phẩm" min-width="250">
      <template slot-scope="scope">{{ scope.row.LItemName }}</template>
    </el-table-column>
    <el-table-column label="Đơn vị" width="70">
      <template slot-scope="scope">{{ scope.row.LUnit }}</template>
    </el-table-column>
    <el-table-column label="Chi phí" min-width="150">
      <template slot-scope="scope">{{ scope.row.LValue | toVND }}</template>
    </el-table-column>
    <el-table-column label="Định mức" min-width="150">
      <template slot-scope="scope">
        <span v-if="phanboCoupon.Type == 2"
          >{{ scope.row.LCondition | numbered }} {{ scope.row.LUnit }}</span
        >
        <span v-else>{{ scope.row.LCondition | toVND }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Trạng thái" width="110">
      <template slot-scope="scope">
        <el-tag
          slot="reference"
          size="mini"
          :type="scope.row.LStatus | phanBoStatusColor"
        >
          <i class="fas fa-info"></i>
          {{ scope.row.LStatus | phanBoStatusText }}
        </el-tag>
      </template>
    </el-table-column>
    <el-table-column
      v-if="phanboCoupon.Status != 0 && isGroupPage"
      width="180"
      align="center"
      label="Duyệt"
      column-key="evaluate"
      prop="evaluate"
    >
      <template slot="header">
        <el-tooltip :key="saved" content="Lưu lại" placement="top">
          <el-button
            v-if="saved"
            @click="uploadEvaluate()"
            size="mini"
            type="success"
          >
            <i class="el-icon-loading" v-show="uploadingEvaluate"></i>
            <i class="fas fa-save"></i>
          </el-button>
          <el-button
            v-else
            @click="uploadEvaluate()"
            size="mini"
            type="warning"
          >
            <i class="el-icon-loading" v-show="uploadingEvaluate"></i>
            <i class="fas fa-save"></i>
          </el-button>
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
            <el-tooltip content="Chờ duyệt" placement="top" effect="light">
              <i class="fas fa-dot-circle"></i>
            </el-tooltip>
          </el-radio-button>
          <el-radio-button :label="5" :disabled="disable5(scope.row)">
            <el-tooltip
              content="Duyệt với tư cách SS"
              placement="top"
              effect="light"
            >
              <i class="fas fa-check-circle"></i>
            </el-tooltip>
          </el-radio-button>
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
  </el-table>
</template>
<script>
import { ChangeLstStatusTDCommissionLine } from "@/api/debt";
export default {
  props: {
    phanboCoupon: Object,
    items: Array
  },
  data() {
    return {
      uploadingEvaluate: false,

      isGroupPage: false,
      tableData: [],
      saved: true
    };
  },
  methods: {
    uploadEvaluate() {
      this.uploadingEvaluate = true;
      var upData = [];
      this.tableData.forEach(e => {
        if (e.LStatus != e.Nstatus) {
          upData.push({
            LRowID: e.LRowID,
            Type: this.phanboCoupon.Type,
            LValue: e.LValue,
            LCondition: e.LCondition,
            LItemNo: e.LItemNo,
            Status: e.Nstatus
          });
        }
      });
      ChangeLstStatusTDCommissionLine({
        data: upData,
        RowID: this.phanboCoupon.Type == 1 ? this.phanboCoupon.RowID : null
      }).then(res => {
        res.Data.forEach(e => {
          if (e.Type == 2) {
            this.tableData.forEach(o => {
              if (o.LRowID == e.LRowID) {
                o.LStatus = e.LStatus;
              }
            });
            if (this.phanboCoupon.RowID == e.RowID) {
              this.phanboCoupon.Status = e.Status;
            }
          } else {
            this.tableData.forEach(o => {
              if (o.LRowID == e.RowID) {
                o.LStatus = e.Status;
              }
            });
            if (this.phanboCoupon.RowID == e.RowID) {
              this.phanboCoupon.Status = e.Status;
            }
          }
        });
        this.uploadingEvaluate = false;
        this.saved = true;
      });
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
    checkAll(val) {
      if (val) {
        if (this.phanboCoupon.Status == 0) {
          return;
        }
        if (this.phanboCoupon.lv == 5) {
          this.tableData.forEach(e => {
            if (e.LStatus < 10) {
              e.Nstatus = 8;
            }
          });
          this.saved = false;
        } else if (this.phanboCoupon.lv == 4) {
          this.tableData.forEach(e => {
            if (e.LStatus < 8) {
              e.Nstatus = 6;
            }
          });
          this.saved = false;
        } else if (this.phanboCoupon.lv == 2) {
          this.tableData.forEach(e => {
            if (e.LStatus < 6) {
              e.Nstatus = 5;
            }
          });
          this.saved = false;
        }
      } else {
        this.tableData.forEach(e => {
          e.Nstatus = e.LStatus;
        });
      }
    },
    statusChange(row) {
      this.saved = false;
    },
    disable8(row) {
      if (this.phanboCoupon.Status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.LStatus == 10) {
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
      if (this.phanboCoupon.Status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.LStatus == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.LStatus >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.LStatus >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable1(row) {
      if (this.phanboCoupon.Status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.LStatus == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.LStatus >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.LStatus >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable5(row) {
      if (this.phanboCoupon.Status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.LStatus == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.LStatus >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.LStatus >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    disable0(row) {
      if (this.phanboCoupon.Status == 0) {
        return true;
      }
      if (this.phanboCoupon.lv == 5) {
        if (row.LStatus == 10) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 4) {
        if (row.LStatus >= 8) {
          return true;
        }
        return false;
      } else if (this.phanboCoupon.lv == 2) {
        if (row.LStatus >= 6) {
          return true;
        }
        return false;
      } else {
        return true;
      }
    },
    initData() {
      if (this.phanboCoupon.Type == 2) {
        this.tableData = this.items;
      } else {
        this.tableData = [
          {
            LCondition: this.phanboCoupon.Condition,
            LItemName: "Bất kỳ",
            LItemNo: "Bất kỳ",
            LRowID: this.phanboCoupon.RowID,
            LStatus: Number(this.phanboCoupon.Status),
            LUnit: "Bất kỳ",
            LValue: this.phanboCoupon.Value,
            Nstatus: Number(this.phanboCoupon.Status)
          }
        ];
      }
    }
  },
  created() {
    if (this.$router.currentRoute.path.includes("/debt/phanbo/duyet")) {
      this.isGroupPage = true;
    }
    this.initData();
  },
  watch: {
    items() {
      this.initData();
    },
    phanboCoupon() {
      this.initData();
    }
  }
};
</script>
<style lang="css">
.el-radio-button--mini .el-radio-button__inner {
    padding: 5px 8px;
    font-size: 12px;
    border-radius: 0;
}
</style>
