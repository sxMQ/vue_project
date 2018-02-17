<template>
  <div>
      <!-- <h3>HomeContainer组件</h3> -->
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in lunbolist" :key="item.img">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe>
      <!-- 六宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div></a></li>
		  </ul> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      lunbolist: [] //轮播图的数组
    };
  },
  created() {
    this.getLunbo();
  },
  methods: {
    async getLunbo() {
      //获取轮播图的数据
      const { data } = await this.$http.get("/api/getlunbo");
      // console.log(data)数据获取成功
      if (data.status === 0) {
        this.lunbolist = data.message;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.mint-swipe {
  height: 180px;
  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}
img {
  width:60px;
  height:60px;
}
.mui-table-view {
  background-color: #fff;
  border: none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: none;
}
.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
  font-size: 13px;
}
</style>


