<template>
  <div class="header-box">
    <div class="inline-block">
      <el-select
        filterable
        clearable
        v-model="value.city"
        placeholder="Tỉnh thành"
        @change="changeCity"
        size="small"
      >
        <el-option
          v-for="item in cityLst"
          :key="item.city"
          :label="item.city"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class="inline-block">
      <el-select
        v-model="value.district"
        filterable
        clearable
        @change="changeDistrict"
        placeholder="Quận huyện"
        size="small"
      >
        <el-option
          v-for="item in districtLst"
          :key="item.District"
          :label="item.District"
          :value="item"
        >
        </el-option>
      </el-select>
    </div>
    <div class=" box-right ">
      <!-- <div class="inline-block">
        <el-select
          v-model="value.product"
          placeholder="Chọn sản phẩm"
          filterable
          clearable
          size="small"
        >
          <el-option
            v-for="item in items"
            :key="item.ProductID"
            :label="item.ProductName"
            :value="item.ProductID"
          >
            <span style="float: left">{{ item.ProductName }}</span>
            <span style="float: right; color: #8492a6; font-size: 10px">{{
              item.ProductID
            }}</span>
          </el-option>
        </el-select>
      </div>
      <div class="inline-block">
        <el-date-picker
          size="small"
          v-model="value.month"
          type="month"
          value-format="MM-yyyy"
          placeholder="Chọn tháng"
          value="2019-07"
        >
        </el-date-picker>
      </div> -->
      <!-- </div>
    <div class=" inline-block box-right"> -->
      <div class="inline-block">
        <el-button
          type="success"
          @click="viewChart"
          icon="fas fa-chart-pie"
          size="small"
        ></el-button>
      </div>
      <div class="inline-block">
        <el-button
          type="primary"
          @click="viewSetting"
          icon="el-icon-setting"
          size="small"
        ></el-button>
      </div>
      <div style="clear:both"></div>
    </div>
    <div style="clear:both"></div>
    <el-drawer title="Cài đặt" :visible.sync="showDrawer" direction="rtl">
      <setting :levelLst="levelLst" @changeSetting="changeSetting"></setting>
    </el-drawer>
  </div>
</template>

<script>
import { GetCity, GetDistrictByCity } from "@/api/default";
import Setting from "./map-setting";
export default {
  props: ["value", "items", "levelLst"],
  components: { Setting },
  watch: {
    value() {
      this.$emit("input", this.value);
    }
  },
  data() {
    return {
      cityLst: [],
      districtLst: [],
      city: "",
      district: "",
      showDrawer: false,
      typeLst: [
        {
          value: 1,
          label: "Đánh giá độ phủ khách hàng"
        }
        // {
        //   value: 2,
        //   label: "Đánh giá độ phủ sản phẩm"
        // },
        // {
        //   value: 3,
        //   label: "Đánh giá độ phủ cung tuyến"
        // }
      ],
      typeKHLst: [
        {
          value: "1",
          label: "Trạm y tế"
        },
        {
          value: "2",
          label: "Bệnh viện"
        },
        {
          value: "3",
          label: "Bệnh viện tư nhân"
        },
        {
          value: "4",
          label: "Chi nhánh"
        },
        {
          value: "5",
          label: "Công ty"
        },
        {
          value: "6",
          label: "Phòng khám chuyên khoa"
        },
        {
          value: "7",
          label: "Phòng khám đa khoa"
        },
        {
          value: "8",
          label: "Sở y tế"
        },
        {
          value: "9",
          label: "Trung tâm y tế"
        },
        {
          value: "10",
          label: "Bảo hiểm xa hội Tỉnh/TP"
        },
        {
          value: "11",
          label: "Nhà xe"
        },
        {
          value: "12",
          label: "Quầy thuốc/Nhà thuốc"
        },
        {
          value: "13",
          label: "Tạp Hóa"
        },
        {
          value: "14",
          label: "Siêu Thị"
        }
      ]
    };
  },
  methods: {
    fetchCity() {
      GetCity().then(res => {
        this.cityLst = res.Data;
      });
    },
    changeCity(val) {
      this.city = val;
      if (val) {
        this.value.city = val.city;
        this.value.district = "";
        this.value.code = val.CityCode;
        GetDistrictByCity({ City: this.value.city }).then(res => {
          if (res.ResCode == 0) {
            this.districtLst = res.Data;
          }
        });
      } else {
        this.value.code = "";
        this.value.city = "";
      }
    },
    changeDistrict(val) {
      this.district = val;
      if (val) {
        this.value.code = val.DistrictCode;
        this.value.district = val.District;
      } else {
        this.value.code = this.city.CityCode;
        this.value.district = "";
      }
    },
    viewChart() {
      this.$emit("viewChart");
    },
    viewSetting() {
      this.showDrawer = true;
    },
    changeSetting(val) {
      this.$emit("changeSetting", val);
      this.showDrawer = false;
    }
  },
  created() {
    this.fetchCity();
    GetDistrictByCity({ City: this.value.city }).then(res => {
      if (res.ResCode == 0) {
        this.districtLst = res.Data;
      }
    });
    this.value.code = "01";
  }
};
</script>

<style lang="scss" scoped>
.header-box {
  width: 100%;
  min-height: 40px;
  display: inline-block;
  box-shadow: rgba(27, 31, 35, 0.04) 0px 1px 0px,
    rgba(255, 255, 255, 0.25) 0px 1px 0px inset;
  .box-right {
    float: right;
  }
  .box-left {
  }
}
.inline-block {
  display: inline-block;
  padding: 5px;
}
</style>
