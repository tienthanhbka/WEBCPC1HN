<template>
  <div style="padding:5px">
    <div class="inline-block">
      <el-select v-model="currentIdGroup" placeholder="Chọn nhóm">
        <el-option
          v-for="item in groupsLst"
          :key="item.idGroup"
          :label="item.idGroup"
          :value="item.idGroup"
        ></el-option>
      </el-select>
      <el-date-picker
        placeholder="Từ"
        format="dd/MM/yyyy HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        type="datetime"
        default-time="00:00:00"
        v-model="begin"
      ></el-date-picker>
    </div>

    <div class="inline-block">
      <span>đến</span>
      <el-date-picker
        placeholder="Đến"
        format="dd/MM/yyyy HH:mm"
        value-format="yyyy-MM-dd HH:mm"
        type="datetime"
        default-time="23:00:00"
        v-model="end"
      ></el-date-picker>
      <el-button
        type="primary"
        icon="el-icon-refresh"
        class="inline-block"
        @click="fetchData"
      ></el-button>
    </div>
    <div>
      <el-container
        style="height: 80%; border: 1px solid #eee;background-color: white;"
      >
        <el-aside ttxx class="m-left-aside" width="230px">
          <!-- <div class="m-drawer-b" v-show="showLeft&&device=='mobile'" @click="showLeft=!showLeft"></div> -->
          <transition name="slide-fade">
            <div class="m-left-bar">
              <div style="overflow:auto">
                <div
                  style="padding:5px"
                  v-for="(em, index) in currentGroup.employeeLst"
                  :key="index"
                >
                  <span
                    :style="
                      em.show ? { color: em.color } : { color: '#636e72' }
                    "
                    >{{ em.nameEmployee }}</span
                  >
                  <el-switch
                    style="float:right"
                    v-model="em.show"
                    :active-color="em.color"
                    inactive-color="#ecf0f1"
                  ></el-switch>

                  <!-- <el-checkbox :style="{color:em.color}" v-model="em.show">{{em.nameEmployee}}</el-checkbox> -->
                </div>

                <div style="text-align: center;">
                  <el-checkbox-group v-model="typeCall" size="small">
                    <el-checkbox-button :label="10" :key="10"
                      >Đã duyệt</el-checkbox-button
                    >
                    <el-checkbox-button :label="1" :key="1"
                      >Chưa duyệt</el-checkbox-button
                    >
                  </el-checkbox-group>
                </div>
                <div>Đã chọn: {{ selectedCalls.length }} call</div>
                <div style="text-align: center;">
                  <el-button-group size="small">
                    <el-button
                      type="warning"
                      size="small"
                      @click="evaluateCalls(0)"
                      >Bỏ duyệt</el-button
                    >
                    <el-button
                      type="primary"
                      size="small"
                      @click="evaluateCalls(1)"
                      >Duyệt</el-button
                    >
                  </el-button-group>
                </div>
                <div style="padding: 100px;">
                  <!-- <el-checkbox :style="{color:em.color}" v-model="em.show">{{em.nameEmployee}}</el-checkbox> -->
                </div>
              </div>
              <!-- <div style="width:100%;text-align:center">
              <el-button-group>
                <el-button size="mini" type="warning" @click="closeAll">Đóng hết</el-button>
                <el-button size="mini" type="success" @click="openAll">Mở hết</el-button>
              </el-button-group>
            </div> -->
            </div>
          </transition>
        </el-aside>
        <el-main style="padding:0px" class="el-main-container">
          <map-view
            @selectedCallsChanged="onSelectedCallsChanged"
            :typeCall="typeCall"
            :begin="begin"
            :end="end"
            :currentGroup="currentGroup"
          ></map-view>
        </el-main>
      </el-container>
    </div>
  </div>
</template>
<script>
import { GetListGroupAdminByToken, getEmployeesByIdGroup } from "@/api/groups";
import { EvaluateLstCall } from "@/api/call";
import mapView from "./components/mapView";
import { defaultColors } from "@/utils";
export default {
  data() {
    return {
      isLoading: false,
      currentGroup: { idGroup: "", employeeLst: [] },
      currentIdGroup: "",
      defaultColors: defaultColors(),
      groupsLst: [],
      selectedCalls: [],
      begin: null,
      end: null,
      typeCall: [1, 10]
    };
  },
  components: {
    mapView
  },
  methods: {
    evaluateCalls(evaluate) {
      if (this.selectedCalls.length < 1) return;
      let text = "BỎ DUYỆT";
      if (evaluate == 1) {
        text = "DUYỆT";
      }
      let str =
        "Bạn có muốn " +
        text +
        " " +
        this.selectedCalls.length +
        " call đã chọn?";
      this.$confirm(str, "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        let cData = [];
        this.selectedCalls.forEach(call => {
          cData.push({
            call: call.idCall,
            evaluate: evaluate
          });
        });
        EvaluateLstCall({ data: cData }).then(res => {
          this.selectedCalls.forEach(call => {
            res.Data.forEach(c => {
              if (call.idCall == c.idCall) {
                call.status = c.status;
              }
            });
          });

          this.$message({
            message: "Đã lưu",
            type: "success"
          });
        });
      });
    },
    fetchData() {},
    onSelectedCallsChanged(calls) {
      this.selectedCalls = calls;
    }
  },
  watch: {
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
  },

  created() {
    this.begin =
      Date.today()
        .set({ day: 1 })
        .toString("yyyy-MM-dd ") + "00:00";
    this.end =
      Date.today()
        .set({ day: 1 })
        .addMonths(1)
        .addDays(-1)
        .toString("yyyy-MM-dd ") + "23:00";
    GetListGroupAdminByToken().then(res => {
      this.groupsLst = res.Data;
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
  }
};
</script>
<style lang="css" scoped>
.inline-block {
  display: inline-block;
  margin-bottom: 5px;
}
.m-left-bar {
  width: 230px;
  border: 1px solid rgb(238, 238, 238);
  position: fixed;
  height: 100%;
  background: white;
  z-index: 100;
  transition: 1s;
  overflow: auto;
}
</style>
<style scoped>
.m-left-aside[ttxx] {
  padding: 0;
}
</style>
