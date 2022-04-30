
import axios from 'axios';
import store from '../store';
import router from '../router';
import cookie from 'js-cookie';

// import api from '../api/environment';
const api = '';
// 创建axios实例
// baseURL 请求路径
const service = axios.create({
  baseURL: `/`,
  withCredentials: true
  // baseURL: `http://js.fumandi.com.cn/system/menuListAll?type=1`
});
// const getters = store.getters;
// 请求拦截
service.interceptors.request.use(
  config => {
    // 设置权限
    // config.headers['X-Requested-With'] = 'XMLhttprequest'
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);
// 响应拦截
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      const data = response.data;
      // debugger
      if (data.code) {
        // code ===S90001  登录超时
        if (data.code === 'S90001') {
          store.dispatch('common/actionTags', []);
          store.dispatch('user/actionsSetUserPage', []);
          router.push('/login');
        }
      }
      return response;
    } else {
      Promise.reject();
    }

  },
  error => {
    console.log(error);
    return Promise.reject();
  }
);

export default service;
