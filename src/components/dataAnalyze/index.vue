<template>
  <div>
    <mt-header fixed title="数据分析"></mt-header>
    <div class="container-center">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">
          <span @click="todayDate">今日数据</span>
        </mt-tab-item>
        <mt-tab-item id="2">
          <span @click="historyDate">历史数据</span>
        </mt-tab-item>
      </mt-navbar>
      <div class="main">
        <!-- tab-container -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <!-- 表格1 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>工单处理分析</caption>
              <div class="tab_wt" v-for="item in statisticsByStatusData">
                <td>
                  <p>{{item.key}}</p>
                </td>
                <td>
                  <p>{{item.value}}</p>
                </td>
              </div>
            </table>
            <!-- 表格2 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>工单来源分析</caption>
              <tr v-for="item in statisticsBySourceData">
                <td>{{item.key}}</td>
                <td>
                  <p>{{item.value}}</p>
                </td>
              </tr>
            </table>
            <!-- 表格3 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>外拓到店率分析</caption>
              <div class="tab_wt" v-for="item in statisticsBySourceTypeData">
                <td>{{item.key}}</td>
                <td>
                  <p>{{item.value}}</p>
                </td>
              </div>
            </table>
            <!-- 表格4 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>保险公司推送线索到店率分析</caption>
              <tr>
                <th>分类</th>
                <td>
                  <p class="tddeta">线索量</p>
                </td>
                <td>
                  <p class="tddeta">到店量</p>
                </td>
                <td>
                  <p class="tddeta">到店率</p>
                </td>
              </tr>
              <tr v-for="item in statisticsByRepairTypeData">
                <td>{{item.key}}</td>
                <td>
                  <p class="tddeta">{{item.value[0]}}</p>
                </td>
                <td>
                  <p class="tddeta">{{item.value[1]}}</p>
                </td>
                <td>
                  <p class="tddeta">{{item.value[2]}}</p>
                </td>
              </tr>
            </table>
            <table class="mint-table5" cellpadding="0" cellspacing="0">
              <caption>保险公司分析</caption>
              <tr>
                <td id="tadd_5">
                  <p>保险公司</p>
                </td>
                <td id="tadd_5">
                  <p>工单总量</p>
                </td>
                <td>
                  <p class="tddeta">待跟进</p>
                </td>
                <td>
                  <p class="tddeta">跟进中</p>
                </td>
                <td>
                  <p class="tddeta">已回店</p>
                </td>
                <td>
                  <p class="tddeta">战败</p>
                </td>
              </tr>
              <tr class="insurance_company" v-for="item in statisticsByInsCorpData">
                <td v-for=" _item in item ">
                  <p>{{_item.value}}</p>
                </td>
              </tr>
            </table>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!-- 表格1 -->

            <div class="condition_time">
              <div class="condition_left">
                <input type="radio" name="time" checked @click="setDate_week">近一周
                <input type="radio" name="time" @click="setDate_month">本月
              </div>
              <div class="condition_right">
                <mt-datetime-picker
                  ref="reportTime"
                  type="date"
                  v-model="reportTime"
                  year-format="{value} 年"
                  month-format="{value} 月"
                  date-format="{value} 日"
                  :startDate="startDate"
                  @confirm="registerDateConfirm"
                ></mt-datetime-picker>
                <span @click="selRegisterDate">
                  <p>{{beginDate}}</p>
                  <i id="arrow_down_left">
                    <img src="./../../assets/images/ic_arrow_down_black.png" alt>
                  </i>
                </span>
                <h3 id="isfont">至</h3>
                <mt-datetime-picker
                  ref="reportTime2"
                  type="date"
                  v-model="reportTime2"
                  year-format="{value} 年"
                  month-format="{value} 月"
                  date-format="{value} 日"
                  :startDate="startDate"
                  @confirm="expirationDate"
                ></mt-datetime-picker>
                <span @click="getexpirationDate">
                  <p>{{endDate}}</p>
                  <i id="arrow_down_right">
                    <img src="./../../assets/images/ic_arrow_down_black.png" alt>
                  </i>
                </span>
              </div>
            </div>

            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>工单处理分析</caption>
              <div class="tab_wt" v-for="item in statisticsByStatusData">
                <td>{{item.key}}</td>
                <td>
                  <p class="tddeta">{{item.value}}</p>
                </td>
              </div>
            </table>
            <!-- 表格2 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>工单来源分析</caption>
              <tr v-for="item in statisticsBySourceData">
                <td>{{item.key}}</td>
                <td>
                  <p class="tddeta">{{item.value}}</p>
                </td>
              </tr>
            </table>
            <!-- 表格3 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>外拓到店率分析</caption>
              <div class="tab_wt" v-for="item in statisticsBySourceTypeData">
                <td>{{item.key}}</td>
                <td>
                  <p class="tddeta">{{item.value}}</p>
                </td>
              </div>
            </table>
            <!-- 表格4 -->
            <table class="mint-table" cellpadding="0" cellspacing="0">
              <caption>保险公司推送线索到店率分析</caption>
              <tr>
                <th>分类</th>
                <td>
                  <p class="tddeta">线索量</p>
                </td>
                <td>
                  <p class="tddeta">到店量</p>
                </td>
                <td>
                  <p class="tddeta">到店率</p>
                </td>
              </tr>
              <tr v-for="item in statisticsByRepairTypeData">
                <td>{{item.key}}</td>
                <td>
                  <p class="tddeta">{{item.value[0]}}</p>
                </td>
                <td>
                  <p class="tddeta">{{item.value[1]}}</p>
                </td>
                <td>
                  <p class="tddeta">{{item.value[2]}}</p>
                </td>
              </tr>
            </table>
            <table class="mint-table5" cellpadding="0" cellspacing="0">
              <caption>保险公司分析</caption>
              <tr>
                <td id="tadd_5">
                  <p>保险公司</p>
                </td>
                <td id="tadd_5">
                  <p>工单总量</p>
                </td>
                <td>
                  <p class="tddeta">待跟进</p>
                </td>
                <td>
                  <p class="tddeta">跟进中</p>
                </td>
                <td>
                  <p class="tddeta">已回店</p>
                </td>
                <td>
                  <p class="tddeta">战败</p>
                </td>
              </tr>
              <tr class="insurance_company" v-for="item in statisticsByInsCorpData">
                <td class="item_insurance_company" v-for=" _item in item ">
                  <p>{{_item.value}}</p>
                </td>
              </tr>
            </table>
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
import {
  Toast,
  TabContainer,
  TabContainerItem,
  Indicator,
  Navbar,
  TabItem,
  DatetimePicker
} from "mint-ui";
import bottomTab from "./../bottomtab/bottom-tab";

export default {
  name: "",
  components: { bottomTab, Navbar, TabItem },
  data() {
    return {
      plante: "dataAnalyze",
      reportTime: "",
      selected: "1",
      beginDate: "",
      startDate: new Date("2014-01-01"),
      endDate: "",

      reportTime2: "",
      registerDate: false,
      // registerDate2:false,
      statDate: {
        month: "",
        date: "",
        year: "",
        reportTime: "",
        reportTime2: ""
      },
      statisticsByStatusData: [
        {
          key: "",
          value: ""
        }
      ],
      statisticsBySourceData: [
        {
          key: "",
          value: ""
        }
      ],
      statisticsBySourceTypeData: [
        {
          key: "",
          value: ""
        }
      ],
      statisticsByRepairTypeData: [
        {
          key: "",
          value: []
        }
      ],
      statisticsByInsCorpData: [
        [
          {
            key: "",
            value: ""
          }
        ]
      ]
    };
  },
  created: function() {
    var myDate = new Date();
    var time = "";
    time = myDate.getFullYear();
    var Month = myDate.getMonth() + 1;
    var _Date = "";
    _Date = myDate.getDate();
    time = time + "-" + Month + "-" + _Date;
    this.beginDate = time;
    this.endDate = time;
    this.statDate = new Date(time);
    this.loadData(this.beginDate, this.endDate);
  },
  mounted() {},
  methods: {
    loadData: function(beginDate, endDate) {
      Indicator.open("加载中...");
      axiosGetAPI(
        "/vi/repairOrder/Summary?beginDate=" + beginDate + "&endDate=" + endDate
      ).then(res => {
        if (res.result) {
          Indicator.close();
          this.statisticsByStatusData = res.result.statisticsByStatusData;
          this.statisticsBySourceData = res.result.statisticsBySourceData;
          this.statisticsBySourceTypeData =
            res.result.statisticsBySourceTypeData;
          this.statisticsByRepairTypeData =
            res.result.statisticsByRepairTypeData;
          this.statisticsByInsCorpData = res.result.statisticsByInsCorpData;
          console.log(this.statisticsBySourceData);
        }
      });
    },
    setDate_week() {
      var myDate = new Date();
      var time = "";
      time = myDate.getFullYear();
      var Month = myDate.getMonth() + 1;
      var _Date = "";
      _Date = myDate.getDate();
      if (_Date <= 7) {
        if (Month == 1) {
          time = time - 1;
          Month = 12 + Month - 1;
          _Date = _Date + 31 - 7;
        } else if (Month == 3 || 5 || 7 || 8 || 10 || 12) {
          _Date = _Date + 31 - 7;
        } else if (Month == 4 || 6 || 9 || 11) {
          _Date = _Date + 30 - 7;
        } else if (Month == 2) {
          if ((time % 4 == 0 && time % 100 != 0) || time % 400 == 0) {
            _Date = _Date + 29 - 7;
          } else {
            _Date = _Date + 28 - 7;
          }
        }
        Month = Month - 1;
      } else {
        _Date = _Date - 7;
      }
      time = time + "-" + Month + "-" + _Date;
      this.beginDate = time;
      console.log(this.beginDate);
      console.log(this.endDate);
      this.loadData(this.beginDate, this.endDate);
    },
    todayDate() {
      var myDate = new Date();
      var time = "";
      time = myDate.getFullYear();
      var Month = myDate.getMonth() + 1;
      var _Date = "";
      _Date = myDate.getDate();
      time = time + "-" + Month + "-" + _Date;
      this.beginDate = time;
      this.endDate = time;
      this.statDate = new Date(time);
      this.loadData(this.beginDate, this.endDate);
    },
    historyDate() {
      var myDate = new Date();
      var time = "";
      time = myDate.getFullYear();
      var Month = myDate.getMonth() + 1;
      var _Date = "";
      _Date = myDate.getDate();
      if (_Date <= 7) {
        if (Month == 1) {
          time = time - 1;
          Month = 12 + Month - 1;
          _Date = _Date + 31 - 7;
        } else if (Month == 3 || 5 || 7 || 8 || 10 || 12) {
          _Date = _Date + 31 - 7;
        } else if (Month == 4 || 6 || 9 || 11) {
          _Date = _Date + 30 - 7;
        } else if (Month == 2) {
          if ((time % 4 == 0 && time % 100 != 0) || time % 400 == 0) {
            _Date = _Date + 29 - 7;
          } else {
            _Date = _Date + 28 - 7;
          }
        }
        Month = Month - 1;
      } else {
        _Date = _Date - 7;
      }
      time = time + "-" + Month + "-" + _Date;
      this.beginDate = time;
      console.log(this.beginDate);
      console.log(this.endDate);
      this.loadData(this.beginDate, this.endDate);
    },

    setDate_month() {
      var myDate = new Date();
      var time = "";
      time = myDate.getFullYear();
      var Month = myDate.getMonth() + 1;
      var _Date = "";
      _Date = myDate.getDate();
      this.beginDate = time + "-" + Month + "-" + 1;
      time = time + "-" + Month + "-" + _Date;
      this.endDate = time;
      this.loadData(this.beginDate, this.endDate);
    },
    selRegisterDate: function() {
      // 打开报案日期选择层
      this.registerDate = true;
      // this.reportTime = new Date(this.statDate.reportTime);
      this.reportTime = new Date();
      this.$refs.reportTime.open();
    },
    registerDateConfirm: function() {
      // 选择报案日期
        this.statDate.reportTime = this.Common.Public.dateString(this.reportTime);
      if (this.beginDate > this.endDate) {
        Toast({
          message: "起始日期不能大于截止日期请重新选择",
          position: "bottom",
          duration: 1000
        });
      } else {
        this.beginDate = this.statDate.reportTime;
        this.loadData(this.beginDate, this.endDate);
      }
      this.$refs.reportTime.close();
    },

    getexpirationDate: function() {
      // 打开报案日期选择层
      this.registerDate = true;
      this.reportTime2 = new Date();
      this.$refs.reportTime2.open();
    },
    expirationDate: function() {
      // 选择报案日期
         this.statDate.reportTime2 = this.Common.Public.dateString(this.reportTime2);
      if (this.beginDate > this.statDate.reportTime2) {
        Toast({
          message: "起始日期不能大于截止日期请重新选择",
          position: "bottom",
          duration: 1000
        });
      } else {
        this.endDate = this.statDate.reportTime2;
        console.log(this.beginDate);
      }
      this.$refs.reportTime2.close();
    }
  }
};
</script>

<style Scoped>
.main {
  padding: 10px;
  color: #666;
}
.mint-table,
.mint-table5 {
  /* margin: 10px 10px; */
  background: #ffffff;
  border: 0px;
  border-radius: 3px;
}
.mint-table,
.mint-table5 tr {
  margin: 10px 0px;
}
.mint-table caption {
  border-bottom: 1px solid #eee;
  background: #ffffff;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #636363;
}
.mint-table td {
  border: 0;
  width: 20%;
  color: #606060;
}
.mint-table th {
  border: 0;
  width: 20%;
  color: #606060;
}

.mint-table table {
  border: 0;
}
.tab_wt {
  width: 50%;
  float: left;
}

.mint-table5 caption {
  border-bottom: 1px solid #eee;
  background: #ffffff;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: #636363;
}
.mint-table5 td {
  border: 0;
  width: 1%;
  color: #606060;
  font-size: 12px;
}
.mint-table5 #tadd_5 p {
  white-space: normal;

  font-size: 12px;
  text-align: center;
}
.mint-table5 {
  text-align: center;
  height: 30px;
  line-height: 30px;
}
.mint-table5 .insurance_company {
  border-top: 1px solid #eee;
}
.condition_time {
  height: 50px;
  background: #ffffff;
  line-height: 50px;
}
.condition_left {
  float: left;
}
.condition_right {
  position: relative;
  float: right;
}
.condition_right #isfont {
  float: left;
  margin-left: 5px;
}
#arrow_down_left img {
  height: 6.5px;
  width: 10px;
  position: absolute;
  top: 24px;
  left: 73px;
}
#arrow_down_right img {
  position: absolute;
  height: 6.5px;
  width: 10px;
  top: 24px;
  right: 1px;
}
.condition_right p {
  float: left;
  margin: 0 14px;
  color: blue;
}
</style>