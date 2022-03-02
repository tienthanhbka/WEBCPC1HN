<template>
  <modal id="edit-order-send-modal" ref="edit-order-send-modal"  v-cloak>
    <template slot="title">Chỉnh sửa yêu cầu</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                 <el-form-item label="Thời hạn">
                  <el-input type="date" v-model="row.Deadline" ></el-input>
                </el-form-item>
                <el-form-item label="Loại">
                  <!-- <el-input v-model="form.name" ></el-input> -->
                  <el-autocomplete 
                   
                    popper-class="my-autocomplete"
                    v-model="row.Name"
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
                
                 <el-form-item label="Công việc">
                  <el-input type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}" 
                  v-model="row.Content" ></el-input>
                </el-form-item>
                <el-form-item label="Sản phẩm">
                  <el-input v-model="row.Product" ></el-input>
                </el-form-item>
               
                 <el-form-item label="Chi tiết">
                  <el-input v-model="row.Note" ></el-input>
                </el-form-item>
                
                <el-form-item size="large">
                  
                </el-form-item>
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="editOrder" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOffice,editOrderSend,getService,getServiceOffice } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'groups'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
        optionsService: [{
        }],
         value: Cookies.get('idGroup'),
         form: {
             ID: '',
           name: '',
           content: '',
           sendToOffice: '',
           note: '',
           deadline: '',
           product: '',
           idEmployee: '',
           idGroup: '',
           IDService: '',
         },
         links: [],
        state: '',
        IDService: '',
    }  
  },
  
  methods: {
     querySearch(queryString, cb) {
        var links = this.optionsService;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      createFilter(queryString) {
        return (link) => {
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
      handleIconClick(ev) {
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
      // console.log(rep);
      this.listLoading = true;
      getService(rep).then(response => {
        this.optionsService = response.Data;
        //console.log(this.optionsService);
        this.listLoading = false; 
      });
      //loadAll();
    },
     
    closeModal() {
      VoerroModal.hide('edit-order-send-modal');
    },
    editOrder(){
      //this.form.sendToOffice = this.$props.row.ID;
        editOrderSend(this.$props.row).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
        //console.log(response.ResCode);
         this.$notify({
          title: 'Thành công',
          message: 'Chỉnh sửa yêu cầu thành công',
          type: 'success',
          position: 'top-left'
        });
        this.$emit('click-something', this.form)
         VoerroModal.hide('edit-order-send-modal');
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
      this.fetchOffice();
      this.changeGroup();
  },
   mounted() {
      this.links = this.optionsService;
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
 

  
</style>


