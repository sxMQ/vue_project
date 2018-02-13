// 项目入口文件
// 导入vue包
import Vue from 'vue'
// 导入vue-router包
import VueRouter from 'vue-router'
// 为vue安装vue-router
Vue.use(VueRouter)

// 导入axios并挂载
import axios from 'axios'
axios.defaults.baseURL = "http://39.106.32.91:3000"
Vue.prototype.$http = axios


// 导入根组件
import App from './component/App.vue'

// 根组件用到mint-ui库 需要下载包 并导入到入口文件中  不用记  查文档即可
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
// 为vue安装MintUI
Vue.use(MintUI)



// 导入美化mui样式
import './lib/mui/css/mui.css'
// 导入mui扩展图标的样式表
import './lib/mui/css/icons-extra.css'
// 导入路由模块
import router from './router.js'

// 创建一个vue 实例
const VM = new Vue({
    el:'#app',
    render: c => c(App),//把根组件作为creatElement方法的参数 在render过程中渲染
    router //将路由模块挂载到VM实例上
})