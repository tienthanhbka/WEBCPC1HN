<template>
  <div class="card-chart">
    <!-- <p
              v-if="item.amount"
              :class="item.amount > 0 ? 'top' : 'bottom'"
              class="tag"
            >
              {{ item.amount }}%
              <i
                :class="item.amount > 0 ? 'el-icon-top' : 'el-icon-bottom'"
              ></i>
            </p>
            <div class="clear-both"></div>
          </div>

          <div class="card--sale__body">
            <h3 class="sale--result" v-if="item.sum">
              {{ item.sum }}
              <span class="unit" v-if="item.unit">{{ item.unit }}</span>
            </h3>
            <el-progress
              class="sale--progress"
              v-if="item.value == 1 && item.sum > 0"
              :text-inside="true"
              :stroke-width="15"
              :percentage="60"
              status="success"
            ></el-progress>
            <div class="clear-both"></div>
          </div> -->
    <el-row :gutter="20">
      <!-- <el-col :xs="24" :sm="12" :lg="14">
        <div class="card--sale">
          <div class="card--sale__header">
            <span class="title">DOANH SỐ</span>
          </div>
          <div v-if="resultSale.length > 0" class="card__flex">
            <div class="card--sale__body">
              <div
                v-for="(item, index) in resultSale"
                :key="index"
                class="item--sale"
              >
                <span>{{ item.Name }}:</span>
                <span class="txt-bold">{{ item.Quantity | toVND }}</span> /
                <span class="txt-bold">{{ item.Amount | toVND }}</span>
                <el-progress
                  class="sale--progress"
                  v-if="item.Amount > 0"
                  :text-inside="true"
                  :stroke-width="13"
                  :percentage="Math.floor((item.Quantity / item.Amount) * 100)"
                  status="success"
                ></el-progress>
                <div class="clear--both"></div>
              </div>
            </div>
            <img
              src="data:image/png;base64,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"
              alt="icon-card"
              class="icon-card"
            />
          </div>
          <div v-else>
            <el-empty
              description="Không có dữ liệu"
              :image-size="50"
              class="empty-color"
            ></el-empty>
          </div>
        </div>
      </el-col> -->
      <el-col :xs="24" :sm="6" :lg="9">
        <el-popover
          placement="bottom"
          title="Kết quả"
          width="620"
          trigger="click"
        >
          <div
            v-for="(item, index) in resultSale"
            :key="index"
            class="item--sale"
          >
            <span>{{ item.Name }}:</span>
            <span class="txt-bold">{{ item.Quantity | toVND }}</span> /
            <span class="txt-bold">{{ item.Amount | toVND }}</span>
            <el-progress
              class="sale--progress"
              style="float:right"
              v-if="item.Amount > 0"
              :text-inside="true"
              :stroke-width="13"
              :percentage="Math.floor((item.Quantity / item.Amount) * 100)"
              status="success"
            ></el-progress>
            <div class="clear--both"></div>
          </div>
          <div class="card--sale" slot="reference">
            <div class="card--sale__header">
              <span class="title">DOANH SỐ</span>
            </div>

            <div class="card--sale__body card__flex" v-if="countCus > 0">
              <div>
                <h3 class="sale--result">
                  {{ sumAmount | toVND }}
                </h3>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/sales.png?alt=media&token=498abf27-742a-49a6-9b0c-23ac931ca32f"
                  alt="icon-card"
                  class="icon-card"
                />
              </div>
            </div>

            <div v-else>
              <el-empty
                description="Không có dữ liệu"
                :image-size="50"
                class="empty-color"
              ></el-empty>
            </div>
          </div>
        </el-popover>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="5">
        <div class="card--customer">
          <div class="card--customer__header">
            <span class="title">KHÁCH HÀNG</span>
          </div>
          <div class="card--customer__body card__flex" v-if="countCus > 0">
            <h3 class="customer--result">
              {{ countCus }}
            </h3>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/value.png?alt=media&token=deab226c-1057-421a-aa67-af627b5801db"
              alt="icon-card"
              class="icon-card"
            />
          </div>
          <div v-else>
            <el-empty
              description="Không có dữ liệu"
              :image-size="50"
              class="empty-color"
            ></el-empty>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="5">
        <div class="card--product">
          <div class="card--product__header">
            <span class="title">SẢN PHẨM</span>
          </div>
          <div class="card--product__body card__flex" v-if="countPro > 0">
            <h3 class="product--result " v-if="countPro">
              {{ countPro }}
            </h3>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/pharmacy.png?alt=media&token=90e0b7bf-19e7-449e-adb8-b853f43e489f"
              alt="icon-card"
              class="icon-card"
            />
          </div>
          <div v-else>
            <el-empty
              description="Không có dữ liệu"
              :image-size="50"
              class="empty-color"
            ></el-empty>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="6" :lg="5">
        <div class="card--typesale">
          <div class="card--typesale__header">
            <span class="title">KÊNH BÁN</span>
          </div>
          <div class="card--typesale__body card__flex" v-if="countPro > 0">
            <h3 class="typesale--result " v-if="countPro">
              {{ countTypeSale }}
            </h3>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/typesales.png?alt=media&token=67d654e9-e6c2-4cc7-bb6a-c2a9ef734430"
              alt="icon-card"
              class="icon-card"
            />
          </div>
          <div v-else>
            <el-empty
              description="Không có dữ liệu"
              :image-size="50"
              class="empty-color"
            ></el-empty>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- <el-row :gutter="20">
      <el-col
        :xs="24"
        :sm="12"
        :lg="6"
        v-for="(item, index) in items"
        :key="index"
      >
        <div class="card--sale">
          <div class="card--sale__header">
            <span class="title">{{ item.label }}</span>
            <p
              v-if="item.amount"
              :class="item.amount > 0 ? 'top' : 'bottom'"
              class="tag"
            >
              {{ item.amount }}%
              <i
                :class="item.amount > 0 ? 'el-icon-top' : 'el-icon-bottom'"
              ></i>
            </p>
            <div class="clear-both"></div>
          </div>

          <div class="card--sale__body">
            <h3 class="sale--result" v-if="item.sum">
              {{ item.sum }}
              <span class="unit" v-if="item.unit">{{ item.unit }}</span>
            </h3>
            <el-progress
              class="sale--progress"
              v-if="item.value == 1 && item.sum > 0"
              :text-inside="true"
              :stroke-width="15"
              :percentage="60"
              status="success"
            ></el-progress>
            <div class="clear-both"></div>
          </div>
        </div>
      </el-col>
    </el-row> -->
  </div>
</template>

<script>
import { GetResultEmployee } from "@/api/business";
import { getIdUser } from "@/utils/auth";

export default {
  props: [
    "sumAmount",
    "countCus",
    "countPro",
    "countTypeSale",
    "employee",
    "month"
  ],
  created() {
    this.fetchData();
    this.fetchSaleResult();
  },
  data() {
    return {
      items: [
        {
          value: 1,
          label: "Doanh số tổng",
          amount: 120,
          sum: 0,
          unit: "vnđ"
        },
        {
          value: 2,
          label: "Khách hàng",
          amount: -10,
          sum: 0
        },
        {
          value: 3,
          label: "Sản phẩm",
          amount: 10,
          sum: 0
        },
        {
          value: 4,
          label: "Kênh bán",
          sum: 0
        }
      ],
      resultSale: []
    };
  },
  methods: {
    fetchData() {
      this.items.forEach(i => {
        switch (i.value) {
          case 1:
            i.sum = this.sumAmount;
            break;
          case 2:
            i.sum = this.countCus;
            break;
          case 3:
            i.sum = this.countPro;
            break;
          case 4:
            i.sum = this.countTypeSale;
            break;
        }
      });
    },
    fetchSaleResult() {
      const req = {
        EmployeeID: this.employee ? this.employee.EmployeeID : getIdUser(),
        Month: Date.parse(this.month).toString("yyyy-MM-dd")
      };
      GetResultEmployee(req).then(res => {
        if (res.RespCode == 0) {
          this.resultSale = res.Data;
        }
      });
    }
  },
  watch: {
    month() {
      this.fetchSaleResult();
    }
  }
};
</script>

<style lang="scss" scoped>
.card-chart {
  padding: 10px 0;
  .card--sale {
    border: 1px solid #fff;
    border-radius: 10px;
    overflow: hidden;
    background-color: #4caf50;

    .card--sale__header {
      font-size: 10pt;
      font-weight: bold;
      color: #fff;
      border-bottom: 1px dashed #fff;
      padding: 7px 5px;
      .title {
      }
      .tag {
        padding: 0 3px;
        color: #fff;
        border-radius: 5px;
        float: right;
        margin: 0;
      }
      .top {
        background-color: #02bc77;
      }
      .bottom {
        background-color: #be2b06;
      }
    }

    .card--sale__body {
      //height: 120px;
      color: #fff;
      font-size: 10pt;

      min-height: 80px;
      .sale--result {
        float: right;
        font-size: 30px;
        margin: 10px;
        color: #fff;
        .unit {
          display: block;
          font-size: 10pt;
          float: right;
        }
      }
      .item--sale {
        padding: 5px;
      }
      .sale--progress {
        float: right;
      }
    }
  }
  .card--customer {
    border: 1px solid #fff;
    border-radius: 10px;
    overflow: hidden;
    background-color: #5ac4be;

    .card--customer__header {
      font-size: 10pt;
      font-weight: bold;
      color: #fff;
      border-bottom: 1px dashed #fff;
      padding: 7px 5px;
      .title {
      }
      .tag {
        padding: 0 3px;
        color: #fff;
        border-radius: 5px;
        margin: 0;
      }
      .top {
        background-color: #02bc77;
      }
      .bottom {
        background-color: #be2b06;
      }
    }
    .card--customer__body {
      //height: 120px;
      color: #fff;
      font-size: 10pt;

      min-height: 80px;
      .customer--result {
        float: right;
        font-size: 45px;
        margin: 10px 20px;
        color: #fff;
        .unit {
          display: block;
          font-size: 10pt;
          float: right;
        }
      }
      .item--sale {
        padding: 5px;
      }
      .sale--progress {
        float: right;
      }
    }
  }
  .card--product {
    border: 1px solid #fff;
    border-radius: 10px;
    overflow: hidden;
    background-color: #dbb82f;

    .card--product__header {
      font-size: 10pt;
      font-weight: bold;
      color: #fff;
      border-bottom: 1px dashed #fff;
      padding: 7px 5px;
      .title {
      }
      .tag {
        padding: 0 3px;
        color: #fff;
        border-radius: 5px;
        float: right;
        margin: 0;
      }
      .top {
        background-color: #02bc77;
      }
      .bottom {
        background-color: #be2b06;
      }
    }
    .card--product__body {
      //height: 120px;
      color: #fff;
      font-size: 10pt;

      min-height: 80px;
      .product--result {
        float: right;
        font-size: 45px;
        margin: 10px 20px;
        color: #fff;
        .unit {
          display: block;
          font-size: 10pt;
          float: right;
        }
      }
      .item--sale {
        padding: 5px;
      }
      .sale--progress {
        float: right;
      }
    }
  }
  .card--typesale {
    border: 1px solid #fff;
    border-radius: 10px;
    overflow: hidden;
    background-color: #f3716d;

    .card--typesale__header {
      font-size: 10pt;
      font-weight: bold;
      color: #fff;
      border-bottom: 1px dashed #fff;
      padding: 7px 5px;
      .title {
      }
      .tag {
        padding: 0 3px;
        color: #fff;
        border-radius: 5px;
        float: right;
        margin: 0;
      }
      .top {
        background-color: #02bc77;
      }
      .bottom {
        background-color: #be2b06;
      }
    }
    .card--typesale__body {
      //height: 120px;
      color: #fff;
      font-size: 10pt;

      min-height: 80px;
      .typesale--result {
        float: right;
        font-size: 45px;
        margin: 10px 20px;
        color: #fff;
        .unit {
          display: block;
          font-size: 10pt;
          float: right;
        }
      }
      .item--sale {
        padding: 5px;
      }
      .sale--progress {
        float: right;
      }
    }
  }
  .txt-bold {
    font-weight: 600;
  }
  .card__flex {
    display: flex;
    justify-content: space-between;
    .icon-card {
      height: 60px;
      width: 60px;
      color: #fff;
      opacity: 0.6;
      margin: 5px 10px;
    }
  }
}
</style>
<style lang="scss">
.sale--progress {
  width: 200px;
  margin-left: 30px;
  .el-progress-bar__inner {
    max-width: 100%;
  }
}
.empty-color {
  padding: 20px;
  .el-empty__description {
    p {
      color: #fff;
    }
  }
}
</style>
