<template>
  <div>
    <el-row :gutter="5" style="max-width:96vw">
      <el-col :xs="24" :sm="8" :lg="8" v-if="call.image">
        <el-carousel :interval="5000" arrow="always" :height="'224px'">
          <el-carousel-item v-for="(item, index) in call.image" :key="index">
            <button
              class="el-carousel__arrow el-carousel__arrow--left"
              style="top:35px"
              @click="item.rotate -= 90"
            >
              <i class="fas fa-undo"></i>
            </button>
            <button
              class="el-carousel__arrow el-carousel__arrow--right"
              @click="item.rotate += 90"
              style="top:35px"
            >
              <i class="fas fa-redo"></i>
            </button>
            <button
              class="el-carousel__arrow el-carousel__arrow--left imgPass1"
              style="top:200px"
              v-if="call.callPass == 1"
            >
              <i class="fas fa-check"></i>
            </button>
            <button
              class="el-carousel__arrow el-carousel__arrow--left imgPass2"
              style="top:200px"
              v-else-if="call.callPass == 0"
            >
              <i class="fas fa-times"></i>
            </button>
            <button
              class="el-carousel__arrow el-carousel__arrow--left imgPass3"
              style="top:200px"
              v-else
            >
              <i class="fas fa-minus"></i>
            </button>
            <p class="timeImg">
              {{ item.timeCheckIn ? item.timeCheckIn.substring(0, 16) : "" }}
            </p>
            <img
              class="image-call"
              :style="{ transform: 'rotate(' + item.rotate + 'deg)' }"
              :src="
                baseUrl +
                  'ImgCall/' +
                  item.idCall +
                  '/' +
                  item.type +
                  '?token=' +
                  token
              "
              alt
            />
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <p>
          <i class="fas fa-user"></i>
          Nhân viên: {{ call.nameEmployee }}
        </p>
        <p>
          <i class="fas fa-layer-group"></i>
          Nhóm: {{ call.idGroup }}
        </p>
        <p>
          <i class="fas fa-briefcase"></i>
          Nhiệm vụ: {{ call.nameMission }}
        </p>
        <p>
          <i class="fas fa-handshake"></i>
          Kế hoạc Call: {{ call.plan }}
        </p>
        <p>
          <i class="fas fa-user-md"></i>
          Khách hàng: {{ call.nameCustomer }}
        </p>
        <p>
          <i class="fas fa-phone-alt"></i>
          SĐT KH: {{ call.phoneNumber }}
        </p>
        <p>
          <i class="far fa-envelope"></i>
          Email KH: {{ call.email }}
        </p>
        <p>
          <i class="fas fa-mobile"></i>
          Thông tin liên lạc: {{ call.NoteKH }}
        </p>
        <p>
          <i class="fas fa-user-md"></i>
          Chức vụ: {{ call.positionCustomer }}
        </p>
        <p>
          <i class="fas fa-quote-left"></i>
          Kết quả:
          <el-link
            v-if="call.note && call.note.includes('http')"
            :href="call.note"
            target="_blank"
            >{{ call.note }}</el-link
          >
          <span v-else>{{ call.note }}</span>
        </p>
      </el-col>
      <el-col :xs="24" :sm="8" :lg="8">
        <p>
          Thời gian kế hoạch:
          <i class="far fa-clock"></i>
          {{ call.timePlan | timed }}
        </p>
        <p>
          Thời gian hoàn thành:
          <i class="far fa-clock"></i>
          {{ call.completetime | timed }}
        </p>
        <p>
          Thời gian quản lý check:
          <i class="far fa-clock"></i>
          {{ call.checktime | timed }} <i class="fas fa-user-check"></i>
          {{ call.idManager }}
        </p>
        <p>
          <i class="fas fa-share"></i> CheckIn:
          <i class="far fa-clock"></i>
          {{ call.timeCheckIn | timed }}
          <i class="fas fa-map-marker-alt"></i>
          {{ call.nameLocationCheckIn }}
        </p>
        <p>
          <i class="fas fa-reply"></i> CheckOut:
          <i class="far fa-clock"></i>
          {{ call.timeCheckOut | timed }}
          <i class="fas fa-map-marker-alt"></i>
          {{ call.nameLocationCheckOut }}
        </p>
        <p>
          <i class="fas fa-ruler-horizontal"></i>
          Khoảng cách CheckIn - CheckOut: {{ call.distance | distanceFormat }}
        </p>
        <p>
          <i class="fas fa-align-left"></i>
          Trạng thái: {{ call.status | callStatusText }} -
          {{ call | imgPassInfo }}
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { parseTime } from "@/utils";
import { getToken } from "@/utils/auth";
import baseUrl from "@/utils/baseUrl";
export default {
  props: {
    call: Object,
    imageLoaded: Boolean
  },
  filters: {
    timed(time) {
      return time ? Date.parse(time).toString("dd/MM/yyyy HH:mm") : "";
    },
    distanceFormat(v) {
      return Number(v).toFixed(2) + "m";
    },
    imgPassInfo(call) {
      if (call.numImg && call.numImg > 0) {
        if (call.callPass == 1) {
          return "Ảnh đạt";
        } else if (call.callPass == 0) {
          return "Ảnh không đạt";
        } else {
          return "Ảnh chưa được duyệt";
        }
      }
      return "";
    }
  },
  computed: {
    baseUrl() {
      return baseUrl;
    },
    token() {
      return getToken();
    }
  },
  //
  watch: {
    imageLoaded() {
      console.log(this.call.imageLoaded);
    }
    // call(){
    //     console.log(this.call);

    // },
    // 'call.imageLoaded':function () {
    //     console.log('a');

    // }
  }
};
</script>
<style scoped lang="css">

.image-call {
      width: 100%;
    height: 100%;
    background: transparent;
    object-fit: contain;
}

.call-image-title {
  text-align: bottom;
  margin-right: 10px;
}
.call-info-item-title {
  float: left;
  text-align: bottom;
  margin-right: 10px;
}
.btn-rotate-left{
position:absolute;z-index:10
}
.btn-rotate-right{
position:absolute;z-index:10;right: 0;
}
.call-info-item-content {
  margin-left: 10px;
  text-align: bottom;
  color: rgb(27, 27, 27);
}
.imgPass1{
  font-size: 24px;
color: #2ecc71;
}
.imgPass2{
  font-size: 24px;
color: #c0392b;
}
.imgPass3{
  font-size: 24px;
color: #f1c40f;
}
.timeImg{
  position: absolute;
  z-index: 15;
  top: 180px;
  right: 10px;}
</style>
