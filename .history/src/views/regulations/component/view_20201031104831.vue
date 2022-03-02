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
          <span style="font-weight: bold;">Hiệu lực:</span>
          {{ this.lines.TimeEnd }}
        </div>

        <div style=" font-size: 15px; margin-top: 10px; color: #777777;">
          <span style="font-weight: bold;">Đối tượng áp dụng:</span>
          {{ this.lines.Office.replace(/;;/g, ",") }}
        </div>

        <!-- <el-input placeholder="Nhập tiêu đề"  v-model="title"></el-input> -->
      </el-card>
    </div>
    <div :key="acc">
      <div v-for="(line, index) in files" :key="index" class="row">
        <div>
          <el-card>
            <div
              style="width: 100%; height: 100%;"
              class="grid-content bg-purple-light"
            >
              <!-- <embed style="width: 100%; height: 1000px;" :src="'https://icpc1hn.work/api/'+'File/GetFileRegu/'+line+'?token='+token" /> -->
              <div class="download-file">
                <el-button
                  @click="DownloadFile(line)"
                  type="primary"
                  size="mini"
                  >Tải về</el-button
                >
              </div>
              <object
                :data="
                  'https://icpc1hn.work/api/' +
                    'File/GetFileRegu2/' +
                    line +
                    '?token=' +
                    token
                "
                type="application/pdf"
                width="100%"
                height="1000px"
              >
                <p>
                  Your web browser doesn't have a PDF plugin. Instead you can
                  <a
                    :href="
                      'https://icpc1hn.work/api/' +
                        'File/GetFileRegu2/' +
                        line +
                        '?token=' +
                        token
                    "
                    >click here to download the PDF file.</a
                  >
                </p>
              </object>
              <!-- <div>  {{ line }}</div> -->
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getReguById } from "@/api/regu";

export default {
  name: "",
  components: {},
  props: [""],

  data() {
    return {
      lines: [],
      id: 0,
      files: [],
      videos: [],
      info: "",
      LinkFile: "",
      MaxKPI: 0,
      ReportValueID: 0,
      acc: 0,
      token: Cookies.get("token"),
      select1: [],
      fileList: [],
      dialogImageUrl: "",
      dialogFormMail: false,
      disabled: false
    };
  },
  watch: {
    $route: "fetchDataRe"
  },
  methods: {
    fetchDataRe() {
      //this.coin = list_coins[this.$route.params.id]
      var req = {
        RowID: this.$route.params.id
      };
      getReguById(req).then(response => {
        if (response.ResCode == 0) {
          this.lines = response.Data[0];

          if (this.lines.File != "") {
            this.files = this.lines.File.split(";;", 100);
            // a.forEach(fun)
            //  function fun(item2, index, arr){
            //     var b = { ans : "" }
            //     b.ans = item2
            //     item.ans.push(b)
            // }
          }

          if (this.lines.Video != "") {
            this.videos = this.lines.Video.split(";;", 100);
            // a.forEach(fun)
            //  function fun(item2, index, arr){
            //     var b = { ans : "" }
            //     b.ans = item2
            //     item.ans.push(b)
            // }
          }

          //console.log(this.videos)
        }
      });
    },
    DownloadFile(line) {
      let linkUrl =
        "https://icpc1hn.work/api/File/GetFileRegu2/" +
        line +
        "?token=" +
        this.token;
      window.open(linkUrl);
    }
  },
  mounted() {
    //this.addLine()
  },
  created() {
    this.fetchDataRe();
  }
};
</script>
<style>
.el-dialog__title {
  line-height: 30px;
  font-size: 18px;
  color: #303133;
  font-weight: bold;
}
.download-file {
  float: right;
  padding: 5px;
}
@media only screen and (max-width: 600px) {
  .el-dialog {
    -webkit-transform: none;
    transform: none;
    left: 0;
    position: relative;
    margin: 0 auto;
    width: 100%;
  }
}
</style>
