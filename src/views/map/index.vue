<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="6"
      style="width:100%; height: calc(100vh - 50px);"
    >
      <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        @closeclick="infoWinOpen = false"
        >{{ infoContent }}</gmap-info-window
      >

      <gmap-marker
        :icon="
          m.employee == 'Tôi'
            ? { url: require('@/assets/marker-blue.png') }
            : null
        "
        @click="clickMarker(m, index)"
        :key="index"
        v-for="(m, index) in markers"
        :position="m.latLng"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { GetLocation, GetMyLocaion } from "@/api/call";
import { setInterval } from "timers";
import push from "push.js";
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
      currentPlace: null
    };
  },

  mounted() {
    this.geolocate();
    GetMyLocaion().then(res => {
      var loca = res.Data;
      for (var i in loca) {
        console.log();

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
  }
};
</script>
