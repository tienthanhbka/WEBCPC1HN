<template>
  <div class="my-mission-container">
    <!-- <div class="inline-block" style="margin-left: 5px;">
      <el-button
        type="success"
        icon="el-icon-document"
        class="inline-block"
        @click="create"
      >Thêm hướng dẫn</el-button>
    </div>
      <div class="inline-block">
        <el-input style="width: 70%; " class="search" placeholder="Tìm kiếm"  v-model="search"></el-input>
         <el-button  class="bt-search" type="infor" @click="fetchData"> <i class="fas fa-search"></i></el-button>

        
      </div>
      <div class="inline-block">
          <span style="margin-left:15px;">Loại học tập: </span>
        <el-select style="width: 200px;" v-model="type" placeholder="Chọn loại học tập">
        <el-option
          v-for="item in lstType"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      </div>
      -->
    <div class="inline-block">
      <el-input
        style="width: 70%; "
        class="search"
        placeholder="Tìm kiếm"
        v-model="search"
      ></el-input>
      <el-button class="bt-search" type="infor" @click="fetchData">
        <i class="fas fa-search"></i
      ></el-button>
    </div>
    <div>
      <el-table
        :data="tableData"
        v-loading="loadingTableData"
        border=""
        show-header
      >
        <el-table-column align="center" width="175px" label="STT">
          <template slot-scope="scope"
            >{{ scope.$index + 1 + (currentPage - 1) * pageSize }}
            <el-tooltip
              style="margin-left: 10px; color: #58ACFA;"
              content="Xem tờ toa"
              placement="top"
            >
              <router-link :to="'/xem-to-toa/' + scope.row.RowID">
                <i class="fas fa-map"></i> </router-link
            ></el-tooltip>

            <el-tooltip
              style="margin-left: 10px;color: #FA8258;"
              content="Xem tờ rơi"
              placement="top"
            >
              <router-link :to="'/xem-to-roi/' + scope.row.RowID">
                <i class="fas fa-scroll"></i> </router-link
            ></el-tooltip>

            <el-tooltip
              style="margin-left: 10px;color:#FA8258;"
              content="Xem slide"
              placement="top"
            >
              <router-link :to="'/xem-slide/' + scope.row.RowID">
                <i class="far fa-file-powerpoint"></i> </router-link
            ></el-tooltip>

            <el-tooltip
              style="margin-left: 10px;color: #58ACFA;"
              content="Xem video"
              placement="top"
            >
              <router-link :to="'/xem-video/' + scope.row.RowID">
                <i class="fas fa-photo-video"></i> </router-link
            ></el-tooltip>
            <!-- <el-button @click="startReport(scope.row)" type="text" > <i class="fas fa-edit"></i></el-button></el-tooltip> -->
            <!-- <el-tooltip content="Xóa" placement="top"><el-button @click="openModalDeleteDefine(scope.row)" type="text" >  <i style="color: red" class="fas fa-trash-alt"></i></el-button></el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column width="300px;" label="Ảnh">
          <template slot-scope="scope">
            <img
              style="width: 100%;"
              :src="
                'https://icpc1hn.work/api/' +
                  'File/GetImageProduct/' +
                  scope.row.Image +
                  '?token=' +
                  token
              "
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="Content"
          label="Sản phẩm"
          min-width="150px"
        ></el-table-column>

        <!-- <el-table-column prop="Number"  label="Số hướng dẫn"></el-table-column> -->
        <el-table-column label="Ngày văn bản" width="130px">
          <template slot-scope="scope">
            <span>{{ scope.row.TimeCreate | toDate }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column  prop="TimeEnd" label="Hiệu lực"></el-table-column> -->

        <el-table-column label="Các BP liên quan" width="170px">
          <template slot-scope="scope">
            {{ scope.row.Office.replace(";;", ",") }}
          </template>
        </el-table-column>
        <el-table-column
          prop="Note"
          label="Ghi chú"
          width="120px"
        ></el-table-column>
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
  </div>
</template>

<script>
import { GetReguDefine2 } from "@/api/regu";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      tableData: [],
      type: 1,
      token: Cookies.get("token"),
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      search: "",
      serviceCode: Cookies.get("idGroup"),
      token: Cookies.get("token")
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      var req = {
        token: Cookies.get("token"),
        search: this.search,
        type: this.type,
        pageSize: this.pageSize,
        page: this.currentPage
      };
      GetReguDefine2(req).then(response => {
        if (response.ResCode == 0) {
          this.tableData = response.Data;
          this.currentPage = response.PageNumber;
          this.pageSize = response.RowspPage;
          this.total = response.TotalPage * response.RowspPage;

          this.tableData.forEach(myFunction);
          function myFunction(item, index, arr) {
            if (item.File != "") {
              item.File = item.File.split(";;", 100);
            }
          }
          this.loadingTableData = false;
        }
      });
    }
  },
  watch: {
    type: function() {
      this.fetchData();
    },
    pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    groups: function() {
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
  }
};
</script>

<style lang="css" scoped>
.my-mission-container {
  padding: 5px;
}
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
  max-width: 100vh;
}
.el-pagination {
  margin-top: 10px;
}

.el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 50%;
}
</style>
