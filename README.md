## 项目部署

### 1.1 基本构建之后的第一步
+ 安装vue包 
  ```
  yarn add vue -S
  ```
  vue是来处理的组件的但是webpack不能处理，所以还需要安装相应的处理器
+ 安装相应的loader
  ```
  yarn add vue-loader vue-template-compiler -D
  ```
### 1.2 将路由模块抽离出来
+ 创建router-link标签，这个标签是vue-router提供的
+ 创建对应的路由组件  模块化后 前两步实际就是创建的vue文件即组件 然后导入到路由模块中即可

+ 把路由连接和组件之间的对应关系，通过路由对象来创建  模块化后这一步即在router.js文件中 被称为路由模块

+ 将new出来的router实例挂载到VM实例上  VM实例在入口文件中 所以需要将router实例暴露给入口文件 而入口文件需要导入才能成功挂载
+ 添加router-view这个路由组件的容器 添加到这个组件中父组件（父组件放在自己的父组件上直到根组件）上的template部分中 也就是说 这部分组件控制住的是哪里就放在哪里 

### 1.3 根组件的基本设置
+ 使用Mint-UI提供的Header组件，实现头部区域 使用的是mint-ui ``` yarn add mint-ui -S```
+ 使用MUI提供的tabbar实现底部区域

### 1.4 tab栏切换用到的路由
+ 安装```yarn add vue-router -S```
+ 在main.js文件中导入 vue-router  并给vue安装vue-router          
  ``` 
  import VueRouter from 'vue-router'
  Vue.use(VueRouter)
  ```
+ 封装路由模块router.js，书写路由规则  
  依旧要先导入vue-router包 在创建router实例 并将这个实例暴露出去
  路由规则在实例中的配置对象的routes节点上
+ 给main.js文件中导入路由规则模块，并将其挂载在VM实例上
+ 改造路由把普通标签改为router-link
+ 创建对应的组件 .vue文件
+ 在router.js文件导入路由相关的组件 书写路由规则
+ 链接有了，组件有了，组件和链接之间的对应关系也有了 router也挂载到了VM实例上还差最后一步 添加容器
+ 设置路由高亮的类 在router.js中的路由配置对象中有一个routerActiveClass的节点 赋类名就可以切换类名实现高亮的效果

### 1.5 使用动画实现组件之间的切换
+ 组件之间的切换主要是父组件上子组件进入进出动画 所以这一步是在父组件的样式中来写 而且html结构中需要用transition将要控制的组件包裹起来
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
### 1.6 根组件上的返回按钮处理（编程式导航）
+ 给按钮添加绑定事件，调用路由的go方法即可
+ 首页时隐藏返回按钮，需要用watch监听hash值（就是用watch监听改变的路由地址这个地址在$route）
+ 这里有个问题需要注意:当用户在使用非首页的其他页面时如果在当时的页面上刷新 会先触发data中flag数据 watch只有数据发生改变时才会被触发 这里要强制触发watch 在watch中添加一个immediate属性值为true
+ 在watch中监听一个路由路径它可以写成一个对象，里面有一个处理函数有一个强制执行watch中的处理函数的属性immediate
```
watch: {
  '$route.path': {
    handler: 处理函数,
    immediate: true // 页面刚进入，就强制监视一下数据的变化
  }
}
```

## 2.home组件
### 2.1 home组件中的轮播图
+ 使用mint-ui中的swipe组件
+ 要获取数据来渲染轮播图 在vue中发送数据请求使用 axios 下包 
```yarn add axios -S  ```
+ 导入axios并挂载 挂载是挂载在vue的原型对象上
```
import axios from 'axios'
Vue.prototype.$http = axios
```
+ 在methods中创建获取轮播图数据的方法 使用async 和 await 
+ 获取到的是数组或者对象 需要通过v-for渲染在页面 这里数据只能从data中获取 这里是组件需要在data(){}方法中创建一个数据

### 2.2 配置全局axios根路径
```
import axios from 'axios'
axios.defaults.baseURL = "http://39.106.32.91:3000"
Vue.prototype.$http = axios
```

### 2.3 使用axios提供的拦截器实现loading效果
+ 添加拦截器要注意最好添加到根组件上，使用axios提供的Interceptor，创建一个拦截器的方法[查文档:https://www.npmjs.com/package/axio]
+ 拦截器的样式使用mint-ui中的拦截器[查文档:https://mint-ui.github.io/docs/#/en2/indicator]

### 2.4 使用mui渲染首页九宫格
+ mui的例子中的grid-default.html

### 2.5 从首页上进入相应链接的组件——有三步（点击'新闻资讯'跳转到'新闻咨询列表'）
以后就只剩下这三步
+ 改造路由链接—— 把 `HomeContainer` 组件中的 新闻资讯按钮，改造成`router-link` 并添加 `to` 属性；
+ 创建链接对应的组件——在项目的 `src -> components -> news` 文件夹下，创建一个 `NewsList.vue` 组件；
+  在 `router.js` 中，导入`NewsList.vue` 组件，并添加一条新的路由规则；
注意：这个新创建的组件在哪一位父组件上 路由hash值要加上父组件的链接

### 2.6 新闻资讯

### 2.6.1 获取新闻列表的数据
+ 在 `NewsList.vue` 组件中，定义methods节点，并添加`getNewsList`函数；
+ 要把数据渲染到页面上；而页面要渲染数据的话，都要从data上来拿数据。所以要创建data。创建data要考虑在组件中的data要定义成一个function函数 里面返回一个对象
+ 当页面刚渲染出来的时候就要获取数据，所以要在`created`中调用一下`getNewsList`

### 2.6.2 渲染新闻列表页面
+ 使用MUI提供的`media-list.html`来创建页面的结构
+ 使用v-for指令渲染列表数据 注意：获取图片路径时要给src属性绑定v-bind 也可以直接写成 :src

### 2.6.3 使用Vue.filter定义过滤器处理时间格式

```
Vue.filter('dataFormat',function(val){
    // 可以借助moment时间包 但最后优化时会发现这儿包很大 还是改成之前格式化时间 的方法
    var dt = new Date(val)
    var y = dt.getFullYear()
    var m = (dt.getMonth()+1).toString().padStart(2,'0')
    var d = dt.getDay().toString().padStart(2,'0')
    var hh = dt.getHours().toString().padStart(2,'0')
    var mm = dt.getMinutes().toString().padStart(2,'0')
    var ss = dt.getSeconds().toString().padStart(2,'0')

    return  `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
```

### 2.6.4 点击新闻列表项跳转到新闻详情页面
+ 把每个通过`v-for`渲染的列表项，使用`router-link`包裹一下，并提供`:to`属性;注意：这个to属性中，需要携带当前这条新闻的id`<router-link :to=" '/home/newsinfo' + item.id ">`  不携带参数是to可以不加':'
+ 在`src->components->news`目录下，创建`NewsInfo.vue`组件
+ 找到`router.js`,导入`NewsInfo.vue`组件，并添加对应的路由规则；
+ 由于新闻详情页面，需要根据新闻的id获取新闻数据，所以，可以为路由规则，添加`props:true`启用props传参
+ 在`Newsinfo.vue`组件内部，定义`props:[id]`来接收并使用URL中传递的新闻id参数

### 2.6.5 获取新闻详情数据并渲染页面
+ 在 `NewsInfo.vue` 组件中，定义methods节点，并添加`getNewsInfo`函数；调用ajax获取数据，注意传入id值(get请求传入参数id)这个id是父组件传给子组件的，子组件在上面用props接收了所以在这里获取数据时只需要```this.$http.get('/api/getnew/'+this.id)```
+ 要把数据渲染到页面上；而页面要渲染数据的话，都要从data上来拿数据。所以要创建data。创建data要考虑在组件中的data要定义成一个function函数 里面返回一个对象
+ 当页面刚渲染出来的时候就要获取数据，所以要在`created`中调用一下`getNewsInfo`
+ 写页面样式并渲染。注意：文档中返回数据格式样例中带html标签的渲染时要用v-html指令

### 2.6.6 将新闻详情中评论抽成一个公共的子组件
+ 由于其他模块中也有发表评论所以这里把评论抽离成一公共的子组件
+ 在```component ```文件夹中在新建一个文件夹```subcomponent``` 这个文件夹中用于存放这个项目中一些公共的子组件
+ 在```subcomponent```中新建```comment.vue```
+ 这个子组件newInfo组件中要用，所以先按需导入
+ 在components节点上注册这个子组件，就可以在html结构中当作标签使用

### 2.6.7 在公共子组件中书写页面
+ 需要注意的是：按钮标签用的是mint-ui提供的```<mt-button type="primary" size="large"></mt-button>```标签 (这个类型的按钮是正常样式的，如果想要其他颜色就改变type的属性值，想要空心加一个plain属性)
+ 写样式即可

### 2.6.8 新闻详情父组件把新闻id传递给评论子组件并获取评论列表数据
+ 父组件向子组件传值使用v-bind: 属性绑定形式(即：父组件上有一个props属性是新闻id，直接将这个id用v-bind或者:绑定,```:id="id"```)
+ 子组件接收父组件传递的数据，用props
+ 在methods节点中定义一个获取数据的方法，需要注意的是这次传参不只是一个id还有pageindex,需要在data中定义一个pageindex变量用来存放当前默认的页数在get()方法中拼接
+ 用v-for指令渲染将数据渲染到页面上

### 2.6.9 实现加载更多评论并添加isover节流阀
+ 当点击更多按钮时应该添加绑定事件并在methods节点上添加这个事件方法（默认获取的是第一页的数据）
+ 获取更多数据就是要让pageindex自增1,直接调用现成的getComment()方法。但这里又有问题
+ 当pageindex自增后，调用getComment方法后原来的数据会被覆盖也就说上一页数据不见了，所以要处理数组的赋值
+ 应该用数组合并的方法,将旧数组和新获取的数组合并起来,用concat(新数组) 它不会改变原数组而是返回一个拼接好的新数组```this.commentlist = this.commentlist.concat(data.message)```
+ 如果没有数据了点击加载更多时还是会发起ajax请求，这种操作是不合理的，当没有数据时就不应该再发起请求了
+ 添加节流阀,原理是：先设置一个状态为false默认数据没有加载完；再发送的ajax中判断获取的数组长度如果长度小于等于0，就改变状态为true说明数据已经获取完了；最后在发送数据请求前先判断状态如果为true就不在发起请求。这样会浪费一次ajax请求

### 2.6.10 完成发表评论
+ 点击发表评论给按钮添加```@click="postCmt"```指令，并在methods节点上添加postCmt()方法
+ 用v-model获取文本域的内容,可以在点击事件的方法中打印一下看看
+ 进行数据非法值校验,去空后长度小于等于0就提示一下内容不能为空，用到Toast组件要按需导入
+ 提交数据要调用ajax接口。这里注意post提交数据传参请求体的内容是对象```this.$http.post('/api/postcomment/'+ this.id,{content:this.cmtmsg.trim()})```
+ 上一步进行完成后数据已经被提交后台服务端，但页面还没有自动渲染出来，之前我们是调用ajax请求来渲染但这样太浪费请求了，而且用户如果翻到后面某一页的数据时候在提交一次评论那渲染出来就只有第一页数据（默认渲染第一页）用户就又要重新店家加载更多按钮了
+ 我们可以自己将从页面获取到的数据写成后台获取到的数据格式（自己在客户端拼接出一个新的评论对象）然后unshift到评论列表的第一项，这样既不用多发一次ajax网络请求也能避免上面提到的问题

### 2.7 图片分享
+ 点击图片分享按钮跳转到图片列表页面,先改造路由在```component->tabbars->HomeContainer.vue```文件中
+ 创建相应的组件```component->photos->photolist.vue
+ 在路由模块中添加路由规则

### 2.7.1 用mui自带滑动插件并移除webpack的严格模式
+ 使用MUI提供的`tab-top-webview-main.html`来实现顶部的滑动效果
+ 当我们把基本的HTML结构拷到页面中后发现滑动不了,经过分析发现滑动效果插件需要按照官方网站提供的方式，手动初始化：
```
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
```
+ 要使用`mui()`这个函数，必须导入mui才能使用手动导入`import mui from '../../lib/mui/js/mui.js`
+ 导入后浏览器报错了：`bundle.js:42343 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them`
+ 经过分析上述的报错问题：导入的`mui.js`中，可能使用了`caller`, `callee`, `arguments`这些特性，但是，我们打包好的`bundle.js`这个文件，默认启用了严格模式，因此，在严格模式下，不持支`mui.js`中的语法；
+ 如果要解决上述的报错问题，有两个解决方案：
 - 把 `mui.js` 中的 caller callee arguments 都改掉；（不可取）
 - 手动把`webpack`的严格模式禁用掉；（这是我们要采取的方案）
+ 如何禁用webpack的严格模式呢？需要安装一个对应的插件即可：
使用的插件连接为[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)
 - 安装插件`yarn add babel-plugin-transform-remove-strict-mode -D`
 - 在`.babelrc` 文件中，添加插件名称：
    ```
    {
      "plugins": ["transform-remove-strict-mode"]
    }
    ```
+ 页面刷新一下才能出现滑动效果这样是有问题的，因为那段js组件要操作dom元素根据周期函数在mounted函数时dom元素才渲染好可以使用，所以那段js代码应该在mounted函数里执行这样页面渲染完dom元素就可以执行dom元素上的js代码了