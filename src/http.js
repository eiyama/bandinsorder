import axios from 'axios'
import Common from './common/common' /* 公共函数 */
import store from './store/store'
import * as types from './store/types'
import router from './router'

axios.defaults.timeout = 60000;
axios.defaults.baseURL = process.env.API_ROOT;

axios.interceptors.request.use(
  config => {

    var appId, token;

    appId = store.state.appId;
    token = store.state.token;

    if (window.localStorage.getItem('appId')) {
      appId = window.localStorage.getItem('appId');
    }

    if (window.localStorage.getItem('token')) {
      token = window.localStorage.getItem('token');
      token = token.replace(appId + '_', '');
    }

    if (!appId) {
      store.commit(types.APPIDLOSE);
      router.replace({
        path: '/errPage',
        query: { redirect: router.currentRoute.fullPath }
      });
    }

    config.headers["x-appid"] = appId;

    if (token) {
      token = token.replace(appId + '_', '');
    }

    config.headers["Authorization"] = token;

    return config;
  },
  err => {
    return Promise.reject(err);
  });

export default axios;
