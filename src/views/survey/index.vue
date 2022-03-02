<template>
  <div class="container">
    <router-link :to="'/create/survey'">
      <el-button type="primary" icon="el-icon-s-order">
        Tạo phiếu mới</el-button
      >
    </router-link>
    <el-row :gutter="20" style="min-height:120px">
      <el-col
        v-for="(item, index) in lines"
        :key="index"
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
      >
        <router-link :to="'/work/survey/' + item.IDForm">
          <a href="#/create/survey">
            <div class="content-work-elements">
              <img src="@/assets/survey.png" />
              <h3>{{ item.Name }}</h3>
              <p class="name-company">
                Từ {{ Date.parse(item.TimeStart).toString("dd/MM/yyyy") }} đến
                {{ Date.parse(item.TimeEnd).toString("dd/MM/yyyy") }}
              </p>
            </div>
          </a>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { GetSurvey } from "@/api/survey";
import Cookies from "js-cookie";

export default {
  filters: {},
  components: {},
  props: {},
  data() {
    return {
      lines: []
    };
  },
  methods: {
    fetchData() {
      var req = {
        token: Cookies.get("token")
      };
      GetSurvey(req).then(response => {
        this.lines = response.Data;
      });
    }
  },
  computed: {},
  created() {
    this.fetchData();
  },
  watch: {}
};
</script>

<style lang="scss" scoped>
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
