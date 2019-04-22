<template>
  <div>
    <mt-header fixed class="def-header cust-head" title="个人信息">
       <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div class="personal-info-box">
      <div class="personal-info" >
        <ul class="info_item">
          <li>
            <p>头像</p> 
            <img class="my-head" src="../../assets/images/icon-profile.svg" alt>
          </li>
           <li>
            <p>用户名</p> 
            <span>{{accountName}}</span>
          </li>
          <li >
            <p>姓名</p> 
            <span>{{sellerName}}</span>
          </li>
           <li >
            <p>公司</p> 
            <span>{{sellerOrgName}}</span>
          </li>
          <li >
            <p>部门</p> 
            <span>{{sellerDeptName}}</span>
          </li>
        </ul>
<!-- 样式冲突可能要用
        <mt-field class="mtt-field" label="头像" disabled>
          <img class="my-head" src="../../assets/images/icon-profile.svg" alt>
        </mt-field>
        <mt-field class="mtt-field" label="用户名" disabled>
          <span class="my-gray">{{accountName}}</span>
        </mt-field>
        <mt-field class="mtt-field" label="姓名" disabled >
          <span class="my-gray">{{sellerName}}</span>
        </mt-field>
        <mt-field class="mtt-field" label="公司" disabled >
          <span class="my-gray">{{sellerOrgName}}</span>
        </mt-field>
        <mt-field class="mtt-field" label="部门" disabled >
          <span class="my-gray">{{sellerDeptName}}</span>
        </mt-field> -->
      </div>
      <mt-button class="mt20" type="default" size="large" @click="Signout" v-show="hide">安全退出</mt-button>
      <!-- @click="Signout" -->
    </div>
 
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
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
      label: "",
      accountName: "",
      sellerName: "",
      sellerOrgName:"",
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
    Indicator.open("加载中...");
    axiosPostAPI("/vi/account", param).then(res => {
      Indicator.close();
      this.accountName = res.result.accountName;
      this.sellerOrgName = res.result.sellerOrgName;
      this.sellerName = res.result.sellerName;
      this.sellerDeptName = res.result.sellerDeptName;
    });
  },
  methods: {
    openBack: function() {
      window.history.back();
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
.personal-info-box{
margin-top:20px;
background:#f9f9f9;
}
.personal-info{
  margin-top: 10px;
}
/* .def-header{
  color: #383838;
  font-weight: 700;
  background: #ffffff;
  border-bottom: 1px solid #eee;
} */



.mt20{
  background: #ffffff;
  color: #2451a6;
  margin-top: 50px;
}
.mt-my-head {
  display: flex;
  justify-content: space-between;
  z-index: 999;
 
}
.my-gray{color: #666666;}
.info_item{background: #ffffff}
.info_item li{border-top: 0.5px solid #eee;border-bottom: 1px solid #eee;line-height:54px;height: 54px;width: 100%;padding: 0 10px;  }
.info_item li p{float: left}
.info_item li span{float: right;margin-right: 25px;}
.my-head {
  display: inline-block;
  width: 54px;
  height: 54px;
  background-color: #eee;
  border-radius: 50%;
      float: right;
    margin-right: 20px;
}


/* .my-info{display: flex} */
</style>