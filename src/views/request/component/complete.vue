<template>
  <modal id="complete-modal" ref="complete-modal"  v-cloak>
    <template slot="title">Báo cáo công việc: {{row.Title}} </template>
    <div></div>
    <div slot="body">
     
      <el-form ref="form"  label-width="120px" size="mini"> 
                <el-form-item label="Ghi chú">
                  <el-input v-model="value" > </el-input>
                </el-form-item>
                <!-- <el-form-item size="large">
                </el-form-item> -->
              </el-form>

               <div>
      
     <el-upload
              style="margin-left: 40px;"
          class="upload-demo"
          action="https://icpc1hn.work/api/Request/UpdateRequest"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :data="form"
           ref="upload"
            :auto-upload="false"
          multiple
          :limit="2"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">Chọn tệp đính kèm</el-button>
          <div slot="tip" class="el-upload__tip"> chọn file jpg, png, jpeg, xls, xlsx,doc,docx, zip</div>
          
        </el-upload>
    </div>
    </div>
    
    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
       <el-button style="margin-right:150px;"  type="danger" icon="el-icon-success" @click="cancel" >Từ chối</el-button>

      <el-button type="warning" icon="el-icon-success" @click="processing" >Đang xử lý</el-button>
     
      <el-button type="success" icon="el-icon-success" @click="complete" >Đã xong</el-button>
    </div>
  </modal>
</template>
<script>
import { complete } from "@/api/getRequest";
import Cookies from 'js-cookie'
export default {
    props: ['row'],
  data() {  
    return {
        tableData:[],
         fileList: [],
        selectedPlace:[],
         options: [{
        }],
         value: '',
         form: {
           RowID: '',
           Status: '',
           Note: '',
           token: Cookies.get('token')
         }
    }  
  },
  
  methods: {

     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      },
    // fetchOffice() {
    //   this.listLoading = true;
    //   getOffice().then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false; 
    //   });
    // },
    closeModal() {
      VoerroModal.hide('complete-modal');
    },
    complete(){
        //var rep = {
            this.form.RowID= this.$props.row.RowID;
            this.form.Status= 6;
            this.form.Note= this.value;
            //token: Cookies.get('token'),
        //}

         var boxes = document.getElementsByClassName("el-upload-list__item-name").length;
        if(boxes > 0){
           this.$refs.upload.submit();
            VoerroModal.hide('complete-modal');
        this.$emit('click-something',this.$props.row)
        this.listLoading = false; 
        
        }
        else{
          //console.log('ok');
           complete(this.form).then(response => {
      if(response.ResCode == 0){
         
        VoerroModal.hide('complete-modal');
        this.$emit('click-something',this.$props.row)
        this.listLoading = false; 
        }
      });
        }

    },
    processing(){
        var rep = {
            RowID: this.$props.row.RowID,
            Status: 3,
            token: Cookies.get('token'),
        }
       complete(rep).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
          //this.$emit
          this.$notify({
            title: 'Thành công',
            message: 'Nhận việc thành công',
            type: 'success',
            position: 'top-left',
          })
        VoerroModal.hide('complete-modal');
        //console.log(response.ResCode);
        
        this.listLoading = false; 
        }
      });
    },
    cancel(){
        var rep = {
            RowID: this.$props.row.RowID,
            Status: 0,
            token: Cookies.get('token'),
        }
       complete(rep).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
          //this.$emit
          this.$notify({
            title: 'Thành công',
            message: 'Từ chối thành công',
            type: 'success',
            position: 'top-left',
          })
        VoerroModal.hide('complete-modal');
        //console.log(response.ResCode);
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
     // this.fetchOffice();
      
      //console.log(this.$props.row);
  },
  // watch: {
  //   employee:function(){
      
  //     GetPlaceByIdEmployee({idEmployee:this.employee.idEmployee}).then(res=>{
  //         console.log(res);
  //         this.tableData = res.Data;
  //     })
  //   }
  // },
};
</script>