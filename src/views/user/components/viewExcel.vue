<template>
    <div>
        <el-table v-loading="listLoading"
         :data="listEm"
          element-loading-text="Loading"
         border
        highlight-current-row>
       
            <el-table-column label="Trạng thái"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                   <el-tag
                    :type="scope.row.Status | inforStatusColor">
                    {{ scope.row.Status | inforStatusText}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Mã nhân viên"  min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.EmployeeCode }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Họ tên"  min-width="100" v-if='this.report!=10'>
                <template slot-scope="scope">
                    <span>{{ scope.row.EmployeeName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Chi nhánh"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Branch }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Họ tên bố/mẹ"  min-width="100" v-if='this.report==10'>
                <template slot-scope="scope">
                    <span>{{ scope.row.EmployeeName }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Phòng ban" align="right" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.Office }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Địa bàn"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Place }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Chức danh" align="center" min-width="100" v-if='this.report!=8'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Position }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Ngày sinh"  min-width="100" v-if='this.report==1||this.report==9||this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.BirthDay }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Nơi sinh"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.BirthAddress }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Giới tính"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Sex }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Dân tộc"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Folk }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Tôn giáo"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Religion }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Địa chỉ"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Address }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Hộ khẩu thường trú"  min-width="100" v-if='this.report==1||this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.AddressOften }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Địa chỉ hiện tại"  min-width="100"  v-if='this.report==1||this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.AddressNow }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số điện thoại"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Phone }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số CMND/CCCD"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.CMND }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày cấp"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.DateCMND }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Nơi cấp"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.PlaceCMND }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Email"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Email }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Tình trạng hôn nhân"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Matrimony }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Tình trạng sức khỏe"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Health }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Chuyên ngành đào tạo"  min-width="100" v-if='this.report==1||this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Specialized }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Trình độ chuyên môn" align="center" min-width="100" v-if='this.report==1||this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Degree }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Năng khiếu"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Gifted }}</span>
                </template>
            </el-table-column>
            <el-table-column label="MST"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.MST }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Email công ty"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.EmailCompany }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Trạng thái làm việc"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.StatusWork }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Lần cập nhật gần nhất"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.Time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Người duyệt"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.ManageName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Thời gian duyệt"  min-width="100" v-if='this.report==11'>
                <template slot-scope="scope">
                    <span>{{ scope.row.TimeAccept }}</span>
                </template>
            </el-table-column>
            
               
            <el-table-column label="Ngày vào công ty" align="center" min-width="100" v-if='this.report==1||this.report==2||this.report==4||this.report==3||this.report==11'>
                <template slot-scope="scope">
                    <span v-if="scope.row.Time != null">{{ DateStartWork }}</span>
                </template>
            </el-table-column>
              <el-table-column label="Loại hợp đồng" align="center" min-width="200" v-if='this.report==1||this.report==11'>
                <template slot-scope="scope">
                    <span >{{ scope.row.WorkProcess  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ghi chú" align="center" min-width="200" v-if='this.report==2||this.report==3||this.report==11'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Note  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày nghỉ" align="center" min-width="200" v-if='this.report==3'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEndWork }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số ngày làm việc" align="center" min-width="200" v-if='this.report==4'>
                <template slot-scope="scope">
                    <span >{{ scope.row.NumberWork  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Mã số BHXH" align="center" min-width="200" v-if='this.report==5||this.report==11||this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.BHXH  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Thời gian đóng" align="center" min-width="200" v-if='this.report==5'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Mức đóng" align="center" min-width="200" v-if='this.report==5'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Money  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="HĐ thử việc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Type1  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số hợp đồng" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.CodeWork1  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày bắt đầu" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart1  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEnd1  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Link HĐ thử việc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RowID12  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="HĐ 6 tháng" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Type2  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số hợp đồng" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.CodeWork2  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày bắt đầu" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart2  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEnd2  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Link HĐ" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RowID21  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="HĐ 1 năm" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Type3  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số hợp đồng" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.CodeWork3 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày bắt đầu" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart3  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEnd3 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Link HĐ" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RowID31 }}</span>
                </template>
            </el-table-column>
           <el-table-column label="HĐ 3 năm" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Type4 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số hợp đồng" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.CodeWork4  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày bắt đầu" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart4  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEnd4 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Link HĐ thử việc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RowID41 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="HĐ không giới hạn" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Type5 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số hợp đồng" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.CodeWork5  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày bắt đầu" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart5  }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEnd5}}</span>
                </template>
            </el-table-column>
            <el-table-column label="Link HĐ thử việc" align="center" min-width="200" v-if='this.report==6'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RowID51 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Khối ngành" align="center" min-width="200" v-if='this.report==7'>
                <template slot-scope="scope">
                    <span >{{ scope.row.SpecializedFather }}</span>
                </template>
            </el-table-column>
            <el-table-column label="trình độ học vấn" align="center" min-width="200" v-if='this.report==7'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Degree }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Nơi đào tạo" align="center" min-width="200" v-if='this.report==7||this.report==11'>
                <template slot-scope="scope">
                    <span >{{ scope.row.TrainingPlaces }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Thời gian đào tạo" align="center" min-width="200" v-if='this.report==7||this.report==11'>
                <template slot-scope="scope">
                    <span >{{ scope.row.TrainingTime }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Xếp loại bằng cấp" align="center" min-width="200" v-if='this.report==7'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DegreeLevel }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Nhân viên" align="center" min-width="200" v-if='this.report==8'>
                <template slot-scope="scope">
                    <span >{{ scope.row.EmployeeName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Loại quyết định" align="center" min-width="200" v-if='this.report==8'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DecisionName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Số quyết định" align="center" min-width="200" v-if='this.report==8'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DecisionNumber }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày quyết định" align="center" min-width="200" v-if='this.report==8'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Date }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày có hiệu lực" align="center" min-width="200" v-if='this.report==8'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Nội dung" align="center" min-width="200" v-if='this.report==8'>
                <template slot-scope="scope">
                    <span >{{ scope.row.Content }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Họ tên con" align="center" min-width="200" v-if='this.report==10'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RelativeName }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Giới tính" align="center" min-width="200" v-if='this.report==10'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RelativeSex }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày sinh" align="center" min-width="200" v-if='this.report==10'>
                <template slot-scope="scope">
                    <span >{{ scope.row.RelativeBirth }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày bắt đầu" align="center" min-width="200" v-if='this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateStart }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Ngày kết thúc" align="center" min-width="200" v-if='this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.DateEnd }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Chi phí doanh nghiệp" align="center" min-width="200" v-if='this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.BH2 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Kinh phí công đoàn" align="center" min-width="200" v-if='this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.BH3 }}</span>
                </template>
                </el-table-column>
            <el-table-column label="NLĐ đóng" align="center" min-width="200" v-if='this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.BH4 }}</span>
                </template>
            </el-table-column>
            <el-table-column label="Chi phí BH dự kiến" align="center" min-width="200" v-if='this.report==12'>
                <template slot-scope="scope">
                    <span >{{ scope.row.BH5 }}</span>
                </template>
            </el-table-column>
            
        </el-table>

          <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
      ></el-pagination>
    </div>
</template>
<script>
import { GetListEmployee,GetListEmployee2,GetListChildren,GetListDecision,GetListEmployeeWorkProcess,GetListEmployeeWorkProcess2,GetListEmployeeBHXH,GetListEmployeeBirthDayByMonth,GetListEmployeeDateEndByMonth,GetListEmployeeDateStartByMonth,GetEmployeeRecord_HR } from '@/api/employeeInfor'
import Cookies from 'js-cookie'
export default {
    props:['report'],
    filters: {
        parseNumberDate: function (value) {

            // if(value !=null){

            //     var startDate = new Date(value);
            //     // Do your operations
            //     var endDate   = new Date();
            //     var seconds = (endDate.getTime() - startDate.getTime()) / 86400000;
            //     return parseInt(seconds);
            // }
            // else{
            //     return 'Chưa cập nhật'
            // }

              if(value !=null){

                        var startDate = new Date(value);
                        // Do your operations
                        var endDate   = new Date();
                        var seconds = (endDate.getTime() - startDate.getTime()) / 86400000;
                        var year = parseInt(seconds/365)
                        var month = parseInt((seconds-year*365)/30)
                        var date = parseInt(seconds-year*365-month*30)
                        return year + '-năm ' + month + '-tháng ' + date +'-ngày';
                    }
                    else{
                        return 'Chưa cập nhật'
                    }
        }
        },
    data(){
        return{
             displayMonth: false,
            month:'',
            litsReport:[{
                label: 'DS nhân sự',
                value:1
            },
            {
                label: 'BC nhân sự tăng',
                value:2
            },
            {
                label: 'BC nhân sự giảm',
                value:3
            },
            {
                label: 'Thâm niên công tác',
                value:4
            },
            {
                label: 'DS bảo hiểm',
                value:5
            },
            {
                label: 'DS loại HĐLĐ',
                value:6
            },
             {
                label: 'Tổng hợp trình độ chuyên môn',
                value:7
            },
             {
                label: 'DS Quyết định NS',
                value:8
            },
             {
                label: 'DS sinh nhật tháng',
                value:9
            },
             {
                label: 'DS con nhân viên',
                value:10
            },
            {
                label: 'DS thông tin tổng hợp',
                value:11
            },
             {
                label: 'DS chi phí BHXH tháng',
                value:12
            },],
            report:1,
             total: 0,
            currentPage: 1,
            listRecord:[],
            pageSize: 10,
            listEm:[],
            search:'',
            Value:'',
            EmployeeID:'',
            user:[],
            listLoading: false,
            dialogFormAccept: false,
            dialogFormNoAccept: false,
            dialogFormRecordHR: false,
            dialogFormCreateUser: false,
            dialogFormViewExcel: false

        }
    },
    methods:{
      recordHR(row){
        this.EmployeeID = row.EmployeeID
            this.getLstRecord(row.EmployeeID)
          this.dialogFormRecordHR=true
      },
      recordOK(){
         this.dialogFormRecordHR=false
      },
      getLstRecord(id){
        GetEmployeeRecord_HR({EmployeeID: id}).then(res=>{
          this.listRecord = res.Data[0].Name.split(';;')
          console.log(res.Data[0].Name)
        })
      },
      noacceptOK(){
        this.dialogFormNoAccept=false
      },
      cancelInfo(){
        this.dialogFormAccept= false
        this.dialogFormNoAccept=true
      },
         viewExcel(){
        this.dialogFormViewExcel = true
        this.Value = this.report
      },
      createUser(){
        this.dialogFormCreateUser = true;
      },
      createUserOK(){
        this.dialogFormCreateUser = false;
      },
        fetchData(){
          console.log(this.report)
              switch(this.report){
                
                    case 1:
                      this.Export1()
                      break
                    case 2:
                      this.Export2()
                      break
                      case 3:
                      this.Export3()
                      break
                       case 4:
                      this.Export4()
                      break
                       case 5:
                      this.Export5()
                      break
                       case 6:
                      this.Export6()
                      break
                       case 7:
                      this.Export7()
                      break
                       case 8:
                      this.Export8()
                      break
                       case 9:
                      this.Export9()
                      break

                       case 10:
                      this.Export10()
                      break

                        case 11:
                      this.Export11()
                      break

                       case 12:
                      this.Export12()
                      break
              }
            },

            Export1(){
            
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Ngày sinh','Hộ khẩu thường trú','Địa chỉ hiện tại','Chuyên ngành đào tạo','Trình độ chuyên môn','Ngày vào công ty','Loại hợp đồng' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','BirthDay','AddressOften','AddressNow','Specialized','Degree','DateStartWork','WorkProcess']
              GetListEmployee2({search: this.search,
                                pageSize: 100000,
                                page: 1}).then(response => {
                  this.listEm = response.Data
                });
            },
             Export2(){
                 var n = Date.parse(this.month).toString('MM-yyyy')
                 this.month = Date.parse(this.month).toString('yyyy-MM-dd')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Ngày vào công ty','Ghi chú' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','DateStartWork','Note']
              GetListEmployeeDateStartByMonth({month: this.month,
                               }).then(response => {
                  this.listEm = response.Data
                });
            },

            Export3(){
                 var n = Date.parse(this.month).toString('MM-yyyy')
                  this.month = Date.parse(this.month).toString('yyyy-MM-dd')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Ngày vào công ty','Ngày nghỉ','Ghi chú' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','DateStartWork','DateEndWork','Note']
              GetListEmployeeDateEndByMonth({month: this.month}).then(response => {
                  this.listEm = response.Data
                 
                });
            },
            Export4(){
                 //var n = Date.parse(this.month).toString('MM-yyyy')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Ngày vào','Số ngày làm việc' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','DateStartWork','NumberWork']
              GetListEmployee2({search: this.search,
                                pageSize: 100000,
                                page: 1}).then(response => {
                  this.listEm = response.Data
                });
            },
            Export5(){
                 //var n = Date.parse(this.month).toString('MM-yyyy')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Mã số BHXH','Thời gian đóng','Mức đóng' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','BHXH','DateStart','Money']
              GetListEmployeeBHXH().then(response => {
                  this.listEm = response.Data
                });
            },
            Export6(){
                // var n = Date.parse(this.month).toString('MM-yyyy')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','HĐ thử việc','Số hợp đồng','Ngày bắt đầu','Ngày kết thúc','Link HĐ thử việc','HĐ 6 tháng','Số hợp đồng','Ngày bắt đầu','Ngày kết thúc','Link HĐ','HĐ 1 năm','Số hợp đồng','Ngày bắt đầu','Ngày kết thúc','Link HĐ','HĐ 3 năm','Số hợp đồng','Ngày bắt đầu','Ngày kết thúc','Link HĐ','HĐ không thời hạn','Số hợp đồng','Ngày bắt đầu','Ngày kết thúc','Link HĐ' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','Type1','CodeWork1','DateStart1','DateEnd1','RowID12','Type2','CodeWork2','DateStart2','DateEnd2','RowID21','Type3','CodeWork3','DateStart3','DateEnd3','RowID31','Type4','CodeWork4','DateStart4','DateEnd4','RowID41','Type5','CodeWork5','DateStart5','DateEnd5','RowID51']
              GetListEmployeeWorkProcess().then(response => {
                  this.listEm = response.Data
                });
            },
            Export7(){
                // var n = Date.parse(this.month).toString('MM-yyyy')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Khối ngành','Trình độ học vấn','Chuyên ngành','Nơi đào tạo','Thời gian đào tạo', 'Xếp loại bằng cấp' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','SpecializedFather','Degree','Specialized','TrainingPlaces','TranningTime','DegreeLevel']
              GetListEmployee2({search: this.search,
                                pageSize: 100000,
                                page: 1}).then(response => {
                  this.listEm = response.Data
                });
            },
            Export8(){
                 var n = Date.parse(this.month).toString('MM-yyyy')
                   this.month = Date.parse(this.month).toString('yyyy-MM-dd')
            const tHeader = ['Nhân viên','Loại quyết định','Số quyết định','Ngày quyết định','Ngày có hiệu lực','Nội dung' ]
              const filterHeader = ['EmployeeName','DecisionName','DecisionNumber','Date','DateStart','Content']
              GetListDecision({month: this.month,
                               }).then(response => {
                  this.listEm = response.Data
                });
            },
            Export9(){
                 var n = Date.parse(this.month).toString('MM-yyyy')
                   this.month = Date.parse(this.month).toString('yyyy-MM-dd')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Ngày sinh' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','BirthDay']
              GetListEmployeeBirthDayByMonth({month: this.month,
                               }).then(response => {
                  this.listEm = response.Data
                });
            },
            Export10(){
                // var n = Date.parse(this.month).toString('MM-yyyy')
            const tHeader = ['Mã NV','Họ tên bố/mẹ','Phòng ban','Chức danh','Họ tên con','Giới tính','Ngày sinh' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','RelativeName','RelativeSex','RelativeBirth']
              GetListChildren().then(response => {
                  this.listEm = response.Data
                });
            },
            Export11(){
            const tHeader = ['Trạng thái','Mã NV','Họ tên','Chi nhánh','Phòng ban','Địa bàn','Chức danh','Ngày sinh','Nơi sinh','Giới tính','Dân tộc','Tôn giáo','Địa chỉ','Hộ khẩu thường trú','Địa chỉ hiện tại','Số điện thoại','Số CMND/CCCD','Ngày cấp','Nơi cấp','Email','Tình trạng hôn nhân','Tình trạng sức khỏe','Chuyên ngành đào tạo','Trình độ chuyên môn','Thời gian đào tạo','Nơi đào tạo','Năng khiếu','Ngày vào công ty','Loại hợp đồng','MST','BHXH','Email công ty','Trạng thái làm việc','Lần cập nhật gần nhất','Người duyệt','Thời gian duyệt','Ghi chú' ]
              const filterHeader = ['Status','EmployeeCode','EmployeeName','Branch','Office','Place','Position','BirthDay','BirthAddress','Sex','Folk','Religion','Address','AddressOften','AddressNow','Phone','CMND','DateCMND','PlaceCMND','Email','Matrimony','Health','Specialized','Degree','TranningTime','TrainingPlaces','Gifted','DateStartWork','WorkProcess','MST','BHXH','EmailCompany','StatusWork','Time','ManagerName','TimeAccept','Note']
              GetListEmployee({search: this.search,
                                pageSize: 100000,
                                page: 1}).then(response => {
                  this.listEm = response.Data
                });
            },
            Export12(){
                // var n = Date.parse(this.month).toString('MM-yyyy')
                 var n = Date.parse(this.month).toString('MM-yyyy')
                   this.month = Date.parse(this.month).toString('yyyy-MM-dd')
            const tHeader = ['Mã NV','Họ tên','Phòng ban','Chức danh','Mã số BHXH','Mức đóng','Ngày bắt đầu','Ngày kết thúc','Chi phí doanh nghiệp', 'Kinh phí công đoàn','NLĐ đóng','Chi phí BH dự kiến' ]
              const filterHeader = ['EmployeeCode','EmployeeName','Office','Position','BHXH','BH1','DateStart','DateEnd','BH2','BH3','BH4','BH5']
              GetListEmployeeWorkProcess2({month: this.month}).then(response => {
                  this.listEm = response.Data
                });
            },
            formatJson(filterVal, jsonData) {
              return jsonData.map(v => filterVal.map(j => {
                 if(j==='Status'){
                  return this.$options.filters.inforStatusText(v[j])
                } else  if(j==='RowID12' && v[j] !=null){

                   return 'https://icpc1hn.work/#/chi-tiet-hop-dong-thu-viec/' +v[j]
                } 
                else  if((j==='RowID21' || j==='RowID31' || j==='RowID41' || j==='RowID51') && v[j] !=null ){
                 
                   return 'https://icpc1hn.work/#/chi-tiet-hop-dong/' +v[j]
                } 
                 else  if(j==='BH2'){
                  var a= v[j].replace(",", "")
                  return parseInt(a)*215
                } 
                 else  if(j==='BH3'){
                   var a= v[j].replace(",", "")
                  return parseInt(a)*20
                } 
                 else  if(j==='BH4'){
                   var a= v[j].replace(",", "")
                   
                  return parseInt(a)*105
                } 
                 else  if(j==='BH5'){
                   var a= v[j].replace(",", "")
                  return parseInt(a)*320
                } 
                //    else  if(j==='NumberWork'){
                //       if(v[j] !=null){

                //         var startDate = new Date(v[j]);
                //         // Do your operations
                //         var endDate   = new Date();
                //         var seconds = (endDate.getTime() - startDate.getTime()) / 86400000;
                //         return parseInt(seconds);
                //     }
                //     else{
                //         return 'Chưa cập nhật'
                //     }
                 
                // } 

                 else  if(j==='NumberWork'){
                      if(v[j] !=null){

                        var startDate = new Date(v[j]);
                        // Do your operations
                        var endDate   = new Date();
                        var seconds = (endDate.getTime() - startDate.getTime()) / 86400000;
                        var year = parseInt(seconds/365)
                        var month = parseInt((seconds-year*365)/30)
                        var date = seconds-year*365-month*30
                        return year + '-năm ' + month + '-tháng ' + date +'-ngày';
                    }
                    else{
                        return 'Chưa cập nhật'
                    }
                 
                } 

                 else  if(j==='DateStartWork'){
                      if(v[j] !=null){

                        var startDate = new Date(v[j]);
                     
                        return Date.parse(startDate).toString('dd/MM/yyyy');
                    }
                    else{
                        return 'Chưa cập nhật'
                    }
                 
                } 
                else  if(j==='DateEndWork'){
                      if(v[j] !=null){

                        var startDate = new Date(v[j]);
                     
                        return Date.parse(startDate).toString('dd/MM/yyyy');
                    }
                    else{
                        return 'Chưa cập nhật'
                    }
                 
                } 
                else  if(j==='BirthDay'){
                      if(v[j] !=null){

                        var startDate = new Date(v[j]);
                     
                        return Date.parse(startDate).toString('dd/MM/yyyy');
                    }
                    else{
                        return 'Chưa cập nhật'
                    }
                 
                } 
                 else {
                  return v[j] 
                }
              }))
            },

        acceptInfor(row){
            this.user=[]
            this.user.push(row)
            //console.log(this.user)
            this.dialogFormAccept=true
        },
        acceptOK(){
             this.dialogFormAccept=false
             this.fetchData();
        },
        Search(){
          Cookies.set('search', this.search)
          Cookies.set('page', this.currentPage)
          Cookies.set('pageSize', this.pageSize)
            this.fetchData()
        },
        fetchData(){
            this.listLoading= true
            GetListEmployee({search: this.search,
                                pageSize: this.pageSize,
                                page: this.currentPage}).then(res=>{
                this.listEm = res.Data

                   this.currentPage= res.PageNumber;
            this.pageSize = res.RowspPage
            this.total = (res.TotalPage)*(res.RowspPage)
                this.listLoading=false
            })
        },
        updateHC(){

        }
    },
    created(){
      if(Cookies.get('search')){
        this.search= Cookies.get('search')
      }

      if(Cookies.get('page')){
        this.currentPage= Cookies.get('page')
      }

      if(Cookies.get('pageSize')){
        this.pageSize= Cookies.get('pageSize')
      }
        this.fetchData()
    },
    watch:{
         pageSize: function() {
      this.fetchData();
    },
    currentPage: function() {
      this.fetchData();
    },
    report: function() {
      if(this.report == 2 || this.report ==3 || this.report == 9 || this.report == 8 || this.report == 12){
          this.displayMonth=true
      }else{
          this.displayMonth = false
      }
    },
    }
}
</script>
<style >

</style>