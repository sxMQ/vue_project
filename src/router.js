// 把路由模块抽离出来
// 创建路由连接有5步：
// 1.创建router-link标签，这个标签是vue-router提供的
// 2.创建对应的路由组件    模块化后 前两步实际就是创建的vue文件即组件 然后导入到路由模块中即可

// 3.把路由连接和组件之间的对应关系，通过路由对象来创建  模块化后这一步即在router.js文件中 被称为路由模块

// 4.将new出来的router实例挂载到VM实例上  VM实例在入口文件中 所以需要将router实例暴露给入口文件 而入口文件需要导入才能成功挂载
// 5.添加router-view这个路由组件的容器 添加到这个组件中父组件（父组件放在自己的父组件上直到根组件）上的template部分中 也就是说 这部分组件控制住的是哪里就放在哪里 


// 这个模块主要是完成创建路由连接的第3步
// 创建路由规则
// 第一步：导包
import VueRouter from 'vue-router'

// 第四步：书写路由规则
// 先导入路由相关的组件
import HomeContainer from './component/tabbars/HomeContainer.vue'
import MemberContainer from './component/tabbars/MemberContainer.vue'
import CartContainer from './component/tabbars/CartContainer.vue'
import SearchContainer from './component/tabbars/SearchContainer.vue'
import NewsList from './component/news/newsList.vue'
import NewsInfo from './component/news/newsInfo.vue'
import Photolist from './component/photos/photolist.vue'
// 第二步：创建路由对象实例
const router = new VueRouter({
    // 用routes节点来规定有哪些路由规则
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/cart',component:CartContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/newsList',component:NewsList},
        {path:'/home/newsInfo:id',component:NewsInfo,props:true},
        {path:'/home/photolist',component:Photolist}
    ],
    linkActiveClass:'mui-active'//设置路由高亮的类
})
//第三步：将router对象实例暴露出去
export default router
