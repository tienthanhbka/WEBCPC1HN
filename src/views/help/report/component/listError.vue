<template>

    <div class="orderhcm-content">
     
        <el-table 
         :data="dataTable"
         id="tbldata"
          element-loading-text="Loading"
         border
        highlight-current-row>
         <el-table-column align="center" width="75px" label="STT">
          <template slot-scope="scope">{{ (scope.$index + 1)}}</template>
        </el-table-column>
             <el-table-column label="Ảnh" align="center" min-width="100">
                <template slot-scope="scope">

                    <div class="demo-image__preview">
                        <el-image 
                            style="width: 100px; height: 100px"
                            :src="'https://icpc1hn.work/api/'+'ImgReport/'+scope.row.filePath+'?token='+token"
                            :preview-src-list="srcList">
                        </el-image>
                    </div>

                   
                     <!-- <el-image :src="'https://icpc1hn.work/api/'+'ImgReport/'+scope.row.filePath+'?token='+token"></el-image> -->
                </template>
            </el-table-column>
          <!-- <el-table-column label="SĐT" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.idEmployee }}</span>
                </template>
            </el-table-column> -->
             <el-table-column label="Tiêu đề" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.title }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Mô tả chi tiết" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.description }}</span>
                </template>
            </el-table-column>
             <el-table-column label="Thời gian" align="center" min-width="100">
                <template slot-scope="scope">
                    <span>{{ scope.row.time }}</span>
                </template>
            </el-table-column>
        <!-- <div v-for="(content, a) in contents" :key="a">
               
             <el-table-column :label="content" align="center" min-width="100">
                <template slot-scope="scope">
                     <div v-for="(ans, index) in scope.row.Answer" :key="index">
                    <span v-if="index == a">{{ ans }}</span>
                    </div>
                </template>
            </el-table-column>
            </div> -->
        </el-table>
          <div style="position:fixed; bottom: 100px;right: 40px;z-index: 1000"><el-button type="primary"  @click="tabletoExcel('tbldata','test')" ><i class="fas fa-file-excel"></i> Xuất Excel</el-button> </div>
        <!-- <el-button @click="tabletoExcel('tbldata','test')">excel</el-button> -->

     <!-- <div :class="{'hidden':hidden}" class="pagination-container">
    <el-pagination
        class="pagination"
        background
        layout="total,-> , prev, pager, next, sizes"
        :total="total"
      
      ></el-pagination>
  </div> -->
    </div>
</template>

<script>
import Cookies from 'js-cookie'
import { GetReportLst } from '@/api/help'

export default {
    data() {
        return {
             lines: [],
             contents:[],
             dataTable: [],
             question: 'câu hỏi',
             token: Cookies.get('token'),
            
        }
    },
    methods:{
         fetchResponse(){
      //this.coin = list_coins[this.$route.params.id]
     var req = {
         token: Cookies.get('token')
     }
     GetReportLst(req).then(response =>{
         if(response.ResCode == 0){
             this.lines = response.Data;
            // this.lines.answer = [];
           // this.contents = response.Data
            this.dataTable = response.Data
             console.log(this.lines)
         }
     })
    },

//     tabletoExcel(table, name) {
//     var uri = 'data:application/vnd.ms-excel;base64,'
//           , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--><meta http-equiv="content-type" content="text/plain; charset=UTF-8"/></head><body><table>{table}</table></body></html>'
//           , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))); }
//           , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }); };
//         if (!table.nodeType) table = document.getElementById(table);
//         var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML };
//         window.location.href = uri + base64(format(template, ctx));

// }
    },
    created(){
      //this.fetchData();
      this.fetchResponse();
  },
   watch: {
       '$route': 'fetchResponse'
    },
}
</script>