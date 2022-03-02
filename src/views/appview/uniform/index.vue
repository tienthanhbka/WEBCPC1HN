<template>
  <div class="demo">
    <div
      style="border-bottom: 1px solid #eee;
  margin: 5px;"
    >
      <div class="inline-block">
        <el-date-picker
          class="el-select-months group"
          placeholder="Ngày bắt đầu"
          v-model="DateBegin"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          size="mini"
        ></el-date-picker>
        <el-date-picker
          class="el-select-months group"
          style="margin-left:5px;margin-bottom:5px"
          placeholder="Ngày kết thúc"
          format="dd/MM/yyyy"
          value-format="yyyy-MM-dd"
          v-model="DateEnd"
          size="mini"
        ></el-date-picker>
      </div>
    </div>
    <div v-if="data" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="row" v-for="(item, index) in data" :key="index">
        <div class="overview-item">
          <div class="image">
            <img
              width="50"
              height="50"
              src="https://image.flaticon.com/icons/png/512/262/262226.png"
              alt="img"
            />
          </div>
          <div class="content">
            <div class="title">
              Ngày {{ Date.parse(item.TimeStart).toString("dd/MM/yyyy") }}
            </div>
            <div class="value">
              Thời gian: {{ Date.parse(item.TimeStart).toString("HH:mm") }} -
              {{ Date.parse(item.TimeEnd).toString("HH:mm") }}
            </div>
            <div class="value">Kết quả: {{ item.Status | toStatusText }}</div>
            <div class="value" v-if="item.Note">Ghi chú: {{ item.Note }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="blank-table" v-else>
      Không có dữ liệu
    </div>
  </div>
</template>
<script>
import { GetDetailResultCheck } from "@/api/call";
import { getStartMonth, getEndDate } from "@/api/index";
export default {
  props: {},
  filters: {
    toStatusText(val) {
      if (val == 1) {
        return "Chưa đánh giá";
      } else if (val == 3) {
        return "Đạt";
      } else if (val == 5) {
        return "Không đạt";
      } else {
        return "Khác";
      }
    }
  },
  data() {
    return {
      UserName: "",
      token: "",
      data: [],
      DateBegin: getStartMonth(),
      DateEnd: getEndDate(),
      fullscreenLoading: false
    };
  },
  methods: {
    fetchData() {
      this.fullscreenLoading = true;
      var req = {
        DateStart: this.DateBegin,
        DateEnd: this.DateEnd,
        UserName: this.UserName,
        Token: this.token,
        EmployeeID: this.UserName
      };
      GetDetailResultCheck(req).then(res => {
        if (res.RespCode == 0) {
          this.data = res.DetailResultLst;
          this.fullscreenLoading = false;
        }
      });
    }
  },
  created() {
    (this.UserName = this.$route.params.username),
      (this.token = this.$route.params.token);
    this.fetchData();
  },
  watch: {
    DateBegin() {
      this.fetchData();
    },
    DateEnd() {
      this.fetchData();
    }
  }
};
</script>

<style scoped lang="scss">
.overview-item {
  height: auto;
  background: #fff;
  margin: 0 8px;
  margin-bottom: 6px !important;

  //background-image: linear-gradient(45deg, #ed213a, #cb2e49);
  display: flex;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgb(245, 233, 233);
  .image {
    margin-right: 20px;
  }
  .content {
    .title {
      font-size: 15px;
    }

    .value {
      font-size: 10pt;
      margin-top: 5px;
      color: rgba(0, 0, 0, 0.5);
      font-style: bold;
    }
  }
}
.inline-block {
  display: flex;
}
</style>
