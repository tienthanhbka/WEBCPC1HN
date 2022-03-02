<template>
  <div class="my-mission-container">
    <div class="box--group__select">
      <el-select
        class="el-select-months group"
        style="width:100%;"
        v-model="currentGroup"
        size="small"
        placeholder="Chọn nhóm"
      >
        <el-option
          v-for="item in groupsLst"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-date-picker
        class="el-select-months group"
        prefix-icon=""
        placeholder="Ngày bắt đầu"
        v-model="DateBegin"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        size="mini"
      ></el-date-picker>
      <el-date-picker
        class="el-select-months group"
        prefix-icon=""
        style="margin-left:5px;margin-bottom:5px"
        placeholder="Ngày kết thúc"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        v-model="DateEnd"
        size="mini"
      ></el-date-picker>
    </div>
    <div v-if="tableData.length > 0">
      <el-table
        class="el-mobile-table"
        :data="tableData"
        id="tbldata"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="70" label="STT">
          <template slot-scope="scope"
            ><div class="dat-cell" label="STT">
              {{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column label="Thứ - Ngày">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Thứ - Ngày">
              {{ scope.row.TimeStart | convertDay }}
            </div></template
          >
        </el-table-column> -->
        <el-table-column label="Điểm đi">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Điểm đi">
              {{ scope.row.PlaceStart }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Điểm đến">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Điểm đến">
              {{ scope.row.PlaceEnd }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Thời gian khởi hành">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Thời gian khởi hành">
              {{ Date.parse(scope.row.TimeStart).toString("HH:ss dd/MM/yyyy") }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Xe">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Xe">
              {{ scope.row.NameCar }} ({{ scope.row.IDCar }})
            </div></template
          >
        </el-table-column>
        <!-- <el-table-column label="Biển số">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Biển số">
              
            </div></template
          >
        </el-table-column> -->
        <el-table-column label="Lái xe" width="150">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Lái xe">
              {{ scope.row.NameDriver }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Ghi chú">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Ghi chú">
              {{ scope.row.Note }}
            </div></template
          >
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
    <div class="blank-table" v-else>Không có dữ liệu</div>
  </div>
</template>

<script>
import { parseTime } from "@/utils/index";
import { GetCarPlan } from "@/api/appview";
import { getStartWeek, getEndWeek } from "@/api/index";
export default {
  components: {},
  filters: {
    convertDay: function(a) {
      var mydate = new Date(a);
      var current_day = mydate.getDay();
      //console.log(a.getDay())
      var day_name = "";

      switch (current_day) {
        case 0:
          day_name = "Chủ nhật";
          break;
        case 1:
          day_name = "Thứ hai";
          break;
        case 2:
          day_name = "Thứ ba";
          break;
        case 3:
          day_name = "Thứ tư";
          break;
        case 4:
          day_name = "Thứ năm";
          break;
        case 5:
          day_name = "Thứ sáu";
          break;
        case 6:
          day_name = "Thứ bảy";
      }

      return day_name + " " + new Date(a).toString("d/M/yyyy");
    }
  },
  data() {
    return {
      tableData: [],
      TextSearch: "",
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      Token: "",
      groupsLst: [
        { idGroup: "CNHN" },
        { idGroup: "CNDN" },
        { idGroup: "CNHCM" },
        { idGroup: "CNHBP" }
      ],
      currentGroup: ""
    };
  },
  methods: {
    fetchData() {
      if (this.currentGroup != "") {
        this.loadingTableData = true;
        var req = {
          CN: this.currentGroup,
          DateStart: this.DateBegin,
          DateEnd: this.DateEnd,
          token: this.Token
        };
        GetCarPlan(req).then(res => {
          this.loadingTableData = false;
          this.tableData = res.Data;
        });
      }
    }
  },
  watch: {
    pageSize: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    DateBegin: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    DateEnd: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    currentPage: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    },
    currentGroup: function() {
      if (this.currentGroup != "") {
        this.fetchData();
      }
    }
  },
  created() {
    this.Token = this.$route.params.token;
    this.currentGroup = this.groupsLst[0].idGroup;
    this.DateBegin = getStartWeek();
    this.DateEnd = getEndWeek();
  }
};
</script>

<style lang="scss" scoped>
.my-mission-container {
  padding: 5px;
}
.el-pagination {
  margin-top: 10px;
}
.overview-item {
  height: auto;
  background: #fff;
  margin-bottom: 5px !important;
  //background-image: linear-gradient(45deg, #ed213a, #cb2e49);
  display: flex;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
    rgba(0, 0, 0, 0.06) 0px 1px 2px 0px; //color: #fff;
  .image {
    margin-right: 20px;
  }
}
@media only screen and (max-width: 600px) {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
.inline-block {
  display: flex;
  border-bottom: 1px solid #eee;
}
.box--group__select {
  display: block;
  margin-bottom: 5px;
}
</style>
