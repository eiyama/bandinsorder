<template>
  <div>
    <mt-header fixed title="维修登记">
      <div slot="left">
        <mt-button @click="openBack">取消</mt-button>
      </div>
      <mt-button slot="right" @click="Preservation">保存</mt-button>
    </mt-header>
    <div class="cenmen">
      <mt-field class="mint-formItm" label="维修状态" type="text" :disabled="true">
        <span @click="openVehilots">
          <input
            class="mint-input"
            readonly="readonly"
            placeholder="请选择维修状态"
            v-model="repairsStatus"
          >
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <label class="mt-err-tip"></label>
      <mt-popup v-model="insuredVehilots" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="insuredVehilots=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="selInsureVehilots" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker :slots="Vehilots" @change="oninsCorpCode"></mt-picker>
      </mt-popup>
      <mt-field label="是否发送短信" type="text" :disabled="true" class="mint-formItm">

        <span class="mint-plane fn-clear">
          <mt-radio
            v-model="checked"
            :options="[{label: '是', value: 'true'}, {label: '否', value: 'false',}]"
          >
          </mt-radio>
        </span>
      </mt-field>
      <mt-field label="客户电话" :disabled="true" v-show="checked=='true'"  type="text" class="mint-formItm">
        <input v-model="registration.phone">
      </mt-field>

       <div class="div-formItm" :disabled="true" v-show="checked=='true'" >
        <p>维修状态短信</p>
        <textarea id="text_inp" rows="4" cols="50" v-model="registration.smsContent"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
var code = ["", "准备配件", "维修中", "质检中", "维修完成"];
import { Toast, Indicator } from "mint-ui";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
export default {
  name: "Newwork",
  data() {
    return {
      // telephone:'',
      Vehilots: [{ flex: 1, values: Object.values(code), className: "slot1" }],
      insuredVehilots: false,
      registration: {
        repairOrderId: "",
        repairsStatus: "",
        smsContent: "",
        hasSendSMS: "",
        phone: ""
      },
      repairsStatus: "",
      checked:"false",
    };
  },
  created: function() {
    var self = this;
    self.registration.repairOrderId = self.$route.query.id;
    var id = self.registration.repairOrderId;
    axiosGetAPI("/vi/repairOrder/getRepairSchedule?repairOrderId=" + id).then(
      res => {
        this.registration = res.result;
      }
    );
  },
  methods: {
    oninsCorpCode(picker, values) {
      //滑动保险公司
      
      if(values[0]){
        this.repairsStatus = values[0];
      }
     else{
        this.repairsStatus = '';
     }
    },
    openVehilots: function() {
      this.insuredVehilots = true;
    },
    Whether: function() {
      console.log(0);
    },
    StateSMS: function() {},
    selInsureVehilots: function() {
      this.insuredVehilots = false;
      this.registration.repairsStatus = this.repairsStatus;
      if (this.registration.repairsStatus == "准备配件") {
        this.registration.repairsStatus = "PrepareParts";
      }
      if (this.registration.repairsStatus == "维修中") {
        this.registration.repairsStatus = "InMaintenance";
      }
      if (this.registration.repairsStatus == "质检中") {
        this.registration.repairsStatus = "QualityTesting";
      }
      if (this.registration.repairsStatus == "维修完成") {
        this.registration.repairsStatus = "RepairFinish";
      }
      this.registration.hasSendSMS = this.checked;
      var repairsStatus = this.registration.repairsStatus;
      var id = this.registration.repairOrderId;
      axiosGetAPI(
        "/vi/repairOrder/getRepairSchedule?repairOrderId=" +
          id +
          "&repairsStatus=" +
          repairsStatus
      ).then(res => {
        this.registration.smsContent = res.result.smsContent;
      });
    },
    Preservation: function() {
      //点击保存
      if (this.repairsStatus == "") {
        Toast("请选择维修状态");
        return false;
      }

      if(this.checked == 'true'){
        if (this.registration.phone == "") {
          Toast("请输入手机号码");
          return false;
        }

        if (this.registration.smsContent == "") {
          Toast("请输入短信内容");
          return false;
        }
      }
      
      var registration = this.registration;
      axiosPostAPI("/vi/repairOrder/repairSchedule", registration).then(
        res => {
          window.history.back();
          // var id = this.registration.repairOrderId;
          //  this.$router.push({path:'/repair/orderdetails?id=' + id})
        }
      );
    },
    openBack: function() {
      window.history.back();
    }
  }
};
</script>
<style Scoped>
.information {
  height: 25px;
  background-color: rgba(242, 242, 242, 1);
  padding-left: 10px;
  font-size: 12px;
  color: #999999;
  line-height: 20px;
  padding-top: 15px;
  border-bottom: 0.5px solid #e6e6e6;
}
.ils {
  margin-top: 44px;
}
.mint-field-core {
  display: none;
}
.mint-formItm {
  padding-left: 20px;
}
.mint-cell-text {
  color: #333333;
}
.mint-radiolist .mint-cell {
  float: left;
  width: 33%;
}
.mint-radiolist-label {
  padding: 0;
}
.mint-radio-label {
  margin-left: 0;
}
/* .mt-radio{
  border: 0px;
} */
.textarea {
  position: relative;
  right: 0px;
  top: 0px;
  width: 100%;
  border: 1px solid #eeeeee;
}
.cenmen{margin-top: 0px;}
.foore {
  height: 45px;
  background-color: rgba(242, 242, 242, 1);
  font-size: 12px;
  border-bottom: 0.5px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn {
  width: 90%;
  height: 70%;
  border-radius: 3px;
  background-color: rgba(0, 102, 255, 1);
  display: block;
  line-height: 25px;
  text-align: center;
  color: #fff;
  font-size: 16px;
}
.div-formItm {
  background: #ffffff;
  line-height: 20px;
  padding: 15px;
  color: #999999;
  font-size: 14px;
}
.div-formItm #text_inp {
  height: 100px;
  width: 100%;
  border: 1px solid #eeeeee;
  margin-top: 10px;
  padding: 5px;
}
</style>
