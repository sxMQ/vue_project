<template>
  <div class="newsInfo-container">
      <h1 class="title">{{ newsInfo.title }}</h1>
      <p class="info">
          <span>发表时间:{{ newsInfo.add_time | dateFormat }}</span>
          <span>点击:{{ newsInfo.click }}次</span>
      </p>
      <hr>
      <div class="content" v-html="newsInfo.content"></div>
      <!-- 新闻父组件向评论子组件传值 -->
      <comment :id="id"></comment>

  </div>
</template>
<script>
// 先按需导入
import comment from '../subcomponent/comment.vue'

export default {
    data(){
        return {
            newsInfo:[]
        }
    },
    created(){
        this.getNewsInfo()
    },
    methods:{
        async getNewsInfo(){
            const {data} = await this.$http.get('/api/getnew/'+this.id)
            // console.log(data)
            if(data.status === 0){
                this.newsInfo = data.message[0]
            }
        }
    },    
    props:['id'],
    components:{
        comment
    }
}
</script>
<style lang="scss" scoped>
.newsInfo-container{
    padding: 3px;
    .title {
        font-size: 15px;
        color: red;
        text-align: center;
        margin: 15px 0;
    }
    .info {
        font-size: 13px;
        color:#26A2FF;
        display: flex;
        justify-content: space-between;
    }
}

</style>
