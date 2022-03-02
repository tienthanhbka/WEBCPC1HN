<template>
  <div class="orderhcm-container">
    <div class="orderhcm-header">
      <div class="inline-block">
        <div class="block">
          <el-date-picker
            class="el-select-months"
            size="small"
            style="margin-bottom:5px"
            v-model="value"
            type="month"
            placeholder="Pick a month"
          >
          </el-date-picker>
        </div>
      </div>
    </div>
    <div class="orderhcm-content" v-if="WorkList.length > 0">
      <el-table
        class="el-mobile-table"
        v-loading="listLoading"
        :data="WorkList"
        element-loading-text="Loading"
        border
        highlight-current-row
      >
        <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">
            <div class="dat-cell" label="STT">{{ scope.$index + 1 }}</div>
          </template>
        </el-table-column>

        <el-table-column label="Công việc" min-width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Công việc">
              <span>{{ scope.row.Description }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Khối lượng" align="right" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Khối lượng">
              <span>{{ scope.row.Quantity | setSize | toCommas }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="Đơn vị" align="center" width="100">
          <template slot-scope="scope">
            <div class="dat-cell" label="Đơn vị">
              <span>{{ scope.row.Unit }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          label="Thời gian cập nhật gần nhất"
          align="center"
          width="250"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="TG cập nhật gần nhất">
              <span>{{ scope.row.TimeUpdate }}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="blank-table" v-else>Không có dữ liệu</div>
  </div>
</template>

<script>
import { getWork } from "@/api/appview";
import { getMonth } from "@/api/index";

export default {
  filters: {
    statusTextFilter(status) {
      return statusMap[status];
    },
    setSize: function(value) {
      if (!value) return "";
      var a = parseFloat(value);
      return a.toFixed(1);
    },
    toCommas: function(value) {
      if (value != null) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
    }
  },
  components: {},
  props: {},
  data() {
    return {
      startDate: "",
      endDate: "",
      value: "",
      listLoading: false,
      month: "",
      year: "",
      WorkList: [],
      Token: ""
    };
  },
  methods: {
    fetchData() {
      var req = {
        month: this.month,
        year: this.year,
        token: this.Token
      };
      this.listLoading = true;

      getWork(req).then(response => {
        this.WorkList = response.Data;
        this.listLoading = false;
      });
    }
  },
  computed: {},
  created() {
    this.Token = this.$route.params.token;
    this.value = new Date();

    this.month = this.value.getMonth() + 1;
    this.year = this.value.getFullYear();
    this.fetchData();
    // alert(this.value)
  },
  watch: {
    value: function() {
      this.month = this.value.getMonth() + 1;
      this.year = this.value.getFullYear();
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.orderhcm-container {
  padding: 5px 8px;
  min-height: 100vh;

  .inline-block {
    display: inline-block;
    margin-bottom: 5px;
    border-bottom: 1px solid #ccc;
  }

  .table-pagination {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 600px) {
  .inline-block {
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }

  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
