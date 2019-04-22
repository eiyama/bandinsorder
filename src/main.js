import Vue from 'vue'
import router from './router'
import App from './App.vue'
import store from './store/store'
import Verify from './common/verify'      /* 校验文件 */
import Common from './common/common'      /* 公共函数 */
import MintUI from 'mint-ui'
import axios from './http.js'
import 'mint-ui/lib/style.css'
import './assets/css/theme.scss'    /*主题css*/
import './assets/js/jquery.js'      /* jQuery库文件 */
import BScroll from 'better-scroll'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
Vue.use(Mint);

Vue.use(MintUI)

Vue.config.productionTip = false
Vue.prototype.Verify = Verify
Vue.prototype.Common = Common
Vue.prototype.$axios= axios
Vue.prototype.$event= new Vue();
Vue.prototype.center = new Vue({})
/* 数组去重 */
Array.prototype.unique = function(){
    var res = [this[0]];
    for(var i = 1; i < this.length; i++){
        var repeat = false;
        for(var j = 0; j < res.length; j++){
            if(this[i] == res[j]){
                repeat = true;
                break;
            }
        }
        if(!repeat){
            res.push(this[i]);
        }
    }
    return res;
}

new Vue({
  el: '#app',
  router,
  axios,
  store,
  template: '<App/>',
  components: { App },
  data: {
        eventHub: new Vue()
    }
})