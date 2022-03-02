<template>
  <div class="container-detail">
    <div v-if="data.length > 0">
      <el-table class="el-mobile-table" :data="data" border style="width: 100%">
        <el-table-column
          prop="Title"
          label="Loại việc"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Loại việc">
              {{ scope.row.Title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Content"
          label="Chi tiết"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Chi tiết">
              {{ scope.row.Content }}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="Rate"
          align="center"
          label="Khối lượng"
          width="80"
        >
          <template slot-scope="scope">
            <div class="dat-cell" label="Khối lượng">
              {{ scope.row.Rate }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="KPI" align="center" label="KPI" width="80">
          <template slot-scope="scope">
            <div class="dat-cell" label="KPI">
              {{ scope.row.KPI }}
            </div>
          </template>
        </el-table-column>

        <el-table-column align="center" label="Giao việc">
          <template slot-scope="scope">
            <div class="dat-cell" label="Giao việc">
              {{ scope.row.Time | toDate }}
            </div></template
          >
        </el-table-column>

        <el-table-column label="Hoàn thành" align="center">
          <template style="text-align: center;" slot-scope="scope">
            <div class="dat-cell" label="Hoàn thành">
              {{ scope.row.TimeFinish | toDate }}
            </div></template
          >
        </el-table-column>
      </el-table>
    </div>
    <div class="blank-table" v-else>
      Không có dữ liệu
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  created() {
    console.log(this.data);
  }
};
</script>

<style></style>
