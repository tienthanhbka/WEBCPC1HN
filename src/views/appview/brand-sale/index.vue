<template>
  <div class="brand-sale">
    <div class="brand-sale--date">
      <el-date-picker
        class="el-select-months group"
        style="width:100%;text-align:center"
        placeholder="Chọn thời gian"
        v-model="date"
        format="dd/MM/yyyy"
        value-format="yyyy-MM-dd"
        size="mini"
      ></el-date-picker>
    </div>
    <div class="brand-sale--date">
      <el-alert
        class="brand-sale--alert"
        v-if="data && data.length < 10"
        :title="alert"
        type="warning"
        effect="dark"
      >
      </el-alert>
      <el-alert
        class="brand-sale--alert"
        v-else
        :title="alert"
        :description="description"
        type="success"
        effect="dark"
      >
      </el-alert>
    </div>
    <div v-if="data.length > 0" class="brand-sale--list">
      <item v-for="(item, index) in data" :key="index" :item="item"></item>
    </div>
    <el-empty v-else description="Không có dữ liệu"></el-empty>
    <div class="brand-sale--des">
      <h3 class="des-title">Điều kiện tham gia chương trình</h3>
      <div class="des-item" v-for="(item, index) in desLst" :key="index">
        <div class="color" style="background-color:#fef22f"></div>
        <div class="text">
          {{ item.text }}
        </div>
      </div>
      <p class="des-date">Thời gian áp dụng: Từ 01/03/2022 đến 03/06/2022</p>
    </div>
  </div>
</template>

<script>
import { GetBranchSaleByEmInDay } from "@/api/saleHeader";
import Item from "./component/item";
export default {
  data() {
    return {
      data: [],
      date: new Date(),
      alert: "",
      description: "",
      desLst: [
        {
          text:
            "Đơn hàng Kê đơn, Phòng mạch, OTC, GT có sản phẩm thuộc 1 trong 8 nhãn"
        },
        { text: "Giá trị đơn hàng đạt tối thiểu 500.000đ" },
        { text: "Đạt tối thiểu 10 đơn hàng/ ngày (thỏa mãn ĐK  1 và 2)" },
        {
          text:
            "Đơn hàng phát sinh từ ngày 01 - 10 hàng tháng (thỏa mãn ĐK  1, 2,   3 )"
        }
      ]
    };
  },
  components: {
    Item
  },
  methods: {
    fetchData() {
      const req = {
        UserName: this.$route.params.username,
        Token: this.$route.params.token,
        Date: Date.parse(this.date).toString("yyyy-MM-dd HH:mm:ss")
      };
      GetBranchSaleByEmInDay(req).then(res => {
        if (res.RespCode == 0) {
          this.data = res.Data;
          if (this.data && this.data.length < 10) {
            let num = 10 - this.data.length;
            this.alert = "Bạn còn thiếu " + num + " đơn hàng để nhận thưởng";
          } else if (this.data && this.data.length >= 10) {
            this.alert = "Bạn đủ điều kiện nhận thưởng";

            this.description =
              "Số  tiền thưởng " + this.data.length * 20000 + "đ";
          }
        }
      });
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    date() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.brand-sale {
  .brand-sale--date {
    margin: 10px;
  }
  .brand-sale--list {
    margin: 5px;
  }

  .brand-sale--des {
    margin-top: 10px;
    background-color: #fffbeb;
    padding: 0.5rem;
    border-radius: 0.5rem;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    .des-title {
      font-size: 10pt;
      margin: 5px 0;
      color: #02bc77;
    }
    .des-date {
      font-style: italic;
      margin: 5px;
      font-size: 10pt;
      color: #0277bc;
      text-align: center;
    }
    .des-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0.25rem;
      .color {
        border-radius: 9999px;
        width: 0.75rem;
        height: 0.75rem;
        margin-right: 0.5rem;
      }
      .text {
        font-weight: 500;
        font-size: 0.75rem;
        line-height: 1rem;
        text-align: justify;
      }
    }
  }
}
</style>
