<template>
  <modal id="new-request-modal" ref="new-request-modal"  v-cloak>
    <template slot="title">Giao - Nhận việc cho nhân viên</template>
    <div></div>
    <div slot="body">
      <el-form ref="form" label-position="top"  label-width="120px" size="mini">
       
                 <el-form-item hidden=true label="ID">
                  <el-input v-model="form.IDOrder" ></el-input>
                </el-form-item>
                <el-form-item label="Yêu cầu">
                  <el-input  v-model="Name" ></el-input>
                </el-form-item>
             
                 <el-form-item label="Loại việc">
                  <el-select  v-model="action" placeholder="Chọn việc">
                    <el-option
                      v-for="item in Action"
                      :key="item.IDAction"
                      :label="item.Name"
                      :value="item.IDAction">
                    </el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="Ghi chú">
                  <el-input v-model="form.Note" ></el-input>
                </el-form-item>
                  <div>

                <el-row>
                  <el-col :span="12">
                     <el-form-item  label="KPI cơ sở">
                        <el-input  :disabled="true" type="number" v-model="form.KPIBase" ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                     <el-form-item  label="Khối lượng">
                      <el-input   type="number" v-model="form.Rate" ></el-input>
                    </el-form-item>
                    </el-col>
                </el-row>
                    
                  </div>
                   <el-form-item  label="Nhân viên">
                  <el-select  v-model="value" placeholder="Chọn nhân viên">
                    <el-option
                      v-for="item in employee"
                      :key="item.idEmployee"
                      :label="item.nameEmployee"
                      :value="item.idEmployee">
                    </el-option>
                  </el-select>
                </el-form-item>
                 <el-form-item label="Chi tiết">
                  <el-input v-model="row.Content" ></el-input>
                </el-form-item>
                <el-form-item label="Thời hạn">
                  <el-input type="date" v-model="form.Deadline" ></el-input>
                </el-form-item>  
                <div style="text-align:center; color: red">
                  <template>Lỗi có thể gặp: {{form.Error}}</template>
                </div>
                <div style="text-align:center; color:red">
                  <template>KPI tối đa bị trừ = {{form.PenatyScore}} x {{form.LevelError}} x {{ form.Rate }} = {{ (form.LevelError)*(form.PenatyScore)*(form.Rate) }}</template>
                </div>
                   
                
              </el-form>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" icon="el-icon-success" @click="sendRequest" >Xác nhận</el-button>
    </div>
  </modal>
</template>
<script>
import { setOrder,getEmployee,getActionByID } from "@/api/order";
import Cookies from 'js-cookie'
export default {
    props: ['row', 'employee', 'Name', 'Action', 'groups'],
  data() {  
    return {
        tableData:[],
        selectedPlace:[],
         options: [{
        }],
         value: '',
         action:'',
         actionNote:'',
         admin: Cookies.get('admin'),
         form: {
           IDOrder:'',
           IDAction:0,
           Title: '',
           Content: '',
           IDEmployee: '',
           Note: '',
           KPIBase: '',
            Rate: '',
           Deadline: '',
           IDManager: '',
           Error: '',
           LevelError: '',
           PenatyScore: '',
           IDGroup: '',
         }
    }  
  },
  
  methods: {
    fetchActionByID() {
      //alert('ok');
         var req = {
        IDAction: this.action,
      };
      this.listLoading = true;
      getActionByID(req).then(response => {
        this.form.Note = response.Data[0].Note;
        if(response.Data[0].KPIcs != null)
          {
               this.form.KPIBase = response.Data[0].KPIcs;
          } 
          else{
            this.form.KPIBase = response.Data[0].KPI;
          }       
        this.form.Title = response.Data[0].Name;
        this.form.Error = response.Data[0].Error;
        this.form.LevelError = response.Data[0].LevelError;
        this.form.PenatyScore = response.Data[0].PenatyScore;
        //console.log(this.Action);
        this.listLoading = false; 
      });
    },

    closeModal() {
      VoerroModal.hide('new-request-modal');
    },
    sendRequest(){
      this.form.IDEmployee = this.value;
      this.form.IDOrder = this.$props.row.IDOrder;
       this.form.Content = this.$props.row.Content;
        this.form.IDAction = this.action;
        //this.form.Note = this.$props.row.Note;
         this.form.IDGroup = this.$props.groups;
        //this.form.Title = this.action;
      this.form.IDManager = Cookies.get('idEmployee');
   
      //console.log(this.form);
       setOrder(this.form).then(response => {
        if(response.ResCode == 0){
          this.$notify({
            title: 'Thành công',
            message: 'Giao - Nhận công việc thành công',
            type: 'success',
            position: 'top-left',
          });
          this.$emit('click-something',this.form);
          VoerroModal.hide('new-request-modal');
        //console.log(response);
        this.listLoading = false; 
        }
      });
    }
  },
  watch: {
    action: function(){
      this.fetchActionByID();
    }
  },
  created() {
      //this.fetchEmployee();
      //this.fetchAction();
  },
};
</script>

<style>
.el-input--mini .el-input__inner {
    height: 28px;
    line-height: 28px;
    width: 100%;
}

.el-select .el-input.is-focus .el-input__inner {
    border-color: #409EFF;
    width: 100%;
}
.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}

element.style {
    min-width: 217px;
    transform-origin: center top;
    z-index: 2006;
    display: none;
    max-width: 95%;
}
element.style {
    min-width: 324.25px;
    transform-origin: center top;
    z-index: 2014;
    max-width: 100%;
    position: fixed;
    top: 232px;
    left: -5px;
}

.modal-box {
    width: 700px;
}


</style>