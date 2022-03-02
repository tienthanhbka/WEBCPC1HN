<template>
  <div class="appview-container">
    <!-- <div
      style="display:flex;border-bottom: 1px solid #eee;
    margin-bottom: 5px;padding:0 10px"
    >
      <el-date-picker
        class="el-select-months"
        v-model="DateTime"
        style="width:40%;margin:10px 0"
        type="month"
        size="mini"
        value-format="MM-yyyy"
        placeholder="Pick a month"
        value="2019-07"
      >
      </el-date-picker>
      <h3 class="title-sum">Số công tháng {{ Month }} là: {{ SumDay }} ngày</h3>
    </div> -->
    <div class="body-content">
      <!-- <h3 class="title-sum">
        Tổng số công tháng {{ Month }} là: {{ SumDay }} ngày
      </h3> -->
      <el-calendar class="calendar-box" v-model="DateCalendar">
        <template slot="dateCell" slot-scope="{ date, data }">
          <div :class="data.isSelected ? 'is-selected' : ''">
            <span :class="date.getDay() === 0 ? 'is-sunday' : ''">
              {{ data.day.substring(8, 10) }}
            </span>

            <p v-for="(item, index) in ArrayT" :key="index">
              <span
                v-if="
                  data.day.substring(5, 7) === Month &&
                    data.day.substring(8, 10) === item.DateReal
                "
                ><i
                  v-if="
                    item.Result.includes('X') ||
                      item.Result === 'On' ||
                      item.Result === 'C/On.s' ||
                      item.Result === 'S/On.c'
                  "
                  class="fas fa-star fulltime"
                ></i>
                <i
                  v-if="
                    (item.Result.includes('S') && item.Result !== 'S/On.c') ||
                      (item.Result.includes('C') && item.Result !== 'C/On.s') ||
                      (item.Result.includes('On.s') &&
                        (item.Result !== 'S/On.c' ||
                          item.Result !== 'C/On.s')) ||
                      (item.Result.includes('On.c') &&
                        (item.Result !== 'S/On.c' || item.Result !== 'C/On.s'))
                  "
                  class="fas fa-star-half-alt fulltime"
                ></i>
              </span>
            </p>
          </div>
        </template>
      </el-calendar>
    </div>
    <div class="note-box">
      <p class="title-sum">Tổng: {{ SumDay }} ngày</p>
      <div style="margin-right:10px">
        <i class="fas fa-star fulltime"></i>: 1 ngày công
        <i class="fas fa-star-half-alt fulltime"></i>: nửa ngày công
      </div>
    </div>
  </div>
</template>
<script>
import { GetTimeKeepingByEm } from "@/api/appview";
import { getMonth } from "@/api/index";

export default {
  components: {},
  filters: {},
  data() {
    return {
      UserName: "",
      Token: "",
      Month: "",
      TimeKeepingInfo: {},
      ArrayT: [],
      SumDay: 0,
      DateCalendar: ""
    };
  },
  methods: {
    fetchData(DateCa) {
      if (DateCa) {
        this.Month = DateCa.split("-")[0];
        const req = {
          UserName: this.UserName,
          Token: this.Token,
          Month: DateCa.split("-")[0],
          Year: DateCa.split("-")[1]
        };
        GetTimeKeepingByEm(req).then(res => {
          if (res.RespCode === 0) {
            this.TimeKeepingInfo = res.TimeKeepingInfo;
            this.ArrayT = this.getDate(this.TimeKeepingInfo);
            this.SumDay = this.caculDay(this.ArrayT);
          }
        });
      }
    },
    //Chuyển đổi object lấy về sang mảng ngày công
    getDate(object) {
      const ArrayDate = [];
      for (const [key, value] of Object.entries(object)) {
        if (key.includes("Day")) {
          let nDate = key.split("Day").join("");
          if (nDate.length === 1) {
            nDate = "0" + nDate;
          }
          let obj = {
            DateReal: nDate,
            Result: value
          };
          ArrayDate.push(obj);
        }
      }
      return ArrayDate;
    },
    //Tính số ngày đi làm trong tháng
    caculDay(ArrayDate) {
      let Amount = 0;
      ArrayDate.forEach(element => {
        if (
          element.Result.includes("X") ||
          element.Result === "On" ||
          element.Result === "C/On.s" ||
          element.Result === "S/On.c"
        ) {
          Amount += 1;
        }
        if (
          (element.Result.includes("S") && element.Result !== "S/On.c") ||
          (element.Result.includes("C") && element.Result !== "C/On.s") ||
          (element.Result.includes("On.s") &&
            (element.Result !== "S/On.c" || element.Result !== "C/On.s")) ||
          (element.Result.includes("On.c") &&
            (element.Result !== "S/On.c" || element.Result !== "C/On.s"))
        ) {
          Amount += 0.5;
        }
      });
      return Amount;
    }
  },
  computed: {},
  mounted() {},
  watch: {
    DateCalendar() {
      this.fetchData(Date.parse(this.DateCalendar).toString("MM-yyyy"));
    }
  },
  created() {
    if (this.$route.params.username && this.$route.params.token) {
      this.UserName = this.$route.params.username;
      this.Token = this.$route.params.token;
      this.fetchData(Date.parse(Date(Date.now())).toString("MM-yyyy"));
    } else {
      this.$message({
        message: "Vui lòng đăng nhập lại",
        type: "danger"
      });
    }
  }
};
</script>

<style lang="scss">
.calendar-box {
  .el-calendar__header {
    //display: none;
    padding: 10px;
    .el-calendar__title {
      font-size: 10pt;
    }
    .el-button-group > .el-button:not(:last-child) {
      border-radius: 20px 0 0 20px;
    }
    .el-button-group > .el-button:last-child {
      border-radius: 0 20px 20px 0;
    }
    .el-button-group > .el-button:not(:first-child):not(:last-child) {
      border-radius: 0;
    }
    .el-button--mini {
      padding: 7px;
    }
  }
  .el-calendar__body {
    font-size: 10pt;
    padding: 10px 0;
    .el-calendar-day {
      height: 60px;
      text-align: center;
    }
    thead {
      th {
        font-weight: 600;
      }
    }
    tbody {
      background-image: linear-gradient(
          -20deg,
          rgba(0, 62, 75, 0.313725),
          rgba(255, 255, 255, 0)
        ),
        url(https://cpc1hn.com.vn/wp-content/uploads/%E1%BA%A2nh/ve-chung-toi.jpg);
      background-repeat: no-repeat;
      background-size: cover;
      -webkit-background-size: cover;
    }
  }
  .is-sunday {
    color: #e91e63;
  }
}
.fas.fulltime {
  color: #e91e63;
}
.note-box {
  display: flex;
  font-size: 10pt;
  justify-content: space-between;
}
.title-sum {
  font-size: 10pt;
  color: #e91e63;
  margin: 0 10px;
  font-weight: 600;
}
@media screen and (max-width: 320px) {
  .el-calendar__header {
    display: block;
    text-align: center;
    .el-calendar__title {
      margin-bottom: 10px;
    }
  }
  .note-box {
    display: block;
    text-align: center;
    .title-sum {
      margin-bottom: 10px;
    }
  }
}
</style>
