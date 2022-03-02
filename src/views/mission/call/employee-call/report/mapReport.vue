<template>
  <div>
    <gmap-map :center="center" :zoom="6" style="width:100%; height: calc(100vh - 100px);">
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >
        <div style="width:250px;" class="info-window-content">
          <div class="loading-drawer" v-show="isLoadingCallInfo">
            <i class="el-icon-loading loading-text"></i>
          </div>
          <div>
            •Nhân viên:
            <b>{{currentCallData.nameEmployee}}</b>
          </div>
          <div>
            •Nhiệm vụ:
            <b>{{currentCallData.nameMission}}</b>
          </div>
          <div>
            •Kế hoạch call:
            <b>{{currentCallData.plan}}</b>
          </div>
          <div>
            •Khách hàng:
            <b>{{currentCallData.namePlace}} - {{currentCallData.nameCustomer}}</b>
          </div>
          <div>
            •Chức vụ:
            <b>{{currentCallData.positionCustomer}}</b>
          </div>
          <div>
            •Kết quả:
            <b>{{currentCallData.note}}</b>
          </div>
          <div>
            •CheckIn:
            <b>{{currentCallData.timeCheckIn|timed}} - {{currentCallData.nameLocationCheckIn}}</b>
          </div>
          <div>
            •CheckOut:
            <b>{{currentCallData.timeCheckOut|timed}} - {{currentCallData.nameLocationCheckOut}}</b>
          </div>
          <div>•Báo cáo:<b>{{currentCallData.completetime | timed}}</b></div>
          <div>
            •Khoảng cách In-Out:
            <b>{{currentCallData.distance| distanceFormat}}</b>
          </div>
          <div>
            •Cách call trước:
            <b>{{currentCall.distancePrev| distanceFormat}} -- {{currentCall.timeDiffPrev| timeDiffFormat}}</b>
          </div>
          <div>
            •Cách call sau:
            <b>{{currentCall.distanceNext| distanceFormat}} -- {{currentCall.timeDiffNext| timeDiffFormat}}</b>
          </div>

          
          <div>•Quản lý check: {{currentCallData.checktime | timed}} <i class="fas fa-user-check"></i> {{currentCallData.idManager}}</div>
          <div>•Trạng thái: {{currentCallData.status|callStatusText}}</div>

          <div style="color:#4834d4;margin-top:5px">
            <a @click="stepToCall(1)">&lsaquo; Call trước</a>
            <a @click="stepToCall(-1)" style="float:right">Call sau &rsaquo;</a>
          </div>
        </div>
      </gmap-info-window>
      <template v-for="(m, index) in callData">
        <gmap-marker
        :key="index"
        
        
        v-if="currentGroup.employeeLst[m.idEmployee]&&currentGroup.employeeLst[m.idEmployee].show"
        @click="clickMarker(m,index)"
        :position="{lat:Number(m.latitudeCheckIn),lng:Number(m.longitudeCheckIn)}"
        :icon="{ url: linkMarker(m)}"
      ></gmap-marker>
      </template>
      
    </gmap-map>
    <div>
      <el-date-picker
        v-model="DateBegin"
        type="datetime"
        format="dd/MM/yyyy HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        placeholder="Thời gian bắt đầu"
        default-time="00:00:00"
      ></el-date-picker>
đến
      <el-date-picker
        v-model="DateEnd"
        type="datetime"
        format="dd/MM/yyyy HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        placeholder="Thời gian kết thúc"
        default-time="23:00:00"
      ></el-date-picker>
      <el-button type="primary" icon="el-icon-refresh" class="inline-block" @click="fetchData"></el-button>
    </div>
  </div>
</template>
<script>
import { debounce } from "@/utils";
import { GetCallLocationByTime, GetCallByID } from "@/api/call";
export default {
  props: {
    currentGroup: Object
  },
  data() {
    return {
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      DateBegin: null,
      DateEnd: null,
      isLoadingCallInfo: false,
      infoWindowPos: null,
      infoWinOpen: true,
      infoContent: "",
      currentCall: {},
      currentCallData: {},
      
      callData: [],
      center: { lat: 20.9967994, lng: 105.8407837 },
      value: [5, 6]
    };
  },
  created() {
    this.DateBegin = Date.today().toString("yyyy-MM-dd ") + "00:00";
    this.DateEnd = Date.today().toString("yyyy-MM-dd ") + "23:00";
  },
  computed:{
    callFitlred(){
      return this.callData.filters(o=>{
        return this.currentGroup.employeeLst[o.idEmployee]&&currentGroup.employeeLst[o.idEmployee].show
      })
    }
  },
  methods: {
    fetchData() {
      this.callData = [];
      if (this.currentGroup != null&&this.DateBegin!=null&&this.DateEnd!=null) {
        GetCallLocationByTime({
          idGroup: this.currentGroup.idGroup,
          DateBegin: this.DateBegin,
          DateEnd: this.DateEnd
        }).then(res => {
          res.Data.forEach(e => {
            e.timeDiffNext = null;
            e.timeDiffPrev = null;
            e.distanceNext = null;
            e.distancePrev = null;
          });
          this.callData = res.Data;
        });
      }
    },
    rad: function(x) {
      return (x * Math.PI) / 180;
    },

    getDistance: function(p1, p2) {
      var R = 6378137; // Earth’s mean this.this.radius in meter
      var dLat = this.rad(p2.latitudeCheckIn - p1.latitudeCheckIn);
      var dLong = this.rad(p2.longitudeCheckIn - p1.longitudeCheckIn);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(this.rad(p1.latitudeCheckIn)) *
          Math.cos(this.rad(p2.latitudeCheckIn)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    },
    stepToCall(v) {
      var idx = Number(this.currentCall.order) + v;

      for (var i in this.callData) {
        var call = this.callData[i];
        if (
          call.order == idx &&
          call.idEmployee == this.currentCall.idEmployee
        ) {
          this.clickMarker(call, i);
        }
      }
    },
    timeDiff(t1, t2) {
      if (t1 == null || t2 == null) return null;
      var t = Math.abs(t1 - t2);
      return t;
    },
    getCallStep(v) {
      var idx = Number(this.currentCall.order) + v;

      for (var i in this.callData) {
        var call = this.callData[i];
        if (
          call.order == idx &&
          call.idEmployee == this.currentCall.idEmployee
        ) {
          return call;
        }
      }
      return {};
    },
    clickMarker(marker, idx) {
      this.currentCall = marker;
      if (this.currentCall.distanceNext == null) {
        var callNext = this.getCallStep(-1);
        var callPrev = this.getCallStep(1);
        this.currentCall.distanceNext = this.getDistance(
          {
            latitudeCheckIn: this.currentCall.latitudeCheckIn,
            longitudeCheckIn: this.currentCall.longitudeCheckIn
          },
          {
            latitudeCheckIn: callNext.latitudeCheckIn,
            longitudeCheckIn: callNext.longitudeCheckIn
          }
        );
        this.currentCall.distancePrev = this.getDistance(
          {
            latitudeCheckIn: this.currentCall.latitudeCheckIn,
            longitudeCheckIn: this.currentCall.longitudeCheckIn
          },
          {
            latitudeCheckIn: callPrev.latitudeCheckIn,
            longitudeCheckIn: callPrev.longitudeCheckIn
          }
        );
        this.currentCall.timeDiffNext = this.timeDiff(
          Date.parse(this.currentCall.timeCheckIn),
          Date.parse(callNext.timeCheckIn)
        );
        this.currentCall.timeDiffPrev = this.timeDiff(
          Date.parse(this.currentCall.timeCheckIn),
          Date.parse(callPrev.timeCheckIn)
        );
      }
      this.infoWindowPos = {
        lat: Number(marker.latitudeCheckIn),
        lng: Number(marker.longitudeCheckIn)
      };

      if (marker.call == null) {
        this.isLoadingCallInfo = true;
        GetCallByID({ id: marker.idCall }).then(res => {
          this.isLoadingCallInfo = false;
          marker.call = res.Data;
          this.currentCallData = marker.call;
        });
      } else {
        this.currentCallData = marker.call;
      }
      //this.infoContent = '<i>asdfasdfa</i>'
      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
    linkMarker(call) {
      var cl = "#718093";
      try {
        var cl = this.currentGroup.employeeLst[call.idEmployee].color;
      } catch (error) {}

      return (
        "https://icpc1hn.work/Marker40/marker-" +
        cl.substring(1) +
        "-" +
        call.order +
        ".png"
      );
    },
    formatTooltip(val) {
      return this.rangeValuetoTime(val).toString("dd/MM/yyyy HH:mm:ss");
    },
    rangeValuetoTime(val) {
      var t = (this.DayEnd - this.DayBegin) * (val / 200);

      var d = new Date(this.DayBegin + t);
      return d;
    },
    rangeChangeHandler() {
      debounce(() => {
        console.log(this.value);
      }, 500)();
    }
  },
  watch: {
    value() {
      this.rangeChangeHandler();
    },
    currentGroup() {
      this.fetchData();
    },
    DateBegin(){
      this.fetchData();
    },
    DateEnd(){
      this.fetchData();
    },
  },
  filters: {
    timed(time) {
      return time ? Date.parse(time).toString("dd/MM/yyyy HH:mm") : "";
    },
    distanceFormat(v) {
      var val = Number(v);
      if (val > 1000) {
        return (val / 1000).toFixed(2) + "km";
      }
      return Number(v).toFixed(2) + "m";
    },
    timeDiffFormat(v) {
      var delta = v / 1000;

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = delta % 60;
      if (days > 0) {
        return days + "d" + hours + "h" + minutes + "m" + seconds + "s";
      } else if (hours > 0) {
        return hours + "h" + minutes + "m" + seconds + "s";
      } else if (minutes > 0) {
        return minutes + "m" + seconds + "s";
      } else {
        return seconds + "s";
      }
    }
  }
};
</script>
<style lang="css" scoped>
.info-window-content div {
  margin-top: 3px;
}
.loading-drawer {
  width: 200px;
  height: 230px;
  position: absolute;
}
.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 48px;
  margin-top: -20px;
  margin-left: -20px;
}
</style>