<template>
    <div>
    <div >
      <el-input v-model="search"></el-input>
      <el-table size="mini" border ref="placeTableModal"  highlight-current-row  :data="currentTableData" @current-change='rowchange'>
          
        <el-table-column  label="Tên tổ chức" width="360">
        <template slot-scope="scope">
          {{scope.row.namePlace}}
        </template>
      </el-table-column>
      <el-table-column  label="Tỉnh/TP" width="200">
        <template slot-scope="scope">
          {{scope.row.addrLv3}}
        </template>
      </el-table-column>
      <el-table-column  label="Quận huyện" width="200">
        <template slot-scope="scope">
          {{scope.row.addrLv2}}
        </template>
      </el-table-column>
      <el-table-column  label="Khoa/Phòng" width="200">
        <template slot-scope="scope">
          {{scope.row.addrLv1}}
        </template>
      </el-table-column>
      <el-table-column  label="Ghi chú" width="80">
        <template slot-scope="scope">
          {{scope.row.note}}
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    
        class="pagination"
        :total="tableData.length"
        :small="true"
        :page-size.sync="pageSize"
        :current-page.sync="currentPage"
        @current-change="fetchData"
        background
        :pager-count="5"
        layout="-> , prev, pager, next, sizes"
      ></el-pagination>
    </div>

    <div slot="footer" style="margin:10px;margin-left:auto;margin-right:20px">
      <el-button type="info" @click="closeModal" >Hủy</el-button>
      <el-button type="success" @click="addPlace" >Thêm</el-button>
    </div>
  </div>
</template>
<script>
import {GetMyPlace } from "@/api/place";
export default {
  props: {
    employee:Object,
    modalId:String,
    str:String,
    placeLst:Array
  },
  data() {  
    return {
        search:'',
        pageSize:10,
        currentPage:1,
        tableData:[],
        currentTableData:[],
        selectedPlace:null
    }  
  },
  
  methods: {
    fetchData(){
      this.currentTableData=this.tableData.filter(o=>{ return o.namePlace.toLowerCase().includes(this.search.toLowerCase())}).slice((this.currentPage-1)*this.pageSize,this.currentPage*this.pageSize)
    },
   
    rowchange:function(cur){

        this.selectedPlace = cur;
    },
    closeModal:function(){
      VoerroModal.hide('my-place-modal');
    },
    addPlace:function(){
        console.log(this.selectedPlace);
        this.$emit('placeChoosed',this.selectedPlace);
    }
    
  },
  created() {


        GetMyPlace().then(res=>{
          console.log(res);
          this.tableData = res.Data;
          this.fetchData();
        })

      
  },
  watch: {
    search(){
      this.fetchData();
    },
   
    pageSize(){
      this.fetchData()
    }
  },
};
</script>