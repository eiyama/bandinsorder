<template>
	<div>
		<mt-header fixed title="交车">
            <div slot="left">
                <mt-button @click="openBack">取消</mt-button> 
            </div>
            <mt-button slot="right" @click='Preservation'>保存</mt-button>
      </mt-header>
      
      <div class="cenmen">
      <mt-field class="mint-formItm" label="实际支付费用" :disabled="true">
        <input class="mint-input" type="text" placeholder="请输入" v-model='Turninacar.paymentAmount'>
      </mt-field>
         <mt-field label="费用承担方" type="text" :disabled="true" class="mint-formItm">
                    <span class="mint-plane fn-clear">
                      <mt-radio  v-model="Turninacar.paymentModeType" :options="[{label: '保险公司', value: 'InsCorp'}, {label: '车主', value: 'Customer'}, {label: '双方共担', value: 'Common'}]">
                      </mt-radio>
                    </span>
          </mt-field>
     <label class="mt-err-tip"></label>
    	</div>
	</div>
</template>
<script>
    import { Toast,Indicator } from 'mint-ui';
    import event from './../../common/event';
    import {axiosGetAPI,axiosPostAPI} from './../../common/Axios';
    	export default{
		 name:'Newwork',
	    data() {  
	        return {
	        	insuredVehilots:false,
	        	registerDate:false,
	          Turninacar:{ "repairOrderId": "","paymentModeType": "","paymentAmount": ""},
	        }
	    },
      created:function(){ 
         var self =this
         self.Turninacar.repairOrderId = self.$route.query.id
         axiosGetAPI('/vi/repairOrder/getRepairOrder?repairOrderId='+ self.Turninacar.repairOrderId)
         .then((res)=>{
          this.orderdetails = res.result
          this.Turninacar.paymentAmount = this.orderdetails.fixedAmount
        })
      },
	    methods:{
         openBack:function(){
           window.history.back();
        },
        Preservation:function(){
          if (this.Turninacar.paymentAmount=='') {
            Toast('请输入实际支付费用')
            return false;
          }else {
            if (!this.Turninacar.paymentAmount) {
              Toast('输入有误')
              return false;
            }
          }
          if (this.Turninacar.paymentModeType=='') {
            Toast('请选择费用承担方')
            return false;
          }
          else{
            var Turninacar = this.Turninacar
            var id = this.Turninacar.repairOrderId
            // this.$router.push({path:"/quoteManagement/orderdetails?id"+id})
            axiosPostAPI("/vi/repairOrder/payment",Turninacar).then(res => {
        // var id = this.statedata.repairOrderId;
         window.history.back();
          
           })
          }
        }
	    }
	}
</script>
<style Scoped>
   .information{height: 25px; background-color: rgba(242, 242, 242, 1);padding-left:10px;font-size: 12px;color: #999999; line-height: 20px; padding-top: 15px;border-bottom:0.5px solid #E6E6E6;}
   .ils{margin-top: 44px;}
   .mint-field-core{display: none;}
   .mint-formItm{padding-left:20px;}
   .mint-cell-text{color:#333333; }
   .mint-radiolist .mint-cell{float: left; width: 100%!important;}
   .mint-radiolist-label{padding: 0;}
   .mint-radio-label{margin-left: 0;}
   .foore{height: 45px; background-color: rgba(242, 242, 242, 1);font-size: 12px; border-bottom:0.5px solid #E6E6E6;display: flex;justify-content: space-around;align-items: center;}
   .btn{width:90%;height: 70%;border-radius: 3px; background-color: rgba(0, 102, 255, 1);display: block;line-height: 25px;text-align: center;color: #fff;font-size: 16px;}	
   /* .cenmen{margin-top: 64px;} */
   .mint-radio-label{font-size: 13px;}
   .mint-radiolist-label{padding: 0;}
</style>
