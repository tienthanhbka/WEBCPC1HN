<template>
  <l-marker :key="marker.id" :lat-lng="marker.coordinates">
    <l-icon ref="icon">
      <img class="restaurant-icon" :src="marker.imageUrl" />
    </l-icon>
    <l-popup>
      <h3 class="popup--title">{{ marker.name }}</h3>
      <span class="popup--detail" @click="fetchTimeLine"> >>Chi tiết</span>
      <transition name="el-zoom-in-center">
        <div v-show="showDetail">
          <div
            v-if="timeLine.length > 0"
            class="main-timeline"
            v-loading="isLoading"
          >
            <el-timeline :reverse="true">
              <el-timeline-item
                v-for="(item, index) in timeLine"
                :key="index"
                :timestamp="item.TimeAction"
              >
                {{ item.Quantity }} -
                {{ item.TypeData | toTypeData }}
              </el-timeline-item>
            </el-timeline>
          </div>
          <el-empty
            description="Không có dữ liệu"
            :image-size="100"
            v-else
            size="mini"
          ></el-empty>
          <p class="popup--note">* Timeline 3 tháng gần nhất</p>
        </div></transition
      >
    </l-popup>
  </l-marker>
</template>

<script>
import { LIcon, LMarker, LPopup } from "vue2-leaflet";
import { GetReportTimelineByCus } from "@/api/KDCustomer";
import { getThreeMonth, getEndDate } from "@/api/index";

export default {
  components: { LIcon, LMarker, LPopup },
  props: {
    marker: {
      type: Object,
      required: true
    }
  },
  filters: {
    toTypeData(val) {
      if (val === 2) {
        return "Đơn hàng";
      }
      if (val === 1) {
        return "Call";
      }
    }
  },
  data() {
    return {
      DateBegin: getThreeMonth(),
      DateEnd: getEndDate(),
      timeLine: [],
      isLoading: false,
      showDetail: false
    };
  },
  methods: {
    fetchTimeLine() {
      if (this.marker.id) {
        this.isLoading = true;
        this.showDetail = !this.showDetail;
        const req = {
          TimeStart: this.DateBegin,
          TimeEnd: this.DateEnd,
          CustomerID: this.marker.id
        };
        if (this.showDetail == true) {
          GetReportTimelineByCus(req).then(res => {
            if (res.RespCode == 0) {
              this.timeLine = res.CustomerTimelineLst;
              this.isLoading = false;
            } else {
              this.$message({
                message: res.RespText,
                type: "error"
              });
            }
          });
        }
      } else {
        this.isLoading = false;
        this.timeLine = [];
        this.$message({
          message: "Xảy ra lỗi !"
        });
      }
    }
  },
  mounted() {},
  created() {}
};
</script>

<style scoped lang="scss">
.restaurant-icon {
  height: 50px;
  margin-left: -15px;
  width: auto;
}
.popup--title {
  font-size: 10pt;
  display: inline;
}
.popup--detail {
  font-size: 10pt;
  color: #0277bc;
  cursor: pointer;
  font-style: italic;
  &:hover {
    text-decoration: underline;
  }
}
.popup--note {
  font-size: 10pt;
  font-style: italic;
}
</style>
