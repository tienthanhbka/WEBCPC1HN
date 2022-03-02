<template>
  <div class="container" v-loading="isLoading">
    <h2>Thông báo của bạn</h2>
    <div>
    <div class="notifi-item" v-for="(item, index) in notifies" :key="index">
      <div class="img">
        <img
                  :src="(item.Img==null?'/imgs/cpc1hn-100.png':item.Img)"

                />
      </div>
      <div class="notifi-data">
        <div>
          <span class="title">{{item.Title}}</span>
          <i class="fas fa-dot-circle command"></i>
          <span class="time">{{new Date.parse(item.Time).toString('dd/MM HH:mm')}}</span>
        </div>
        <div class="content">
          <span class="">{{item.Content}}</span>
          
        </div> 
        
      </div>
    </div>
    <div style="text-align:center">
        <el-button @click="fetchData(1)" type="text">Xem thêm..</el-button>
    </div>
    </div>
  </div>
</template>
<script>
import { GetNotification } from "@/api/notification";
export default {
  data() {
    return {
      notifies: [],

      currentPage: 1,
      pageSize: 1,
      isLoading: false
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    fetchData(num) {
      if (num) {
        this.pageSize += 10;
      } else {
      }
      this.isLoading = true;
      GetNotification({
        PageNumber: this.currentPage,
        RowspPage: this.pageSize
      })
        .then(res => {
          this.isLoading = false;
          this.notifies = res.Data;
        })
        .catch(e => {
          this.isLoading = false;
        });
    }
  }
};
</script>
<style lang="css" scoped>
.container {
  background: white;
  padding: 15px;
  width: 100%;
  max-width: 960px;
  margin: auto;
}
.notifi-item:nth-child(1) {
  border-top: 1px solid #c8ced3;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(200, 206, 211);
}
.notifi-item {
  border-bottom: 1px solid #c8ced3;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(200, 206, 211);
  padding: 8px;
}
.notifi-data{
    margin-left: 60px;
}
.notifi-item .title {
 font-weight: bold

}
.notifi-item:hover{
    background: #dfe6e9;
}
.notifi-item .time {
 color: #636e72;
 font-size: 13px;
 float: right;

}
.notifi-item .command {
 color: #636e72;
    font-size: 12px;
 float: right;
 margin-left: 2px;

}
.notifi-item .content {
 color: #636e72;
    margin-top: 8px;
    text-align: justify;

}
.notifi-item img {
  display: inline-block;
  position: absolute;
      max-width: 55px;

}
</style>