<template>
  <div v-loading="loading">
    <header-modal
      v-model="value"
      :items="itemLst"
      @viewChart="isShowBoxRight = !isShowBoxRight"
      :levelLst="levelLst"
      @changeSetting="changeSetting"
    />

    <!-- <el-container class="box-container"> -->
    <div class="blank-table">
      Tính năng đang được cập nhật! Vui lòng thử lại sau
    </div>
    <!-- </el-container> -->
  </div>
</template>

<script>
import Chart from "./component2/chart-modal";
import ContentModal from "./component2/content-modal";
import HeaderModal from "./component2/header-modal";
import ClusterIcon from "./component2/cluser-icon";
import Restaurant from "./component2/restaurant";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import { GetItemFast } from "@/api/product";
import { GetPlaceByCity } from "@/api/KDPlace";
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
import "./component2/leaflet.css";
import "./component2/MarkerCluster.css";
import "./component2/MarkerCluster.Default.css";
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
      isShowBoxRight: false,
      show: true,
      enableTooltip: true,
      zoom: 10,
      center: [16.0769838, 108.2347863],
      dataProduct: [],
      dataUnitLst: [],
      dataChart: [],
      itemLst: [],
      places: [],
      geojson: null,
      fillColor: "#e4ce7f",
      value: {
        type: "Đánh giá độ phủ Laforin Daily - Hộp 1 lọ 500ml",
        city: "Thành phố Hà Nội",
        district: "",
        product: "",
        month: new Date()
      },
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: '&copy; <a href="https://cpc1hn.com.vn/">CPC1HN</a>',
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
      // clusterOptions: {
      //   spiderfyDistanceMultiplier: 3,
      //   iconCreateFunction: cluster => {
      //     console.log("a");

      //     console.log(cluster);
      //     let clusterUsers = cluster
      //       .getAllChildMarkers()
      //       .map(marker => console.log(marker));
      //     let clusterIconEl = new EnhancedClusterIcon({
      //       propsData: { clusterUsers }
      //     }).$mount().$el;
      //     return divIcon({
      //       html: clusterIconEl.outerHTML,
      //       className: "cluster",
      //       iconSize: null
      //     });
      //   }
      // }
    };
  },
  methods: {
    getColor(d) {
      let color = "";
      this.dataProduct.forEach(element => {
        if (element.CommuneCode == d) {
          color =
            element.Amount >= this.levelLst[3].count
              ? this.levelLst[3].color
              : element.Amount >= this.levelLst[2].count
              ? this.levelLst[2].color
              : element.Amount >= this.levelLst[1].count
              ? this.levelLst[1].color
              : element.Amount >= this.levelLst[0].count
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
        ProductID: this.value.product,
        Month: this.value.month
          ? Date.parse(this.value.month).toString("MM")
          : "",
        Year: this.value.month
          ? Date.parse(this.value.month).toString("yyyy")
          : ""
      };
      GetProductCover(req).then(res => {
        if (res.RespCode == 0) {
          this.dataProduct = res.Data;
          let num1 = 0;
          let num2 = 0;
          let num3 = 0;
          let num4 = 0;
          let num0 = 0;
          let data = [];
          this.dataProduct.forEach(i => {
            if (
              i.Amount >= this.levelLst[0].count &&
              i.Amount < this.levelLst[1].count
            )
              num1++;
            else if (
              i.Amount >= this.levelLst[1].count &&
              i.Amount < this.levelLst[2].count
            )
              num2++;
            else if (
              i.Amount >= this.levelLst[2].count &&
              i.Amount < this.levelLst[3].count
            )
              num3++;
            else if (i.Amount >= this.levelLst[3].count) num4++;
            else if (i.Amount < this.levelLst[0].count) num0++;
          });

          data.push(
            { value: num1, name: "Cấp 1" },
            { value: num2, name: "Cấp 2" },
            { value: num3, name: "Cấp 3" },
            { value: num4, name: "Cấp 4" },
            { value: num0, name: "Chưa có" }
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
      // GetProductCoverUnit(req).then(res => {
      //   if (res.RespCode == 0) {
      //     this.dataUnitLst = res.Data;
      //   }
      // });
    },
    fetchProduct() {
      GetItemFast().then(res => {
        if (res.RespCode == 0) {
          this.itemLst = res.ItemLst;
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
    },
    fetchPlace() {
      const req = {
        CityName: this.value.city,
        Search: "",
        PType: "",
        NumberRow: null,
        PageNumber: null
      };
      GetPlaceByCity(req).then(res => {
        if (res.RespCode == 0) {
          let arr = [];
          res.PlaceLst.forEach(e => {
            let obj = {
              name: e.PlaceName,
              id: e.PlaceId,
              coordinates: [e.Latitude, e.Longitude],
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
              e.Type == "Trạm y tế" ||
              e.Type == "Sở y tế" ||
              e.Type == "Bảo hiểm xã hội Tỉnh/TP"
            ) {
              obj.imageUrl = "/icon-map/tt_y_te.png";
            }
            arr.push(obj);
          });
          this.places = arr;
        }
      });
    },
    changeSetting(val) {
      this.fetchData();
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
      this.fetchPlace();
      this.fetchData();
      this.fetchDataUnit();
    },
    "value.product"(newVal, oldVal) {
      this.value.product = newVal;
      this.fetchData();
    },
    "value.month"(newVal, oldVal) {
      this.value.month = newVal;
      this.fetchData();
    }
  },
  created() {
    this.fetchData();
    this.fetchProduct();
    this.fetchPlace();
  }
};
</script>
<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
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
