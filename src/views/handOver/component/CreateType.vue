<template>
    <div>
        <el-form
      ref="form"
      label-position="top"
      size="small"
      :model="form"
      label-width="120px"
    >
      <el-form-item label="Loại bàn giao" prop="NameType">.
          <el-input v-model="form.NameType"></el-input>
      </el-form-item>

       <el-form-item label="Bàn giao" prop="NameSub">
        <el-input v-model="form.NameSub"></el-input>
      </el-form-item>
       <el-form-item label="Mô tả" prop="Description">
        <el-input v-model="form.Description"></el-input>
      </el-form-item>

       <el-form-item label="Ghi chú" prop="Note">
        <el-input v-model="form.Note"></el-input>
      </el-form-item>
      
    </el-form>
  
    <el-button type="success" @click="modalOK">Xác nhận</el-button>
    </div>
</template>
<script>
import { CreateEmployeeStatusWork,GetEmployeeInforByID } from '@/api/employeeInfor'

export default {
    props:['groupList'],
    data(){
        return{
            AddressLabel: 'Địa chỉ',
         
            form:{
                Type: 'Đang làm việc',
                DateStart:''
                ,DateEnd:'',
                EmployeeID:'',
                Reason:''
            },
            TypeLst:[{
              value: 'Công cụ, dụng cụ làm việc'
            },{
              value: 'Tài liệu (bản cứng, bản mềm)'
            },{
              value:'Công việc đang xử lý'
            },{
              value:'Tài chính cá nhân'
            },{
              value:'Công nợ'
            },{
              value:'Nhà phân phối'
            },{
              value:'Khách hàng'
            }]
           
        
        }
    },
    methods:{
      
        modalOK(){
          
           this.form.EmployeeID = this.$route.params.id
            CreateEmployeeStatusWork(this.form).then(res=>{
                this.$notify({
                    title:'Thành công',
                    message: 'Cập nhật thông tin thành công',
                    type:'success',
                    position:'top-left'
                })
                this.$emit('addOK',this.form)
                this.initForm()
                
            })
        },
        initForm(){
          //this.form.DateStart = null
          this.form.DateEnd = null
          //this.form.Type = null
          this.form.EmployeeID = null
        }

    },
    created(){
        //this.getOffice()
        this.initForm()
        GetEmployeeInforByID({EmployeeID : this.$route.params.id}).then(res => {
          this.form.DateStart = res.Data[0].DateStartWork
        })

        
    }

}
</script>