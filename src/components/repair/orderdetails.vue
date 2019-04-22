<template>
  <div>
    <mt-header fixed title="工单详情">
      <div slot="left">
        <mt-button icon="back" @click="openBack"></mt-button>
      </div>
    </mt-header>
    <div>
      <div class="_mt-list-top">
        <p>工单号:{{orderdetails.jobNumber}}</p>
        <p>{{orderdetails.createdTime}}</p>
      </div>
      <div class="quote">
        <h4>{{orderdetails.plateNo}}-{{orderdetails.name}}</h4>
        <p>{{orderdetails.model}}</p>
        <span>{{orderdetails.orderStatusName}}</span>
      </div>
    </div>
    <div>
      <div class="information">
        <p>短信内容</p>
      </div>
      <div class="information_detail">{{orderdetails.smsContent}}</div>
      <div class="information">
        <p>保险报案信息</p>
      </div>
      <div class="information-date">
        <table class="mint-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="35%">
            <col width="65%">
            <col>
          </colgroup>
          <tr>
            <th>保险公司</th>
            <td>{{orderdetails.insCorpShortName}}</td>
          </tr>
          <tr>
            <th>报案号</th>
            <td>{{orderdetails.reportNo }}</td>
          </tr>
          <tr>
            <th>报案时间</th>
            <td>{{orderdetails.reportTime }}</td>
          </tr>
          <tr>
            <th>报案地址</th>
            <td>{{orderdetails.reportAddress }}</td>
          </tr>
          <tr>
            <th>客户电话</th>
            <td>{{orderdetails.phone}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <!-- v-show="Servicestatus" -->
      <div class="information">车辆服务状况</div>
      <div class="information-date">
        <table class="mint-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="35%">
            <col width="65%">
            <col>
          </colgroup>
          <tr>
            <th>是否可行驶</th>
            <td v-if="panduan=='Travel'">是</td>
            <td v-if="panduan!='Travel'">否</td>
          </tr>
          <tr>
            <th>是否需要接车</th>
          <td v-if="panduan=='Travel'">否</td>
            <td v-if="panduan!='Travel'">是</td>
          </tr>
          <tr>
            <th>接车员</th>
            <td>{{orderdetails.repairOrderTrackUserName}}</td>
          </tr>
          <tr>
            <th>跟进状态</th>
            <td>
              {{orderdetails.orderStatusName}}
              <p class="tddeta" @click="Followuprecord">查看详情</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div v-show="Fixedloss">
      <div class="information">车辆定损情况</div>
      <div class="information-date">
        <table class="mint-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="35%">
            <col width="65%">
            <col>
          </colgroup>
          <tr>
            <th>定损状态</th>
            <td>
              {{fixedTime}}
              <p class="tddeta" @click="Lossrecord">定损记录</p>
            </td>
          <tr>
            <th>定损金额</th>
            <td>￥{{orderdetails.fixedAmount}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div v-show="Maintenance" >
      <div class="information">车辆维修情况</div>
      <div class="information-date">
        <table class="mint-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="35%">
            <col width="65%">
            <col>
          </colgroup>
          <tr>
            <th>维修状态</th>
            <td>
              {{orderdetails.repairsStatusName}}
              <!-- <p class="tddeta" @click="Maintenancerecord">维修记录</p> -->
            </td>
          </tr>
          <tr>
              <th>维修金额</th>
              <td>￥{{orderdetails.paymentAmount}}</td>
            </tr>
        </table>
      </div>
    </div>
    <div v-show="Trafficcondition">
      <div class="information">交车情况</div>
      <div class="information-date">
        <table class="mint-table" cellpadding="0" cellspacing="0">
          <colgroup>
            <col width="35%">
            <col width="65%">
            <col>
          </colgroup>
          <tr>
            <th>实际支付维修费</th>
            <td>{{orderdetails.paymentAmount}}</td>
          </tr>
          <tr>
            <th>费用承担方</th>
            <td>{{orderdetails.payModeName}}</td>
          </tr>
          <tr>
            <th>交车状态</th>
            <td>{{orderdetails.paiedTime}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="bto" v-show="btn">
      <button @click="actionSheet" v-show="btna">跟进</button>
      <button @click="Lossstate" v-show="btnb">定损</button>
      <button @click="Carrepairstate" v-show="btnc">维修</button>
      <button @click="Turninacar" v-show="btnd">交车</button>
      <button @click="Close" v-show="btne">关闭</button>
    </div>
  </div>
</template>            
<script>
import { Actionsheet,Indicator } from "mint-ui";
import store from "./../../store/store";
import * as types from "./../../store/types";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
export default {
  name: "orderdetails",
  data() {
    return {
      active: "tab-container1",
      _selected:'',
      condition: [
        { name: "更新跟进状态" },
        { name: "更新维修状态" },
        { name: "更新交车状态" }
      ],
      sheetVisible: false,
      Servicestatus: false,
      btn:true,
      btna: false,
      btnb: false,
      btnc: false,
      btnd: false,
      btne: false,
      Fixedloss: false,
      Trafficcondition: true,
      Maintenance: false,
      fixedTime: "",
      panduan:'',
      orderdetails: [
        [
          {
            id: "",
            jobNumber: "",
            sourceType: "",
            pushRepairType: "",
            isolationCode: "",
            insCorpCode: "",
            reportNo: "",
            reportTime: "",
            reportAddress: "",
            phone: "",
            smsContent: "",
            plateNo: "",
            model: "",
            name: "",
            orderStatus: "",
            canMoveCar: "",
            conductorUserId: "",
            conductorConfirmTime: "",
            conductorOrgCode: "",
            fixedAmount: "",
            fixedTime: "",
            repairsStatus: "",
            repairsTime: "",
            payMode: "",
            paiedTime: "",
            paymentAmount: "",
            closedTime: "",
            closedCategory: "",
            closeRemark: "",
            isCurrentUser: "",
            sourceTypeName: "",
            pushRepairTypeName: "",
            repairsStatusName: "",
            orderStatusName: "",
            payModeName: "",
            insCorpShortName: "",
            organizationName: "",
            creatorName: "",
            conductorUserName: "",
            modifiedTime: "",
            createdTime: "",
            repairOrderTrackDescription: "",
            fixedItem: [{ repairItem: "", createdTime: "" }],
            repairAttachment: [{ id: "", filePath: "" }],
            repairTrackStatus: [
              {
                status: "",
                content: "",
                isSetRemind: "",
                remindTime: "",
                createdTime: ""
              }
            ]
          }
        ]
      ]
    };
  },
  created: function() {
    Indicator.open("加载中...");
    var itemId = this.$route.query.itemId;
    axiosGetAPI("/vi/repairOrder/getRepairOrder?repairOrderId=" + itemId).then(
      res => {
                Indicator.close();
        this.orderdetails = res.result;
        if (this.orderdetails.canMoveCar == false) {
          this.orderdetails.canMoveCar = "否";
        }
        if (this.orderdetails.canMoveCar == true) {
          this.orderdetails.canMoveCar = "是";
        }
        if (this.orderdetails.paiedTime) {
          this.orderdetails.paiedTime = "已交车";
        }
        if (this.orderdetails.fixedTime != undefined) {
          this.fixedTime = "已定损";
          this.Fixedloss = true;
        }
        if (
          this.orderdetails.paymentAmount == undefined &&
          this.orderdetails.payModeName == undefined &&
          this.orderdetails.paiedTime == undefined
        ) {
          this.Trafficcondition = false;
        }
        if (this.orderdetails.repairsStatusName != undefined) {
          this.Maintenance = true;
        }
         if (
        this.orderdetails.orderStatus == "TobeConfirmed" ||
        this.orderdetails.orderStatus == "Following"
      ) {
        // 待领取
        this.btna = true;
      } else if (this.orderdetails.orderStatus == "TobePendingLoss") {
        // 待定损
        // 定损按钮
        // 关闭按钮
        this.btnb = true;
        this.btne = true;
      } else if (this.orderdetails.orderStatus == "TobeRepaired") {
        // 待维修
        // 定损按钮
        // 维修按钮
        // 关闭按钮
        this.btnb = true;
        this.btnc = true;
        this.btne = true;
      } else if (this.orderdetails.orderStatus == "Repaireing") {
        // 维修中
        // 维修按钮
        this.btnc = true;
      } else if (this.orderdetails.orderStatus == "PendingVehicle") {
        // 待交车
        // 交车按钮
        this.btnd = true;
      } else {
        this.btn = false;
      }
      this.panduan=this.orderdetails.canMoveCarStatus
      }
    );
  },
  mounted: function() {
      this._selected = this.$route.query._selected;
  },
  methods: {
    openBack: function() {
       this.$router.push(
         { 
           name:'home',
      query:{
        appId:localStorage.getItem("appId"),
        _selected:this._selected
        }
      });

    },
    actionSheet: function() {
      //跟进客户
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Followupstate?id=" + id });
    },
    Lossstate: function() {
      //定损
      var self = this;
      var id = self.orderdetails.id;
      // var fixedAmount = self.orderdetails.fixedAmount
      this.$router.push({ path: "/repair/Lossstate?id=" + id });
    },
    Carrepairstate: function() {
      //修车
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Carrepairstate?id=" + id });
    },
    Turninacar: function() {
      //交车
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Turninacar?id=" + id });
    },
    Followuprecord: function() {
      //跟进记录
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Followuprecord?id=" + id });
    },
    Maintenancerecord: function() {
      //维修记录
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Maintenance?id=" + id });
    },
    Lossrecord: function() {
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Lossrecord?id=" + id })
    },
    Close: function() {
      var self = this;
      var id = self.orderdetails.id;
      this.$router.push({ path: "/repair/Close?id=" + id });
    }
  }
};
</script>
<style scoped>
._mt-list-top {
  height: 40px;
  padding: 0 5px;
  font-size: 12px;
  color: #999999;
  line-height: 40px;
  /* margin-top: 40px; */
  background-color: rgba(247, 247, 247, 1);
}
._mt-list-top p:nth-child(1) {
  float: left;
  display: block;
  width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
._mt-list-top p:nth-child(2) {
  float: right;
}
.quote {
  width: 100%;
  text-align: center;
  padding-top: 20px;
  background: #ffffff;
}
.quote h4 {
  font-size: 16px;
  font-weight: 100;
}
.quote p {
  font-size: 12px;
  color: #999999;
  line-height: 20px;
  margin-bottom: 10px;
}
.quote span {
  color: #6699ff;
  margin-top: 6px;
  display: block;
  margin-bottom: 10px;
}
.information {
  height: 25px;
  background-color: rgba(242, 242, 242, 1);
  padding-left: 10px;
  font-size: 12px;
  color: #999999;

  line-height: 25px;
}
.information_detail {
  background: #ffffff;
  font-size: 10px;
  color: #3a3a3a;
  padding: 17px;

}
.mint-table {
  border-top: 1px solid #d8d8d8;
  font-size: 12px;
  width: 100%;
}
.mint-table td {
  border-right: 1px solid #d8d8d8;
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
  height: 23px;
  padding-left: 8px;
}
.mint-table th {
  border-bottom: 1px solid #d8d8d8;
  border-left: 1px solid #d8d8d8;
  color: #999999;
  text-align: left;
  padding-left: 8px;
  background-color: rgba(242, 242, 242, 1);
  font-weight: 100;
}
.information-date {
  padding: 17px;
  background: #ffffff;
}
.tddeta {
  float: right;
  margin-right: 5px;
  color: #0066ff;
}
.footer{
height: 15px;
background: #eeeeee;
}
.bto {
  height: 40px;
  background: #ffffff;
  font-size: 12px;
  color: #999999;
  line-height: 40px;
  display: flex;
  justify-content: space-around;
  position: fixed;
  bottom: 0;
  width: 100%;
}
.bto button {
  width: 60px;
  height: 30px;
  background: #ffffff;
  border: none;
  /* background-color: rgba(0, 102, 255, 1); */
  border-radius: 10%;
  color:  #0066ff;
  margin-top: 5px;
}
.mint-header.def-header {
  background: #0070d3;
}
.mint-header-title {
  height: 20px;
  color: #fff;
}
.mintui {
  color: #ffffff;
}
.mint-table td[data-v-dc772cfe] {
  text-align: left;
}
.mint-table td {
  text-align: left;
}
.foore {
  height: 40px;
}
</style>