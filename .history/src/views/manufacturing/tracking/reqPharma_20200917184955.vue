<template>
  <div class="container">
    <div class="inline-block" style="float:right;">
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
      <el-table-column
        :data="posterLst"
        style="width: 100%"
        v-loading="loading"
      >
        <el-table-column prop="Code" label="MNV" width="100"> </el-table-column>
        <el-table-column prop="Name" label="Tên NV" width="180">
        </el-table-column>
        <el-table-column prop="RegistrationNo" label="Địa điểm">
        </el-table-column>
        <el-table-column prop="ActiveElement" label="Chủ địa điểm" width="180">
        </el-table-column>
        <el-table-column prop="Content" label="Tên poster" width="100">
        </el-table-column>
        <el-table-column
          prop="GlobalManufacturerName"
          label="Trạng thái"
          width="100"
        >
        </el-table-column>
        <el-table-column prop="PackagingSize" label="Trạng thái" width="100">
        </el-table-column>
        <el-table-column prop="Unit" label="Trạng thái" width="100">
        </el-table-column>
      </el-table-column>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { db } from "./firebase";
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
      db.ref("Data").on("value", snap => {
        if (snap.val()) {
          console.log(snap.val());
          Object.values(snap.val()).forEach(element => {
            console.log(element);
            this.posterLst.push(element);
          });
        }
        console.log(this.posterLst);
      });
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
        "Địa chỉ"
      ];
      const filterHeader = [
        "Code",
        "Name",
        "RegistrationNo",
        "ActiveElement",
        "Content",
        "GlobalManufacturerName",
        "PackagingSize",
        "Unit"
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
