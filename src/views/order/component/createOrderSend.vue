<template>
  <modal id="new-order-send-modal" ref="new-order-send-modal"  v-cloak>
    <template slot="title">Tạo yêu cầu</template>
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top" label-width="120px" size="mini"> 
                <!-- <el-form-item label="Bộ phận">
                  <el-select v-model="value" placeholder="Chọn nhóm" @change="changeGroup">
                    <el-option
                      v-for="item in options"
                      :key="item.IDGroup"
                      :label="item.IDGroup"
                      :value="item.IDGroup">
                    </el-option>
                  </el-select>
                </el-form-item> -->
               
                <el-form-item label="Bộ phận">
                  <!-- <el-input v-model="form.name" ></el-input> -->
                  <el-autocomplete 
                    popper-class="my-autocomplete"
                    v-model="value"
                    :fetch-suggestions="querySearch2"
                    placeholder="Gõ gợi ý và chọn"
                    @select="handleSelect2">
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix"
                      @click="handleIconClick2">
                    </i>
                    <template  slot-scope="{ item }">
                      <div class="idGroup">{{ item.IDGroup }}</div>
                    </template>
                  </el-autocomplete>
                </el-form-item>
                  <el-form-item label="Thời hạn">
                  <el-input type="date" v-model="form.deadline" ></el-input>
                </el-form-item>
                <el-form-item label="Loại">
                  <!-- <el-input v-model="form.name" ></el-input> -->
                  <el-autocomplete 
                    popper-class="my-autocomplete"
                    v-model="state"
                    :fetch-suggestions="querySearch"
                    placeholder="Please input"
                    @select="handleSelect">
                    <i
                      class="el-icon-edit el-input__icon"
                      slot="suffix"
                      @click="handleIconClick">
                    </i>
                    <template  slot-scope="{ item }">
                      <div class="Service">{{ item.Service }}</div>
                      <span class="Note">{{ item.Note }}</span>
                    </template>
                  </el-autocomplete>
                </el-form-item>
                
                 <el-form-item label="Tên yêu cầu">
                  <el-input 
                  
                  v-model="form.content" ></el-input>
                </el-form-item>
               
               
                 <el-form-item label="Mô tả chi tiết">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                   v-model="form.note" ></el-input>
                </el-form-item>
                 <el-form-item label="Sản phẩm">
                  <el-input v-model="form.product" ></el-input>
                </el-form-item>
                
                <el-form-item size="large">
                  
                </el-form-item>
                  
              </el-form>
              <el-upload
              style="margin-left: 40px;"
          class="upload-demo"
          action="https://icpc1hn.work/api/Order/createOrderSend"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :data="form"
           ref="upload"
            :auto-upload="false"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">Chọn tệp đính kèm</el-button>
          <div slot="tip" class="el-upload__tip"> chọn file jpg, png, jpeg, xls, xlsx,doc,docx, zip</div>
          
        </el-upload>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createOrder" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOffice,createOrderSend,getService,getServiceOffice } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'groups'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
        fileList: [],
        optionsService: [{
        }],
         value: '',
         form: {
           name: '',
           content: '',
           sendToOffice: '',
           note: '',
           deadline: '',
           product: '',
           idEmployee: '',
           idGroup: '',
           IDService: '',
           token: Cookies.get('token')
         },
         links: [],
          links2: [],
        state: '',
        IDService: '',
    }  
  },
  
  methods: {
    handleRemove(file, fileList) {
        //console.log(file, fileList);
      },
      handlePreview(file) {
        this.fileList.push(file);
       // console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`The limit is 1, you selected ${files.length} files this time, add up to ${files.length + fileList.length} totally`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`Cancel the transfert of ${ file.name } ?`);
      },
     querySearch(queryString, cb) {
        var links = this.optionsService;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
          //console.log(link)
          return (link.Service.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [this.optionsService];
      },
      handleSelect(item) {
        this.state = item.Service;
        this.IDService = item.IDService;
        //console.log(item);
      },


       querySearch2(queryString, cb) {
        var links = this.options;
        //console.log(links)
        var results = queryString ? links.filter(this.createFilter2(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      createFilter2(queryString) {
        return (link) => {
          //console.log(link)
          link = JSON.parse(JSON.stringify(link))

          //console.log(link)
          return (link.IDGroup.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll2() {
        return [this.options];
      },
      handleSelect2(item) {
        this.value = item.IDGroup;
        this.changeGroup();
        //this.IDService = item.IDService;
        //console.log(item);
      },


      handleIconClick(ev) {
        //console.log(ev);
      },
       handleIconClick2(ev) {
        //console.log(ev);
      },
    fetchOffice() {
      this.listLoading = true;
      getServiceOffice().then(response => {
        this.options = response.Data;
        //console.log(this.options);
        this.listLoading = false; 
      });
    },
    changeGroup(){
       var rep = {
         idGroup: this.value,
         IDGroup: this.$props.groups
       }
       //console.log(rep);
      this.listLoading = true;
      getService(rep).then(response => {
        this.optionsService = response.Data;
        //console.log(this.optionsService);
        this.listLoading = false; 
      });
      //loadAll();
    },
     
    closeModal() {
      VoerroModal.hide('new-order-send-modal');
    },
    createOrder(){
      
       if(this.IDService == ''){
          this.$notify({
          title: 'Lỗi',
          message: 'Bạn phải chưa chọn loại yêu cầu',
          type: 'warning',
          position: 'top-left'
        });
      }
      else {
           this.form.sendToOffice = this.value;
      this.form.name = this.state;
      this.form.IDService = this.IDService;
       this.form.idGroup = this.$props.groups;
     
          var boxes = document.getElementsByClassName("el-upload-list__item-name").length;
        
        if(boxes > 0){
           this.$refs.upload.submit();
          this.$notify({
          title: 'Thành công',
          message: 'Tạo yêu cầu thành công',
          type: 'success',
          position: 'top-left'
        });
        this.$emit('click-something', this.form)
         VoerroModal.hide('new-order-send-modal');
        }
        else{
           createOrderSend(this.form).then(response => {
        if(response.ResCode == 0){
         this.$notify({
          title: 'Thành công',
          message: 'Tạo yêu cầu thành công',
          type: 'success',
          position: 'top-left'
        });
        this.$emit('click-something', this.form)
         VoerroModal.hide('new-order-send-modal');
        this.listLoading = false; 
        }
      });
        }
      
      }
   
    }
  },
  created() {
      this.fetchOffice();
      this.changeGroup();
  },
   mounted() {
      this.links = this.optionsService;
      this.link2 = this.options;
    }
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

<style>

 .my-autocomplete{
   width: 500px;
 }

 .el-autocomplete {
    position: relative;
    display: inline-block;
    width: 100%;
}

.el-autocomplete-suggestion__list {
    margin: 0;
    padding: 0;
    width: auto;
}

.el-autocomplete-suggestion li {
    padding: 0 20px;
    margin: 0;
    line-height: 34px;
    cursor: pointer;
    color: #606266;
    font-size: 14px;
    list-style: none;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
}
 

  
</style>


