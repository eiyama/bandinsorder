<template>
  <div>
    <mt-header fixed title="维修登记">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="conten">
      <div class="conten-jl">
        <div class="shang"></div>
        <div class="conten-Record" v-for="item in orderloss">
          <p></p>
          <p>{{item.status}}</p>
          <p>{{item.repairScheduleContent}} {{item.createTime}}</p>
          
        </div>
        <!-- <audio controls>
        <source src="http://vi.bandins.com/Media/Default/RepairCall/TX201904130001_35_10010_20190413225707.mp3" type="audio/mpeg">
      </audio> -->
        <p class="wu" v-show="wu">暂无数据</p>
        <div class="xia"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
export default {
  data() {
    return {
      orderloss: {
        status: "",
        creatorName: "",
        repairScheduleContent: "",
        createTime: ""
      },
      Displaytime: false,
      wu: false
    };
  },
  created: function() {
    var self = this;
    self.orderloss.repairOrderId = self.$route.query.id;
    var id = this.orderloss.repairOrderId;
    axiosGetAPI("/vi/repairOrder/getRepairOrder?repairOrderId=" + id).then(
      res => {
        console.log(1)
        if (res.result.repairScheduleTrackStatus) {
          this.orderloss = res.result.repairScheduleTrackStatus;
          res.result.repairScheduleTrackStatus.map(item => {
            if (item.repairScheduleTrackStatus) {
              this.Displaytime = true;
            }
          });
        }
        else{
          this.wu = true;
        }
      }
    );
  },
  methods: {
    openBack: function() {
      window.history.back();
    }
  }
};
</script>
<style Scoped>
.conten {
  background-color: rgba(242, 242, 242, 1);
  width: 100%;
  overflow: hidden;
  height: 100%;
}
.conten-jl {
  border-top: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  background: #fff;
}
.conten-Record {
  margin-left: 20px;
  border-left: 1px solid #bdbdbd;
  background: #fff;
  padding-top: 25px;
}
.conten-Record p:nth-child(1) {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1px solid #d8d8d8;
  float: left;
  margin-left: -9px;
  z-index: 111;
  background: #fff;
}
.conten-Record p:nth-child(2) {
  margin-left: 15px;
}
.conten-Record p:nth-child(3) {
  margin-left: 15px;
  color: #999999;
}
.conten-Record p:nth-child(4) {
  margin-left: 15px;
  margin-top: 10px;
}
.xia {
  margin-left: 20px;
  border-left: 1px solid #bdbdbd;
  background: #fff;
  padding-top: 25px;
}
.shang {
  margin-left: 20px;
  border-left: 1px solid #bdbdbd;
  background: #fff;
  padding-top: 25px;
}
.wu {
  margin-left: 30px;
  color: #999999;
}
</style>