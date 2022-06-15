<template>
  <div>
    <el-dialog
      title="Đề nghị chi phí"
      :visible.sync="feeModalVisible"
      custom-class="modal-class"
    >
      <fee-request-modal
        @feeRequestAdded="onFeeRequestAdded"
        @feeRequestEdited="onFeeRequestEdited"
        :coupon="this.currentCoupon"
      ></fee-request-modal>
    </el-dialog>
    <div v-if="!isGroupPage" class="inline-block">
      <div class="inline-block">
        <el-button
          type="primary"
          icon="el-icon-refresh"
          class="inline-block"
          @click="fetchData"
        ></el-button>
      </div>
      <div class="inline-block">
        <el-button @click="openModalFee()" type="warning"
          ><i class="fas fa-plus"></i> Phiếu đề nghị chi phí</el-button
        >
      </div>
    </div>
    <div v-if="isGroupPage" class="inline-block">
      <div class="inline-block">
        <el-select
          style="width:100%; margin-bottom:10px"
          v-model="currentGroup"
          placeholder="Select"
        >
          <el-option
            v-for="group in groupLst"
            :key="group.idGroup"
            :label="group.idGroup"
            :value="group.idGroup"
          ></el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-select
          style="width:100%;margin-bottom:10px"
          v-model="currentEm"
          placeholder="Select"
        >
          <el-option
            v-for="em in emLst"
            :key="em.idEmployee"
            :label="em.nameEmployee"
            :value="em.idEmployee"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="inline-block">
      <el-input
        placeholder="Tên NV | Mã KH"
        v-model="search"
        class="input-with-select"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="fetchData"
        ></el-button>
      </el-input>
    </div>
    <el-table
      :data="tableData"
      v-loading="isLoading"
      fit
      :header-row-style="{ color: '#2f3640' }"
      style="width: 100%"
      border
    >
      <el-table-column width="70">
        <template slot-scope="scope">
          <el-button
            type="text"
            style="padding:0px"
            @click="openModalFee(scope.row)"
            >Chi tiết</el-button
          >
        </template>
      </el-table-column>
      <el-table-column align="center" width="64" label="STT">
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
        </template>
      </el-table-column>
      <el-table-column min-width="220" label="Nhân viên">
        <template slot-scope="{ row }">
          {{ row.EmployeeName }}
        </template>
      </el-table-column>
      <el-table-column min-width="300" label="KH">
        <template slot-scope="{ row }">
          {{ row.CustomerNo }} - {{ row.CustomerName }}
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="SP">
        <template slot-scope="{ row }">
          <span v-if="row.TypeItem == 1">
            Tất cả
          </span>
          <span v-else>
            {{ row.Items }}
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="Mô">
        <template slot-scope="{ row }">
          {{ row.TypeCus | encodeTypeCus }}
        </template>
      </el-table-column>
      <el-table-column width="200" label="Thời gian tính">
        <template slot-scope="{ row }">
          <span style="color:#6c5ce7"
            ><i class="fas fa-calendar"></i>
            {{ Date.parse(row.StartTime).toString("dd/MM/yyyy") }} -
            {{ Date.parse(row.EndTime).toString("dd/MM/yyyy") }}
          </span>
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="Ghi chú">
        <template slot-scope="{ row }">
          {{ row.Note }}
        </template>
      </el-table-column>
      <el-table-column min-width="200" label="Ghi chú KT">
        <template slot-scope="{ row }">
          {{ row.NoteKT }}
        </template>
      </el-table-column>
      <el-table-column width="120" label="Trạng thái">
        <template slot-scope="{ row }">
          <el-tag
            slot="reference"
            :type="row.Status | requestHeaderStatusColor"
          >
            {{ row.Status | requestHeaderStatusText }}
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
import FeeRequestModal from "./components/fee-request-modal";
import { GetFeeRequestHeader } from "@/api/debt";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
import TypeCus from "./TH-offer/const";
export default {
  components: {
    FeeRequestModal
  },
  created() {
    if (this.$router.currentRoute.path.includes("nhom")) {
      this.isGroupPage = true;
    }
    if (this.isGroupPage) {
      GetListGroupAdminByToken().then(res => {
        this.groupLst = res.Data;
        this.currentGroup = this.groupLst[0].idGroup;
      });
    }
    this.fetchData();
  },
  filters: {
    encodeTypeCus(str) {
      var arr = str.split(",");
      var encodeArr = [];
      arr.forEach(e => {
        TypeCus.KD.forEach(o => {
          if (e == o.col) {
            encodeArr.push(o.code);
          }
        });
      });
      return encodeArr.join(",");
    }
  },
  methods: {
    onFeeRequestAdded(fee) {
      this.feeModalVisible = false;
      this.tableData.unshift(fee);
    },
    onFeeRequestEdited(fee) {
      this.feeModalVisible = false;
      this.currentCoupon.CustomerName = fee.CustomerName;
      this.currentCoupon.CustomerNo = fee.CustomerNo;
      this.currentCoupon.StartTime = fee.StartTime;
      this.currentCoupon.EndTime = fee.EndTime;
      this.currentCoupon.Items = fee.Items;
      this.currentCoupon.TypeItem = fee.TypeItem;
      this.currentCoupon.TypeCus = fee.TypeCus;

      this.currentCoupon.Note = fee.Note;

      this.currentCoupon.Status = fee.Status;
    },
    openModalFee(row) {
      if (row) {
        this.currentCoupon = row;
      } else {
        this.currentCoupon = null;
      }
      this.feeModalVisible = true;
    },
    fetchData() {
      this.isLoading = true;
      GetFeeRequestHeader({
        em: this.currentEm,
        PageNumber: this.currentPage,
        RowspPage: this.pageSize,
        search: this.search
      }).then(res => {
        this.dataLength = res.TotalRows;
        this.tableData = res.Data;
        this.isLoading = false;
      });
    }
  },
  data() {
    return {
      feeModalVisible: false,
      dataLength: 0,
      currentCoupon: null,
      pageSize: 10,
      currentPage: 1,
      isLoading: false,
      tableData: [],
      isGroupPage: false,
      groupLst: [],
      emLst: [],
      currentGroup: "",
      currentEm: "",
      search: ""
    };
  },
  watch: {
    currentGroup() {
      if (this.isGroupPage && this.currentGroup != "") {
        getEmployeesByIdGroup({
          idGroup: this.currentGroup
        }).then(res => {
          this.emLst = res.Data;
          this.currentEm = this.emLst[0].idEmployee;
        });
      }
    },
    currentEm() {
      if (this.isGroupPage && this.currentGroup != null) {
        this.fetchData();
      }
    }
  }
};
</script>
<style scoped>
.modal-class {
  max-width: 960px;
  width: 98%;
}
</style>
