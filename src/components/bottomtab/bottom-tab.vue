<template>
  <div>
    <div class="wrap-bottom" :value="bottomNav">
      <div class="bottom-tab">
        <div class="bottom-nav">
          <div
            class="buttom-item"
            :class="{ 'cur': bottomNav=='home'}"
            value="home"
            @click="handleChange"
          >
            <div class="item-wrapper">
              <i class="icon-icon-home"></i>留修工单
            </div>
          </div>
          <div
            class="buttom-item"
            :class="{ 'cur': bottomNav=='message'}"
            value="message"
            @click="handleChange"
          >
            <div class="item-wrapper">
              <i class="icon-icon-customer"></i>消息提醒
            </div>
          </div>
          <div
            class="buttom-item"
            :class="{ 'cur': bottomNav=='dataAnalyze'}"
            value="dataAnalyze"
            @click="handleChange"
          >
            <div class="item-wrapper">
              <i class="icon-icon-orders"></i>数据分析
            </div>
          </div>
          <div
            class="buttom-item"
            :class="{ 'cur': bottomNav=='myInfo'}"
            value="myInfo"
            @click="handleChange"
          >
            <div class="item-wrapper">
              <i class="icon-icon-userCenter"></i>个人中心
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottomTab",
  props: {
    plant: ""
  },
  data() {
    return {
      bottomNav: "home",
      appId: ""
    };
  },
  mounted: function() {
    this.bottomNav = this.plant;
  },
  methods: {
    // 点击按钮
    handleChange(e) {
      let val = $(e.currentTarget).attr("value");
      let url = "/";
      let appIdParam = {};

      this.bottomNav = val;
      this.appId = localStorage.getItem("appId");

      if (val == "home") {
        url = "/";
        appIdParam = {
          appId: this.appId
        };
      } else if (val == "message") {
        url = "/message/index";
      } else if (val == "dataAnalyze") {
        url = "/dataAnalyze";
      } else if (val == "myInfo") {
        url = "/myInfo/index";
      }
      // 路由跳转至当前点击的页面
      this.$router.push({
        path: url,
        query: appIdParam
      });
    }
  }
};
</script>

<style>
.wrap-bottom {
  position: fixed;
  z-index: 1;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  border-top: 1px solid #f9f9f9;
}

.wrap-bottom .bottom-tab {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #fff;
  text-align: center;
  color: #ffffff;
}

.wrap-bottom .bottom-nav {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: center;
}

.wrap-bottom .buttom-item {
  color: #c9cbd6;
  -webkit-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-width: 80px;
  max-width: 168px;
  position: relative;
  height: 100%;
  padding: 0;
  background: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  text-decoration: none;
  border: none;
  outline: none;
  transition: all 0.4s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.wrap-bottom .item-wrapper {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  height: 100%;
  font-size: 10px;
}

.wrap-bottom .item-wrapper i {
  display: block;
  margin-bottom: 2px;
  font-size: 18px;
}

.wrap-bottom .item-wrapper i:before {
  color: #a7b3c9;
}
</style>
