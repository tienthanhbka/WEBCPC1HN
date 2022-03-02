<template>
  <div>
    <el-container style="height: 80%; border: 1px solid #eee;background-color: white">
      <el-aside
        class="m-left-aside"
        :width="device=='mobile'?'100%':'230px'"
        :style="device=='mobile'?{position:'absolute'}:{}"
        v-show="showLeft"
      >
        <div class="m-drawer-b" v-show="showLeft&&device=='mobile'" @click="showLeft=!showLeft"></div>
        <transition name="slide-fade">
          <div class="m-left-bar">
            <el-select v-model="currentIdGroup" placeholder="Chọn nhóm" style="width:100%">
              <el-option
                v-for="item in groupsLst"
                :key="item.idGroup"
                :label="item.idGroup"
                :value="item.idGroup"
              ></el-option>
            </el-select>
            <div>
              <div
                style="padding:12px"
                v-for="(em, index) in currentGroup.employeeLst"
                :key="index"
              >
                <span :style="em.show?{color:em.color}:{color:'#636e72'}">{{em.nameEmployee}}</span>
                <el-switch
                  style="float:right"
                  v-model="em.show"
                  :active-color="em.color"
                  inactive-color="#ecf0f1"
                ></el-switch>

                <!-- <el-checkbox :style="{color:em.color}" v-model="em.show">{{em.nameEmployee}}</el-checkbox> -->
              </div>
            </div>
            <div style="width:100%;text-align:center">
              <el-button-group>
                <el-button size="mini" type="warning" @click="closeAll">Đóng hết</el-button>
                <el-button size="mini" type="success" @click="openAll">Mở hết</el-button>
              </el-button-group>
            </div>
          </div>
        </transition>
      </el-aside>
      <el-main style="padding:0px" class="el-main-container">
        <div
          style="padding-left: 10px;
    height: 25px;
    width: 25px;
    font-size: 24px;"
          @click="showLeft=!showLeft"
        >
          <i class="el-icon-s-unfold"></i>
        </div>
        <div>
          <monthreport :currentGroup="currentGroup" @dateChange="dateChange"></monthreport>
          <!-- <timeline :currentGroup="currentGroup" :currentDate="currentDate"></timeline> -->
          <daychartreport :currentGroup="currentGroup" :currentDate="currentDate"></daychartreport>

          <div style="overflow-x: scroll;width: 100%;">
            <testchart :currentGroup="currentGroup" :currentDate="currentDate"></testchart>
          </div>
          <div>
            <mapreport :currentGroup="currentGroup"></mapreport>
          </div>
          
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import testChart from "./report/testChart";
import monthReport from "./report/monthReport";
import chartReport from "./report/chartReport";
import dayChartReport from "./report/dayChartReport";
import mapReport from "./report/mapReport";
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
import { defaultColors } from "@/utils";
import timeLine from "./report/timeLine";
export default {
  components: {
    monthreport: monthReport,
    chartreport: chartReport,
    testchart: testChart,
    daychartreport: dayChartReport,
    timeline: timeLine,
    mapreport:mapReport
  },
  data() {
    return {
      showLeft: true,
      defaultColors: defaultColors(),
      currentGroup: { idGroup: "", employeeLst: [] },
      currentIdGroup: "",
      groupsLst: {},

      currentDate: null
    };
  },
  computed: {
    device() {
      return this.$store.getters.device;
    }
  },
  methods: {
    closeAll() {
      if (this.currentGroup.employeeLst) {
        var obj = this.currentGroup.employeeLst;
        for (var i in obj) {
          obj[i].show = false;
        }
      }
    },
    openAll() {
      if (this.currentGroup.employeeLst) {
        var obj = this.currentGroup.employeeLst;
        for (var i in obj) {
          obj[i].show = true;
        }
      }
    },
    dateChange(date) {
      this.currentDate = date;
    }
  },
  created() {
    GetListGroupAdminByToken().then(res => {
      res.Data.forEach(e => {
        e.employeeLst = [];
      });
      res.Data.forEach(e => {
        this.groupsLst[e.idGroup] = {
          idGroup: e.idGroup,
          employeeLst: []
        };
      });

      this.currentIdGroup = this.groupsLst[
        Object.keys(this.groupsLst)[0]
      ].idGroup;
    });
  },
  watch: {
    device(n, o) {
      if (n == "mobile") {
      } else {
      }
    },
    currentIdGroup: function() {
      if (this.currentIdGroup != null && this.currentIdGroup != "") {
        this.currentGroup = this.groupsLst[this.currentIdGroup];

        if (this.currentGroup.employeeLst.length == 0) {
          getEmployeesByIdGroup({ idGroup: this.currentGroup.idGroup }).then(
            res => {
              var i = 0;
              var emLs = {};
              res.Data.forEach(e => {
                e.show = true;
                e.color = this.defaultColors[i];
                emLs[e.idEmployee] = e;
                i++;
              });

              this.currentGroup.employeeLst = emLs;
            }
          );
        }
      }
    }
  }
};
</script>
<style scoped>
li {
  padding: 12px;
}
.m-left-bar {
  width: 230px;
  border: 1px solid rgb(238, 238, 238);
  position: fixed;
  height: 100%;
  background: white;
  z-index: 100;
  transition: 1s;
}
.m-drawer-b {
  background: rgb(0, 0, 0);
  opacity: 0.3;
  width: 100%;
  top: 0px;
  height: 100%;
  position: absolute;
  z-index: 30;
}
.m-left-aside {
  height: 100%;

  z-index: 6;
}
.d-left-sidebar {
  width: 230px;
}
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
