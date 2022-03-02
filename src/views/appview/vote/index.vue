<template>
  <div class="vote-box">
    <h3>
      Anh Bình (Tổng Giám Đốc) muốn tư vấn kiểu tóc mới, nhờ anh em toàn hệ
      thống hỗ trợ nhé !
    </h3>
    <img src="/imgs/vote.png" alt="" />

    <div class="box-choose">
      <el-radio v-model="answer" label="1" border></el-radio>
      <el-radio v-model="answer" label="2" border></el-radio>
      <el-radio v-model="answer" label="3" border></el-radio>
      <el-radio v-model="answer" label="4" border></el-radio>
    </div>
    <div class="choose">
      <el-button
        icon="el-icon-s-promotion"
        type="primary"
        @click="submit"
        :disabled="isDis"
        v-if="!isDis"
      >
        Bình chọn</el-button
      >
      <div
        v-else
        style="border:1px dashed #ccc;padding:10px;font-size:10pt;color:#ccc"
      >
        Bạn đã bình chọn rồi !
      </div>
    </div>
    <!-- <div class="box-chart">
      <div class="box">
        <div class="line" v-for="(item, index) in levelLst" :key="index">
          <div class="color" style="background-color:#fef22f"></div>
          <div class="text">
            Phương án {{ item.Answer }}: {{ item.CountNum }}
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  CreateCPC1HNVote,
  GetCPC1HNVote,
  GetCPC1HNLst,
  GetCPC1HNVoteByEm
} from "@/api/it";
export default {
  data() {
    return {
      answer: "",
      levelLst: [],
      info: "",
      isDis: false
    };
  },
  methods: {
    submit() {
      const req = {
        UserName: this.$route.params.username,
        Token: this.$route.params.token,
        Answer: this.answer
      };
      CreateCPC1HNVote(req).then(res => {
        if (res.RespCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Cảm ơn bạn đã bình chọn",
            type: "success",
            position: "top-left"
          });
          this.fetchVote();
          this.fetchVoteInfo();
        }
      });
    },
    fetchVote() {
      const req = {
        UserName: this.$route.params.username,
        Token: this.$route.params.token
      };
      GetCPC1HNVote(req).then(res => {
        if (res.RespCode == 0) {
          this.levelLst = res.Data;
        }
      });
    },
    fetchVoteInfo() {
      const req = {
        UserName: this.$route.params.username,
        Token: this.$route.params.token
      };
      GetCPC1HNVoteByEm(req).then(res => {
        if (res.RespCode == 0) {
          this.info = res.VoteInfo;
          this.answer = this.info.Answer;
          if (this.answer) {
            this.isDis = true;
          }
        }
      });
    }
  },
  created() {
    this.fetchVote();
    this.fetchVoteInfo();
  }
};
</script>

<style lang="scss" scoped>
.vote-box {
  img {
    width: 100%;
    object-fit: cover;
    height: 400px;
  }
  h3 {
    font-size: 10pt;
    padding: 10px;
    text-align: center;
    color: #d11616;
    margin: 10px 0 0 0;
  }
  .box-choose {
    text-align: center;
    padding: 20px;
  }
  .choose {
    text-align: center;
    padding: 20px;
  }
  .box-chart {
    .box {
      background-color: #fffbeb;
      padding: 0.5rem;
      border-radius: 0.5rem;
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      .line {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 0.25rem;
        .color {
          border-radius: 9999px;
          width: 0.75rem;
          height: 0.75rem;
          margin-right: 0.25rem;
        }
        .text {
          font-weight: 500;
          font-size: 0.75rem;
          line-height: 1rem;
        }
      }
    }
  }
}
</style>
<style>
.el-radio__label {
  font-weight: 600;
  font-size: 20px;
}
.el-radio.is-bordered {
  padding: 5px;
}
</style>
