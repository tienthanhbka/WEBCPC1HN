<template>
  <div class="container">
    <div class="inline-block" style="float:right;" v-if="admin">
      <el-button
        style="background-color:#02bc77;color:white;"
        icon="el-icon-document"
        :loading="downloading"
        class="inline-block"
        @click="ExportExel"
        plain
        >Xuất danh sách</el-button
      >
    </div>
    <div v-show="show" class="inline-block" style="float:right;">
      <el-input
        style="width:auto;"
        placeholder="Tìm kiếm theo địa điểm..."
        v-model="TextSearch"
        prefix-icon="el-icon-search"
      >
      </el-input>
    </div>
    <div class="inline-block" style="float:right;">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <div class="body">
      <el-table
        :data="
          posterLst.filter(
            data =>
              !TextSearch ||
              data.Address.toLowerCase().includes(TextSearch.toLowerCase())
          )
        "
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="idEmployee" label="MNV" width="100">
        </el-table-column>
        <el-table-column prop="nameEmployee" label="Tên NV" width="180">
        </el-table-column>
        <el-table-column prop="Address" label="Địa điểm"> </el-table-column>
        <el-table-column prop="ownerLocation" label="Chủ địa điểm" width="180">
        </el-table-column>
        <el-table-column prop="namePoster" label="Tên poster" width="100">
        </el-table-column>
        <el-table-column prop="Status" label="Trạng thái" width="100">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import Cookies from "js-cookie";
import { db } from "./component/firebase";
export default {
  props: [""],
  components: {},
  computed: {},
  data() {
    return {
      posterLst: [],
      show: false,
      TextSearch: "",
      admin: false,
      loading: false,
      downloading: false
    };
  },
  methods: {
    getdata() {
      this.loading = true;
      let a = [];
      let b = [];
      var instance = axios.create({
        baseURL: "https://ntt123.kiotviet.vn/api/",
        withCredentials: false, // send cookies when cross-domain requests
        timeout: 5000, // request timeout
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
      instance
        .get(
          "medicines?take=100000&skip=0&page=1&pageSize=100000&filter%5Blogic%5D=and"
        )
        .then(function(response) {
          console.log(response);
          this.posterLst = response.Data;
        })

        .catch(function(error) {
          console.log(error);
        });
      this.loading = false;
      console.log(this.posterLst);
    },
    ExportExel() {
      this.downloading = true;
      const tHeader = [
        "Mã NV",
        "Tên NV",
        "Mã công ty",
        "Tên công ty",
        "Xã",
        "Huyện",
        "Tỉnh",
        "Địa chỉ",
        "Địa điểm",
        "Tên địa điểm",
        "Chủ địa điểm",
        "Số điện thoại",
        "Tên poster",
        "Trạng thái"
      ];
      const filterHeader = [
        "idEmployee",
        "nameEmployee",
        "idCompany",
        "nameCompany",
        "AddrLv1",
        "AddrLv2",
        "AddrLv3",
        "Address",
        "Location",
        "nameLocation",
        "ownerLocation",
        "phoneNumber",
        "namePoster",
        "Status"
      ];
      var data = this.posterLst;
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: tHeader,
          data: this.formatJson(filterHeader, data),
          filename: "Danh sách poster CPC1HN ",
          autoWidth: true,
          bookType: "xlsx"
        });
        this.downloading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          return v[j];
        })
      );
    }
  },
  mounted() {},
  watch: {},
  created() {
    this.getdata();
  }
};
</script>
<style lang="scss" scoped>
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 5px;
  background-color: $bg;
  min-height: 100vh;
}
.inline-block {
  display: inline-block;
  max-width: 100vh;
}
</style>
