<template>
  <div v-loading="loading">
    <header-modal
      v-model="value"
      :levelLst="levelLst"
      @changeSetting="changeSetting"
      @viewChart="isShowBoxRight = !isShowBoxRight"
    />

    <!-- <el-container class="box-container"> -->
    <el-row>
      <el-col :xs="24" :sm="24" :lg="isShowBoxRight ? 17 : 24">
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
          <v-marker-cluster
            ref="cluster"
            :averageCenter="true"
            :ignoreHidden="true"
          >
            <restaurant
              v-for="marker in places"
              :key="marker.id"
              :marker="marker"
            >
            </restaurant>
          </v-marker-cluster>
        </l-map>
      </el-col>
      <transition name="el-zoom-in-center">
        <el-col :xs="24" :sm="24" :lg="7" v-show="isShowBoxRight">
          <!-- <el-aside width="400px" class="box-right"> -->
          <div class="box-right">
            <chart :value="value" :data="dataChart" />
            <content-modal :data="dataUnitLst" />
          </div>

          <!-- </el-aside> -->
        </el-col>
      </transition>
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
import ClusterIcon from "./component2/cluser-icon";
import Restaurant from "./component2/restaurant";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import "./component2/leaflet.css";
import "./component2/MarkerCluster.css";
import "./component2/MarkerCluster.Default.css";
import { latLng } from "leaflet";
//import { GetPlaceByCity } from "@/api/KDPlace";

import {
  GetPlaceCover,
  GetProductCover,
  GetCallCover,
  GetPlaceCoverUnit,
  GetPlaceByCityCover
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
    LCircleMarker,
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    Restaurant,
    ClusterIcon
  },
  data() {
    return {
      loading: false,
      show: true,
      enableTooltip: true,
      isShowBoxRight: true,
      zoom: 10,
      center: [16.0769838, 108.2347863],
      dataKH: [],
      dataUnitLst: [],
      dataChart: [],
      places: [],
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
      attribution: "",
      marker: latLng(21.0819, 105.6363),
      select: "",
      levelLst: [
        {
          value: 1,
          label: "Cấp 1",
          color: "#43b54957",
          des: "Số khách hàng >= 1",
          count: 1
        },
        {
          value: 2,
          label: "Cấp 2",
          color: "#fef22f54",
          des: "Số khách hàng >= 15",
          count: 15
        },
        {
          value: 3,
          label: "Cấp 3",
          color: "#f36b2159",
          des: "Số khách hàng >= 25",
          count: 25
        },
        {
          value: 4,
          label: "Cấp 4",
          color: "#ed262557",
          des: "Số khách hàng >= 35",
          count: 35
        },
        {
          value: 0,
          label: "Chưa có",
          color: "#9ca3af57",
          des: "Chưa có khách hàng",
          count: 0
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
            element.CountPlace >= this.levelLst[3].count
              ? this.levelLst[3].color
              : element.CountPlace >= this.levelLst[2].count
              ? this.levelLst[2].color
              : element.CountPlace >= this.levelLst[1].count
              ? this.levelLst[1].color
              : element.CountPlace >= this.levelLst[0].count
              ? this.levelLst[0].color
              : this.levelLst[4].color;
        }
      });
      return color;
    },
    zoomend(e) {},
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
            if (
              i.CountPlace >= this.levelLst[0].count &&
              i.CountPlace < this.levelLst[1].count
            )
              num1++;
            else if (
              i.CountPlace >= this.levelLst[1].count &&
              i.CountPlace < this.levelLst[2].count
            )
              num2++;
            else if (
              i.CountPlace >= this.levelLst[2].count &&
              i.CountPlace < this.levelLst[3].count
            )
              num3++;
            else if (i.CountPlace >= this.levelLst[3].count) num4++;
            else if (i.CountPlace < this.levelLst[0].count) num0++;
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
          this.fetchPlace();
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
    },
    changeSetting(val) {
      this.levelLst = val;
      this.fetchData();
    },
    fetchPlace() {
      const req = {
        City: this.value.city,
        District: this.value.district,
        Type: this.value.typeKH
      };
      GetPlaceByCityCover(req).then(res => {
        if (res.RespCode == 0) {
          let arr = [];
          res.Data.forEach(e => {
            let obj = {
              name: e.PlaceName,
              id: e.PlaceID,
              coordinates: [e.Latitude, e.Longtitude],
              grade: "",
              imageUrl: ""
            };

            if (
              e.Type == "Quầy thuốc/Nhà thuốc" ||
              e.Type == "Chi nhánh" ||
              e.Type == "Công ty" ||
              e.Type == "" ||
              e.Type == "Nhà xe"
            ) {
              obj.imageUrl = "/icon-map/pharmacy.png";
            } else if (e.Type == "Bệnh viện" || e.Type == "Bệnh viện tư nhân") {
              obj.imageUrl = "/icon-map/benh_vien.png";
            } else if (
              e.Type == "Cửa hàng Mẹ & Bé" ||
              e.Type == "Cửa hàng mỹ phẩm" ||
              e.Type == "Siêu Thị" ||
              e.Type == "Siêu thị/cửa hàng tiện lợi" ||
              e.Type == "Spa" ||
              e.Type == "Tạp hoá" ||
              e.Type == "Tạp Hóa "
            ) {
              obj.imageUrl = "/icon-map/shop.png";
            } else if (
              e.Type == "Phòng khám" ||
              e.Type == "Phòng khám chuyên khoa" ||
              e.Type == "Nha Khoa"
            ) {
              obj.imageUrl = "/icon-map/phong_kham.png";
            } else if (
              e.Type == "Trung tâm y tế" ||
              e.Type == "Sở y tế" ||
              e.Type == "Bảo hiểm xã hội Tỉnh/TP"
            ) {
              obj.imageUrl = "/icon-map/tt_y_te.png";
            } else if (e.Type == "Trạm y tế") {
              obj.imageUrl = "/icon-map/tram_y_te.png";
            }
            arr.push(obj);
          });
          this.places = arr;
          this.loading = false;
        }
      });
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
          : "#9ca3af57";
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
      this.fetchDataUnit();
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
