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
      <el-select
        style="width:100%;margin-bottom:5px"
        class="el-select-months"
        size="mini"
        v-model="txtSearch"
        filterable
        placeholder="Tìm kiếm khách hàng"
        @change="changeCustom"
      >
        <el-option
          v-for="(item, index) in PlaceLst"
          :key="index"
          :label="item.PlaceName"
          :value="index"
        >
        </el-option>
      </el-select>
    </div>
    <!-- <div class="row text-center">
      <h1 class="heading-title" v-if="listCheck.length > 0">
        {{ CustomName }}
      </h1>
    </div> -->
    <div class="row">
      <div class="col-md-12">
        <div class="main-timeline">
          <el-carousel
            class="carousel-customer"
            trigger="click"
            height="500px"
            indicator-position="none"
            @change="changeCustom"
            :autoplay="false"
          >
            <el-carousel-item v-for="(item, index) in PlaceLst" :key="index">
              <div
                v-if="listCheck.length <= 0"
                style="width:100%;height:100%;background:#fff;"
              >
                <img
                  src="https://www.idyllicinstituteofmanagement.com/images/empty.png"
                  alt=""
                  width="100%"
                />
              </div>
              <div v-else>
                <div
                  class="timeline"
                  v-for="(item, index) in listCheck"
                  :key="index"
                >
                  <div class="timeline-content">
                    <span class="date">
                      <span class="day">{{
                        Date.parse(item.TimeAction).toString("dd/MM")
                      }}</span>
                    </span>
                    <h2
                      class="title"
                      :class="item.TypeData == 2 ? 'sale' : 'call'"
                    >
                      {{ item.Quantity }} -
                      {{ item.TypeData | toTypeData }}
                    </h2>
                  </div>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { GetCustomerByPId, GetReportTimelineByCus } from "@/api/KDCustomer";
import { getThreeMonth, getEndDate } from "@/api/index";
import { GetPlaceByUId } from "@/api/KDPlace";
import Cookies from "js-cookie";
export default {
  props: {},
  filters: {
    toTypeData(val) {
      if (val === 1) {
        return "Đơn hàng";
      }
      if (val === 2) {
        return "Call";
      }
    }
  },
  data() {
    return {
      listCheck: [],
      PlaceLst: [],
      currentItem: "",
      currentIndex: "",
      CustomName: "",
      UserName: "",
      token: "",
      txtSearch: "",
      DateBegin: getThreeMonth(),
      DateEnd: getEndDate()
    };
  },
  methods: {
    fetchData() {
      var req = {
        Token: this.token,
        UserName: this.UserName
      };
      GetPlaceByUId(req).then(res => {
        if (res.RespCode == 0) {
          this.PlaceLst = res.PlaceLst;
          if (this.PlaceLst.length > 0) {
            this.currentItem = this.PlaceLst[0];
            this.txtSearch = this.currentItem.PlaceName;
            this.fetchLine(this.currentItem);
          }
        }
      });
    },
    fetchLine(val) {
      if (val.PlaceId) {
        this.loading = true;
        const req = {
          UserName: this.UserName,
          Token: this.token,
          TimeStart: this.DateBegin,
          TimeEnd: this.DateEnd,
          CustomerID: val.PlaceId
        };
        GetReportTimelineByCus(req).then(res => {
          if (res.RespCode == 0) {
            this.listCheck = res.CustomerTimelineLst;
            this.loading = false;
          } else {
            this.$message({
              message: res.RespText,
              type: "error"
            });
          }
        });
      } else {
        this.listCheck = [];
        this.$message({
          message: "Xảy ra lỗi !"
        });
      }
    },
    changeCustom(val) {
      let item = this.PlaceLst[val];
      this.currentItem = item;
      this.CustomName = item.PlaceName;
      this.txtSearch = item.PlaceName;
      this.fetchLine(item);
    },
    clickBox() {
      this.currentItem.PlaceName = "";
    }
  },
  created() {
    (this.UserName = this.$route.params.username),
      (this.token = this.$route.params.token);
    this.fetchData();
  },
  watch: {
    DateBegin() {
      this.fetchLine(this.currentItem);
    },
    DateEnd() {
      this.fetchLine(this.currentItem);
    }
  }
};
</script>

<style scoped>
.demo {
  height: 100%;
}
.container {
  height: 100%;
}
.heading-title {
  color: rgb(158 22 22);
  margin: 0;
  padding: 15px;
  font-size: 16px;
}
.main-timeline {
  width: 80%;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
}

.main-timeline:before {
  content: "";
  display: block;
  width: 2px;
  height: 100%;
  background: rgb(158 22 22);
  margin: 0 0 0 -1px;
  position: absolute;
  top: 0;
  left: 50%;
}

.main-timeline .timeline {
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.main-timeline .timeline:after {
  content: "";
  display: block;
  clear: both;
}

.main-timeline .timeline-content {
  width: 40%;
  float: left;
  margin: 5px 0 0 0;
}

.main-timeline .date {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  padding: 5px 0;
  margin: 0 0 0 -36px;
  position: absolute;
  top: 0;
  left: 50%;
  font-size: 12px;
  text-transform: uppercase;
  /* color: rgb(255, 255, 255); */
  /* border-bottom: 2px solid rgba(146, 39, 39, 0.959); */
  color: rgb(172 9 9);
  border: 2px solid rgb(158 22 22);
  background: #fff;
}

.main-timeline .date span {
  display: block;
  text-align: center;
  position: absolute;
  font-size: 10pt;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.main-timeline .day,
.main-timeline .year {
  font-size: 10px;
}

.main-timeline .month {
  font-size: 18px;
}

.main-timeline .title {
  padding: 15px;
  margin: 0;
  font-size: 10pt;
  /* color: #fff; */
  color: rgb(158 22 22);
  border-bottom: 1px solid transparent;
  text-transform: uppercase;
  /* letter-spacing: -1px; */
  position: relative;
  /* margin-bottom: 15px; */
  margin: 0 15px 0 0;
}

.main-timeline .title:after {
  content: "";
  width: 100px;
  height: 100px;
  position: absolute;
  top: 20px;
  right: -5px;
  transform: rotate(-45deg);
}

.main-timeline .description {
  padding: 15px;
  margin: 0;
  font-size: 14px;
  color: #656565;
  background: rgba(255, 255, 255, 0);
  border-radius: 0 0 6px 6px;
}

.main-timeline .timeline:nth-child(2n + 2) .timeline-content {
  float: right;
}

.main-timeline .timeline:nth-child(2n + 2) .title:after {
  left: -5px;
}
.main-timeline .timeline .title.sale,
.main-timeline .timeline .title.sale:after {
  border-color: #58b25e;
  color: #58b25e;
}
.main-timeline .timeline .title.call,
.main-timeline .timeline .title.call:after {
  border-color: rgb(158 22 22);
  color: rgb(158 22 22);
}
@media only screen and (max-width: 990px) {
  .main-timeline {
    width: 100%;
  }
}

@media only screen and (max-width: 767px) {
  .main-timeline:before,
  .main-timeline .date {
    left: 6%;
  }
  .main-timeline .timeline-content {
    width: 85%;
    float: right;
  }
  .main-timeline .title:after {
    left: -5px;
  }
}

@media only screen and (max-width: 480px) {
  .main-timeline:before,
  .main-timeline .date {
    left: 12%;
  }
  .main-timeline .timeline-content {
    width: 75%;
  }
  .main-timeline .date {
    width: 50px;
    height: 50px;
    margin-left: -25px;
  }
  .main-timeline .month {
    font-size: 14px;
  }
}
.inline-block {
  display: flex;
}
</style>
<style lang="scss">
.carousel-customer {
  width: 100%;
  height: 100%;
  .el-carousel__item {
    overflow: auto;
  }
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .value {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .link {
      font-size: 12px;
      color: #b4b4b4;
    }
  }
}
.box-search {
  width: 100%;
  margin-bottom: 5px;
  .el-input__inner {
    border-radius: 40px;
    background-image: linear-gradient(45deg, #ed213a, #cb2e49);
    color: #fff !important;
    text-align: center;
  }
}
.el-select-months {
  .el-input__inner {
    text-align: center;
  }
}
.el-select-dropdown {
  max-width: 300px;
}
</style>
