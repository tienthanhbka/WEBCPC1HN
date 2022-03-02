<template>
  <div v-loading="loading">
    <header-modal v-model="value" />

    <!-- <el-container class="box-container"> -->
    <el-row>
      <el-col :xs="24" :sm="24" :lg="18">
        <l-map
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomend"
          class="map-container"
        >
          <!-- <l-tile-layer :url="url" :attribution="attribution" /> -->
          <l-wms-tile-layer
            key="Weather Data"
            base-url="https://osm.datagalaxy.one/gwc/wms?tiled=true"
            layers="osm:osm"
            :visible="true"
            name="Weather Data"
            attribution="wmsLayer.attribution"
            :transparent="true"
            format="image/png8"
            layer-type="base"
          >
          </l-wms-tile-layer>
          <l-geo-json
            v-if="show"
            :geojson="geojson"
            :options="options"
            :options-style="styleFunction"
          />
          <l-circle-marker
            :lat-lng="[10.95785464, 105.1138759]"
            :radius="1"
            :fill="false"
            :stroke="false"
            text="Xã Khánh An"
            color="#000000"
          />
          <!-- <l-control position="topright">
              <el-select
                size="small"
                style="width:100%"
                v-model="select"
                placeholder="Chọn hình thức"
              >
                <el-option
                  v-for="item in typeLst"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </el-option>
              </el-select>
            </l-control> -->
          <l-control position="bottomleft">
            <div class="control-bottom-left">
              <div class="level" v-for="(item, index) in levelLst" :key="index">
                <div
                  class="color"
                  :style="'background-color:' + item.color"
                ></div>
                <el-tooltip effect="light" :content="item.des">
                  <div class="text">{{ item.label }}</div></el-tooltip
                >
              </div>
            </div>
          </l-control>
          <!-- <l-marker :lat-lng="marker" /> -->
        </l-map>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="6">
        <!-- <el-aside width="400px" class="box-right"> -->
        <div class="box-right">
          <chart :value="value" :data="dataChart" />
          <content-modal :data="dataUnitLst" />
        </div>

        <!-- </el-aside> -->
      </el-col>
    </el-row>
    <!-- </el-container> -->
  </div>
</template>

<script>
import Chart from "./component/chart-modal";
import ContentModal from "./component/content-modal";
import HeaderModal from "./component/header-modal";
import { pointCommunes } from "./data/CommitteesCommunes";
import { pointDistricts } from "./data/CommitteesDistrict";
import { pointProvinces } from "./data/CommitteesProvince";
import { latLng } from "leaflet";
import {
  GetPlaceCover,
  GetProductCover,
  GetCallCover,
  GetPlaceCoverUnit
} from "@/api/cover";
import {
  LMap,
  LTileLayer,
  LMarker,
  LGeoJson,
  LControl,
  LControlZoom,
  LWMSTileLayer,
  LCircleMarker
} from "vue2-leaflet";
export default {
  name: "Example",
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    LMarker,
    LControl,
    LControlZoom,
    Chart,
    ContentModal,
    HeaderModal,
    "l-wms-tile-layer": LWMSTileLayer,
    LCircleMarker
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      zoom: 10,
      center: [16.0769838, 108.2347863],
      dataKH: [],
      dataUnitLst: [],
      dataChart: [],
      geojson: null,
      fillColor: "#e4ce7f",
      value: {
        type: "Đánh giá độ phủ khách hàng",
        city: "Thành phố Hà Nội",
        district: "",
        typeKH: "",
        code: "geomap_ward"
      },
      url:
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      attribution: '&copy; <a href="https://cpc1hn.com.vn/">CPC1HN</a>',
      marker: latLng(21.0819, 105.6363),
      select: "",
      levelLst: [
        {
          value: 1,
          label: "Cấp 1",
          color: "#43b549",
          des: "Số khách hàng >= 1"
        },
        {
          value: 2,
          label: "Cấp 2",
          color: "#fef22f",
          des: "Số khách hàng >= 15"
        },
        {
          value: 3,
          label: "Cấp 3",
          color: "#f36b21",
          des: "Số khách hàng >= 25"
        },
        {
          value: 4,
          label: "Cấp 4",
          color: "#ed2625",
          des: "Số khách hàng >= 35"
        },
        {
          value: 0,
          label: "Chưa rõ",
          color: "#9ca3af",
          des: "Chưa có khách hàng"
        }
      ],
      typeLst: [
        {
          value: 1,
          label: "Độ phủ khách hàng"
        },
        {
          value: 2,
          label: "Độ phủ sản phẩm"
        }
      ]
    };
  },
  methods: {
    getColor(d) {
      let color = "";
      this.dataKH.forEach(element => {
        if (element.CommuneCode == d) {
          color =
            element.CountPlace >= 35
              ? "#ed2625"
              : element.CountPlace >= 25
              ? "#f36b21"
              : element.CountPlace >= 15
              ? "#fef22f"
              : element.CountPlace >= 1
              ? "#43b549"
              : "#9CA3AF";
        }
      });
      return color;
    },
    zoomend(e) {},
    // groupLayerName(data, fontSize) {
    //   const group = L.featureGroup();
    //   for (var i = 0; i < data.length; i++) {
    //     var a = data[i];
    //     if (!isNaN(a[6]) && !isNaN(a[7])) {
    //       var lat = a[6];
    //       var lng = a[7];
    //       var latlng = L.latLng(lat, lng);

    //       var c = L.circleMarker(latlng, {
    //         radius: 1,
    //         stroke: false,
    //         fill: false,
    //         text: a[2] || "",
    //         textStyle: {
    //           stroke: true,
    //           color: "#000000",
    //           font: `${fontSize || 15}px 'Tahoma'`,
    //           offsetX: -50,
    //           offsetY: -10
    //         }
    //       });
    //       c.addTo(group);
    //     }
    //   }
    //   return group;
    // },
    // layerWard() {
    //   this.groupLayerName(pointCommunes, 11);
    // },
    // layerDistrict() {
    //   this.groupLayerName(pointDistricts, 12);
    // },
    // layerProvince() {
    //   this.groupLayerName(pointProvinces, 11);
    // },

    // renderGeoJson() {}
    fetchData() {
      this.loading = true;
      const req = {
        City: this.value.city,
        District: this.value.district,
        Type: this.value.typeKH
      };
      GetPlaceCover(req).then(res => {
        if (res.RespCode == 0) {
          this.dataKH = res.Data;
          let num1 = 0;
          let num2 = 0;
          let num3 = 0;
          let num4 = 0;
          let num0 = 0;
          let data = [];
          this.dataKH.forEach(i => {
            if (i.CountPlace >= 1 && i.CountPlace < 15) num1++;
            else if (i.CountPlace >= 15 && i.CountPlace < 25) num2++;
            else if (i.CountPlace >= 25 && i.CountPlace < 35) num3++;
            else if (i.CountPlace >= 35) num4++;
            else if (i.CountPlace < 1) num0++;
          });

          data.push(
            { value: num1, name: "Cấp 1" },
            { value: num2, name: "Cấp 2" },
            { value: num3, name: "Cấp 3" },
            { value: num4, name: "Cấp 4" },
            { value: num0, name: "Chưa rõ" }
          );
          this.dataChart = data;
          this.fetchGeoJson(this.value.code);
          this.fetchDataUnit();
        }
      });
    },
    fetchDataUnit() {
      const req = {
        City: this.value.city,
        District: this.value.district
      };
      GetPlaceCoverUnit(req).then(res => {
        if (res.RespCode == 0) {
          this.dataUnitLst = res.Data;
        }
      });
    },
    async fetchGeoJson(val) {
      let url = "";
      if (val)
        url =
          "https://icpc1hn.work/Web_API/File/GetGeoJson?code=" + val + ".json";
      else {
        url =
          "https://icpc1hn.work/Web_API/File/GetGeoJson?code=geomap_ward.json";
        this.center = [16.0769838, 108.2347863];
        this.zoom = 6;
      }

      const response = await fetch(url);
      this.geojson = await response.json();
      if (this.value.code != "geomap_ward") {
        this.center = [
          this.geojson[0].properties.longitude,
          this.geojson[0].properties.latitude
        ];
      }
      if (this.value.code) {
        if (this.value.code.length == 3) this.zoom = 10;
        if (this.value.code.length == 5) this.zoom = 12;
      }

      this.loading = false;
    }
  },
  computed: {
    options() {
      return {
        onEachFeature: this.onEachFeatureFunction
      };
    },

    styleFunction() {
      return (feature, layer) => {
        const fillColor = this.getColor(feature.properties.code)
          ? this.getColor(feature.properties.code)
          : "#9CA3AF";
        return {
          weight: 0.5,
          color: "#308234",
          opacity: 1,
          fillColor: fillColor,
          fillOpacity: 1
        };
      };
    },
    onEachFeatureFunction() {
      if (!this.enableTooltip) {
        return () => {};
      }
      return (feature, layer) => {
        layer.bindTooltip(
          "<div>" +
            feature.properties.name +
            " - " +
            feature.properties.name2 +
            " - " +
            feature.properties.name1 +
            "</div>" +
            "</div>",
          { permanent: false, sticky: true }
        );
      };
    }
  },
  watch: {
    "value.type"(newVal, oldVal) {
      this.value.type = newVal;
      this.value.city = "";
      this.value.district = "";
      this.value.typeKH = "";
      this.fetchData();
    },
    "value.district"(newVal, oldVal) {
      this.value.district = newVal;

      this.fetchData();
      this.fetchDataUnit();
    },
    "value.city"(newVal, oldVal) {
      this.value.city = newVal;
      this.fetchData();
      this.fetchDataUnit();
    },
    "value.typeKH"(newVal, oldVal) {
      this.value.typeKH = newVal;
      this.fetchData();
    },
    "value.code"(newVal, oldVal) {
      this.value.code = newVal;
    }
  },
  created() {
    this.fetchData();
  }
};
</script>
<style lang="scss" scoped>
.map-container {
  min-height: calc(100vh - 90px);
  .control-bottom-left {
    display: flex;
    padding: 0.5rem;
    background-color: #fff;
    border: 1px solid rgba(156, 163, 175, 1);
    align-items: center;
    justify-content: space-between;
    border-radius: 0.125rem;
    .level {
      display: flex;
      margin-right: 2rem;
      align-items: center;
      justify-content: space-between;
      .color {
        border-radius: 0.125rem;
        width: 1rem;
        height: 1rem;
        margin-right: 0.5rem;
      }
      .text {
        font-size: 0.875rem;
        line-height: 1rem;
      }
    }
  }
}
.box-right {
  max-height: calc(100vh - 90px);
  background-color: #fff;
  padding: 0;
  overflow-y: scroll;
}
</style>
