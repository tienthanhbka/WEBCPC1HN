<template>
  <div>
    <el-upload
      class="upload-demo"
      action="https://icpc1hn.work/node/uploadfile"
      multiple
      :limit="1"
      accept="video/mp4"
      name="myFile"
      auto-upload="true"
      :on-success="uploadVideoOK1"
      :file-list="fileList"
    >
      <el-button size="small" type="primary">Upload video 1</el-button>
      <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
    </el-upload>

    <el-upload
      class="upload-demo"
      action="https://icpc1hn.work/node/uploadfile"
      multiple
      :limit="1"
      accept="video/mp4"
      name="myFile"
      auto-upload="true"
      :on-success="uploadVideoOK2"
      :file-list="fileList2"
    >
      <el-button size="small" type="primary">Upload video 2</el-button>
      <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
    </el-upload>

    <el-upload
      class="upload-demo"
      action="https://icpc1hn.work/api/File/UploadFileRole"
      :limit="1"
      accept="video/mp4"
      auto-upload="true"
      :on-success="uploadOk"
      :file-list="fileList3"
    >
      <el-button size="small" type="primary">Upload video 3</el-button>
      <!-- <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div> -->
    </el-upload>

    <!-- <el-upload
                  action="https://icpc1hn.work/api/File/UploadFileRole"
                  list-type="picture-card"
                  
                  accept="video/mp4"
                  :on-success="uploadOk"
                          ref="upload"
                    :auto-upload="true"
                          >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url" alt=""
                      >
                    </div>
                </el-upload> -->

    <!-- <form action="https://icpc1hn.work/uploadfile" enctype="multipart/form-data" method="POST"> 
        <input  type="file" name="myFile" />
        <input type="submit" value="Upload a file"/>

        

    </form> -->
    <!-- <form action="https://icpc1hn.work/uploadmultiple"  enctype="multipart/form-data" method="POST">
            Select images: <input type="file" name="myFiles" multiple>
            <input type="submit" value="Upload your files"/>
        </form> -->
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">Chọn</el-button>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import { google } from "googleapis";
const privatekey = require("../../../../privatekey");
import { UploadVideo } from "@/api/roleplay";
import { GetVideo } from "@/api/drive";
export default {
  props: ["row"],
  components: {},
  created() {
    this.fetchData();
    //console.log(google)
    // this.getList()
    // this.getFile('1B-wP5uPXiwxc5fH1-uIVUyiAr7MNIEsR')
  },

  methods: {
    uploadOk(res, file, fileList) {
      console.log(res);
    },
    fetchData() {
      let jwtClient = new google.auth.JWT(
        privatekey.client_email,
        null,
        privatekey.private_key,
        ["https://www.googleapis.com/auth/drive"]
      );
      //authenticate request
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          console.log(err);
          return;
        } else {
          console.log("Successfully connected!");
        }
      });

      this.gg = jwtClient;
    },
    getFile(fileId) {
      const drive = google.drive({
        version: "v3",
        auth: this.gg
      });
      drive.files.get({ fileId: fileId, fields: "*" }, (err, res) => {
        if (err) return console.log(err);
        //console.log(res.data)
        this.form.link = res.data.webViewLink;
      });
    },

    getFile2(fileId) {
      const drive = google.drive({
        version: "v3",
        auth: this.gg
      });
      drive.files.get({ fileId: fileId, fields: "*" }, (err, res) => {
        if (err) return console.log(err);
        //console.log(res.data)
        this.form.link2 = res.data.webViewLink;
      });
    },
    uploadVideoOK1(res, file, fileList) {
      this.getFile(res.id);
      //this.image.push(res.Data.fileName)
      //  GetVideo(res.id).then( function(res,a,b){
      //     console.log(res)
      //   //  console.log(a)
      //   //   console.log(b)

      //  })

      // var a = GetVideo(res.id)
      // console.log(a)
    },
    uploadVideoOK2(res, file, fileList2) {
      //this.image.push(res.Data.fileName)
      this.getFile2(res.id);
      //  GetVideo(res.id).then(response=>{
      //      this.form.link2 = response.link
      //  })
    },
    //    submitUpload() {
    //     this.$refs.upload.submit();
    //   },

    //   fetchData(){
    //   },
    modalOK() {
      this.form.RowID = this.$props.row.RowID;
      console.log(UploadVideo(this.form));
      UploadVideo(this.form).then(res => {
        if (res.ResCode == 0) {
          this.$notify({
            title: "Thành công",
            message: "Nộp video thành công",
            position: "top-left",
            type: "success"
          });
          this.$emit("click", "ok");
        }
      });
    }
  },
  watch: {},
  data() {
    return {
      fileList: [],
      fileList2: [],
      myFiles: [],
      myFile: "",
      file: "",
      gg: "",
      form: {
        link: "",
        link2: ""
      },
      placeModalVisible: false,
      teacherLst: [],
      proLst: []
    };
  }
};
</script>

<style scoped>
input {
  border: 2px solid gray;
  color: gray;
  background-color: white;
  padding: 8px 20px;
  border-radius: 8px;
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
