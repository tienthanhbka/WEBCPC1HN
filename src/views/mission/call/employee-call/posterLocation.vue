<template>
  <div class="group-block" style="padding:20px">
    <div
      style="width:100%;background-color: #fff;margin-left:1px;    border-right: 2px solid rgb(236 240 241);padding:10px"
    >
      <!-- <div class="inline-block">
        <el-select
          class="selectIDGroup"
          style="width:100%"
          filterable
          v-model="typePoster"
          placeholder="Chọn loại poster"
        >
          <el-option
            v-for="(item, index) in typeLst"
            :key="index"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-select
          class="selectIDGroup"
          style="width:100%"
          filterable
          v-model="city"
          placeholder="Chọn tỉnh"
        >
          <el-option
            v-for="(item, index) in cityLst"
            :key="index"
            :label="item.city"
            :value="item.city"
          ></el-option>
        </el-select>
      </div> -->
      <!-- <div class="inline-block">
        <el-button
          icon="el-icon-search"
          type="primary"
          size="small"
          @click="search"
          >Tìm kiếm</el-button
        >
      </div> -->
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
          @click="clickMarker(m, index)"
          :key="index"
          v-for="(m, index) in markers"
          :position="m.latLng"
        ></gmap-marker>
      </gmap-map>
    </div>
  </div>
</template>

<script>
import { GetPoster3D } from "@/api/call";
export default {
  filters: {},
  components: {},
  props: {},
  data() {
    return {
      productSaleLst: [],
      cityLst: [],
      productByLocationLst: [],
      typeLst: [{ value: "Hô hấp" }, { value: "Tiêu hóa" }, { value: "Mắt" }],
      city: "",
      typePoster: "",
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
  methods: {
    fetchData() {
      this.loadingTableData = true;
      GetPoster3D().then(res => {
        this.tableData = res.PosterLst;

        this.markers = this.productByLocationLst.map(item => {
          return {
            place: item.PlaceName,
            latLng: {
              lat: Number(item.Latitude),
              lng: Number(item.Longtitude)
            }
          };
        });
        this.loadingTableData = false;
      });
    },

    // search() {
    //   const req = {
    //     ProductID: this.productName,
    //     City: this.placeName
    //   };
    //   GetProductByLocation(req).then(res => {
    //     this.productByLocationLst = res.ProductByLocationLst;
    //     this.markers = this.productByLocationLst.map(item => {
    //       return {
    //         place: item.PlaceName,
    //         sold: item.Sold,
    //         product: item.ProductID,
    //         latLng: {
    //           lat: Number(item.Latitude),
    //           lng: Number(item.Longtitude)
    //         }
    //       };
    //     });
    //   });
    // },
    clickMarker(marker, idx) {
      this.infoWindowPos = marker.latLng;
      this.infoContent = marker.place;
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
    }
  },
  computed: {},
  created() {
    //this.fetchProductSale();
    //this.fetchPlace();
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
.group-block {
  background-color: #f0f2f5;
  .title-dialog {
    margin: 0;
    font-weight: 600;
    font-size: 14pt;
    color: rgb(64, 158, 255);
    text-transform: uppercase;
  }
  .inline-block {
    display: inline-block;
    margin-bottom: 10px;
  }
}
</style>
