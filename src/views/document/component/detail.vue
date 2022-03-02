<template>
  <div>
    <el-tabs type="border-card" :lazy="true" v-model="typeView">
      <el-tab-pane label="Ảnh" name="1" v-if="imgLst.length > 0">
        <!-- <img
          :src="linkImg"
          alt="ảnh tài liệu"
          style="width:100%"
          onerror="this.onerror = null; this.src = 'https://lamdong.gov.vn/Shared%20Documents/images/noPhoto.jpg';"
        /> -->

        <el-carousel :interval="4000" height="500px" style="text-align:center">
          <el-carousel-item v-for="(item, index) in imgLst" :key="index">
            <img
              :src="item"
              alt="ảnh tài liệu"
              style="max-width:100%;height:100%;object-fit:cover"
              onerror="this.onerror = null; this.src = 'https://lamdong.gov.vn/Shared%20Documents/images/noPhoto.jpg';"
            />
          </el-carousel-item>
        </el-carousel>
      </el-tab-pane>
      <el-tab-pane label="Thông tin chi tiết" name="2">
        <div v-if="productDes" class="product-content">
          <el-card shadow="always">
            <div class="content-edit" v-html="productDes"></div>
          </el-card>
        </div>
        <div class="blank-table" v-else>
          Không có dữ liệu
        </div>
      </el-tab-pane>
      <el-tab-pane label="Tờ toa" v-if="toa" name="3">
        <object
          :data="toa"
          width="100%"
          height="600px"
          style="padding-bottom:100px"
        >
          <p>
            Your web browser doesn't have a plugin.
          </p>
        </object>
      </el-tab-pane>
      <el-tab-pane label="Tờ rơi" v-if="roi" name="4">
        <object
          :data="roi"
          width="100%"
          height="600px"
          style="padding-bottom:100px"
        >
          <p>
            Your web browser doesn't have a plugin.
          </p>
        </object>
      </el-tab-pane>
      <el-tab-pane label="Slide" v-if="slide" name="5">
        <object
          :data="slide"
          width="100%"
          height="600px"
          style="padding-bottom:100px"
        >
          <p>
            Your web browser doesn't have a plugin.
          </p>
        </object>
      </el-tab-pane>
      <el-tab-pane label="Catalogue" v-if="catalogue" name="6">
        <object
          :data="catalogue"
          width="100%"
          height="600px"
          style="padding-bottom:100px"
        >
          <p>
            Your web browser doesn't have a plugin.
          </p>
        </object>
      </el-tab-pane>
      <el-tab-pane label="Video" v-if="video" name="7">
        <iframe
          :src="video"
          title="description"
          width="100%"
          height="600px"
          style="padding-bottom:100px"
        ></iframe>
      </el-tab-pane>
      <el-tab-pane label="Link" v-if="link" name="8">
        <el-link type="primary" :href="link" target="_blank">{{
          link
        }}</el-link>
      </el-tab-pane>
      <el-tab-pane label="Phản hồi" name="9">
        <div class="blank-table">
          Không có dữ liệu
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ViewDoc from "./viewDoc.vue";
import { getToken } from "@/utils/auth";
export default {
  props: ["row", "typeView"],
  components: {
    ViewDoc
  },
  data() {
    return {
      linkImg: "",
      imgLst: [],
      toa: "",
      roi: "",
      slide: "",
      video: "",
      catalogue: "",
      link: "",
      productDes: ""
    };
  },
  methods: {
    fetchData() {
      if (this.row) {
        this.imgLst = [];
        this.toa = "";
        this.roi = "";
        this.video = "";
        this.catalogue = "";
        this.slide = "";
        this.link = "";
        this.productDes = "";
        const imgs = this.row.Image ? this.row.Image.split(";") : [];
        if (imgs.length > 0) {
          this.imgLst = imgs.map(
            i =>
              "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=" +
              i +
              "&Token=" +
              getToken() +
              "&TypeFile=0"
          );
        }
        this.toa = this.row.File
          ? "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=" +
            this.row.File +
            "&Token=" +
            getToken() +
            "&TypeFile=1"
          : "";
        this.roi = this.row.File2
          ? "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=" +
            this.row.File2 +
            "&Token=" +
            getToken() +
            "&TypeFile=1"
          : "";
        this.slide = this.row.Slide
          ? "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=" +
            this.row.Slide +
            "&Token=" +
            getToken() +
            "&TypeFile=1"
          : "";
        this.catalogue = this.row.Catalogue
          ? "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=" +
            this.row.Catalogue +
            "&Token=" +
            getToken() +
            "&TypeFile=1"
          : "";
        this.video = this.row.Video ? this.row.Video : "";
        this.link = this.row.Link ? this.row.Link : "";
        this.productDes = this.row.ProductDes ? this.row.ProductDes : "";
      }
    }
  },
  created() {
    this.fetchData();
  },
  watch: {
    row() {
      this.fetchData();
    }
  }
};
</script>

<style lang="scss" scoped>
.product-content {
  max-width: 210mm;
  margin: 0 auto;
  background-color: #fff;
  height: 100vh;
  overflow: auto;
  padding-bottom: 200px;
  //scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }

  word-break: break-word;
}
</style>
