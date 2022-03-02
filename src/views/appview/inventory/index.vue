<template>
  <div class="my-mission-container">
    <div v-if="tableData.length > 0">
      <div v-for="(item, index) in tableData" :key="index">
        <distributor :data="item"></distributor>
      </div>
    </div>
    <div v-else class="blank-table">Không có dữ liệu</div>
  </div>
</template>

<script>
import { GetStoreProductByCode, GetStoreNPPByEm } from "@/api/appview";
import Distributor from "./component/distributor.vue";
export default {
  components: { Distributor },
  data() {
    return {
      tableData: [],
      rowSelect: "",
      NumberNP: [],
      TextSearch: "",
      typeList: [],
      DateBegin: null,
      DateEnd: null,
      loadingTableData: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      UserName: "",
      Token: ""
    };
  },
  methods: {
    fetchData() {
      this.loadingTableData = true;
      var req = {
        UserName: this.UserName,
        Token: this.Token
      };
      GetStoreNPPByEm(req).then(res => {
        if (res.RespCode === 0) {
          this.loadingTableData = false;
          this.tableData = res.StoreNPPLst;
        } else {
          this.$message({
            message: res.RespText,
            type: "danger"
          });
        }
      });
    }
  },
  watch: {},
  created() {
    if (this.$route.params.token) {
      this.Token = this.$route.params.token;
      this.UserName = this.$route.params.username;
      this.fetchData();
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.my-mission-container {
  padding: 5px 8px;
}
</style>
