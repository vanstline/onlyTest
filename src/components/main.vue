<template >
  <div class="">
    <scroller
      class="scroller"
      ref="myscroller"
      :on-refresh="refresh"
      :on-infinite="infinite"
      >
      <div class="main">
          <swiper
          class="swiper"
          :list="swiperList"
          :auto="true"
          :loop="true"
          @touchstart.native.stop=""
          @touchmove.native.stop=""
          @touchend.native.stop=""
          @mousedown.native.stop=""
          @mousemove.native.stop=""
          @mouseup.native.stop=""
          >
        </swiper>

        <div class="news">
          <panel
          class="panel"
          @on-click-item="stop"
          :list="newsList"
          ></panel>
        </div>

        <div class="" v-for="item,index in allOldList">
          <h2 class="date">{{oldDate[index]}}</h2>
          <panel
          class="panel"
          @on-click-item="stop"
          :list="item">
          </panel>
        </div>
      </div>
    </scroller>

  </div>
</template>

<script>
  import { Swiper, Panel } from 'vux';
  import {mapMutations } from 'vuex'
  import { getAxios } from '@/api/index'
  import axios from 'axios'

  // 处理日期的函数
  var nowDate = new Date();
  var y,m,d= '';
  let num = 0;
  var dis = 60*60*24*1000;

  // 返回两个值 一个年月日格式作为参数发送请求 一个作为新闻页首
  function getDate(nowDate) {
    var datsArr = ['天','一','二','三','四','五','六'];
    nowDate = new Date(nowDate);
    var days = nowDate.getDay();
    y = addZreo(nowDate.getFullYear());
    m = addZreo((nowDate.getMonth() + 1));
    d = addZreo(nowDate.getDate());
    var dateFormat = `${m}月${d}日 星期${datsArr[days]}`;
    return [y+m+d,dateFormat];
  }
  // 补零
  function addZreo(n) {
    return n = n < 10 ? '0'+n : '' + n
  }


  let isTrue = true;
  let isFalse = false;
  let initLoaded = false; // 是否初始化加载完成
  let moreLoaded = true;
  export default {
    name: 'main',
    components: {
      Swiper,
      Panel
    },
    data() {
      return {
        data: '/news/latest',
        swiperList: [],
        newsList: [],
        oldList: null,
        oldDate: [],
        allOldList: [],
        id: ''
      }
    },
    created() {
      this._getAxios();
    },
    methods: {
      _getAxios() {
        axios('https://zhihu-daily.leanapp.cn/api/v1/last-stories').then( res => {
          console.log(res.data);
          this.swiperList = res.data.STORIES.top_stories.map( item => {
            return {
              url: `/more/${item.id}`,
              img: item.image,
              title: item.title
            }
          })
          // 新闻的数据
          this.newsList =  res.data.STORIES.stories.map(item => {
            return {
              url: `/more/${item.id}`,
              src: item.images[0],
              title: item.title
            }
          })
          initLoaded = true;
        })
      },
      refresh() {
        let pro = new Promise((resolve, reject) => {
          if(isTrue){
            this._getAxios()
            console.log(1);
            resolve()
          } else {
            console.log(2);
            reject()
          }
        });
        pro.then(()=> {
          console.log(222);
            console.log(this.$refs.myscroller);
            setTimeout(() => {
              this.$refs.myscroller.finishPullToRefresh();
              this.$vux.toast.text('刷新成功', 'top');
              // this.allOldList = [];
            },1000)
        })
      },
      infinite() {

        if(!initLoaded) {
          this.$refs.myscroller.finishInfinite();
          return
        }
        if (!moreLoaded) {
            return;
        }

        moreLoaded = false;
        num++;
        console.log(num);
        axios(`https://zhihu-daily.leanapp.cn/api/v1/before-stories/${getDate(nowDate)[0]}`)
        .then( res => {
          // console.log(res.data);
          // 新闻的数据
          this.oldDate.push(getDate(nowDate)[1]);
          this.oldList =  res.data.STORIES.stories.map(item => {
            return {
              id: item.id,
              url: `/more/${item.id}`,
              src: item.images[0],
              title: item.title
            }
          })
          console.log(this.oldList);

          this.allOldList.push(this.oldList);
          console.log(this.allOldList);
          this.$refs.myscroller.finishInfinite();
          moreLoaded = true;
        })
        nowDate -= dis;
      },
      stop() {
        console.log('停');
        this.$refs.myscroller.finishInfinite();
      }
    }
  }

</script>

<style lang="less">

  #app {
    .scroller {
      margin-top: .8rem;
      // margin-top: 0;
      // margin-bottom: -.8rem;
      width: 100%;
      .pull-to-refresh-layer {
        height: 0;
        margin-top: 0;
        z-index: 100;
        background: red;

      }
      .main {
        .swiper {
          .vux-swiper-desc {
            padding: 30px 20px;
            height: auto;
            line-height: .5rem;
            overflow: visible;
            white-space: normal;
          }
          .vux-indicator,
          .vux-indicator-right {
            right: 50%;
            transform: translateX(50%);
            line-height: .6rem;
          }
        }
        .weui-panel {
          margin: 0;
          .weui-media-box_appmsg .weui-media-box__hd {
            width: 1.6rem;
            margin-right: .3rem;
          }
          .weui-media-box__title {
            white-space: normal;
            font-size: 14px;
          }
        }
        .date {
          height: .92rem;
          font-size: 18px;
          line-height: .92rem;
          text-align: center;
          font-weight: 400;
          color: #fff;
          background-color:rgba(0, 156, 255, .5);
        }
      }
    }
  }
</style>
