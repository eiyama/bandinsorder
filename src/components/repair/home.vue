<template>
 <div>
  <mt-header fixed title="新建工单">
  </mt-header>
    <div class="ils">
      <div>
        <div class="information">车辆基本信息</div>
        <mt-field class="mint-formItm" label="车牌号" :disabled="true">
                <input class="mint-input" type="text" placeholder="请输入车牌号" v-model="dateils.plateNo" v-verify="dateils.plateNo" >
          </mt-field>
           <mt-field class="mint-formItm" label="客户姓名" :disabled="true">
                <input class="mint-input" type="text" placeholder="请输客户(车主/联系人)姓名" v-model="dateils.name">
           </mt-field>
           <mt-field class="mint-formItm" label="客户电话" :disabled="true">
                <input class="mint-input" type="text" placeholder="请输电话" v-model="dateils.phone"  >
           </mt-field>
           <mt-field class="mint-formItm" label="推修类型" type="text" :disabled="true">
                    <span @click="RepairType">
                    <input class="mint-input" readonly="readonly" type="text" placeholder="请选择" 
                    v-model="shRepairType" v-verify="dateils.pushRepairType">
                    <i class="ico-arrow"></i>
                    </span>
                </mt-field>
                 <label class="mt-err-tip"></label>
                <mt-popup v-model="rType" position="bottom" popup-transition="popup-fade">
                    <div class="picker-toolbar">
                        <span @click="pushRepairType=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span @click="pushRepairType" class="mint-datetime-action mint-datetime-confirm">确定</span>
                    </div>
                   <mt-picker :slots="Pushrepairtype" @change="onpushRepairType"></mt-picker>
                </mt-popup>
      </div>
      <div>
        <div class="information">保险报案信息</div>
                <mt-field class="mint-formItm" label="保险公司" type="text" :disabled="true">
                    <span @click="Insurancecompany">
                    <input class="mint-input" readonly="readonly" type="text" placeholder="请选择"  v-model="insCorpCode" v-verify="dateils.insCorpCode">
                    <i class="ico-arrow"></i>
                    </span>
                </mt-field>
                 <label class="mt-err-tip" v-remind="dateils.insCorpCode"></label>
                <mt-popup v-model="insuredVehilots" position="bottom" popup-transition="popup-fade">
                    <div class="picker-toolbar">
                        <span @click="insuredVehilots=false" class="mint-datetime-action mint-datetime-cancel">取消</span>
                        <span @click="selInsureVehilots" class="mint-datetime-action mint-datetime-confirm">确定</span>
                    </div>
                   <mt-picker :slots="Vehilots" @change="oninsCorpCode" ></mt-picker>
                </mt-popup>

           <mt-field class="mint-formItm" label="报案号" :disabled="true">
                <input class="mint-input" type="text" placeholder="请输入报案号"   v-model="dateils.reportNo">
           </mt-field>
            <mt-field class="mint-formItm last" label="报案时间" type="text" :disabled="true">
                <span @click="selRegisterDate">
                <input class="mint-input" type="text" placeholder="请选择报案时间" readonly="readonly" v-model="dateils.reportTime" v-verify="dateils.reportTime">
                <i class="ico-arrow"></i></span>   
            </mt-field>
            <label class="mt-err-tip" v-remind="dateils.reportTime"></label>
             <mt-datetime-picker
                ref="reportTime"
                v-model="reportTime"
                :startDate="startDate"
                :endDate="endDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="registerDateConfirm">
            </mt-datetime-picker>
           <mt-field class="mint-formItm" label="报案地址" :disabled="true">
                <input class="mint-input" type="text" placeholder="请输报案地址" v-model="dateils.reportAddress" >
           </mt-field>
      </div>
      <div>
         <div class="information">车辆服务状况</div>
               <mt-field label="是否可行驶" type="text" :disabled="true" class="mint-formItm">
                    <span class="mint-plane fn-clear"><mt-radio  v-verify="dateils.carCanMoveStatus" v-model="dateils.carCanMoveStatus" :options="[{label: '未知', value: 'Unknown'}, {label: '可行驶', value: 'Travel'}, {label: '不可行驶', value: 'NoTravel'}]"></mt-radio></span>
                </mt-field>
                <label class="mt-err-tip"></label>
            <mt-field class="mint-formItm" label="接车员" :disabled="true">
                <input class="mint-input" type="text" placeholder="请选择" v-model="conductorUserPhone" @click="xuan">
            </mt-field>
      </div>
       <div class="foore">
        <span class="btn" @click="Preservation">保存</span>
       </div>
    </div>
    </div>
</template>
<script>
  var code = ['','中国人保','太平洋保险','国寿财险' ,'中国平安' ,'中国大地', '阳光保险', '华安财险' ]
  var conductor = []
  var rType = ['','返修','送修','其他']
  import { Toast,Indicator } from 'mint-ui';
  import store from './../../store/store';
  import Common from '../../common/common';      /* 公共函数 */
  import * as types from './../../store/types';
  import event from './../../common/event';
  import {axiosGetAPI,axiosPostAPI} from './../../common/Axios';
  import bottomTab from './../bottomtab/bottom-tab'
  export default{
     name:'test-keep-alive',
      data() {  
          return {
            includedComponents:"home",
            Vehilots: [{flex: 1, values:Object.values(code), className: 'slot1'}],
            Conductor: [{flex: 1, values:Object.values(conductor), className: 'slot1'}],
            Pushrepairtype: [{flex: 1, values:Object.values(rType), className: 'slot1'}],
            insuredVehilots:false,
            registerDate:false,
            inConductor:false,
            rType:false,
            startDate: new Date('2010-08-15'),
                endDate: new Date(this.Common.Public.GetDateStr(0)),
                registerDate: this.Common.Public.GetDateStr(0),
              dateils: {"insCorpCode": "","insCorpShortName": "","plateNo": "","vin": "","model": "","phone": "","name": "",'conductorUserId':'1',
              "reportNo": "","reportAddress": "","reportTime": "","reportRemark": "","smsContent": "",
              'carCanMoveStatus':'','pushRepairType':'', 'pushRepairSMSId':'','conductorUserPhone':''
               },
            insCorpCode:'',
            conductorUserPhone:'',
            registerDate:'',
            reportTime:'',
            shRepairType:''
          }
      },
      created:function(){ 
        localStorage.removeItem('insureInfoApp');
        localStorage.removeItem('quoteInfoStatus');
        localStorage.removeItem('smsId');
         var homeApp = localStorage.getItem('homeApp')
        // if(homeApp){
        //     var resultData = JSON.parse(homeApp);
        //     this.city = resultData;
        // }
        var appId = this.$route.query.appid || this.$route.query.appId;
        Indicator.open('加载中...');
        document.title = '留修工单';
        var appId = this.Common.Public.getQueryString("appId");
        if(appId)
        {
          localStorage.setItem('appId',appId);
        }
        var smsId = this.Common.Public.getQueryString("smsId");
        if(smsId)
        {
          localStorage.setItem('smsId',smsId);
        }
          if(localStorage.getItem('smsId'))
          {
         var url = '/vi/repairOrder/parsingSMS?smsId='+smsId;
         axiosGetAPI(url).then((res)=>{
               Indicator.close();
               if (res.result) {
                 this.dateils=res.result
                 if (this.dateils.insCorpCode=='cpic') {this.insCorpCode='太平洋保险'}
                 if (this.dateils.insCorpCode=='picc') {this.insCorpCode='中国人保'}
                 if (this.dateils.insCorpCode=='guoshou') {this.insCorpCode='国寿财险'}
                 if (this.dateils.insCorpCode=='pingan') {this.insCorpCode='中国平安'}
                 if (this.dateils.insCorpCode=='dadi') {this.insCorpCode='中国大地'}
                 if (this.dateils.insCorpCode=='sinosig') {this.insCorpCode='阳光保险'}
                 if (this.dateils.insCorpCode=='bandins') {this.insCorpCode='深圳邦德'}
                 if (this.dateils.insCorpCode=='sinosafe') {this.dateils.insCorpCode='华安财险'}
                 this.dateils.pushRepairSMSId = smsId
               if (this.dateils.pushRepairType=="Rework") {this.shRepairType="返修"};
               if (this.dateils.pushRepairType=="Repair") {this.shRepairType="送修"};
               if (this.dateils.pushRepairType=="Other")  {this.shRepairType="其他"};
               }
          })
       }else
       {
        this.$router.push({path:"/quoteManagement/worklists"})
       }
    }, 
    activated:function(){
      this.conductorUserPhone = this.$route.query.name
      this.dateils.conductorUserPhone = this.$route.query.id
    },
      methods:{
        xuan:function(){
          this.$router.push({path:"/quoteManagement/Conductor"})
        },  
      onpushRepairType(picker, values){    //滑动推修类型
               this.shRepairType = values[0];
        },
        RepairType:function(){
           this.rType = true;   //打开推修类型选择层 
        }, 
        pushRepairType:function(){
           this.rType = false;  //选择推修类型
           this.shRepairType = this.shRepairType;
           this.dateils.pushRepairType = this.shRepairType
            if (this.shRepairType=="返修" ) {this.dateils.pushRepairType="Rework"};
            if (this.shRepairType=="送修")  {this.dateils.pushRepairType="Repair"};
            if (this.shRepairType=="其他")  {this.dateils.pushRepairType="Other"};
        },
        oninsCorpCode(picker, values){    //滑动保险公司
               this.insCorpCode = values[0];
        },
        Insurancecompany:function(){
           this.insuredVehilots = true;   //打开号保险公司选择层 
        }, 
        selInsureVehilots:function(){
           this.insuredVehilots = false;  //选择保险公司
           this.dateils.insCorpCode = this.insCorpCode
          if (this.dateils.insCorpCode=='太平洋保险') {this.dateils.insCorpCode='cpic'}
          if (this.dateils.insCorpCode=='中国人保') {this.dateils.insCorpCode='picc'}
          if (this.dateils.insCorpCode=='国寿财险') {this.dateils.insCorpCode='guoshou'}
          if (this.dateils.insCorpCode=='中国平安') {this.dateils.insCorpCode='pingan'}
          if (this.dateils.insCorpCode=='中国大地') {this.dateils.insCorpCode='dadi'}
          if (this.dateils.insCorpCode=='阳光保险') {this.dateils.insCorpCode='sinosig'}
          if (this.dateils.insCorpCode=='深圳邦德') {this.dateils.insCorpCode='bandins'}
          if (this.dateils.insCorpCode=='华安财险') {this.dateils.insCorpCode='sinosafe'}
        },
         onVehicletype(picker, values){    //滑动保险公司
               this.conductorUserPhone = values[0];
        },
        selRegisterDate: function () { // 打开报案日期选择层
            this.registerDate=true;
            this.reportTime = new Date(this.dateils.reportTime);
            this.$refs.reportTime.open();
        },
        registerDateConfirm: function(){ // 选择报案日期
            this.dateils.reportTime = this.Common.Public.dateString(this.reportTime)
            this.$refs.reportTime.close();
        },
        openBack:function(){
                 window.history.back();
              },
        Preservation:function(){
          this.dateils.conductorUserId = '1'
             var self = this;
            if (!self.dateils.plateNo){
                Toast('请填写车牌号')
                return false
           }else{
            if (!this.Verify.validate.plateNo(self.dateils.plateNo)) {
                 Toast('请正确填写车牌号')
                return false
            }
           }
           if (!self.dateils.name){
                Toast('请填写客户姓名')
                return false
           }
           if(!self.dateils.phone){
              Toast('请填写手机号');
              return false
            }else{
                if(!this.Verify.validate.IsTeleMobilePNumber(self.dateils.phone)){
                    Toast('请正确填写手机号');
                    return false;
                }
            }
            if(!self.dateils.insCorpCode){
              Toast('请选择');
              return false
            }
            if(!self.dateils.carCanMoveStatus){
              Toast('选择是否可行驶');
              return false
            }
            if(!self.dateils.conductorUserPhone){
              Toast('选择接车员');
              return false
            }
            else{
               if (this.shRepairType=='返修') {this.dateils.pushRepairType='Rework'};
               if (this.shRepairType=='送修') {this.dateils.pushRepairType='Repair'};
               if (this.shRepairType=='其他') {this.dateils.pushRepairType='Other'};
               var param = this.dateils
                axiosPostAPI('/vi/repairOrder/saveRepairOrder',param).then((res)=>{
                  this.$router.push({path:"/quoteManagement/worklists"});
                }).catch(err=>{
                    console.log(err);
                });
            }
        }
      },
      verify: {
        dateils :{
              plateNo: [{
                    test: function(val){
                        if(!this.Verify.validate.plateNo(val)){
                            return false;
                        }
                        return true
                    },
                    message: '请正确填写车牌号'
                }],
            }
          }
  }
</script>
<style Scoped>
  .information{height: 25px; background-color: rgba(242, 242, 242, 1);padding-left:10px;font-size: 12px;color: #999999;
   line-height: 20px; padding-top: 15px;border-bottom:0.5px solid #E6E6E6;}
   .ils{margin-top: 44px;}
   .mint-field-core{display: none;}
   .mint-formItm{padding-left:20px;}
   .mint-cell-text{color:#999999; }
   .mint-radiolist .mint-cell{float: left;}
   .mint-radiolist-label{padding: 0;}
   .mint-radio-label{margin-left: 0;}
   .foore{height: 60px; background-color: rgba(242, 242, 242, 1);font-size: 12px; border-bottom:0.5px solid #E6E6E6;display: flex;justify-content: space-around;align-items: center;}
   .btn{width:90%;height: 50%;border-radius: 3px; background-color: rgba(0, 102, 255, 1);display: block;line-height: 25px;text-align: center;color: #fff;font-size: 16px;}
/*   .picker-items div:nth-child(4){display: none;}
   .picker-items div:nth-child(5){display: none;}*/
</style>
