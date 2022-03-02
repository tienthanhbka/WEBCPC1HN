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
        timeout: 20000,
        headers: {
          //   "Content-Type": "application/json",
          //   "X-Requested-With": "XMLHttpRequest",
          authority: "ntt123.kiotviet.vn",
          fingerprintkey:
            "e4afdf41188326e7c9320a4fe3a34756_Chrome_Desktop_Mt Windows",
          cookie:
            "ga=GA1.2.1345902400.1594309053; __zlcmid=z6jGryUHk2Uq8e; gkvas-uuid=bc770acb-72d4-4516-8b1c-2b47ece53ca4; gkvas-uuid-d=1600334514748; _gid=GA1.2.1313219232.1600334515; _hjid=d118766e-9e50-4234-9651-6af8b3028ce6; _hjTLDTest=1; _hjAbsoluteSessionInProgress=1; kvcl_ntt123=3496cd4bae234088b76e95b5b6c6121f; zone=28; ss-opt=temp; ss-id=dOpJyUEXJ7a194JhSL4h; ss-pid=whsGoIyudJk6XNtODiDv; Retailer=ntt123; LatestBranch_772850_790=201; ss-tok=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImtpZCI6IkJNVSJ9.eyJpc3MiOiJrdnNzand0Iiwic3ViIjo3OTAsImlhdCI6MTYwMDMzNTExOSwiZXhwIjoxNjAyNzU0MzE5LCJwcmVmZXJyZWRfdXNlcm5hbWUiOiIwOTcyNjcxMTI3Iiwicm9sZXMiOlsiVXNlciJdLCJrdnNlcyI6ImNhM2I2Mzg2NDRmZTRhY2NiMTI0NmY4MWRhYzM4ZjFkIiwia3Z1aWQiOjc5MCwia3ZsYW5nIjoidmktVk4iLCJrdnV0eXBlIjowLCJrdnVsaW1pdCI6IkZhbHNlIiwia3Z1YWRtaW4iOiJUcnVlIiwia3Z1YWN0IjoiVHJ1ZSIsImt2dWxpbWl0dHJhbnMiOiJGYWxzZSIsImt2dXNob3dzdW0iOiJUcnVlIiwia3ZiaWQiOjIwMSwia3ZyaW5kaWQiOjEwLCJrdnJjb2RlIjoibnR0MTIzIiwia3ZyaWQiOjc3Mjg1MCwia3Z1cmlkIjo3NzI4NTAsImt2cmdpZCI6MjgsInBlcm1zIjoiIn0.MF3NIo0fMR857li_A11vGRtPmX08x3CLvLZFFoTnSio; kvas-uuid=e66e5d74-5d21-45d9-abde-785bd1ae7d5e; kvas-uuid-d=1600335094111; kv-session=616f53de-7d48-47d8-ae03-69949565860c; is-coffee=0; trial=1; kv-session-d=1600335215947"
        }
      });
      instance
        .get(
          "medicines?take=100000&skip=0&page=1&pageSize=100000&filter%5Blogic%5D=and"
        )
        .then(function(response) {
          console.log(response);
          this.posterLst = response.Data;
          //       a.forEach(item => {
          //         var index = {
          //           Active: item.active,
          //           idEmployee: item.belongto_mnv,
          //           nameEmployee: item.tdv.full_name,
          //           idCompany: item.macongty,
          //           nameCompany: item.tencongty,
          //           AddrLv1: item.diemdan.xa.level + " " + item.diemdan.xa.name,
          //           AddrLv2:
          //             item.diemdan.xa.huyen.level + " " + item.diemdan.xa.huyen.name,
          //           AddrLv3:
          //             item.diemdan.xa.huyen.tinh.level +
          //             " " +
          //             item.diemdan.xa.huyen.tinh.name,
          //           Address: item.diachi,
          //           idLocation: item.diadiem_id,
          //           Location: item.diemdan.diachi,
          //           nameLocation: item.diemdan.tendiadiem,
          //           ownerLocation: item.diemdan.chudiadiem,
          //           phoneNumber: item.diemdan.phone,
          //           idPoster: item.poster_code,
          //           namePoster: item.poster_name.name,
          //           idStatus: item.trangthai.id,
          //           Status: item.trangthai.name
          //         };
          //         b.push(index);
          //       });
          //     })

          //     .catch(function(error) {
          //       console.log(error);
        });
      //   this.loading = false;
      //   this.posterLst = b;
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
