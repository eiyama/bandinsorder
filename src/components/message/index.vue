<template>
  <div>
    <mt-header fixed title="消息提醒"></mt-header>
    <div class="container-center">
         <div class="messageItem" v-for="item in messageData" :key="item.id">
            <div class="item_top">
              <div class="item_status">{{item.category ? item.category : item.messageType}}</div>
              <div class="item_time">{{item.createdTime}}</div>
            </div>
           <div class="item_title">{{item.title}}</div>
         </div>
      </div>
 
    <bottomTab :plant.sync="plante"></bottomTab>
  </div>
</template>
<script>

import store from "./../../store/store";
import * as types from "./../../store/types";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import {  Toast, Indicator, MessageBox, TabContainer, TabContainerItem} from "mint-ui";
import bottomTab from "./../bottomtab/bottom-tab";
export default {
  name: "message",
  components: { bottomTab },
  data() {
    return {
      plante: "message",
      messageData: 
      [
        {
          id:'',
          readed: '',
          messageType: '',
          category: '',
          createdTime:'',
          deliveredTime: '',
          title: "",
        }
      ],
    };
  },
  created: function() {
    Indicator.open("加载中...");
    axiosGetAPI("/Users/message?limit=20&category=留修任务通知").then(
      res => {
        if(res.result){
          Indicator.close();
          this.messageData=res.result;
          console.log(this.messageData)
        }
      }
    );
  },
  methods: {}
};
</script>

<style Scoped>
.messageItem{
  padding: 10px 15px;
  background: #ffffff;
  margin:10px; 
  border-radius: 5px;
}
.messageItem .item_top{display: flex;justify-content: space-between;}
.messageItem .item_top .item_status{font-size:14px;font-weight: 700;color: #333333 }
.messageItem .item_top .item_time{font-size: 12px; color: #666666}
.messageItem .item_title{color:#666666}

</style>