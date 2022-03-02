<template>
  <div>
    <el-dialog
      title="Khách hàng"
      :visible.sync="placeModalVisible"
      custom-class="modal-class"
      append-to-body
    >
      <place-modal @placeChoosed="onPlaceChoosed"></place-modal>
    </el-dialog>
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
      <el-form-item label="Loại kế hoạch" prop="type">
        <el-select v-model="form.type" placeholder="Chọn loại" style="width:100%">
          <el-option v-for="item in typeLst" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Nơi gặp" prop="idPlace">
        <el-input
          placeholder="Chưa chọn khách hàng"
          @click="openPlaceModal"
          disabled
          v-model="form.namePlace"
          class="input-with-select"
        >
          <el-button slot="append" @click="openPlaceModal">
            <i class="fas fa-hospital-alt"></i>
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="Nội dung gặp" prop="content">
        <el-input
          class="inline-input"
          style="width:100%"
          v-model="form.content"
          placeholder="Nội dung gặp"
        ></el-input>
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
      <el-form-item label="Nhân viên gặp" prop="employees">
        <el-select
          v-model="form.employees"
          multiple
          placeholder="Chọn nhân viên"
          style="width:100%"
        >
          <el-option
            v-for="item in emLst"
            :key="item.idEmployee"
            :label="item.nameEmployee"
            :value="item.idEmployee"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Ghi chú">
        <el-input v-model="form.note"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">{{meetingHeader==null?'Thêm':'Sửa'}}</el-button>
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import {AddMeeting,GetMeetingLineOfHeader,EditMeeting} from '@/api/mission';
import PlaceModal from './place-modal'
export default {
  props:{
    meetingHeader:Object
  },
  components:{
    PlaceModal
  },
  created() {
    GetGroupEmployee().then(res => {
      this.groupLst = res.Data;
      if(this.meetingHeader){
        this.form.idGroup = this.meetingHeader.IdGroup
      }
    });
    this.initValue();
  },

  methods:{
    initValue(){
      if(this.meetingHeader){
        this.form.idGroup = null;
        this.form.idGroup = this.meetingHeader.IdGroup
      this.form.type = this.meetingHeader.Type;
      this.form.idPlace = this.meetingHeader.IdPlace;
      this.form.namePlace = this.meetingHeader.namePlace;
      this.form.content = this.meetingHeader.Content;
      this.form.date = Date.parse(this.meetingHeader.TimeStart).toString('yyyy-MM-dd');
      this.form.start = Date.parse(this.meetingHeader.TimeStart).toString('HH:mm');
      this.form.end = Date.parse(this.meetingHeader.TimeEnd).toString('HH:mm');
      this.form.note = this.meetingHeader.Note
    }
    },
    modalOK(){
      this.$refs['form'].validate((valid)=>{
        if(valid){
          if(this.meetingHeader==null){
        AddMeeting(this.form).then(res=>{
        this.$emit('meetingAdded',res.Data)
        this.closeModal()
      })
      }else{
        this.form.id = this.meetingHeader.RowID
        EditMeeting(this.form).then(res=>{
        this.$emit('meetingAdded',res.Data)
        this.closeModal()
      })
        }
        
      }
      
      
    })
      
      
    },
    closeModal(){
      this.$emit('closeModal')
    },
    onPlaceChoosed(p){
      this.form.idPlace = p.idPlace;
      this.form.namePlace = p.namePlace;
      this.placeModalVisible = false
    },
    openPlaceModal(){
      this.placeModalVisible = true;
      console.log('a');
      
    }
  },
  watch: {
      'form.idGroup':function(){
          this.emLst =[];
          this.form.employees = [];
          GetAllEmployeesByIdGroup({
              idGroup:this.form.idGroup
          }).then(res=>{
              this.emLst = res.Data
              var sef = this;
              this.form.employees=[];
              if(this.form.idGroup==this.meetingHeader.IdGroup){
                if(this.meetingHeader.line){
                  this.meetingHeader.line.forEach(e=>{
                  sef.form.employees.push(e.IdEmployee);
                });
                this.$refs['form'].validate()
                }else{
                  GetMeetingLineOfHeader({
                id:sef.meetingHeader.RowID
              }).then(res2=>{
                this.meetingHeader.line = res2.Data;
                res2.Data.forEach(e=>{
                  sef.form.employees.push(e.IdEmployee);
                });
                this.$refs['form'].validate()
              })
                }
                
              }
              
          })
      },
      meetingHeader(){
        this.initValue();
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
      typeLst:[{id:'HOP',name:'Họp'},{id:'TRAINING',name:'Coaching'}],
      placeModalVisible:false,
      groupLst: [],
      emLst:[],
      form: {
        namePlace:null,
        idPlace:null,
        idGroup: null,
        type: null,
        content: "",
        date:null,
        start: null,
        end: null,
        note: "",
        employees:[]
      },
      rules: {
        idGroup: [
          {
            required: true,
            message: "Hãy chọn nhóm",
            trigger: "change"
          }
        ],
        idPlace:[
          {
            required: true,
            message: "Hãy chọn nơi gặp",
            trigger: "change"
          }
        ],
        content:[
            {
            required: true,
            message: "Hãy nhập nội dung",
            trigger: "change"
          }
        ],
        type: [
          {
            required: true,
            message: "Hãy nhập loại nhiệm vụ",
            trigger: "change"
          }
        ],
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