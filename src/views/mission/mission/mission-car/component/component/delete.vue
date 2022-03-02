<template>
  <modal id="delete-CarPlan" ref="delete-CarPlan"  v-cloak>
    <template slot="title">Xóa lịch trình</template>
  
    <div slot="body">
      <el-form ref="form"  label-width="120px" size="mini"> 
                <div> <template>Xe: {{ row.IDCar }} Từ: {{ row.PlaceStart }} Đi: {{ row.PlaceEnd}} </template> </div>
                 <div> <template>Ghi chú: {{ row.Note }}  </template> </div>
                 <!-- <el-form-item label="Ghi chú ">
                  <el-input :disabled="true" v-model="row.Note" ></el-input>
                </el-form-item> -->

              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="deletePlan" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { DeleteCarPlan } from "@/api/mission";
import Cookies from 'js-cookie'
export default {
    props: ['row'],
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
    
  
    closeModal() {
      VoerroModal.hide('delete-CarPlan');
    },
    deletePlan(){
     
       DeleteCarPlan(this.$props.row).then(response => {
        if(response.ResCode == 0){
      
         this.$notify({
          title: 'Thành công',
          message: 'Xóa lịch trình thành công',
          type: 'success',
          position: 'top-left',
        });
        this.$emit('click-something', 'ok');
         VoerroModal.hide('delete-CarPlan');
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


