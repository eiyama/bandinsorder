<template>
  <div>
    <mt-header fixed title="定损登记">
      <div slot="left">
        <mt-button @click="openBack">取消</mt-button>
      </div>
      <mt-button slot="right" @click="Preservation">保存</mt-button>
    </mt-header>

    <div class="cenmen">
      <div class="a"></div>
      <mt-field class="mint-formItm" label="定损总金额(元)" :disabled="true">
        <input class="mint-input" type="text" placeholder="请输入" v-model="orderloss.fixedAmount">
      </mt-field>
      <mt-field class="mint-formItm" label="添加定损项目" :disabled="true">
        <p @click="tianjia" class="jia">点击此添加</p>
      </mt-field>
      <div v-for="item in fixedItems">
        <mt-field class="mint-formItm" label="定损项目" :disabled="true">
          <input class="mint-input" type="text" placeholder="请输入" v-model="item.fixedItems">
        </mt-field>
      </div>
    </div>
  </div>
</template>
<script>
import { axiosGetAPI, axiosPostAPI } from "./../../common/Axios";
import { Toast, Indicator } from "mint-ui";
export default {
  name: "Newwork",
  data() {
    return {
      insuredVehilots: false,
      orderloss: { repairOrderId: "", fixedAmount: "", fixedItems: "" },
      orderdetails: [],
      fixedItems: [],
      dataa: []
    };
  },
  created: function() {
   
    var self = this;
    self.orderloss.repairOrderId = self.$route.query.id;
    axiosGetAPI(
      "/vi/repairOrder/getRepairOrder?repairOrderId=" +
        self.orderloss.repairOrderId
    ).then(res => {
      this.orderdetails = res.result;
      this.orderloss.fixedAmount = this.orderdetails.fixedAmount;
    });
  },
  methods: {
  
    openBack: function() {
      window.history.back();
    },
    Preservation: function() {
      console.log(this.orderloss);
      if (this.orderloss.fixedAmount == "") {
        Toast("请输入金额");
        return false;
      }
  
      this.fixedItems.map(item => {
        this.dataa.push(item.fixedItems);
        this.dataa.toString();
      });
      this.orderloss.fixedItems = this.dataa.toString();
      if(this.orderloss.fixedItems == ''){
        Toast('请输入定损项目详情')
        return false;
      }
      var model = this.orderloss;
      axiosPostAPI("/vi/repairOrder/fixed", model).then(res => {
        if (res) {
            window.history.back();
          
        }
      });
    },
    tianjia: function() {
      var obj = { fixedItems: "" };
      this.fixedItems.push(obj);
       
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
/* .cenmen {
  margin-top: 64px;
} */
.jia {
  font-size: 15px;
}
.mint-cell{background: #fff;}
.mint-cell:last-child {background: #ffffff;}
</style>
