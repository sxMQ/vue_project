<template>
  <div>
      <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.id">
					<router-link :to="'/home/newsinfo' + item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<h1 class="title">{{ item.title }}</h1>  
							<p class="mui-esplise">
                <span>发布时间：{{ item.add_time | dateFormat}}</span>
                <span>点击：{{ item.click }}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>
<script>
export default {
  data(){//创建data要考虑在组件中的data要定义成一个function函数 里面返回一个对象
    return {
      newsList:[]//新闻列表的空数组
    }
  },
  created(){
    this.getNewsList()
  },
  methods:{
    async getNewsList(){
      const {data} = await this.$http.get('/api/getnewslist')
      // console.log(data)
      if(data.status === 0){
        // 要把数据渲染到页面上；而页面要渲染数据的话，都要从data上来拿数据
        this.newsList = data.message
      }
    }
  }
}
</script>
<style lang="scss" scoped>
 .mui-media-body {
   .title{
     font-size: 14px;
   }
   .mui-esplise{
     font-size: 13px;
     color: #26A2FF;
     display: flex;
     justify-content: space-between;
   }
 }
</style>

