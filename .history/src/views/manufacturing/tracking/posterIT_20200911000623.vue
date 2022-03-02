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
    <div class="inline-block" style="float:right;" v-if="admin">
      <el-button
        icon="el-icon-search"
        class="inline-block"
        @click="show = !show"
        circle
      ></el-button>
    </div>
    <div class="body" v-if="admin">
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
    <div v-else class="blank-table">
      Không có dữ liệu
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
        baseURL: "https://api.cpc1hn.com.vn/",
        timeout: 20000,
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization:
            "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI5MTc4YjIzMy1hYzNmLTQ1NzktOWU3YS1mYjg1NTE3ZmFkMTciLCJqdGkiOiJkZWNhYjUyNmU3NmJmZTM2ZjZhM2JiMjQ1NTM1ZGEwMzMyZmE2NjU0YTZlZjc4MmYzYjlhODU3M2ZjMzViZTNlZmZkMjEwNjRjYzIwMmIxMCIsImlhdCI6MTU5OTQ3NTczMSwibmJmIjoxNTk5NDc1NzMxLCJleHAiOjE2MzEwMTE3MzEsInN1YiI6IiIsInNjb3BlcyI6W119.SuSH9Fwlg_Dqb6M9X29mxTVKnIUW_vCKNwz95RffEO6EX4POHrDNPB1X_pUW2TWz-9RTjeo7LMZM6qN1nDZ2WNv3K7d1x7C6bRfd_7opdo11eoP9O6bi7gWBvVwS4L_8fiXDdSxCgy0I2YRmaKk55Bxdr5bzbWPCjIIUmP7f3JX5X0YAAAOauWPL_BIQb_VlQySwmKzIqyQbWLSmdHTQKOPwI6NjLDJySIyyqQCTS39Rdd6K_lOBw0RTaRqikowgrFaqkmwDT9COnfh-dloJCFPcpI2W6royCJztbHmT5BvVIE9QQNTb2Ce2DYk7yAfPTZWPQ0T9FIFCMguOHqjE8-lhbYZ6fKiKhuxBRt6-Q5y3-0HFyCcrINP5gqtHw-OFHQY361uvf1nrnzziNMSfTV1G8F5xj9marvkwBPj0r3NGl62N9yQ-PweuLGcX3ltliExuyggKZ87fLhQS-ixeuTIf_8BpjoIeqlD9ZdxSJr4JSmewTzPAkMMjygKhZ4DFyS1W4QC91sKQnXUUAuJaMOYqx7kEj1XnDZmNRh6SQZORem5mfYHbU3_pW69F5bgMIwB3VdMYo1vx_2AuS_y7YnxN6rTcDDFuWzNxVexvwXawiH71zC_LcamS1fmBp9q6cw1RGWRDwMXVicwe6ehSpuchGsDZ43vObG4IZmKKjfM"
        }
      });
      instance
        .get("poster/data?start=0&length=5000")
        .then(function(response) {
          a = response.data.data;
          a.forEach(item => {
            var index = {
              Active: item.active,
              idEmployee: item.belongto_mnv,
              nameEmployee: item.tdv.full_name,
              idCompany: item.macongty,
              nameCompany: item.tencongty,
              AddrLv1: item.diemdan.xa.level + " " + item.diemdan.xa.name,
              AddrLv2:
                item.diemdan.xa.huyen.level + " " + item.diemdan.xa.huyen.name,
              AddrLv3:
                item.diemdan.xa.huyen.tinh.level +
                " " +
                item.diemdan.xa.huyen.tinh.name,
              Address: item.diachi,
              idLocation: item.diadiem_id,
              Location: item.diemdan.diachi,
              nameLocation: item.diemdan.tendiadiem,
              ownerLocation: item.diemdan.chudiadiem,
              phoneNumber: item.diemdan.phone,
              idPoster: item.poster_code,
              namePoster: item.poster_name.name,
              idStatus: item.trangthai.id,
              Status: item.trangthai.name
            };
            b.push(index);
          });
        })

        .catch(function(error) {
          console.log(error);
        });
      this.loading = false;
      this.posterLst = b;
    },
    Auth() {
      db.ref("Admin").on("value", snap => {
        Object.values(snap.val()).forEach(element => {
          if (Cookies.get("idEmployee") == element.Code) {
            this.admin = true;
          }
        });
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
    this.Auth();
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
