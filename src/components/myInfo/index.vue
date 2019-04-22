<template>
  <div>
    <mt-header fixed title="个人中心"></mt-header>
    <div class="_wrap-content">
      <div class="_my-info" @click="TomyInfo">
        <div class="_mt-my-head">
          <img class="_my-head" src="../../assets/images/icon-profile.svg" alt>
        </div>
        <div class="_my-detail">
          <p >{{accountName}}</p>
          <p id="department">{{sellerName}}-{{sellerDeptName}}</p>
        </div>
        <span></span>
      </div>
      <div class="_transpond">
        
      </div>
      <!-- @click="Signout" -->
    </div>
    <div class="container-bottom">
      <bottomTab ref="bottomTab" :plant.sync="plante"></bottomTab>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Indicator } from "mint-ui";
import bottomTab from "./../bottomtab/bottom-tab";
import router from "./../../router";
import store from "./../../store/store";
import * as types from "./../../store/types";
export default {
  name: "",
  data() {
    return {
      selected: "1",
      plante: "myInfo",
      title: "",
      accountName: "",
      sellerName: "",
      sellerDeptName: "",
      token: "",
      hide: true
    };
  },
  components: {
    bottomTab
  },
  created: function() {
    var authMode = localStorage.getItem("authMode");
    if (authMode == "SingleUserMode") {
      this.hide = false;
    }
    var localToken = localStorage.getItem("token");
    if (localToken) {
      localToken = localToken.replace(localStorage.getItem("appId") + "_", "");
    }
    let param = {
      token: localToken
    };
    axiosPostAPI("/vi/account", param).then(res => {
      this.accountName = res.result.accountName;
      this.sellerName = res.result.sellerOrgName;
      this.sellerDeptName = res.result.sellerDeptName;
    });
  },
  methods: {
    TomyInfo:function() {
        router.push({path:"/myInfo/myInfo"})
    },
    Signout: function() {
      var self = this;
      store.commit(types.LOGOUT);
      router.push({ path: "/login" });
    }
  }
};
</script>
<style scoped>
._wrap-content{
  background: #eeeeee;
  /* min-height: 550px; */
}
._my-info{
  /* margin-top: 44px; */
  height: 70px;
  width:100%; 
  padding: 10px;
  display: flex;
 align-items: center;
 position: relative;
 background: #ffffff
}
._my-info ._my-detail{
  margin: 15px;
}
._my-info ._my-detail #department{color:#666666}

._my-info span{
  font-size: 18px;
  position: absolute;
   color: #a4a4a4;
  right: 40px;
}
._transpond{
  margin-top: 10px; 
}
</style>