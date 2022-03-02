<template>
  <div
    shadow="always"
    style="margin: auto; position: relative;margin-bottom: 200px;max-width:700px"
  >
    <div>
      <el-card
        shawdow
        style="font-size: 10pt;
    font-style: italic;
    padding-top: 5px;
    line-height: 20px;
    text-align: justify;word-break: break-word;"
      >
        <div
          style="color: #819FF7;font-weight: bold;margin-bottom: 15px;font-size: 18px;"
        >
          {{ this.lines[0].Name }}
        </div>

        Cảm ơn bạn về khoảng thời gian đã đồng hành cùng CPC1 Hà Nội! Công ty hy
        vọng, thời gian làm việc tại CPC1 Hà Nội đã phần nào đó làm giàu thêm
        kiến thức, sự trải nghiệm của bạn trong chặng đường phát triển sự nghiệp
        trong tương lai. Với mong muốn đón nhận các đóng góp, chia sẻ của các
        bạn Nhân viên đã từng làm việc tại Công ty, CPC1 Hà Nội có một số câu
        hỏi khảo sát ngắn gọn để chúng tôi tiếp thu và có thể cải thiện được
        những mặt còn hạn chế, hướng tới xây dựng môi trường làm việc và văn hóa
        ngày càng tốt hơn tại NƠI ĐÂY.
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in lines" :key="index" class="row">
        <div style="padding:5px">
          <!-- <el-card> -->
          <el-row style="margin: 15px 0;">
            <el-col :span="1">
              <div
                class="grid-content bg-purple-light"
                style=" margin-left: 3px;"
              >
                <span> {{ index + 1 }}. </span>
              </div>
            </el-col>
            <el-col :span="23">
              <span
                style="font-size: 11pt;    word-break: break-word;
"
              >
                {{ line.Content }}
              </span>
            </el-col>
          </el-row>
          <div
            v-if="line.TypeQuestion == 1"
            class="grid-content bg-purple-light"
          >
            <el-input
              placeholder="Nhập câu trả lời"
              v-model="line.answer"
            ></el-input>
          </div>
          <div v-if="line.TypeQuestion == 2" class="">
            <el-radio-group
              style="width:100%;margin-top:5px"
              v-model="line.answer"
              v-for="(select, index) in line.select"
              :key="index"
            >
              <!-- <div style="width: 500px;"> -->
              <el-radio
                style="width:100%;margin-top:5px"
                :label="select.IDSelect"
                >{{ select.Name }}</el-radio
              >
              <!-- </div> -->
            </el-radio-group>
          </div>
          <div
            v-if="line.TypeQuestion == 3"
            class="grid-content bg-purple-light"
          >
            <el-checkbox-group v-model="line.answer">
              <el-checkbox
                style="width:100%;margin-top:5px"
                v-for="select in line.select"
                :label="select.IDSelect"
                :key="select.IDSelect"
                >{{ select.Name }}</el-checkbox
              >
            </el-checkbox-group>
          </div>
          <!-- </el-card> -->
        </div>
      </div>
      <br />
      <el-card
        shadow
        style="color: rgb(64 158 255);
    text-align: justify;
    line-height: 20px;
    font-size: 11pt;word-break: break-word;"
      >
        Cảm ơn bạn đã dành thời gian khảo sát. Công ty luôn trân trọng những
        đóng góp của bạn trong thời gian qua. Chúc bạn thành công với môi trường
        - công việc mới, hạnh phúc - sức khỏe!
      </el-card>
    </div>

    <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000">
      <el-button type="primary" icon="fas fa-plus" @click="submit">
        Submit</el-button
      >
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { GetSurveyByID, SubmitSurvey } from "@/api/survey";
export default {
  name: "PhoneNumberLine",
  props: ["id"],
  components: {},
  data() {
    return {
      lines: [],
      acc: 0,
      select1: []
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    submit() {
      var req = {
        IDEmployee: Cookies.get("idEmployee"),
        lines: this.lines
      };
      SubmitSurvey(req).then(response => {
        if (response.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Hoàn thành phiếu khảo sát",
            type: "success",
            position: "top-left"
          });
          this.$emit("submitOK");
        }
      });
    },
    fetchData() {
      var req = {
        ID: this.id ? this.id : this.$route.params.id
      };
      GetSurveyByID(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data;
        }
      });
    }
  },
  mounted() {},
  created() {
    this.fetchData();
  }
};
</script>
