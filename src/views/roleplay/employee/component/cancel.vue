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
   <div>{{ row.Title }} - {{ row.NameEmployee }}</div>
   
      <el-form-item label="Ghi chú">
        <el-input v-model="form.note"></el-input>
      </el-form-item>
    </el-form>
    <el-button type="info" @click="closeModal">Hủy</el-button>
    <el-button type="success" @click="modalOK">Xác nhận</el-button>
  </div>
</template>
<script>
import { GetGroupEmployee,GetAllEmployeesByIdGroup } from "@/api/groups";
import { CancelRole } from '@/api/roleplay';
export default {
  props:['row'],
  components:{

  },
  created() {
    GetGroupEmployee().then(res => {
      this.groupLst = res.Data;
      if(this.meetingHeader){
        this.form.idGroup = this.meetingHeader.IdGroup
      }
    });

     GetProductLst().then(res => {
      this.proLst = res.Data;
     
    });
    this.initValue();
  },

  methods:{

    
   modalOK(){
      this.form.idStudent = this.$props.row.EmployeeStudentID
       this.form.idTeacher = this.$props.row.EmployeeTeacherID
       this.form.RowID = this.$props.row.RowID
       CancelRole(this.form).then(res => {
           if(res.ResCode == 0){
                this.$notify({
                    title: "Thành công",
                    message: "Hủy lịch thành công",
                    position: 'top-left',
                     type: 'success',

                })
                this.$emit('click','ok')
           }
       })
   },
    closeModal(){
      this.$emit('closeModal')
    },
    
  },
  watch: {
    
     
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
      proLst:[],
        value: '',
      form: {
        note: "",
        idStudent: "",
        idTeacher:"",
        RowID:0,
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