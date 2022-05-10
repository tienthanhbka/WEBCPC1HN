<template>
  <div
    shadow="always"
    style="margin: auto; position: relative; padding-bottom: 100px;"
  >
    <div>
      <el-card>
        <div style="font-weight: bold; font-size: 30px; color: #777777;">
          Hướng dẫn: {{ this.lines.Content }}
        </div>

        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Đối tượng áp dụng:</span>
          <span v-if="this.lines.Office">{{
            this.lines.Office.replace(/;;/g, ",")
          }}</span>
        </div>
      </el-card>
    </div>
    <el-card>
      <div
        style="width: 100%; height: 100%;"
        class="grid-content bg-purple-light"
      >
        <div class="download-file">
          <el-button
            @click="DownloadFile()"
            type="primary"
            size="mini"
            icon="el-icon-download"
            >Tải về</el-button
          >
        </div>
        <iframe
          v-if="typeMode == 4 || typeMode == 6"
          :src="fileName"
          title="description"
          width="100%"
          height="800px"
        ></iframe>
        <object
          v-if="typeMode != 4 && fileName"
          :data="
            'https://icpc1hn.work/Web_API/File/DownloadDocumentFile?&FileName=' +
              this.fileName +
              '&Token=' +
              this.token +
              '&TypeFile=1'
          "
          width="100%"
          height="800px"
        >
          <p>
            Your web browser doesn't have a plugin.
          </p>
        </object>
      </div>
    </el-card>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { GetDocumentInfo } from "@/api/document";

export default {
  data() {
    return {
      lines: [],
      id: 0,
      files: [],
      acc: 0,
      fileName: "",
      typeMode: "",
      token: Cookies.get("token"),
      userName: Cookies.get("idEmployee")
    };
  },
  watch: {
    $route: "fetchData"
  },
  methods: {
    fetchData() {
      this.typeMode = this.$route.params.type;
      var req = {
        DocumentID: this.$route.params.id
      };
      GetDocumentInfo(req).then(response => {
        if (response.RespCode == 0) {
          this.lines = response.DocumentInfo;
          if (this.typeMode == 1) {
            this.fileName = response.DocumentInfo.File;
          } else if (this.typeMode == 2) {
            this.fileName = response.DocumentInfo.File2;
          } else if (this.typeMode == 3) {
            this.fileName = response.DocumentInfo.Slide;
          } else if (this.typeMode == 4) {
            this.fileName = response.DocumentInfo.Video;
          } else if (this.typeMode == 5) {
            this.fileName = response.DocumentInfo.Catalogue;
          } else if (this.typeMode == 6) {
            this.fileName = response.DocumentInfo.LinkSway;
          }
        }
      });
    },
    DownloadFile(line) {
      let linkUrl =
        "https://icpc1hn.work/Web_API/File/DownloadDocumentFile?" +
        "&FileName=" +
        this.fileName +
        "&Token=" +
        this.token +
        "&TypeFile=0";
      window.open(linkUrl);
    }
  },
  mounted() {},
  created() {
    this.fetchData();
  }
};
</script>
<style></style>
