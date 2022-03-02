<template>
<div>
  <div>
    Đang tải
  </div>
<ul  class="list-group" id="infinite-list">
      <li  class="list-group-item" :key="call.idCall" v-for="call in callData"   >
        <template v-if="call.idCall">
           <i :style="{color:currentGroup.employeeLst[call.idEmployee]?currentGroup.employeeLst[call.idEmployee].color:'red'}" class="el-icon-caret-right" ></i> {{call.plan}}
        </template>
        <i v-else class="el-icon-loading"></i>
      </li>
    </ul>
</div>
    
</template>
<script>
import { GetCallByIdGroup} from "@/api/call";
  export default {
    props:{
      currentGroup:Object,
    currentDate:String
    },
    data () {
      return {
        loading: false,
    nextItem: 1,
    callData:[],
    RowspPage:10,
    CurrentPage:1,
      }
    },
    mounted () {
this.loadMore();
    // Detect when scrolled to bottom.
    const listElm = document.querySelector('#infinite-list');
    listElm.addEventListener('scroll', e => {
      if(listElm.scrollTop + listElm.clientHeight >= listElm.scrollHeight) {
        this.loadMore();
      }
    });

    // Initially load some items.
    this.loadMore();

  },
    methods: {
    loadMore () {
      if(this.loading) return;
      if(!this.currentGroup.idGroup||!this.currentDate) return;
      var req = {
        IdGroup: this.currentGroup.idGroup,
        DateBegin: '2019-07-01',
        DateEnd: this.currentDate,
        PageNumber: this.CurrentPage,
        RowspPage: this.RowspPage
      };
      this.loading = true;
      this.callData.push({});
      GetCallByIdGroup(req).then(res=>{
        this.loading = false;
        console.log(res.Data);
        this.callData.pop();
        res.Data.forEach(element => {
          this.callData.push(element)
        });
        this.CurrentPage++;
      }).catch(()=>{
        this.loading = false;
        this.callData.pop();
      })
      
    }
  },
  watch:{
    currentGroup(){
      this.loadMore();
    }
  }
  }
</script>
<style scoped>
.list-group {
      height: 600px;
    padding: 0;
    margin: 0;
    list-style: none;
    overflow: auto;
}
.list-group-item {
      display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: #dfe6e9;
    margin: 10px;
    color: #7dbcfc;
}
</style>
