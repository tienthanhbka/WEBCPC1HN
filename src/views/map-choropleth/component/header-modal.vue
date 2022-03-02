<template>
  <div class="header-box">
    <div class=" inline-block box-left ">
      <el-select
        v-model="value.type"
        placeholder="Chọn hình thức"
        filterable
        size="small"
      >
        <el-option
          v-for="item in typeLst"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </div>
    <div class=" inline-block box-left ">
      <el-select
        v-model="value.typeKH"
        placeholder="Chọn loại khách hàng"
        filterable
        clearable
        size="small"
      >
        <el-option
          v-for="item in typeKHLst"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </div>
    <div class=" inline-block box-right">
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
      <div style="clear:both"></div>
    </div>
    <div style="clear:both"></div>
  </div>
</template>

<script>
import { GetCity, GetDistrictByCity } from "@/api/default";
export default {
  props: ["value"],
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
    padding: 5px;
  }
  .box-left {
    padding: 5px;
  }
}
.inline-block {
  display: inline-block;
}
</style>
