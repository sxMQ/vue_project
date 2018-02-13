<template>
    <div class=app-container>
        <!-- header区域 -->
        <mt-header fixed title="黑马程序员·Vue项目">
            <span slot="left">
                <mt-button icon="back" @click="goBack" v-if="flag">返回</mt-button>
            </span>
        </mt-header>
        <!-- 路由容器 要给组件加动画 就用transition 把容器包裹起来 -->
		<transition>
			<router-view></router-view>
		</transition>
		

        <!-- 底部用mui库 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/cart">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge">0</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui';
export default {
	data(){
		return {
			flag: false
		}
	},
	created(){
		this.initInterceptors()
	},
	methods:{
		initInterceptors() {
		// 发起ajax请求之前
		this.$http.interceptors.request.use((config)=>{
    	    Indicator.open({
  			text: 'Loading...',
  			spinnerType: 'fading-circle'
			});
   			return config;
  		}),
		// 发起ajax请求之后
		this.$http.interceptors.response.use((response)=> {
   			Indicator.close();
    		return response;
  		})
		},
		goBack(){
			// console.log(this)//$router
			this.$router.go(-1)
		}
	
	},
	watch:{
		'$route.path':{
			handler:function(newVal){
			// console.log(newVal)
			// if(newVal === '/home'){
			// 	this.flag = false
			// }else {
			// 	this.flag = true
			// }

			// 优化
			console.log()
			this.flag = !(newVal === '/home')
			},
			immediate:true
		}	
	}
};
</script>
<style lang="scss" scoped>
.app-container {
  padding-top: 40px;
  overflow: hidden;
}

.v-enter {
	opacity: 0;
	transform: translateX(100%);
	
}
.v-leave-to {
	opacity: 0;
	transform: translateX(-100%);
	position: absolute;
}
.v-enter-active,
.v-leave-active{
	transition:all 1s ease;
}
</style>

