<template>
  <div>
    <el-button type="primary" @click="initData()">
      <i class="fas fa-sync-alt"></i>
    </el-button>
    <span>Call đạt TG &#x3C;= 10 phút, KC &#x3C;= 500m</span>
    <el-table :data="tableData" v-loading="isLoading" fit size="small" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-table :data="scope.row.line" fit size="small" style="width: 100%" border>
            <el-table-column align="center" width="75px" label="STT">
              <template slot-scope="scope">{{ scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column prop="ID" min-width="271" label="Mã call TDV">
              <template slot-scope="{row}">{{row.idCall2}}</template>
            </el-table-column>
            <el-table-column prop="ID" width="166" label="TG Checkin">
              <template
                slot-scope="{row}"
              >{{Date.parse(row.timeCheckIn2).toString('dd/MM/yyyy HH:mm')}}</template>
            </el-table-column>
            <el-table-column prop="ID" min-width="70" label="TG">
              <template slot-scope="{row}">{{row.timediff}} phút</template>
            </el-table-column>
            <el-table-column prop="ID" min-width="80" label="KC">
              <template slot-scope="{row}">{{row.distance|numbered}} m</template>
            </el-table-column>
            <el-table-column prop="ID" width="120" label="Tọa độ">
              <template slot-scope="{row}">
               <a target="_blank" :href="'https://www.google.com/maps/dir/'+row.la1+','+row.lo1+'/'+row.la2+','+row.lo2">
                    <el-button type="text" style="color:#8e44ad">Xem trên map</el-button>
               </a> 
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column align="center" width="75px" label="STT">
        <template slot-scope="scope">{{ scope.$index + 1}}</template>
      </el-table-column>
      <el-table-column prop="ID" min-width="271" label="Mã call ASM">
        <template slot-scope="{row}">{{row.idCall1}}</template>
      </el-table-column>
      <el-table-column prop="ID" width="166" label="TG Checkin">
        <template slot-scope="{row}">{{Date.parse(row.timeCheckIn1).toString('dd/MM/yyyy HH:mm')}}</template>
      </el-table-column>
      <el-table-column prop="ID" width="120" label="Tọa độ">
        <template slot-scope="{row}">
          <a target="_blank" :href="'https://maps.google.com/?q='+row.la1+','+row.lo1"><el-button type="text">Xem trên map</el-button></a> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { GetMeetingPointingDetail } from "@/api/mission";
export default {
  data() {
    return {
      tableData: [],
      isLoading: false
    };
  },
  props: {
    meeting: Object
  },
  methods: {
    initData() {
      this.isLoading = true;
      GetMeetingPointingDetail({
        headerID: this.meeting.header.RowID,
        lineID: this.meeting.line.RowID
      }).then(res => {
        this.isLoading = false;
        this.tableData = res.Data;
      });
    }
  },
  created() {
    this.initData();
  },
  watch: {
    meeting() {
      this.initData();
    }
  }
};
</script>