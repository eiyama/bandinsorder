<template>
  <div>
    <mt-header fixed title="更新跟进状态">
      <div slot="left">
        <mt-button @click="openBack">取消</mt-button>
      </div>
      <mt-button slot="right" @click="Preservation">保存</mt-button>
    </mt-header>
    <div>
      <mt-field class="mint-formItm" label="跟进状态" type="text" :disabled="true">
        <span @click="openVehilots">
          <input
            class="mint-input"
            readonly="readonly"
            type="text"
            placeholder="请选择跟进状态"
            v-model="status"
          >
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <label class="mt-err-tip" v-model="statedata.status"></label>
      <mt-popup v-model="insuredVehilots" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="insuredVehilots=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="selInsureVehilots" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker :slots="Vehilots" @change="onVehicletype"></mt-picker>
      </mt-popup>

      <mt-field
        class="mint-formItm"
        label="不回店原因"
        type="text"
        :disabled="true"
        v-show="Thereasonis"
      >
        <span @click="opReason">
          <input
            class="mint-input"
            readonly="readonly"
            type="text"
            placeholder="请选择不回店原因"
            v-model="noReturnFactoryStatus"
          >
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <label class="mt-err-tip" v-model="statedata.noReturnFactoryStatus"></label>
      <mt-popup v-model="inopReason" position="bottom" popup-transition="popup-fade">
        <div class="picker-toolbar">
          <span @click="inopReason=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
          <span @click="Determinethecause" class="mint-datetime-action mint-datetime-confirm">确定</span>
        </div>
        <mt-picker :slots="Reason" @change="onReason"></mt-picker>
      </mt-popup>
      <mt-field label="是否设置提醒" type="text" :disabled="true" class="mint-formItm">
        <span class="mint-plane fn-clear">
          <mt-radio
            v-model="statedata.isSetRemind"
            :options="[{label: '是', value: 'true'}, {label: '否', value: 'false'}]"
          ></mt-radio>
        </span>
      </mt-field>
      <mt-field
        class="mint-formItm last"
        label="提醒时间"
        type="text"
        :disabled="true"
        v-show="statedata.isSetRemind=='true'"
      >
        <span @click="selRegisterDate">
          <input
            class="mint-input"
            type="text"
            placeholder="请选择提醒时间"
            readonly="readonly"
            v-model="statedata.reportTime"
          >
          <i class="ico-arrow"></i>
        </span>
      </mt-field>
      <label class="mt-err-tip" v-remind="statedata.reportTime"></label>
      <mt-datetime-picker
        ref="reportTime"
        v-model="reportTime"
        :startDate="startDate"
       
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="registerDateConfirm"
      ></mt-datetime-picker>
      <div class="div-formItm">
        <p>跟进内容</p>
        <textarea id="text_inp" rows="4" cols="50"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Indicator } from "mint-ui";
import event from "./../../common/event";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
export default {
  name: "Newwork",
  data() {
    return {
      Vehilot: [],
      ReasonState: [],
      insuredVehilots: false,
      remindTimedata: false,
      ReasonData: false,
      registerDate: false,
      Showthereason: false,
      inopReason: false,
      Thereasonis: false,
      startDate: new Date(),    
      registerDate: this.Common.Public.GetDateStr(0),
      statedata: {
        repairOrderId: "",
        status: "",
        content: "",
        statedatastatedata: "",
        reportTime: "",
        noReturnFactoryStatus: "",
        isSetRemind: ""
      },
      reportTime: "",
      description: [],
      status: "",
      registerDate: "",
      noReturnFactoryStatus: "",
      stateDate: [{ value: "", description: "", subWordBooks: [{}] }],
      stateDate2: []
    };
  },
  created: function() {
    var self = this;
    self.statedata.repairOrderId = self.$route.query.id;
    
    Indicator.open("加载中...");
    axiosGetAPI(
      "/vi/repairOrder/getWordBooks?moduleName=" +
        "维修管理" +
        "&type=" +
        "跟进状态"
    ).then(res => {
      if (res.result) {
        Indicator.close();
        this.stateDate = res.result;
        var arr = [""];
        for (var i = 0; i < this.stateDate.length; i++) {
          arr.push(this.stateDate[i].description);
        }
        this.Vehilot = arr;
      }
    });
    axiosGetAPI(
      "/vi/repairOrder/getWordBooks?moduleName=" +
        "维修管理" +
        "&type=" +
        "不回厂原因"
    ).then(res => {
      if (res.result) {
        this.stateDate2 = res.result;
        var arr1 = [""];
        for (var i = 0; i < this.stateDate2.length; i++) {
          arr1.push(this.stateDate2[i].description);
        }
        console.log(arr1)
        this.ReasonState = arr1
      }
    });
  },
  computed: {
    Vehilots() {
      let _Vehilots = [
        {
          flex: 1,
          values: Object.values(this.Vehilot),
          className: "slot1",
          textAlign: "center"
        }
      ];
      return _Vehilots;
    },
    Reason(){
      let _Reason =[
        { flex: 1,
          values: Object.values(this.ReasonState),
          className: "slot1",
          textAlign: "center"}
      ]
      return _Reason
    }
  },
  methods: {

    loadState:function(moduleName, type){
         Indicator.open("加载中...");
        axiosGetAPI(
          "/vi/repairOrder/Summary?moduleName=" + moduleName +"&type=" + type
        ).then(res => {
      if (res.result) {
        Indicator.close();
        this.stateDate = res.result;
        var arr1 = [""];
        var arr2 = [''];
        for (var i = 0; i < this.stateDate.length; i++) {
          arr1.push(this.stateDate[i].description);
          arr2.push(this.stateDate[i].value);
        }
      }
    });
    },
    onVehicletype(picker, values) {
      //滑动
      if(values[0]){
        this.status = values[0];
      }
     else{
        this.status = '';
     }
     
    },
    openVehilots: function() {
      //打开状态
      this.insuredVehilots = true;
    },
    selInsureVehilots: function() {
      //选择状态
      this.insuredVehilots = false;
      this.statedata.status = this.status;
        console.log(this.statedata.status)
      for (var i = 0; i < this.stateDate.length; i++) {
        if (this.statedata.status == this.stateDate[i].description) {
          this.statedata.status = this.stateDate[i].value;
        }
      }
      if (this.statedata.status == "WB6366899450883613130063") {
        this.Thereasonis = true;
      }
      else{
        this.Thereasonis = false;
      }
    },
    onReason(picker, values) {
      //滑动不回厂原因
      this.noReturnFactoryStatus = values[0];
    },
    opReason: function() {
      //打开不回厂原因
      this.inopReason = true;
    },
    Determinethecause: function() {
      //选择不回厂原因
      this.inopReason = false;
      this.statedata.noReturnFactoryStatus = this.noReturnFactoryStatus;
    },


    Preservation: function() {
     if (this.statedata.status == "") {
        Toast("请选择跟进状态");
        return false;
      }if(this.statedata.status == "WB6366899450883613130063" && this.statedata.noReturnFactoryStatus == ''){
        Toast("请选择不回店原因");
         return false;
      }
      else {
         var model = this.statedata;
        axiosPostAPI("/vi/repairOrder/saveRepairTrack", model).then(res => {
        var id = this.statedata.repairOrderId;
            window.history.back();
          }
        );
      }
    },
    openBack: function() {
      window.history.back();
    },
    selRegisterDate: function() {
      // 打开报案日期选择层
      this.registerDate = true;
      this.reportTime = new Date();
      this.$refs.reportTime.open();
    },
    registerDateConfirm: function() {
      // 选择报案日期
      this.statedata.reportTime = this.Common.Public.dateString(
        this.reportTime
      );
      this.$refs.reportTime.close();
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
.mint-cell-wrapper
{
   border-bottom: none; 
}
.mint-formItm {
  padding-left: 20px;
}
.mint-cell-text {
  color: #333333;
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
.picker-items div:nth-child(4) {
  display: none;
}
.picker-items div:nth-child(5) {
  display: none;
}
.picker-slot-wrapper div:nth-child(4) {
  display: block;
}
.picker-slot-wrapper div:nth-child(5) {
  display: block;
}

/* .mint-cell:last-child{display: block; z-index: 99} */
</style>
