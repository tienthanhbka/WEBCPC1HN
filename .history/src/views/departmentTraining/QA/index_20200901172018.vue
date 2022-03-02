<template>
  <div class="container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :lg="12">
        <el-card>
          <img
            src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/top-5-free-survey-makers.png"
            class="image"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-link
                class="button"
                type="warning"
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSf4lOORK9BJujHOGXsFjmfDeqV2qXpDUXTkgoWxpeVnP4bp_A/viewform"
              >
                Khảo sát
                <i class="fas fa-arrow-right"></i>
              </el-link>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12" :lg="12">
        <el-card>
          <img
            src="https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/top-5-free-survey-makers.png"
            class="image"
          />
          <div style="padding: 14px;">
            <div class="bottom clearfix">
              <el-link
                class="button"
                type="primary"
                target="_blank"
                href="https://docs.google.com/forms/d/e/1FAIpQLSeRvoO-QLcjvN_aHSC7kYZ2vEz2W5fijF8ZCwdrOqi2wjNs7g/viewform"
              >
                Gửi câu hỏi
                <i class="fas fa-arrow-right"></i>
              </el-link>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  }
};
</script>

<style scoped>
.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}
@media only screen and (max-width: 600px) {
  .container {
    width: 100%;
  }
}
</style>
