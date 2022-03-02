<template>
    <div>
        <div style="padding: 10px;" class="inline-block">
         <span style="margin-left:20px;">Nhóm: </span>

            <el-autocomplete
                popper-class="my-autocomplete"
                v-model="groups"
                :fetch-suggestions="querySearch"
                placeholder="Nhập nhóm"
                @select="handleSelect">
                <i
                    class="el-icon-edit el-input__icon"
                    slot="suffix"
                    @click="handleIconClick">
                </i>
                <template slot-scope="{ item }">
                    <div class="value">{{ item.idGroup }}</div>
                
                </template>
                </el-autocomplete>
     
        <span>
             <span class="demonstration">Tháng</span>
                <el-date-picker
                v-model="month"
                size="medium"
                type="month"
                placeholder="Chọn tháng">
                </el-date-picker>
        </span>

          <el-button size="medium" style="float: right;" type="danger" @click="display">Hiện call</el-button>
      </div>
    </div>
</template>

<script>

import {GetAllGroup} from '@/api/groups'
import {DisplayCall} from '@/api/call'
export default {
    data(){
        return{
            month:'',
            groupList:[],
            groups:''
        }
    },
    created(){
        this.fetchGroup()
    },
    methods:{
        display(){

            this.month = Date.parse(this.month).toString('yyyy-MM-dd')
            var req={
                month: this.month,
                groups: this.groups
            }
            DisplayCall(req).then(res=>{
                this.$notify({
                    title: 'Thành công',
                    message: 'Hiện call thành công',
                    type: 'success',
                    position: 'top-left'
                })
            })
        },

         fetchGroup(){
       GetAllGroup().then(response => {
        this.groupList = response.Data;
      });
    },
        querySearch(queryString, cb) {
        var links = this.groupList;
        var results = queryString ? links.filter(this.createFilter(queryString)) : links;
        cb(results);
      },
      handleIconClick(ev) {
        //console.log(ev);
      },
       handleSelect(item) {
        this.groups = item.idGroup;
      
      },
       createFilter(queryString) {
        return (link) => {
          link = JSON.parse(JSON.stringify(link))
          return (link.idGroup.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
    }
}
</script>