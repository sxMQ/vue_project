<template>
  <div>
      <h1>发表评论----{{ id }}</h1>
      <hr>
      <textarea placeholder="请输入想说的话(最多120字)" maxlength="120" v-model="cmtmsg"></textarea>
      <mt-button type="primary" size="large" @click="postCmt">发表评论</mt-button>
      <!-- 评论列表区域 -->
      <div class="cmt-list">
          <div class="cmt-item" v-for="(item,i) in commentlist" :key="item.add_time">
              <div class="cmt-title">第{{ i+1 }}楼&nbsp;用户：{{ item.user_name }}&nbsp;发表时间：{{ item.add_time | dateFormat }}</div>
              <div class="cmt-body">{{ item.content }}</div>
          </div>
      </div>     
      <mt-button type="danger" size="large" @click="getmore" plain>加载更多</mt-button> 
  </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageindex:1, //默认请求第一页的数据
            commentlist:[],
            isover:false, //评论是否加载完了，默认认为没有加载完
            cmtmsg:''// 双向数据绑定获取文本域中输入的内容
        }
    },
    created(){
        this.getComment()
    },
    props:['id'],
    methods:{
        async getComment(){
            // 调用ajax之前先判断isover是否为true 为true说明已经加载完 就不在发起请求
            if(this.isover){return}
            const {data} = await this.$http.get('/api/getcomments/'+this.id+'?pageindex='+this.pageindex)
            // console.log(data) //数据获取成功
            if(data.status === 0){
                if(data.message.length <= 0)return (this.isover = true)
                // this.commentlist = data.message
                // 应该用数组合并的方法 将旧数组和新获取的数组合并起来
                // 用concat(新数组) 它不会改变原数组而是返回一个拼接好的新数组
                this.commentlist = this.commentlist.concat(data.message)
            }
        },
        getmore(){
            // 点击更多评论
            // 1.要让pageindex自增1
            // 2.直接调用现成的getComment()方法
            this.pageindex ++
            this.getComment()
        },
        async postCmt(){
            if(this.cmtmsg.trim()<=0)return Toast('内容不能为空')
            const {data} = await this.$http.post('/api/postcomment/'+ this.id,{content:this.cmtmsg.trim()})
            if(data.status ===0){
                Toast('发表成功')
                // 重新加载评论列表
                // 自己在客户端拼接出一个新的评论对象
                const newCmt = {
                    user_name:'匿名用户',
                    add_time:new Date(),
                    content: this.cmtmsg.trim()
                }
                this.commentlist.unshift(newCmt)
                
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    textarea {
        margin: 0;
        font-size: 14px;
    }
    .cmt-list {
        margin-top: 5px;
        .cmt-item{
            .cmt-title {
                font-size: 14px;
                line-height: 30px;
                background-color: #ddd;
            }
            .cmt-body{
                font-size: 13px;
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
</style>


