<template>
  <div class="choose-date">
    <el-row>
      <el-col :xs="24" :sm="24" :lg="6">
        <el-date-picker
          v-model="dateSelect"
          size="small"
          style="width:90%"
          format="yyyy-MM-dd"
          type="date"
          placeholder="Chọn ngày"
        >
        </el-date-picker>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="15">
        <el-row>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-time-select
              v-model="timeStart"
              size="small"
              style="width:90%"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              placeholder="Thời gian bắt đầu"
            >
            </el-time-select>
          </el-col>
          <el-col :xs="24" :sm="24" :lg="12">
            <el-time-select
              size="small"
              v-model="timeEnd"
              style="width:90%"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }"
              placeholder="Thời gian kết thúc"
            >
            </el-time-select>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="3" style="text-align:center">
        <el-button type="primary" size="small" @click="submit"> Thêm</el-button>
      </el-col>
    </el-row>
    <!-- <el-date-picker
      v-model="date.TimeStart"
      size="small"
      format="yyyy-MM-dd HH:mm"
      type="datetime"
      placeholder="Chọn thời gian bắt đầu"
    >
    </el-date-picker>
    <el-date-picker
      v-model="date.TimeEnd"
      format="yyyy-MM-dd HH:mm"
      size="small"
      type="datetime"
      placeholder="Chọn thời gian kết thúc"
    >
    </el-date-picker> -->

    <!-- <el-button type="primary" size="small" @click="submit"> Thêm</el-button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateSelect: "",
      timeStart: "",
      timeEnd: "",
      date: {
        DocumentID: "",
        RowID: "",
        TimeStart: "",
        TimeEnd: "",
        QuantityHour: ""
      }
    };
  },
  props: {
    row: {
      type: Object,
      required: true
    }
  },
  watch: {},
  created() {
    this.date.TimeStart = new Date();
  },
  methods: {
    submit() {
      this.date.TimeStart =
        Date.parse(this.dateSelect).toString("yyyy-MM-dd") +
        " " +
        this.timeStart +
        ":00";
      this.date.TimeEnd =
        Date.parse(this.dateSelect).toString("yyyy-MM-dd") +
        " " +
        this.timeEnd +
        ":00";
      let checkTime =
        Date.parse(this.date.TimeEnd) - Date.parse(this.date.TimeStart);
      if (checkTime > 0) {
        let hours =
          Math.abs(
            Date.parse(this.date.TimeStart) - Date.parse(this.date.TimeEnd)
          ) / 36e5;
        const newDate = {
          DocumentID: this.date.DocumentID,
          TimeStart: this.date.TimeStart,
          TimeEnd: this.date.TimeEnd,
          QuantityHour: parseFloat(hours.toFixed(3))
        };
        this.$emit("addDate", newDate);
      } else {
        this.$notify({
          title: "Xảy ra lỗi",
          message: "Thời gian kết thúc phải lớn hơn thời gian bắt đầu",
          type: "error"
        });
      }
    },
    initData() {
      if (this.row) {
        this.date.DocumentID = this.row.DocumentID;
      }
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style></style>
