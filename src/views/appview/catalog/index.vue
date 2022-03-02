<template>
  <div class="container">
    <div class="inline-block">
      <el-input
        style="width:100%;margin:5px 0;"
        class="el-select-months"
        prefix-icon="el-icon-search"
        v-model="TextSearch"
        size="mini"
        placeholder="Tìm kiếm theo sản phẩm..."
      />
    </div>
    <div class="body" v-if="catalogLst.length > 0">
      <div
        class="product__list"
        v-for="(item, index) in catalogLst"
        :key="index"
      >
        <span class="product__name">{{ item.ProductName }}</span>

        <el-button
          class="product__detail"
          type="text"
          size="small"
          @click="detailImage(item)"
          >Chi tiết</el-button
        >
      </div>
      <el-dialog :visible.sync="dialogDetail" custom-class="small--modal">
        <span slot="title" class="title-dialog">{{ dialogTitle }}</span>
        <detail-image :data="data"></detail-image>
      </el-dialog>
      <!-- <el-table
        class="el-mobile-table"
        :data="
          catalogLst.filter(
            data =>
              !TextSearch ||
              data.ProductName.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        border
        stripe
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column label="Tên sản phẩm" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Tên sản phẩm">
              {{ scope.row.ProductName }}
            </div></template
          >
        </el-table-column>
        <el-table-column label="Ảnh 1" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Ảnh 1"> -->
      <!-- <img
                :src="scope.row.LinkImage1"
                alt="image1"
                width="100"
                height="100"
              /> -->
      <!-- <el-image :src="scope.row.LinkImage1" lazy></el-image></div
          ></template>
        </el-table-column>
        <el-table-column label="Ảnh 2" align="center">
          <template slot-scope="scope"
            ><div class="dat-cell" label="Ảnh 2">
              <el-image :src="scope.row.LinkImage2" lazy></el-image> -->
      <!-- <img
                :src="scope.row.LinkImage2"
                alt="image2"
                width="100"
                height="100"
              /> -->
      <!-- </div></template
          >
        </el-table-column>
      </el-table> -->
    </div>
    <div v-else class="blank-table">
      Không có dữ liệu
    </div>
  </div>
</template>
<script>
import axios from "axios";
import DetailImage from "./component/detailImage.vue";
export default {
  props: [""],
  components: { DetailImage },
  computed: {},
  data() {
    return {
      catalogLst: [],
      TextSearch: "",
      show: false,
      TextSearch: "",
      admin: false,
      loading: false,
      downloading: false,
      dialogDetail: false,
      dialogTitle: "",
      data: ""
    };
  },
  methods: {
    getdata() {
      this.loading = true;
      let a = [];
      let b = [];
      var instance = axios.create({
        baseURL: "https://api.cpc1hn.com.vn/",
        timeout: 20000,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTc4YjIzMy1hYzNmLTQ1NzktOWU3YS1mYjg1NTE3ZmFkMTciLCJqdGkiOiIxODJlNDVjZmU4ZWY5NWM5MDBkZmZiMGUwZmE1MTEyOTVlMjc2NmY2ZDY2MWNhNDk2YTVlYWY5NTA0YzNjNTMwODAzMDM0NGUxYmI1YzA1NyIsImlhdCI6MTYwODk1NjkwMiwibmJmIjoxNjA4OTU2OTAyLCJleHAiOjE2NDA0OTI5MDIsInN1YiI6IiIsInNjb3BlcyI6W119.EhIL4_3jlCpxEnRdZeCPSL4g_zLK8RiZQfBGc-92IOl5aK8cnvGEQQkci8ufgAWBrIAOgUssEQUt1D7BZJBN7_d30i8Fxf18z1gBDXNjT_Y3Oi67vD43dfWpw1JFgQogtxns3lyd7tm3VCrvpCOGBrjudfE-JcJ7jMVU1ALHMDTQI0lQ96myujPEmf0Fc2mCBU3UwUO7eaoBHJ-Z0QTNYlBmICAYzzT92SCP8QcL7ZZAO_ZsWcpiU47D-n_3kkZYwGWzyBqqopF__9V5GwoNmdw1fD9S21NKqo87BzXTcRq9c7ceiwdI9uOQvC3blx8Zk9gEcbaMw7fa1q06NPfoAUKmCOz7LQsU5F1AgsnfVQxdwOtR45jRGUlFXzuo0JlVZouEgoPj-oJt9HTWiXX8zp1FjNpRrZW6GNQgQZDXD9wVs7cGvGllGrg7uX6qXBaylFd64lG4WaqNxzAZaRnbb80fFLWrrQAT1zT6CMFUF3QPAOO63EzqlpWrTK7V5CbEjfHDOV4QWt37HevSNcdoN6o8gaUdJz4eRlARN79CaBKvW12AiwJi7hAR5sczWReTLGRbGW5cXip_Co9TX3-DfnUvJGT6MWuIdkF5paDIgoHXahxILus1AKgdT_ttqgSZGL_IZYAvJR07voggL7ULN-c0TxR_W4tOqiFrpjW91KQ"
        }
      });
      instance
        .get("toroi/catalogue?")
        .then(function(response) {
          a = response.data.data;
          a.forEach(item => {
            var index = {
              LeafleatID: item.toroi_code,
              LeaFleatName: item.tentoroi,
              ProductName: item.product_name[0],
              LinkImage1: item.img[0].replace("&amp;", "&"),
              LinkImage2: item.img[1].replace("&amp;", "&")
            };
            b.push(index);
          });
        })
        .catch(function(error) {
          console.log(error);
        });
      this.catalogLst = b;
      this.loading = false;
    },
    detailImage(row) {
      if (row) {
        this.dialogDetail = true;
        this.dialogTitle = row.ProductName;
        this.data = row;
      }
    }
    // ExportExel() {
    //   this.downloading = true;
    //   const tHeader = [
    //     "Mã NV",
    //     "Tên NV",
    //     "Mã công ty",
    //     "Tên công ty",
    //     "Xã",
    //     "Huyện",
    //     "Tỉnh",
    //     "Địa chỉ",
    //     "Địa điểm",
    //     "Tên địa điểm",
    //     "Chủ địa điểm",
    //     "Số điện thoại",
    //     "Tên poster",
    //     "Trạng thái"
    //   ];
    //   const filterHeader = [
    //     "idEmployee",
    //     "nameEmployee",
    //     "idCompany",
    //     "nameCompany",
    //     "AddrLv1",
    //     "AddrLv2",
    //     "AddrLv3",
    //     "Address",
    //     "Location",
    //     "nameLocation",
    //     "ownerLocation",
    //     "phoneNumber",
    //     "namePoster",
    //     "Status"
    //   ];
    //   var data = this.posterLst;
    //   import("@/vendor/Export2Excel").then(excel => {
    //     excel.export_json_to_excel({
    //       header: tHeader,
    //       data: this.formatJson(filterHeader, data),
    //       filename: "Danh sách poster CPC1HN ",
    //       autoWidth: true,
    //       bookType: "xlsx"
    //     });
    //     this.downloading = false;
    //   });
    // },
    // formatJson(filterVal, jsonData) {
    //   return jsonData.map(v =>
    //     filterVal.map(j => {
    //       return v[j];
    //     })
    //   );
    // }
  },
  mounted() {},
  watch: {},
  created() {
    this.getdata();
  }
};
</script>
<style lang="scss" scoped>
.container {
  padding: 5px;
  min-height: 100vh;
}
.product {
  &__list {
    width: 100%;
    height: auto;
    padding: 10px 20px;
    margin-bottom: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px,
      rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
  }
  &__name {
    font-size: 10pt;
    font-weight: 700;
    color: rgba(10, 9, 9, 0.555);
  }
  &__detail {
    float: right;
    padding: 0;
    margin: 0;
  }
}
.title-dialog {
  font-size: 10pt;
  font-weight: 700;
  color: #02bc77;
}
</style>
<style lang="scss">
.small--modal {
  width: 580px !important;
  max-width: 98%;
  margin-top: 5px !important;
  .el-dialog__body {
    padding: 0;
  }
}
</style>
