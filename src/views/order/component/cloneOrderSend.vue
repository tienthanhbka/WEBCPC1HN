<template>
  <modal id="clone-order-send-modal" ref="clone-order-send-modal"  v-cloak>
    <template slot="title">Thêm bộ phận thực hiện</template>
    <div></div>
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                <el-form-item label="Bộ phận">
                  <el-select v-model="form.sendToOffice" placeholder="Select" >
                    <el-option
                      v-for="item in options"
                      :key="item.IDGroup"
                      :label="item.IDGroup"
                      :value="item.IDGroup">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Thời hạn">
                  <el-input type="date" v-model="form.deadline" ></el-input>
                </el-form-item>
                 <el-form-item label="Ghi chú">
                  <el-input v-model="form.note" ></el-input>
                </el-form-item>
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="createOrder" >Thêm</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getOfficeService,createOrderSend,getService } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row','options'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
        //  options: [{
        // }],
          optionsService: [{
        }],
         value: '',
         form: {
           sendToOffice: '',
           note: '',
           deadline: '',
           clone: '',
           idEmployee: Cookies.get('idEmployee'),
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
          return (link.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [this.optionsService];
      },
      handleSelect(item) {
        this.$props.row.Name = item.Service;
        this.IDService = item.IDService;
        console.log(item);
      },
      handleIconClick(ev) {
        console.log(ev);
      },
   
    closeModal() {
      VoerroModal.hide('clone-order-send-modal');
    },
  
    createOrder(){
      this.form.clone = this.$props.row.ID;
      console.log(this.form);
       createOrderSend(this.form).then(response => {
        if(response.ResCode == 0){
          //this.options = response.Data;
           this.$notify({
          title: 'Thành công',
          message: 'Sao chép yêu cầu thành công',
          type: 'success',
          position: 'top-left'
        });
        VoerroModal.hide('clone-order-send-modal');
        //console.log(response.ResCode);
        this.listLoading = false; 
        }
      });
    }
  },
  created() {
      //this.fetchOffice();
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
<style>

</style>
