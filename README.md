## 项目部署

### 1.基本构建之后的第一步
+ 安装vue包 
  ```
  yarn add vue -S
  ```
  vue是来处理的组件的但是webpack不能处理，所以还需要安装相应的处理器
+ 安装相应的loader
  ```
  yarn add vue-loader vue-template-compiler -D
  ```
### 2.将路由模块抽离出来
1.创建router-link标签，这个标签是vue-router提供的
2.创建对应的路由组件  模块化后 前两步实际就是创建的vue文件即组件 然后导入到路由模块中即可

3.把路由连接和组件之间的对应关系，通过路由对象来创建  模块化后这一步即在router.js文件中 被称为路由模块

4.将new出来的router实例挂载到VM实例上  VM实例在入口文件中 所以需要将router实例暴露给入口文件 而入口文件需要导入才能成功挂载
5.添加router-view这个路由组件的容器 添加到这个组件中父组件（父组件放在自己的父组件上直到根组件）上的template部分中 也就是说 这部分组件控制住的是哪里就放在哪里 

### 3.根组件的基本设置
1.使用Mint-UI提供的Header组件，实现头部区域 使用的是mint-ui ``` yarn add mint-ui -S```
2.使用MUI提供的tabbar实现底部区域

### 4.tab栏切换用到的路由
1.安装```yarn add vue-router -S```
2.在main.js文件中导入 vue-router  并给vue安装vue-router          
  ``` 
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  ```
3.封装路由模块router.js，书写路由规则  
  依旧要先导入vue-router包 在创建router实例 并将这个实例暴露出去
  路由规则在实例中的配置对象的routes节点上
4.给main.js文件中导入路由规则模块，并将其挂载在VM实例上
5.改造路由把普通标签改为router-link
6.创建对应的组件 .vue文件
7.在router.js文件导入路由相关的组件 书写路由规则
8.链接有了，组件有了，组件和链接之间的对应关系也有了 router也挂载到了VM实例上还差最后一步 添加容器
9.设置路由高亮的类 在router.js中的路由配置对象中有一个routerActiveClass的节点 赋类名就可以切换类名实现高亮的效果

### 5.使用动画实现组件之间的切换
组件之间的切换主要是父组件上子组件进入进出动画 所以这一步是在父组件的样式中来写 而且html结构中需要用transition将要控制的组件包裹起来
```
.v-enter { // 动画进入前的状态以及位置
	opacity: 0;
	transform: translateX(100%);
	
}
.v-leave-to {// 动画离开到什么位置
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active, // 进入和出去时的动作 就是transition
.v-leave-active{
	transition:all 1s ease;
}
```

### 6.home组件中的轮播图
1.使用mint-ui中的swipe组件
2.要获取数据来渲染轮播图 在vue中发送数据请求使用 axios 下包 
```yarn add axios -S  ```
3.导入axios并挂载 挂载是挂载在vue的原型对象上
```
import axios from 'axios'
Vue.prototype.$http = axios
```
4.在methods中创建获取轮播图数据的方法 使用async 和 await 
5.获取到的是数组或者对象 需要通过v-for渲染在页面 这里数据只能从data中获取 这里是组件需要在data(){}方法中创建一个数据

### 7.配置全局axios根路径
```
import axios from 'axios'
axios.defaults.baseURL = "http://39.106.32.91:3000"
Vue.prototype.$http = axios
```

### 8.使用axios提供的拦截器实现loading效果
1.添加拦截器要注意最好添加到根组件上，使用axios提供的Interceptor，创建一个拦截器的方法（查文档:https://www.npmjs.com/package/axios）
2.拦截器的样式使用mint-ui中的拦截器（查文档:https://mint-ui.github.io/docs/#/en2/indicator）

### 9.根组件上的返回按钮处理（编程式导航）
1.就是给按钮添加绑定事件，调用路由的go方法即可
2.首页时隐藏返回按钮，需要用watch监听hash值（就是用watch监听改变的路由地址这个地址在$route）
3.但这里有个问题需要注意 当用户在使用非首页的其他页面时如果在当时的页面上刷新 会先触发data中flag数据 watch只有数据发生改变时才会被触发 这里要强制触发watch 在watch中添加一个immediate属性值为true
在watch中监听一个路由路径它可以写成一个对象，里面有一个处理函数有一个强制执行watch中的处理函数的属性immediate