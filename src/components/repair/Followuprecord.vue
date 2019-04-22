<template>
  <div>
    <mt-header fixed title="跟进记录">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="conten">
      <div class="conten-jl">
        <!-- <div class="shang"></div> -->
        <div class="conten-Record" v-for="item in orderloss">
          <!-- <p> </p> -->
          <span>
             <p>{{item.createdTime}}</p>
             <p>{{item.statusName}}</p>
          </span>
         
          
          <p id="item_details">{{item.content}}</p>
        </div>
        <p class="wu" v-show="wu">暂无数据</p>
        <!-- <div class="xia"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      creatorName:'',
      orderloss: {},
      Displaytime: false,
      wu: false
    };
  },
  created: function() {
    var self = this;
    self.orderloss.repairOrderId = self.$route.query.id;
    var id = this.orderloss.repairOrderId;
    Indicator.open("加载中...");
    axiosGetAPI("/vi/repairOrder/getRepairOrder?repairOrderId=" + id).then(res => {
      console.log(1)
       Indicator.close();
       this.creatorName = res.result.creatorName;
        if (res.result.repairTrackStatus) {
          console.log(1)
          self.orderloss = res.result.repairTrackStatus;
          res.result.repairTrackStatus.map(item => {
            if (item.isSetRemind) {
              this.Displaytime = true;
            }
          });
        }
        else{
          self.wu = true;
        }
    });
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