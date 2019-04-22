<template>
  <div class="home">
    <mt-header fixed title="留修工单"></mt-header>
    <div class="container-center">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <span class="item-click" @click="getRepairDatas('TobeConfirmed')">待跟进</span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <span class="item-click" @click="getRepairDatas('Following')">跟进中</span>
        </mt-tab-item>
        <mt-tab-item id="3">
          <span class="item-click" @click="getRepairDatas('', true)">已到店</span>
        </mt-tab-item>
        <mt-tab-item id="4">
          <span class="item-click" @click="getRepairDatas('Closed')">战败</span>
        </mt-tab-item>
        <mt-tab-item id="5">
          <span class="item-click" @click="getRepairDatas('')">全部</span>
        </mt-tab-item>
      </mt-navbar>
      <div>
        <mt-tab-container v-model="selected" class="mint-tab-content insure-policies">
          <mt-tab-container-item id="1">
            <div
              class="mt-list"
              id="mt-list"
              v-for="item in workorderlist"
              @click="repairDataDetail(item,$event)"
              :key="item.id"
            >
              <div class="mt-list-top">
                <p>工单号:{{item.jobNumber}}</p>
                <p>{{item.createdTime}}</p>
              </div>
              <div class="mt-list-fooer">
                <div class="fooer-1">
                  <h2>{{item.plateNo}}-{{item.name}}</h2>
                  <p>{{item.orderStatusName}}</p>
                </div>
                <div class="fooer-2">
                  <p>{{item.insCorpShortName}}</p>
                </div>
                <div class="fooer-3">
                  <p v-if="item.canMoveCarStatus=='Travel'">[无需拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='NoTravel'">[需要拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='Unknown'">[未知]</p>
                  <p>出险地点:</p>
                  <p>
                    <img src="../../assets/images/u153.png">
                    {{item.reportAddress}}
                  </p>
                </div>
                <div class="fooer-4" >                
                </div>
              </div>
            </div>
            <div id="nodata" v-if="hasdata">暂无数据</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!-- <mt-tab-container-item id="tab-container2"> -->
            <!-- cell组件 -->
            <div
              class="mt-list"
              v-for="item in workorderlist"
              @click="repairDataDetail(item,$event)"
              :key="item.id"
            >
              <div class="mt-list-top">
                <p>工单号:{{item.jobNumber}}</p>
                <p>{{item.createdTime}}</p>
              </div>
              <div class="mt-list-fooer">
                <div class="fooer-1">
                  <h2>{{item.plateNo}}-{{item.name}}</h2>
                  <p>{{item.orderStatusName}}</p>
                </div>
                <div class="fooer-2">
                  <p>{{item.insCorpShortName}}</p>
                </div>
                <div class="fooer-3">
                  <p v-if="item.canMoveCarStatus=='Travel'">[无需拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='NoTravel'">[需要拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='Unknown'">[未知]</p>
                  <p>出险地点:</p>
                  <p>
                    <img src="../../assets/images/u153.png">
                    {{item.reportAddress}}
                  </p>
                </div>
              </div>
            </div>
            <div id="nodata" v-if="hasdata">暂无数据</div>
            <!-- </mt-tab-container-item> -->
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <!-- <mt-tab-container-item id="tab-container3"> -->
            <!-- cell组件 -->
            <div
              class="mt-list"
              v-for="item in workorderlist"
              @click="repairDataDetail(item,$event)"
              :key="item.id"
            >
              <div class="mt-list-top">
                <p>工单号:{{item.jobNumber}}</p>
                <p>{{item.createdTime}}</p>
              </div>
              <div class="mt-list-fooer">
                <div class="fooer-1">
                  <h2>{{item.plateNo}}-{{item.name}}</h2>
                  <p>{{item.orderStatusName}}</p>
                </div>
                <div class="fooer-2">
                  <p>{{item.insCorpShortName}}</p>
                </div>
                <div class="fooer-3">
                  <p v-if="item.canMoveCarStatus=='Travel'">[无需拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='NoTravel'">[需要拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='Unknown'">[未知]</p>
                  <p>出险地点:</p>
                  <p>
                    <img src="../../assets/images/u153.png">
                    {{item.reportAddress}}
                  </p>
                </div>
              </div>
            </div>
            <div id="nodata" v-if="hasdata">暂无数据</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <div
              class="mt-list"
              v-for="item in workorderlist"
              @click="repairDataDetail(item,$event)"
              :key="item.id"
            >
              <div class="mt-list-top">
                <p>工单号:{{item.jobNumber}}</p>
                <p>{{item.createdTime}}</p>
              </div>
              <div class="mt-list-fooer">
                <div class="fooer-1">
                  <h2>{{item.plateNo}}-{{item.name}}</h2>
                  <p>{{item.orderStatusName}}</p>
                </div>
                <div class="fooer-2">
                  <p>{{item.insCorpShortName}}</p>
                </div>
                <div class="fooer-3">
                  <p v-if="item.canMoveCarStatus=='Travel'">[无需拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='NoTravel'">[需要拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='Unknown'">[未知]</p>
                  <p>出险地点:</p>
                  <p>
                    <img src="../../assets/images/u153.png">
                    {{item.reportAddress}}
                  </p>
                </div>
              </div>
            </div>
            <div id="nodata" v-if="hasdata">暂无数据</div>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <!-- <mt-tab-container-item id="tab-container2"> -->
            <!-- cell组件 -->
            <div
              class="mt-list"
              v-for="item in workorderlist"
              @click="repairDataDetail(item,$event)"
              :key="item.id"
            >
              <div class="mt-list-top">
                <p>工单号:{{item.jobNumber}}</p>
                <p>{{item.createdTime}}</p>
              </div>
              <div class="mt-list-fooer">
                <div class="fooer-1">
                  <h2>{{item.plateNo}}-{{item.name}}</h2>
                  <p>{{item.orderStatusName}}</p>
                </div>
                <div class="fooer-2">
                  <p>{{item.insCorpShortName}}</p>
                </div>
                <div class="fooer-3">
                  <p v-if="item.canMoveCarStatus=='Travel'">[无需拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='NoTravel'">[需要拖车]</p>
                  <p v-else-if="item.canMoveCarStatus=='Unknown'">[未知]</p>
                  <p>出险地点:</p>
                  <p>
                    <img src="../../assets/images/u153.png">
                    {{item.reportAddress}}
                  </p>
                </div>
              </div>
            </div>
            <div id="nodata" v-if="hasdata">暂无数据</div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <bottomTab :plant.sync="plante"></bottomTab>
  </div>
</template>
<script>
import store from "./../../store/store";
import * as types from "./../../store/types";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator, MessageBox, TabContainer, TabContainerItem } from "mint-ui";
import bottomTab from "./../bottomtab/bottom-tab";
export default {
  name: "home",
  components: { bottomTab },
  data() {
    return {
      selected: "1",
      plante: "home",
      active: "tab-container1",
      Worklist: false,
      id: "",
      hasdata: false,
      count_down: [],
      all_down:[],
      hours:[],
      minutes:[],
      seconds:[],
      workorderlist: [],
    };
  },
  created: function() {
    var self = this;
    var appId = self.$route.query.appid || self.$route.query.appId;
    if (self.$route.query._selected) {
      self.selected = self.$route.query._selected;
    } else {
      self.selected = "1";
    }
    localStorage.setItem("appId", appId);
    if (appId) {
      localStorage.removeItem("appId");
      Indicator.open("加载中...");
      document.title = "";
      axiosGetAPI("/apis/apps/" + appId + "/H5").then(res => {
        Indicator.close();
        var authMode = res.result.authMode.text;
        localStorage.setItem("appId", res.result.appId);
        self.$store.commit(types.APPID, res.result.appId);
        self.$store.commit(types.AUTHMODE, authMode);
        if (authMode == "SingleUserMode") {
          self.$store.commit(types.LOGIN, "1");
          localStorage.setItem("token", "1");
          self.iSingleUserMode = true;
        } else {
          self.iSingleUserMode = false;
          //  self.getRepairDatas('TobeConfirmed');
          if (store.state.token == "null" || store.state.token == "1") {
            self.$store.commit(types.LOGOUT);
            self.$router.push({ path: "/login" });
          } else {
            var localToken = localStorage.getItem("token");
            if (!localToken || localToken.indexOf(appId) < 0) {
              self.$store.commit(types.LOGOUT);
              self.$router.push({ path: "/login" });
            }
          }
          switch (self.selected) {
            case "1":
              self.getRepairDatas("TobeConfirmed");
              break;
            case "2":
              self.getRepairDatas("Following");
              break;
            case "3":
              self.getRepairDatas("", true);
              break;
            case "4":
              self.getRepairDatas("Closed");
              break;
            case "5":
              self.getRepairDatas("");
              break;
            default:
              self.getRepairDatas("TobeConfirmed");
          }
        }
        self.title = res.result.name;
        document.title = res.result.name;
        sessionStorage.setItem("title", self.title);
      });
    } else {
      this.$store.commit(types.LOGOUT);
      this.$router.push({ path: "/login" });
    }
  },
  methods: {
    repairDataDetail: function(item) {
      var _selected = this.selected;
      var itemId;
      this.$router.push({
        path: "/repair/orderdetails",
        query: {
          itemId: item.id,
          _selected
        }
      });
    },
    getRepairDatas: function(status, hasBackUp) {
      var self = this;
      var param = {};
      if (hasBackUp) {
        hasBackUp == true;
      } else {
        hasBackUp == false;
      }
      param.orderStatus = status;
      param.hasBackShop = hasBackUp;
      Indicator.open("加载中...");
      axiosGetAPI("/vi/repairOrder", param).then(res => {
        Indicator.close();
        if (res.result) {
          this.workorderlist = res.result;
        }
        if (this.workorderlist.length > 0) {
          this.hasdata = false;
        } else {
          this.hasdata = true;
        }
         for(var i=0; i < res.result.length; i++ ){
         this.count_down =res.result[i].createdTime;
        //  this.timeFn(this.count_down)
         }
      });
  

    },
    Acceptance: function(item) {
      //接受工单提示
      this.id = item.id;
      MessageBox.confirm("", {
        message: "是否接受工单？",
        title: "提示",
        confirmButtonText: "是",
        cancelButtonText: "否"
      })
        .then(action => {
          if (action == "confirm") {
            //确认的回调
            var id = item.id;
            axiosGetAPI("/vi/repairOrder/confirm?repairOrderId=" + id);
          }
        })
        .catch(err => {});
    },
    // 倒计时
  //   timeFn: function(d1) {
  //     var dateBegin = new Date(d1);
  //     var dateEnd = new Date(); //获取当前时间
  //     var dateDiff = dateEnd.getTime() - dateBegin.getTime();
  //     var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));//计算出相差天数
  //     var leave1=dateDiff%(24*3600*1000)    //计算天数后剩余的毫秒数
  //     var hours=Math.floor(leave1/(3600*1000))//计算出小时数
  //     //计算相差分钟数
  //     var leave2=leave1%(3600*1000)    //计算小时数后剩余的毫秒数
  //     var minutes=Math.floor(leave2/(60*1000))//计算相差分钟数
  //     //计算相差秒数
  //     var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
  //     var seconds=Math.round(leave3/1000)
  //       return ({hours:hours,minutes:minutes,seconds:seconds})
  //     }
  
  //   //  this.all_down = this.timeFn(this.count_down)
  //   //          console.log(this.all_down) 
  },
  mounted() {},
};
</script>
<style Scoped>
.item {
  display: inline-block;
}
.home {
  position: relative;
}
.nav {
  padding: 10px;
  width: 100%;
  display: flex;
  space-around: inherit;
  justify-content: space-evenly;
  margin-top: 40px;
  height: 40px;
  padding: 0;
  background: #ffff;
  align-items: center;
}
.link {
  color: inherit;
  padding: 20px;
  display: block;
}
.home {
  height: 100%;
  background-color: rgba(247, 247, 247, 1);
}
.mint-tab-item {
  text-align: center;
}
.mt-list {
  width: 100%;
  height: 120px;
  flex: none;
  margin-top: 10px;
}
#mt-list {
  border: 0;
}
.mint-cell-title {
  flex: none;
}
.mt-list-top {
  height: 30px;
  padding: 0 3px;
  border-bottom: 1px solid #e6e6e6;
  font-size: 12px;
  color: #a4a4a4;
  line-height: 30px;
  border-radius: 5px 5px 0 0;
}
.mt-list-top p:nth-child(1) {
  float: left;
  display: block;
  width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mt-list-top p:nth-child(2) {
  float: right;
}
.mt-list {
  background: #ffff;
  border-radius: 5px;
}
.mt-list-fooer {
  height: 100px;
  width: 100%;
}
.fooer-1 {
  padding: 0 5px;
  height: 20%;
  margin-top: 10px;
}
.fooer-1 h2 {
  font-size: 14px;
  float: left;
  font-weight: 400;
}
#nodata {
  height: 100%;
  width: 100%;
  text-align: center;
  padding: 50% 0;
  color: #a4a4a4;
  font-size: 16px;
}
.fooer-1 p {
  float: right;
  font-size: 12px;
  color: #0d82f4;
}
.fooer-2 {
  position: relative;
}
.fooer-2 p {
  padding: 0 5px;
  height: 20%;
  font-size: 12px;
  color: #a4a4a4;
  margin-top: 5px;
  width: 170px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fooer-2 span {
  font-size: 18px;
  /* margin-right:42px; */
  color: #a4a4a4;
  position: absolute;
  right: 15px;
  top: 0px;
}
.fooer-3 {
  padding: 0 5px;
  height: 40%;
  margin-top: 4px;
}
.fooer-3 p:nth-child(1) {
  float: left;
  font-size: 12px;
  color: #a4a4a4;
}
.fooer-3 p:nth-child(2) {
  float: left;
  font-size: 12px;
  color: #a4a4a4;
}
.fooer-3 p:nth-child(3) img {
  float: left;
  margin-right: 3px;
}
.fooer-3 p:nth-child(3) {
  float: left;
  font-size: 12px;
  color: #a4a4a4;
  margin-left: 2px;
  width: 130px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fooer-3 p:nth-child(4) {
  float: left;
  font-size: 12px;
  color: #a4a4a4;
  border: 1px solid #2e64fe;
  border-radius: 5px;
  padding: 3px;
  float: right;
  color: #2e64fe;
}
.fooer-3 p:nth-child(5) {
  float: left;
  font-size: 12px;
  color: #a4a4a4;
  border: 1px solid #a4a4a4;
  border-radius: 5px;
  padding: 3px;
  float: right;
  color: #a4a4a4;
}
.mt-list-top {
  margin-top: 0;
  background: #fff;
}
.mt-list {
  background: #fff;
}
</style>