<template>
  <div class="customer">
    <div class="customer-content">
      <!-- thời gian quá hạn > 0 -> màu đỏ -->
      <img
        v-if="row.TimeTerm > 0"
        class="image"
        src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/icon_cus_red.png?alt=media&token=e1a86bd9-d92c-4a43-ba48-518724fb2dfc"
        alt="customer"
      />
      <!-- thời gian gần tới hạn > 6 -> màu xanh lá -->
      <img
        v-else-if="row.TimeTerm <= -6"
        class="image"
        src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/icon_cus_green.png?alt=media&token=1d234246-bb6d-4c29-8c59-766efdb09754"
        alt="customer"
      />
      <!-- thời gian gần tới hạn = 4,5 -> màu xanh nước biển -->
      <img
        v-else-if="row.TimeTerm > -6 && row.TimeTerm < -3"
        class="image"
        src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/icon_cus_blue.png?alt=media&token=98d4d264-9544-4caf-9ada-c41ef5a55d59"
        alt="customer"
      />
      <!-- thời gian gần tới hạn = 0,1,2,3 -> màu vàng -->

      <img
        v-else-if="row.TimeTerm < 1 && row.TimeTerm > -4"
        class="image"
        src="https://firebasestorage.googleapis.com/v0/b/hssv-a0353.appspot.com/o/icon_cus_yellow.png?alt=media&token=94984c70-d622-4c41-a021-00f74d30694e"
        alt="customer"
      />
      <div class="content">
        <p class=" customer--text customer--name">
          {{ row.CustomerName }}
        </p>
        <p class="customer--text">
          Số tiền còn nợ :
          <span style="font-weight:600" v-if="row.AmountDebt">
            {{
              row.AmountDebt.toString().replace(
                /(\d)(?=(\d{3})+(?!\d))/g,
                "$1,"
              )
            }}đ</span
          >
        </p>
        <p class="customer--text">
          <span v-if="row.TimeTerm > 0">Ngày nợ quá hạn: </span>
          <span v-if="row.TimeTerm <= 0">Sắp tới hạn trả: </span
          >{{ Math.abs(row.TimeTerm) }} ngày
        </p>
        <p class="customer--text">Nhân viên: {{ row.EmployeeName }}</p>
        <p class="customer--text">SĐT: {{ row.EmployeeID }}</p>
      </div>
      <!-- <div class="label-add" @click="viewTimeLine(item)">Timeline</div> -->
    </div>
  </div>
</template>

<script>
import {} from "@/api/appview";
export default {
  components: {},
  props: {
    row: {
      require: true,
      type: Object
    }
  },
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {},
  watch: {}
};
</script>

<style lang="scss" scoped>
.customer {
  padding: 5px 7px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

  .customer-content {
    display: flex;
    .image {
      max-width: 60px;
      max-height: 60px;
      padding: 5px;
      object-fit: cover;
    }
    .content {
      .customer--text {
        margin: 5px 0;
        font-size: 10pt;
      }
      .customer--name {
        font-size: 16px;
        margin-bottom: 7px;
      }
    }
  }
}
</style>
