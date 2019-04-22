<template>
    <div class="login">
        <mt-header fixed class="def-header" title="">
            <mt-button class="mint-head-close" icon="more" @click="closePage" slot="right" v-show="false"><i class="ico-login ico-close"></i></mt-button>
        </mt-header>
        <div class="mint-content mint-region">
            <h3 class="mint-login-hd">
                Hello!<br>
                欢迎登录{{title}}
            </h3>
            <mt-field class="mint-formItm" :disabled="true">
                <i class="ico-login ico-userName"></i>
                <input class="mint-input" v-model="login.userName" v-verify="login.userName" type="text" placeholder="请输入用户名">
            </mt-field>
            <label class="mt-err-tip" v-remind="login.userName"></label>
            <mt-field class="mint-formItm" :disabled="true">
                <i class="ico-login ico-password"></i>
                <input class="mint-input"  v-model="login.password" v-verify="login.password" type="password" placeholder="请输入密码">
            </mt-field>
            <label class="mt-err-tip" v-remind="login.password"></label>
            <mt-button class="btn-login" type="primary" @click="subLogin" size="large">登录</mt-button>
        </div>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
import * as types from './../../store/types';
import event from './../../common/event';
import {axiosGetAPI,axiosPostAPI} from './../../common/Axios';
export default {
    name: 'login',
    data () {
        return {
            title: '',
            login:{
                userName:'',
                password:''
            }
        }
    },
    verify: {
        login :{
            userName: ['isRequired'],
            password: ['isRequired']
        }
    },
    methods:{
        closePage:function(){
            this.$router.push({path:"/",query:{appId: localStorage.getItem('appId')}});
        },
       subLogin:function(){
          var self = this;
          if (self.$verify.check()) {
            Indicator.open('加载中...');
            axiosPostAPI('/token', self.login).then((res) => {
              Indicator.close();
              self.$store.commit(types.LOGININFO, self.login);
              self.$store.commit(types.LOGIN, res.result.token);
              var appId = localStorage.getItem('appId');
              localStorage.setItem('token', appId + '_' + res.result.token);
              self.$router.push({ path: "/", query: { appId: localStorage.getItem('appId') } });
            });
          }
        }

    },
    created:function(){
        this.$store.commit(types.TITLE, 'Login');
        var appId = localStorage.getItem('appId');
        Indicator.open('加载中...');
        axiosGetAPI('/apis/apps/'+appId+"/H5").then((res) => {
            Indicator.close();
            this.title = res.result.name;
            //var smsId =localStorage.getItem('smsId');
        });
    }
}
</script>
<style scoped>
.login { position: absolute; top: 0; left: 0; width: 100%; height: 100%; max-width: 480px; font-size: 10px; background: url(../../assets/images/background.jpg); background-size: cover; background-repeat: no-repeat; }
.login .mint-content { padding: 50px 12% 0; }
.login .mint-region,
.login .mint-header.def-header,
.login .mint-region input,
.login .mint-region .mint-cell { background: none; }
.login .mint-login-hd { font-size: 24px; color: #fff; font-weight: 400; }
.login .mint-region input { color: #fff; }
.login .mint-region input::-webkit-input-placeholder { color: #e0e0e0; }
.login .mint-region input:-moz-placeholder { color: #e0e0e0; }
.login .mint-region input::-moz-placeholder { color: #e0e0e0; }
.login .mint-region input:-ms-input-placeholder { color: #e0e0e0;}
.login .mint-region .mint-cell { padding-left: 0; }
.login .ico-login { position: relative; top: 5px; display: inline-block; width: 24px; height: 24px; background-size: 24px 24px; background-repeat: no-repeat; }
.login .ico-login.ico-close { width: 30px; height: 30px; background-image: url(../../assets/images/ico-closew.png); background-position: center; opacity: 0.9; }
.login .ico-login.ico-userName { top:7px; background-image: url(../../assets/images/icon-phone.png); }
.login .ico-login.ico-password { top:7px; background-image: url(../../assets/images/icon-psw.png); }
.login .mint-region .mint-formItm .mint-input { width: 88%; margin-right: 0; }
.login .btn-login { margin-top: 40px; }
</style>