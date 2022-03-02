<template>
  <div>
    <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      :rules="rules"
      label-width="120px"
    >
      <el-form-item label="Nhóm" prop="idGroup">
        <el-select v-model="form.idGroup" placeholder="Chọn nhóm" style="width:100%">
          <el-option
            v-for="item in groupLst"
            :key="item.idGroup"
            :label="item.idGroup"
            :value="item.idGroup"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="Tiêu đề">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

         <el-form-item label="Chọn tháng" prop="month">
         <el-date-picker
      v-model="form.month"
      type="month"
      placeholder="Chọn tháng">
    </el-date-picker>
      </el-form-item>

       <el-form-item label="Hình thức" prop="type">
        <el-select v-model="form.type" placeholder="Chọn hình thức" style="width:100%">
          <el-option
            v-for="item in TypeLst"
            :key="item.id"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
     
      <div></div>
      <el-form-item label="Thời gian" prop="date">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="12" :lg="8">
            <el-date-picker
              style="width:100%"
              type="date"
              placeholder="Chọn ngày"
              v-model="form.date"
              format="dd/MM/yyyy"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-time-picker
              style="width:100%"
              format="HH:mm"
              value-format="HH:mm"
              v-model="form.start"
              placeholder="Bắt đầu"
            ></el-time-picker>
          </el-col>
          <el-col :xs="24" :sm="12" :lg="8">
            <el-time-picker
              style="width:100%"
              format="HH:mm"
              value-format="HH:mm"
              v-model="form.end"
              placeholder="Kết thúc"
            ></el-time-picker>
          </el-col>
        </el-row>
      </el-form-item>
       <el-form-item label="Nội dung">
        <el-input  type="textarea"
  :rows="5" v-model="form.content"></el-input>
      </el-form-item>
      

       <el-form-item label="Sản phẩm">
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
                      <div class="idGroup">{{ item.ProductName }}</div>
                    </template>
                  </el-autocomplete>
                </el-form-item>

       <!-- <el-form-item label="Sản phẩm">
        <el-input v-model="form.product"></el-input>
      </el-form-item> -->
      
    
       <el-form-item label="Hỗ trợ kỹ thuật">
        <el-input v-model="form.help"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">{{row==null?'Thêm':'Sửa'}}</el-button>
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import { GetProductLst,createRole } from '@/api/roleplay';
import { updateMeetingGroup } from '@/api/meetingGroup';
export default {
  props:{
    row:Object
  },
  components:{

  },
  created() {
      this.initForm()
      console.log(this.row)
    GetGroupEmployee().then(res => {
      this.groupLst = res.Data;
      if(this.row){
        this.form.idGroup = this.row.IDGroup
      }
    });

     GetProductLst().then(res => {
      this.proLst = res.Data;
     
    });
    this.initValue();
  },
 
  methods:{
     querySearch2(queryString, cb) {
        var links = this.proLst;
        //console.log(links)
        var results = queryString ? links.filter(this.createFilter2(queryString)) : links;
        // call callback function to return suggestion objects
        cb(results);
      },
      handleIconClick2(ev) {
        //console.log(ev);
      },

       handleSelect2(item) {
        this.value = item.ProductName;
        //this.changeGroup();
        //this.IDService = item.IDService;
        //console.log(item);
      },
       createFilter2(queryString) {
        return (link) => {
          //console.log(link)
          link = JSON.parse(JSON.stringify(link))

          //console.log(link)
          return (link.ProductName.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },

      initForm(){
          this.form.title = this.row.Title
          this.form.month = this.row.Month
          this.form.content = this.row.Content
          this.form.date = this.row.Date
          this.form.start = this.row.TimeStart
          this.form.end = this.row.TimeEnd
          this.form.help = this.row.Help
          this.form.product = this.row.Product
          this.form.type = this.row.Type
          this.value= this.row.Product
          
      },
    
    
   modalOK(){

      this.form.product = this.value
        var OK = false
          //console.log(this.value)
          //console.log(this.proLst)
          var _this=this
      this.proLst.forEach(fun)

      function fun(item,index,arr){
         //console.log(this.value)
          if(item.ProductName == _this.value){
            //console.log(this.value)
            OK = true
          }
      }

      if(OK = true){
          this.form.RowID= this.row.RowID
       this.form.month=Date.parse(this.form.month).toString('yyyy-MM-dd')
       // this.form.title = this.form.number + " tháng " + Date.parse(this.form.month).toString('MM/yyyy')

       updateMeetingGroup(this.form).then(res => {
           if(res.ResCode == 0){
                this.$notify({
                    title: "Thành công",
                    message: "Cập nhật lịch thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok')
           }
       })
      }else{
          this.$notify({
                    title: "Lỗi",
                    message: "Bạn cần chọn sản phẩm trong danh sách",
                    position: 'top-left',
                     type: 'warning',

                })
      }

      

   },

      
    closeModal(){
      this.$emit('closeModal')
    },
    
  },
  watch: {
    
     row(){
         this.initForm()
     }
  },
  data() {
      var validateTime= (rule, value, callback) => {
    
         if (value == null||this.form.start==null||this.form.end==null) {
             
          callback(new Error('Hãy chọn đủ ngày'));
        }else if(this.form.start>=this.form.end){
            callback(new Error('Thời gian bắt đầu và kết thúc không hợp lệ'));
        } else {
          callback();
        }
      };
      var validateEmlst= (rule, value, callback) => {
    
         if (this.form.employees.length<=0) {
             
          callback(new Error('Hãy chọn nhân viên gặp'));
         }
         else {
          callback();
        }
      };
    return {
     value:'',
      placeModalVisible:false,
      groupLst: [],
      proLst:[],
      form: {
       title:"",
        idGroup: null,
        type: null,
        content: "",
        date:null,
        start: null,
        end: null,
        note: "",
        product: "",
        employees:[],
        type:'',
        help:"",
        number: "",
        month:"",
        RowID: 0
      },
       NumberLst: [
          {
            value: "Lần 1",
            id: 1
          },
          {
            value: "Lần 2",
            id:2
          },
          {
            value: "Lần 3",
            id: 3
          },
          {
            value: "Lần 4",
            id: 4
          },
        ],
         TypeLst: [
          {
            value: "Online",
            id: 1
          },
          {
            value: "Offline",
            id:2
          },
          {
            value: "Cả hai",
            id: 3
          },
        
        ],
      rules: {
       
       
     
      
        date: [
          {
            validator:validateTime,
          
            trigger: "change"
          }
        ],
       
        employees:[
          {
            required: true,
           
            validator: validateEmlst
          }
        ],
      }
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