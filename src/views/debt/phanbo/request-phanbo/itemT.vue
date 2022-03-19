<template>
  <div>
    <el-tooltip content="Thêm hóa đơn trong phiếu" placement="top">
      <el-button
        v-if="phanboCoupon.status == 1 || phanboCoupon.status == 4"
        style=" color: #16a085;
    padding: 16px 18px;"
        @click="openModal"
        ><i class="fas fa-plus"></i
      ></el-button>
    </el-tooltip>
    <el-table
      :key="tKey"
      :header-row-style="{ color: '#16a085' }"
      :data="phanboCoupon.items"
      v-loading="isLoading"
      fit
      style="width: 100%"
      border
    >
      <el-table-column type="expand">
        <template slot-scope="scope">
          <type-customer-t
            :item="scope.row"
            :phanboCoupon="phanboCoupon"
          ></type-customer-t>
        </template>
      </el-table-column>
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope"
          ><i class="fas fa-pills" style="color:#16a085"></i>
          {{ scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column width="170" label="Mã SP">
        <template slot-scope="{ row }">{{ row.idProduct }}</template>
      </el-table-column>
      <el-table-column min-width="170" label="Tên SP">
        <template slot-scope="{ row }">{{ row.Name }}</template>
      </el-table-column>
      <el-table-column width="170" label="DVT">
        <template slot-scope="{ row }">{{
          row["Base Unit of Measure"]
        }}</template>
      </el-table-column>
      <el-table-column width="170" label="Giá">
        <template slot-scope="{ row }">{{ row["Unit Cost"] | toVND }}</template>
      </el-table-column>
      <!-- <el-table-column min-width="170" label="Đề xuất ck">
          <template slot-scope="{row}">{{row.commission}}</template>
        </el-table-column>
        <el-table-column min-width="170" label="Hiệu lực từ">
          <template slot-scope="{row}">{{row.DateStart|toDMY}}</template>
        </el-table-column>
        <el-table-column min-width="170" label="Actions">
          <template slot-scope="{row}">
              <el-button
            v-if="row.edit"
            type="success"
            size="small"
            icon="el-icon-circle-check"
            @click="confirmEdit(row)"
          >Ok</el-button>
          <el-button
            v-else
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="editLine(row)"
          >Sửa</el-button>
          </template>
        </el-table-column> -->
    </el-table>
  </div>
</template>
<script>
import { GetItemOfCommissionOrderHeader } from "@/api/debt";
import { parseTime } from "@/utils";
import typeCustomerT from "./typeCustomerT";
export default {
  components: {
    typeCustomerT
  },
  props: {
    phanboCoupon: Object
  },
  data() {
    return {
      tKey: 1,
      tableData: [],
      isLoading: false
    };
  },
  methods: {
    openModal() {
      console.log("23");

      this.$emit("addItemClicked", this.phanboCoupon);
    }
  },
  watch: {
    "phanboCoupon.items"() {
      console.log(this.phanboCoupon.items);
    }
  },
  mounted() {
    if (this.phanboCoupon.items == null) {
      GetItemOfCommissionOrderHeader({
        no: this.phanboCoupon.RowID
      }).then(res => {
        res.Data.forEach(e => {
          e.isLoading = false;
          e.edit = false;
          e.typeCustomers = null;
        });
        this.phanboCoupon.items = res.Data;
      });
    }
  }
};
</script>
