<template>
  <div>
    <mt-header fixed title="关闭">
      <div slot="left">
        <mt-button @click="openBack">取消</mt-button>
      </div>
      <mt-button slot="right" @click="Preservation">关闭</mt-button>
    </mt-header>
    <div class="cenmen">
      <mt-field class="mint-formItm" label="关闭原因" type="text" :disabled="true">
        <span @click="openVehilots">
          <input
            class="mint-input"
            readonly="readonly"
            placeholder="请选择关闭原因"
            v-model="closedCategory"
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
      <mt-field class="mint-formItm" label="关闭描述" :disabled="true">
        <textarea
          class="textarea"
          type="text"
          placeholder="请填写关闭描述"
          v-model="registration.closeRemark"
        ></textarea>
      </mt-field>
    </div>
  </div>
</template>

<script>
var code = ["", "不维修", "不定损"];
import { Toast, Indicator } from "mint-ui";
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
export default {
  name: "Newwork",
  data() {
    return {
      Vehilots: [{ flex: 1, values: Object.values(code), className: "slot1" }],
      insuredVehilots: false,
      registration: { repairOrderId: "", closedCategory: "", closeRemark: "" },
      closedCategory: ""
    };
  },
  created: function() {
    var self = this;
    self.registration.repairOrderId = self.$route.query.id;
  },
  methods: {
    oninsCorpCode(picker, values) {
      if(values[0]){
         this.closedCategory = values[0];
      }
      else{
        this.closedCategory = '' ;
      }
     
    },
    openVehilots: function() {
      this.insuredVehilots = true;
    },
    selInsureVehilots: function() {
      this.insuredVehilots = false;
      this.registration.closedCategory = this.closedCategory;
    },
    Preservation: function() {
      //点击保存
    //   console.log(this.closedCategory);
      if (this.closedCategory == "") {
        Toast("请选择关闭原因");
        return false;
      }
      if (this.registration.closeRemark == "") {
        Toast("请填写关闭描述");
        return false;
      } else {
        var registration = this.registration;
        axiosPostAPI("/vi/repairOrder/close", registration).then(res => {
              window.history.back();
        });
      }
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
.mint-field-core{
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
/* .cenmen{margin-top: 64px;} */
.textarea {
  height: 60px;
  width: 245px;
  padding-top: 10px;
  padding-bottom: 10px;
}
.mint-cell:last-child{background: #ffffff;}
</style>
