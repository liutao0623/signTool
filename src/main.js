// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import axios from 'axios';
import 'element-ui/lib/theme-chalk/index.css';
import md5 from 'js-md5';
import utils from './common/util.js'
import config from './common/config.js'

// 引用API文件
import api from './api/index.js'
// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.utils = utils
Vue.prototype.config = config
Vue.prototype.$md5 = md5;
Vue.use(ElementUI);
Vue.config.productionTip = false

import promise from 'es6-promise'
promise.polyfill();

console.log(API_URL,'当前环境'+process.env.NODE_ENV);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
