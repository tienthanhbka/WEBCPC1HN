<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
     <el-form-item label="Link drive video">
        <el-input v-model="form.link"></el-input>
      </el-form-item>
       <el-form-item label="Link drive video 2">
        <el-input v-model="form.link2"></el-input>
      </el-form-item>

      <!-- <input id="files" type="file" name="files[]" multiple/> -->

     
    
    
    </el-form>

     <label>File
        <input type="file" id="files" ref="file" v-on:change="handleFileUpload()"/>
      </label>
        <button v-on:click="submitFile()">Submit</button>
    <!-- <el-button type="info" @click="closeModal">Hủy</el-button> -->
    <el-button type="success" @click="modalOK">Chọn</el-button>
    <el-button type="success" @click="modalOK2">Chọn2</el-button>
  </div>
</template>
<script>
import Cookies from 'js-cookie'
import { google } from 'googleapis';

//import privatekey from "../../../../privatekey"
 const privatekey = require("../../../../privatekey")
import { UploadVideo } from '@/api/roleplay';
export default {
  props:['row'],
  components:{

  },
  created() {
    this.fetchData()
    //console.log(google)
    this.getList()
    this.getFile('1YUZmcMpyQikSFOXFj6UTdjW0bY2yAzOp')
   
  },

  methods:{
    handleFileUpload(){
    this.file = this.$refs.file.files[0];
  },
  submitFile(){
    
    const axios = require('axios');
        /*
                Initialize the form data
            */
            let formData = new FormData();

            /*
                Add the form data we need to submit
            */
            formData.append('file', this.file);

        /*
          Make the request to the POST /single-file URL
        */
            axios.post( 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
                formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
              }
            ).then(function(){
          console.log('SUCCESS!!');
        })
        .catch(function(){
          console.log('FAILURE!!');
        });
      },
      fetchData(){
        
          let jwtClient = new google.auth.JWT(
       privatekey.client_email,
       null,
       privatekey.private_key,
       ['https://www.googleapis.com/auth/drive']);
        //authenticate request
        jwtClient.authorize(function (err, tokens) {
        if (err) {
        console.log(err);
        return;
        } else {
        console.log("Successfully connected!");
        console.log(tokens)
        }
      
        });

        this.gg = jwtClient
         const drive = google.drive({
        version: 'v3',
        auth: this.gg
        });
        console.log(drive)
      },
      modalOK2(){
         var Upload = function (file) {
              this.file = file;
          };
          
          Upload.prototype.getType = function() {
              localStorage.setItem("type",this.file.type);
              return this.file.type;
          };
          Upload.prototype.getSize = function() {
              localStorage.setItem("size",this.file.size);
              return this.file.size;
          };
          Upload.prototype.getName = function() {
              return this.file.name;
          };

           Upload.prototype.doUpload = function () {
        var that = this;
        var formData = new FormData();
    
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
    
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', that.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };

          var file = $("#files")[0].files[0];
          var upload = new Upload(file);
      
          // maby check size or type here with upload.getSize() and upload.getType()
      
          // execute upload
          upload.doUpload();

      },
    modalOK(){
        //this.fetchData()
         const fs = require('fs');
        // console.log(fs)
        // var fsp = fs.promises;
       const drive = google.drive({
        version: 'v3',
        auth: this.gg
        });

  //        drive.permissions.create({
  //   fields: document.getElementById("files").files[0],
  //   transferOwnership: 'true',
  //   resource: {
  //     role: 'owner',
  //     type: 'user',
  //     // Add your own email address:
  //     emailAddress: 'dn.quy1996@gmail.com'
  //   }
  // });

        var fileMetadata = {
        name: 'photo.vue',
        parents: '1KE9H8xELCyehL43FDkOoqsnQ6tnQI0Cv'
        //  role: 'owner',
        //   type: 'user',
        //   // Add your own email address:
        //   emailAddress: 'dn.quy1996@gmail.com'
          };
      var media = {
        mimeType: 'text/plain',
        body:  'helo abc'
        //fs.createReadStream('@/assets/logo.png')
      };
      drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
      }, function (err, file) {
        if (err) {
          // Handle error
          console.error(err);
        } else {
          console.log('File Id: ', file.id);
        }
      });



        //      let formData = new FormData();

        //     /*
        //         Add the form data we need to submit
        //     */
        //     formData.append('file', this.file);
        //         const drive = google.drive({
        // version: 'v3',
        // auth: this.gg
        // });
        // console.log('ok')
        // async function main() {
        // // const res = await drive.files.create({
        // //     requestBody: {
        // //     name: 'testimage.png'
           
        // //     },
        // //     media: {
        // //     mimeType: 'image/png',
        // //     body: document.getElementById("files").files[0]
        // //     }
        // // });



        // const res = await drive.files.create({
        //     requestBody: {
        //         name: 'Test.vue',
              
        //     },
        //     media: {
        //         mimeType: 'text/plain',
        //         body: formData
        //     }
        //     });

      
        // console.log('ok2')
        // console.log(res.data);
        // }
        // main().catch(console.error);
       
    },
    getList(){
        let drive = google.drive('v3');
        drive.files.list({
        auth: this.gg,
        //q: "name contains 'TV'"
        }, function (err, response) {
        if (err) {
            console.log('The API returned an error: ' + err);
            return;
        }
        var files = response.data.files;
        console.log(response)
        if (files.length == 0) {
            console.log('No files found.');
        } else {
            console.log('Files from Google Drive:');
            var _this = this
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                console.log('%s (%s)', file.name, file.id);
            }
            
        }
        });
    },
    getFile(fileId){
          const drive = google.drive({
        version: 'v3',
        auth: this.gg
        });
        drive.files.get({fileId:fileId,fields: '*'},(err,res)=>{
            if(err) return console.log(err);
            console.log(res.data)
        })
    }
  },
  watch: {
     
  },
  data() {
    return {
      file:'',
        gg:'',
     form:{
         link:"",
          link2:""
     },
      placeModalVisible:false,
      teacherLst: [],
      proLst:[],
     
     
    };
  }
};
</script>

<style>
@media only screen and ( max-width: 600px) {
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