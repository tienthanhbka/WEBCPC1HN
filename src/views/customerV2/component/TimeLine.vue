<template>
  <div class="demo">
    <div class="row text-center">
      <h1 class="heading-title" v-if="listCheck.length > 0">
        {{ listCheck[0].BFOCode }}
      </h1>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="main-timeline">
          <el-carousel
            trigger="click"
            height="500px"
            indicator-position="outside"
            @change="changeCustom"
            :autoplay="false"
          >
            <el-carousel-item v-for="(item, index) in PlaceLst" :key="index">
              <div
                class="timeline"
                v-for="(item, index) in listCheck"
                :key="index"
                :loading="loading"
              >
                <div class="timeline-content" v-if="listCheck.length > 0">
                  <span class="date">
                    <span class="day">{{
                      Date.parse(item.TimeAction).toString("dd/MM")
                    }}</span>
                  </span>
                  <h2
                    class="title"
                    :class="item.TypeData == 1 ? 'sale' : 'call'"
                  >
                    <span
                      >{{ item.Quantity }} -
                      {{ item.TypeData | toTypeData }}</span
                    >
                    <span style="display:inline-block;float:right;"></span>
                  </h2>
                </div>
                <div v-else class="blank-table">Không có dữ liệu</div>
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
import { getStartDate, getEndDate } from "@/api/index";
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
      UserName: Cookies.get("idEmployee"),
      token: Cookies.get("token")
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
        }
      });
    },
    fetchLine(val) {
      console.log(this.PlaceLst[0]);
      if (val.BFOCode !== "Chưa chuẩn hóa") {
        this.loading = true;
        const req = {
          UserName: this.UserName,
          Token: this.token,
          TimeStart: getStartDate(),
          TimeEnd: getEndDate(),
          CustomerID: val.BFOCode
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
      }
    },
    changeCustom(val) {
      let item = this.PlaceLst[val];
      this.fetchLine(item);
    }
  },
  created() {
    this.fetchData();
  },
  mounted() {
    this.fetchLine(this.PlaceLst[0]);
  }
};
</script>

<style scoped>
.demo {
  height: 100vh;
  background-image: linear-gradient(45deg, #6d6027, #d3cbb8);
}
.container {
  height: 100vh;
}
.heading-title {
  color: #fff;
}
.main-timeline {
  width: 80%;
  margin: 20px auto;
  position: relative;
}

.main-timeline:before {
  content: "";
  display: block;
  width: 2px;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
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
  border-radius: 6px;
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
  font-weight: 900;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  border: 2px solid rgba(255, 255, 255, 0.2);
  background-image: linear-gradient(45deg, #2193b0, #6dd5ed);
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
  color: #fff;
  text-transform: uppercase;
  /* letter-spacing: -1px; */
  border-radius: 6px 6px 6px 6px;
  position: relative;
  /* margin-bottom: 15px; */
  margin: 0 15px 15px 0;
}

.main-timeline .title:after {
  content: "";
  width: 10px;
  height: 10px;
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
/* 
.main-timeline .timeline:nth-child(1) .title,
.main-timeline .timeline:nth-child(1) .title:after {
  background: #9f84c4;
}

.main-timeline .timeline:nth-child(2) .title,
.main-timeline .timeline:nth-child(2) .title:after {
  background: #02a2dd;
}

.main-timeline .timeline:nth-child(3) .title,
.main-timeline .timeline:nth-child(3) .title:after {
  background: #58b25e;
}

.main-timeline .timeline:nth-child(4) .title,
.main-timeline .timeline:nth-child(4) .title:after {
  background: #eab715;
} */
.main-timeline .timeline .sale,
.main-timeline .timeline .sale:after {
  /* background-image: linear-gradient(45deg, #2193b0, #6dd5ed); */
  background: #02a2dd;
}
.main-timeline .timeline .call,
.main-timeline .timeline .call:after {
  background: #58b25e;
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
    width: 60px;
    height: 60px;
    margin-left: -30px;
  }
  .main-timeline .month {
    font-size: 14px;
  }
}
</style>
