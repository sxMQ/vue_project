// 项目的JS打包入口文件
import Vue from 'vue'

import app from './component/App.vue'

new Vue({
  el: '#app',
  render: c => c(app)
})