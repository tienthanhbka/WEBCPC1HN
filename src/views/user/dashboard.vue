<template>
    <div>
      <el-row :gutter="40" class="panel-group">
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-peoples">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Đang làm việc
          </div>
           <div class="card-panel-text">
            {{danglam}}
          </div>
          <!-- <count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" /> -->
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-workout">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Nghỉ việc
          </div>
          <div class="card-panel-text">
            {{nghiviec}}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" >
        <div class="card-panel-icon-wrapper icon-baby">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Nghỉ thai sản
          </div>
          <div class="card-panel-text">
            {{nghide}}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :xs="24" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="card-panel-icon-wrapper icon-nomoney">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Nghỉ không lương
          </div>
          <div class="card-panel-text">
            {{nghikoluong}}
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <el-row>
     <div>
 
    <gmap-map :center="center" :zoom="6" style="width:100%; height: calc(100vh - 50px);">
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen=false"
      >{{infoContent}}</gmap-info-window>

      <gmap-marker
        :icon="(m.employee=='Tôi')?({ url: require('@/assets/marker-blue.png')}):null"
        @click="clickMarker(m,index)"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.latLng"
      ></gmap-marker>
    </gmap-map>
  </div>
  </el-row>
    </div>
    
</template>
<script>
import { GetLocation,GetMyLocaion } from "@/api/call";
import { setInterval } from "timers";
import push from 'push.js'
import {
  GetEmployeeStatusCount
} from "@/api/employeeInfor"
import Cookies from "js-cookie"
export default {
  name: "GoogleMap",
  data() {
    return {
      //mặc định là Montreal
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      infoWindowPos: null,
      infoWinOpen: false,
      infoContent: "",
      center: { lat: 16.5627397, lng: 105.8194112 },
      markers: [],
      places: [{ lat: 45.508, lng: -73.587 }],
      currentPlace: null,
      pId:null,
      content:'',
      danglam:0,
      nghiviec:0,
      nghide:0,
      nghikoluong:0
    };
  },
  mounted(){
     this.geolocate();
    GetMyLocaion().then(res => {
      var loca = res.Data;
      for (var i in loca) {

        this.markers.push({
          latLng: {
            lat: Number(loca[i].latitudeCheckIn),
            lng: Number(loca[i].longitudeCheckIn)
          },
          employee: loca[i].nameEmployee
        });
      }
      GetLocation().then(res => {
      var loca = res.Data;
      for (var i in loca) {

        this.markers.push({
          latLng: {
            lat: Number(loca[i].latitudeCheckIn),
            lng: Number(loca[i].longitudeCheckIn)
          },
          employee: loca[i].nameEmployee
        });
      }
      
    });
    });
  },
  methods: {
    clickMarker(marker, idx) {
      this.infoWindowPos = marker.latLng;
      this.infoContent = marker.employee;
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
    generate() {
      const spread = Math.random() + 0.001;

      this.center = { lat: 42.508, lng: -73.587 };

      this.markers = [{ latLng: { lat: 42.508, lng: -73.587 } }];
    },

    // nhận địa điểm thông qua autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
      }
      this.generate();
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  },
  created() {
    GetEmployeeStatusCount().then(res=>{
      this.danglam = res.Data[0]
      this.nghiviec = res.Data[3]
      this.nghide = res.Data[1]
      this.nghikoluong = res.Data[2]
    })
    if (Cookies.get("search")) {
      this.search = Cookies.get("search");
    }

    if (Cookies.get("page")) {
      this.currentPage = Cookies.get("page");
    }

    if (Cookies.get("pageSize")) {
      this.pageSize = Cookies.get("pageSize");
    }
  },
  watch: {
   
  }
};
</script>
<style lang="scss" scoped>
 .panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-peoples {
        background: #40c9c6;
      }

      .icon-baby {
        background: #f5dab1;
      }

      .icon-workout {
        background: #f4516c;
      }

      .icon-nomoney {
        background: #909399
      }
    }

    .icon-peoples {
      color: #40c9c6;
    }

    .icon-baby {
      color: #f5dab1;
    }

    .icon-workout {
      color: #f4516c;
    }

    .icon-nomoney {
      color: #909399
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
  .el-item-report{
    display: none;
  }

</style>
