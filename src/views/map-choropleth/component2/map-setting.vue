<template>
  <div class="map-setting">
    <div class="setting" v-for="(item, index) in levelLst" :key="index">
      <p class="setting--label">{{ item.label }}</p>
      <el-color-picker
        v-model="item.color"
        show-alpha
        size="small"
        :disabled="item.value == 0"
      />
      <span class="setting--quota" v-if="item.value != 0">Định mức > </span>
      <span class="setting--quota" v-else>Định mức = </span>
      <el-input-number
        v-model="item.count"
        size="mini"
        :disabled="item.value == 0"
      />
    </div>
    <div style="text-align:center">
      <div class="inline-block">
        <el-button
          icon="el-icon-refresh"
          @click="refreshSetting"
          size="small"
        ></el-button>
      </div>
      <div class="inline-block">
        <el-button type="primary" @click="setting" size="small"
          >Thiết lập lại</el-button
        >
      </div>
    </div>
    <el-divider></el-divider>
    <div class="des">
      <h3 class="des--title">Chú giải bản đồ</h3>
      <div class="des--item" v-for="(item, index) in desLst" :key="index">
        <img class="image" :src="item.image" alt="image_map" />
        <span class="label">{{ item.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["levelLst"],
  watch: {},
  created() {},
  data() {
    return {
      desLst: [
        {
          value: 1,
          label: "Quầy thuốc, nhà thuốc",
          image: "/icon-map/pharmacy.png"
        },
        {
          value: 2,
          label: "Bệnh viện",
          image: "/icon-map/benh_vien.png"
        },
        {
          value: 3,
          label: "Của hàng/ Shop/ Tạp hóa",
          image: "/icon-map/shop.png"
        },
        {
          value: 4,
          label: "Phòng khám chuyên khoa/ nha khoa",
          image: "/icon-map/phong_kham.png"
        },
        {
          value: 5,
          label: "Trạm  y tế",
          image: "/icon-map/tram_y_te.png"
        },
        {
          value: 6,
          label: "Trung tâm y tế",
          image: "/icon-map/tt_y_te.png"
        }
      ]
    };
  },
  methods: {
    refreshSetting() {
      this.levelLst = [
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
      ];
      this.setting();
    },
    setting() {
      this.$emit("changeSetting", this.levelLst);
    }
  }
};
</script>

<style scoped lang="scss">
.map-setting {
  width: 100%;
  padding: 0 20px;
  .setting {
    display: flex;
    align-items: center;
    .setting--label {
      font-size: 10pt;
      font-weight: 600;
      width: 80px;
      padding-left: 10px;
    }
    .setting--quota {
      font-size: 10pt;
      width: 100px;
      padding-left: 10px;
    }
  }
  .des {
    width: 100%;
    padding: 4px 8px 4px 4px;
    border-radius: 6px;
    box-shadow: 0 2px 5px #0000001a;
    max-height: calc(100vh - 100px);
    background: rgba(255, 255, 255, 0.88);
    .des--title {
      padding: 2px 5px;
      border-radius: 4px;
      margin-top: 2px;
      font-size: 10pt;
    }
    .des--item {
      display: flex;
      align-items: center;
      .image {
        height: 30px;
        margin-left: 15px;
        width: auto;
        margin-right: 20px;
        margin-bottom: 5px;
        object-fit: cover;
      }
      .label {
        font-size: 10pt;
      }
    }
  }
}
.inline-block {
  display: inline-block;
}
</style>
