<template>
  <modal id="new-define-modal" ref="new-define-modal"  v-cloak>
    <template slot="title">Tạo mới nhóm việc (dịch vụ)</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                <!-- <el-form-item label="Bộ phận">
                  <el-select v-model="value" placeholder="Select" @change="changeGroup">
                    <el-option
                      v-for="item in options"
                      :key="item.idGroup"
                      :label="item.idGroup"
                      :value="item.idGroup">
                    </el-option>
                  </el-select>
                </el-form-item> -->
                 <el-form-item label="Bộ phận">
                  <el-input :disabled="true" v-model="groups" ></el-input>
                </el-form-item>
                 <el-form-item label="Nhóm việc">
                  <el-input v-model="form.Service" ></el-input>
                </el-form-item>
                
                <el-form-item label="Chỉ tiêu KPI">
                  <el-input type="number" v-model="form.KPI" ></el-input>
                </el-form-item>
                <!-- <div>
                    <div class="inline-block" style="width: 300px; float: left">
                <el-form-item label="Mã nhóm việc">
                  <el-input disabled="true" v-model="serviceCode" ></el-input>        
                </el-form-item>
                </div>
                  <div class="inline-block" style="width: 250px; float: left">
                <el-form-item >
                   <el-input v-model="form.ServiceCode" ></el-input>
                </el-form-item>
               
                </div>
                </div>
              
                 <div style="clear: both;"></div> -->
               

                 <el-form-item label="Ghi chú">
                  <el-input v-model="form.Note" ></el-input>
                </el-form-item>

                 <el-form-item label="Phân loại">
                  <el-radio v-model="radio" label="1">Dịch vụ</el-radio>
                  <el-radio v-model="radio" label="0">Nội bộ</el-radio>
                </el-form-item>
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createService" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOffice,createOrderSend,getService, createServiceDefine } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['id','options', 'groups', 'serviceCode'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
        //  options: [{
        // }],
        optionsService: [{
        }],
         value: Cookies.get('idGroup'),
         form: {
           KPI: '',
           Service: '',
           Note: '',
           IDGroup: '',
           IDEmployee: Cookies.get('idEmployee'),
           public: '',
         },
         radio: '1',
        
    }  
  },
  
  methods: {
    
    // fetchOffice(){
    //   this.listLoading = true;
    //   getOffice().then(response => {
    //     this.options = response.Data;
    //     console.log(this.options);
    //     this.listLoading = false; 
    //   });
    // },
     
    closeModal() {
      VoerroModal.hide('new-define-modal');
    },
    createService(){
       this.form.IDGroup = this.$props.groups;
       this.form.public = this.radio;
      // this.form.ServiceCode = this.$props.serviceCode + this.form.ServiceCode;
      //console.log(this.form);
       createServiceDefine(this.form).then(response => {
         console.log(response);
        if(response.ResCode == 0){
         // this.$emit('click-something',this.form)
         this.$notify({
          title: 'Thành công',
          message: 'Tạo dịch vụ thành công',
          type: 'success',
          position: 'top-left',
        });
        this.$emit('click-something', this.form);
         VoerroModal.hide('new-define-modal');
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
      //this.fetchOffice();
  },
   mounted() {
      //this.links = this.optionsService();
    },
  // watch: {
  //   radio:function(){
  //     alert(this.radio)
  //   }
  // },
};
</script>

<style>

 .my-autocomplete{
   width: 500px;
 }
  
</style>


