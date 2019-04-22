<template>
  <div>
    <mt-header fixed title="定损记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="conten">
      <div class="conten-jl">
        <div class="shang"></div>
        <div class="conten-Record" v-for="item in orderloss">
         <span>
            <p>{{item.createTime}}</p>
            <p>定损</p>
         </span>
          <p id="item_details">{{item.fixedItemContent}}</p>
        </div>
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
        fixedAmount: "",
        supplementAmount: "",
        totalAmount: "",
        fixedItemContent: "",
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
        if (res.result.fixedTrackStatus) {
          this.orderloss = res.result.fixedTrackStatus;
          res.result.fixedTrackStatus.map(item => {
            if (item.fixedTrackStatus) {
              this.Displaytime = true;
            }
          });
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
<style Scoped>.conten {
  background-color: rgba(242, 242, 242, 1);
  width: 100%;
  overflow: hidden;
  height: 100%;
}
.conten-Record {
  min-height: 40px;
  margin: 10px;
  background: #fff;
  padding-top: 5px;
  border-radius: 5px;
 }
.conten-Record span{
  display: block;
  height: 22px;
}

.conten-Record span p:nth-child(1){
  float: left;
  margin-left: 15px;
  color: #999999;
}
.conten-Record span p:nth-child(2){
  float: right;
  margin-right: 15px;
  color: #999999;
}
#item_details{
  padding: 10px 15px;
}

.wu {
  padding: 10px 15px;
}
</style>