<template>
  <div class="container">
    <!-- <el-row :gutter="20">
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
    </el-row> -->
    <el-row :gutter="20" style="min-height:120px">
      <el-col :key="index" :xs="24" :sm="12" :md="12" :lg="12">
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSf4lOORK9BJujHOGXsFjmfDeqV2qXpDUXTkgoWxpeVnP4bp_A/viewform"
        >
          <div class="content-work-elements">
            <img src="@/assets/survey.png" />
            <h3>Phiếu khảo sát sau đào tạo</h3>
            <!-- <p class="name-company">
                Từ {{ Date.parse(item.TimeStart).toString("dd/MM/yyyy") }} đến
                {{ Date.parse(item.TimeEnd).toString("dd/MM/yyyy") }}
              </p> -->
          </div>
        </a>
      </el-col>
      <el-col :key="index" :xs="24" :sm="12" :md="12" :lg="12">
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeRvoO-QLcjvN_aHSC7kYZ2vEz2W5fijF8ZCwdrOqi2wjNs7g/viewform"
        >
          <div class="content-work-elements">
            <img src="@/assets/survey.png" />
            <h3>Phiếu gửi câu hỏi phản hồi</h3>
            <!-- <p class="name-company">
                Từ {{ Date.parse(item.TimeStart).toString("dd/MM/yyyy") }} đến
                {{ Date.parse(item.TimeEnd).toString("dd/MM/yyyy") }}
              </p> -->
          </div>
        </a>
      </el-col>
      <el-col :key="index" :xs="24" :sm="12" :md="12" :lg="12">
        <a
          target="_blank"
          href="https://docs.google.com/forms/d/e/1FAIpQLSeRvoO-QLcjvN_aHSC7kYZ2vEz2W5fijF8ZCwdrOqi2wjNs7g/viewform"
        >
          <div class="content-work-elements">
            <img src="@/assets/survey.png" />
            <h3>Phiếu khảo sát sản phẩm</h3>
            <!-- <p class="name-company">
                Từ {{ Date.parse(item.TimeStart).toString("dd/MM/yyyy") }} đến
                {{ Date.parse(item.TimeEnd).toString("dd/MM/yyyy") }}
              </p> -->
          </div>
        </a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped lang="scss">
$bg: rgba(49, 49, 49, 0.05);
.container {
  padding: 20px;
  min-height: 100vh;
}
.content-work-elements {
  min-height: 100px;
  border: 1px dotted #eee;
  margin-top: 10px;
  padding: 10px 5px 10px 10px;
  overflow: hidden;
}
.content-work-elements:hover {
  background: #ecf0f1;
}
.content-work-elements img {
  float: left;
  width: 76px;
  height: 76px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-right: 8px;
}

.content-work-elements h3 {
  font-size: 14px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-top: 5px;
  color: #138fda;
}
.content-work-elements .name-company {
  color: #999;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
}
.content-work-elements span {
  margin-right: 15px;
}
.content-work span.salary {
  color: red;
}
.content-work-elements span {
  margin-right: 15px;
}
</style>
