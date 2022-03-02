<template>
  <div>
    <el-dialog
      :close-on-click-modal="false"
      title="Đề xuất tích đơn"
      custom-class="modal-class"
      :visible.sync="couponModalVisible"
    >
      <coupon-modal-content
        @couponEdited="onCouponEdited"
        @newCoupon="onNewCoupon"
        :visible="couponModalVisible"
        :coupon="currentCoupon"
      ></coupon-modal-content>
    </el-dialog>
    <el-select v-if="isGroupPage" v-model="currentGroup" placeholder="Chọn nhóm">
      <el-option
        v-for="item in groupLst"
        :key="item.idGroup"
        :label="item.idGroup"
        :value="item.idGroup"
      >
        <span style="float: left">{{ item.idGroup }}</span>
        <span style="float: right; color: #ff7675; font-size: 13px">{{ item.numNew }}</span>
      </el-option>
    </el-select>
    <el-button type="primary" icon="el-icon-refresh" class="inline-block" @click="fetchData"></el-button>
    <el-button
      v-if="!isGroupPage"
      style="margin-left:0px"
      @click="openTHModal"
      type="warning"
      icon="el-icon-circle-plus-outline"
      class="inline-block"
    >Phiếu mới</el-button>
    <el-tooltip content="Xem hướng dân">
      <a
        href="https://docs.google.com/presentation/d/1WfbWdX6OjaZUZsLlm1gkBPvt80z_nkIehx9io9LDW8s/edit#slide=id.g617858ad81_0_10"
        target="_blank"
      >
        <el-button size="small" type="primary" circle>
          <i class="fas fa-question"></i>
        </el-button>
      </a>
    </el-tooltip>
    <el-table v-loading="isLoading" border fit :data="tableData">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <div>
            <item :items="row.Lines" :phanboCoupon="row"></item>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="STT" width="70">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1)*pageSize}}
          <el-popover placement="top-start" trigger="hover" v-if="scope.row.status!=10">
            <div>
              <el-button
                style="color:#f1c40f"
                type="text"
                size="medium"
                icon="el-icon-edit"
                @click="editCoupon(scope.row)"
              >Sửa</el-button>

              <el-button
                v-if="scope.row.status!=10&&scope.row.status!=1&&scope.row.group&&scope.row.group.status>=2"
                style="color:#e17055"
                type="text"
                size="medium"
                @click="pauseCoupon(scope.row)"
              >
                <i class="fas fa-pause"></i> Treo
              </el-button>
              <el-button
                v-if="allowEdit(scope.row)"
                style="color:#c0392b"
                type="text"
                size="medium"
                icon="el-icon-delete"
                @click="deleteCoupon(scope.row)"
              >Xóa</el-button>
              <el-button
                v-if="scope.row.group&&scope.row.group.status>=2"
                style="color:#00b894"
                type="text"
                size="medium"
                icon="el-icon-check"
                @click="approveCoupon(scope.row)"
              >Duyệt phiếu</el-button>
            </div>
            <el-button
              style="color:#2980b9"
              type="text"
              size="medium"
              icon="el-icon-s-operation"
              slot="reference"
            ></el-button>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column v-if="isGroupPage" label="Nhân viên" width="150">
        <template slot-scope="scope">{{scope.row.EmployeeName}}</template>
      </el-table-column>
      <el-table-column label="Mã khách hàng" width="150">
        <template slot-scope="scope">{{scope.row.CustomerNo}}</template>
      </el-table-column>
      <el-table-column label="Tên khách hàng" min-width="250">
        <template slot-scope="scope">{{scope.row.CustomerName}}</template>
      </el-table-column>
      <el-table-column label="Loại tích đơn" align="center" width="120">
        <template slot-scope="scope">
          <div
            class="type-td"
            :style="{
            borderColor:typeTD[scope.row.Type].color,
            color:typeTD[scope.row.Type].color,
          }"
          >{{typeTD[scope.row.Type].name}}</div>
        </template>
      </el-table-column>

      <el-table-column label="Ngày hiệu lực" align="center" width="120">
        <template slot-scope="scope">{{Date.parse(scope.row.DateStart).toString('dd/MM/yyyy')}}</template>
      </el-table-column>
      <el-table-column label="Ghi chú" min-width="120">
        <template slot-scope="scope">{{scope.row.Note}}</template>
      </el-table-column>
      <el-table-column label="Trạng thái" align="center" width="120">
        <template slot-scope="scope">
          <el-tag slot="reference" :type="scope.row.Status|phanBoStatusColor ">
            <i class="fas fa-info"></i>
            {{ scope.row.Status|phanBoStatusText }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :total="dataLength"
      :small="true"
      :page-size.sync="pageSize"
      :current-page.sync="currentPage"
      @current-change="fetchData"
      background
      :pager-count="5"
      layout="-> , prev, pager, next, sizes"
    ></el-pagination>
  </div>
</template>
<script>
import CouponModalContent from "./components/coupon-modal-content";
import {
  GetCommissionOrderTD,
  GetListGroupAdminWithCMHInfo,
  GetCommissionOrderTDByIDGroup,
  ChangeStatusCommissionOrderTDHeader
} from "@/api/debt";
import Item from "./item";
export default {
  components: {
    CouponModalContent,
    Item
  },
  data() {
    return {
      dataLength: 0,
      pageSize: 10,
      currentPage: 1,
      isLoading: false,
      tableData: [],
      couponModalVisible: false,
      isLoading: false,
      isGroupPage: false,
      currentGroup: null,
      groupLst: [],
      currentCoupon: null,
      typeTD: {
        1: {
          name: "KH",
          color: "#27ae60"
        },
        2: {
          name: "KH - SP",
          color: "#0984e3"
        }
      }
    };
  },
  created() {
    if (this.$router.currentRoute.path.includes("/debt/phanbo/duyet")) {
      this.isGroupPage = true;
    }
    if (this.isGroupPage) {
      GetListGroupAdminWithCMHInfo({
        type: "TD"
      }).then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
      });
    } else {
      this.fetchData();
    }
  },
  watch: {
    currentGroup() {
      this.fetchData();
    },
    pageSize() {
      this.fetchData();
    }
  },
  methods: {
    deleteCoupon(c) {
      this.$confirm("Bạn có muốn xóa phiếu này?", "Thông báo", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        ChangeStatusCommissionOrderTDHeader({ rowID: c.RowID, status: 0 }).then(
          res => {
            c.Status = 0;
          }
        );
      });
    },
    onCouponEdited(c) {
      this.currentCoupon.CustomerName = c.CustomerName;
      this.currentCoupon.CustomerNo = c.CustomerNo;
      this.currentCoupon.DateStart = c.DateStart;
      this.currentCoupon.Type = c.Type;
      this.currentCoupon.Condition = c.Condition;
      this.currentCoupon.Value = c.Value;
      if (this.currentCoupon.Type == 1) {
        c.Lines = [
          {
            LCondition: c.Condition,
            LItemName: "Bất kỳ",
            LItemNo: "Bất kỳ",
            LRowID: c.RowID,
            LStatus: Number(c.Status),
            LUnit: "Bất kỳ",
            LValue: c.Value,
            Nstatus: Number(c.Status)
          }
        ];
      } else {
        c.Lines.forEach(e => {
          e.LStatus = Number(e.LStatus);
          e.Nstatus = Number(e.LStatus);
        });
      }

      this.currentCoupon.Lines = c.Lines;
      this.couponModalVisible = false;
    },
    allowEdit(c) {
      var elEdit = false;
      if (c.lv == null) {
        if (c.Status == 1 || c.Status == 4) {
          elEdit = true;
        }
      } else {
        if (c.lv < 2) {
          if (c.Status == 1 || c.Status == 4) {
            elEdit = true;
          }
        } else if (c.lv == 2) {
          if (c.Status <= 6) {
            elEdit = true;
          }
        } else if (c.lv > 2) {
          if (c.Status <= 8) {
            elEdit = true;
          }
        }
      }
      return elEdit;
    },
    editCoupon(c) {
      var elEdit = this.allowEdit(c);
      if (elEdit) {
        this.currentCoupon = c;
        this.couponModalVisible = true;
      } else {
        this.$message({
          message: "Không thể sửa phiếu này",
          type: "error"
        });
      }
    },
    lineData(row) {},
    onNewCoupon(c) {
      this.tableData.unshift(c);
      this.couponModalVisible = false;
    },
    openTHModal() {
      this.currentCoupon = null;
      this.couponModalVisible = true;
    },
    fetchData() {
      if (this.isGroupPage) {
        if (this.currentGroup == null) return;
        this.isLoading = true;
        GetCommissionOrderTDByIDGroup({
          idGroup: this.currentGroup,
          PageNumber: this.currentPage,
          RowspPage: this.pageSize
        }).then(res => {
          res.Data.forEach(row => {
            if (row.Type == 1) {
              row.Lines = [
                {
                  LCondition: row.Condition,
                  LItemName: "Bất kỳ",
                  LItemNo: "Bất kỳ",
                  LRowID: row.RowID,
                  LStatus: Number(row.Status),
                  LUnit: "Bất kỳ",
                  LValue: row.Value,
                  Nstatus: Number(row.Status)
                }
              ];
            } else {
              row.Lines.forEach(e => {
                e.LStatus = Number(e.LStatus);
                e.Nstatus = Number(e.LStatus);
              });
            }
          });
          this.tableData = res.Data;
          this.dataLength = res.TotalRows;
          this.isLoading = false;
        });
      } else {
        this.isLoading = true;
        GetCommissionOrderTD({
          PageNumber: 1,
          RowspPage: 10
        }).then(res => {
          res.Data.forEach(row => {
            if (row.Type == 1) {
              row.Lines = [
                {
                  LCondition: row.Condition,
                  LItemName: "Bất kỳ",
                  LItemNo: "Bất kỳ",
                  LRowID: row.RowID,
                  LStatus: Number(row.Status),
                  LUnit: "Bất kỳ",
                  LValue: row.Value,
                  Nstatus: Number(row.Status)
                }
              ];
            } else {
              row.Lines.forEach(e => {
                e.LStatus = Number(e.LStatus);
                e.Nstatus = Number(e.LStatus);
              });
            }
          });
          this.tableData = res.Data;
          this.dataLength = res.TotalRows;
          this.isLoading = false;
        });
      }
    }
  }
};
</script>
<style lang="css">
.modal-class {
  max-width: 98%;
  width: 960px;
  margin-top: 5px !important;
}
.type-td {
  font-weight: bold;
  display: inline-block;
  padding: 5px;
  border: 1px solid;
  border-radius: 4px;
}
</style>