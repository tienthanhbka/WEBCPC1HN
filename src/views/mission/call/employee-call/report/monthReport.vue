<template>
  <div>
    <el-calendar v-model="currentDate">
      <template slot="dateCell" slot-scope="{date, data}">
        <div class="work-day-cell">
          <div>{{ data.day.substring(8,10)}}</div>
          <div v-if="workDayData">
            <el-tooltip
              class="item"
              effect="dark"
              :content="getToolTip(index,item,'S')"
              placement="top-start"
              v-show="currentGroup.employeeLst[index]&& currentGroup.employeeLst[index].show"
                v-for="(item, index) in dayData(data.day)"
                :key="index"
            >
              <i :style="{color:employeeColor(index)}"
                class="fas fa-dot-circle dotEm"
              ></i>
            </el-tooltip>
          </div>
          <div v-if="workDayData">
            <el-tooltip
              class="item"
              effect="dark"
              :content="getToolTip(index,item,'C')"
              placement="top-start"
              v-show="currentGroup.employeeLst[index]&&currentGroup.employeeLst[index].show"
                v-for="(item, index) in afternoonData(data.day)"
                :key="index"
            >
              <i :style="{color:employeeColor(index)}"
                class="fas fa-square dotEm"
              ></i>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-calendar>
    <div style="background:white;padding:20px;margin-top:-35px;">Số ngày đi làm:</div>
  </div>
</template>
<script>
import { GetWorkDayOfGroup } from "@/api/call";
import resize from '../resize';
export default {
  mixins:[resize],
  name: "monthReport",
  props: {
    currentGroup: Object
  },
  data() {
    return {
      currentDate: null,

      workDayData: null
    };
  },
  methods: {
      getToolTip(index,item,ch){
        if(this.currentGroup.employeeLst[index]){
          var name = this.currentGroup.employeeLst[index].nameEmployee;
          if(ch=='S'){
              return name+' buổi sáng: '+item+' call';
          }else if(ch=='C'){
             
              return name+' buổi chiều: '+item+' call';
          
          }
        }
          return '--';
      },
    employeeColor(id) {
      var em = this.currentGroup.employeeLst[id];
      return em ? em.color : "";
    },
    dayData(day) {
      if (this.workDayData[day]) {
        return this.workDayData[day].S;
      } else return [];
    },
    afternoonData(day) {
      if (this.workDayData[day]) {
        return this.workDayData[day].C;
      } else return [];
    },
    fetchData() {
      
      var month = this.currentDate.toISOString().slice(0, 7);
      if (this.currentGroup.idGroup != null) {
        GetWorkDayOfGroup({
          month: month,
          idGroup: this.currentGroup.idGroup
        }).then(res => {
          this.workDayData = res.Data;
        });
      }
    }
  },
  mounted() {
    this.currentDate = new Date();
    this.fetchData();
  },
  watch: {
    currentGroup(){
      this.fetchData();
    },
    currentDate(newVal, oldVal) {
        this.$emit('dateChange',newVal.toISOString().slice(0, 10));
      if (oldVal && newVal) {
        if (
          newVal.toISOString().slice(0, 7) != oldVal.toISOString().slice(0, 7)
        ) {
          this.fetchData();
        }
      }
    }
  }
};
</script>
<style scoped>
.work-day-cell{
  overflow-y: auto;
  height: 100%;
}
.call-tag {
  color: #16a085;
  padding: 3px;
  border-radius: 10px;
}
.el-calendar-day {
  padding: 0px !important;
}
.dotEm {
  font-size: 12px;
  margin-right: 2px;
}
.work-day-cell::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	background-color: #F5F5F5;
}

.work-day-cell::-webkit-scrollbar
{
	width: 2px;
	background-color: #F5F5F5;
}

.work-day-cell::-webkit-scrollbar-thumb
{
	background-color: #636e72;
	border: 2px solid #555555;
}
</style>
