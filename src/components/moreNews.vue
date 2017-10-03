<template>
  <div class="more">
    <scroller
      class="contents"
      ref="scroller2"
      :on-refresh="refresh"
      :on-infinite="infinite"
      >
      <div class="headerInfo">
        <img :src="header.titleImg" alt="">
        <h2>
          {{header.titleText}}
          <span>图片：{{header.titleImgInfo}}</span>
        </h2>

      </div>
      <div class="textInfo" v-html="textInfo">
      </div>
    </scroller>

    <tabbar>
      <tabbar-item link="/" selected>
        <span slot="label">返回</span>
      </tabbar-item>
      <tabbar-item selected>
        <span slot="label" :class="{test: isclick}" @click="click22">收藏</span>
      </tabbar-item>
      <tabbar-item @on-item-click="click" link="/review" selected>
        <span slot="label">评论</span>
      </tabbar-item>
    </tabbar>

    <div class="load" ref="load">
      <img src="../assets/loading.gif" alt="">
    </div>


  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vux'
  import axios from 'axios'
  export default {
    data() {
      return {
        oldId: null,
        id: null,
        header: {
          titleImg: null,
          titleImgInfo: null,
          titleText: null,
          contents: null
        },
        textInfo: null,
        isclick: false
      }
    },
    components: {
      Tabbar,
      TabbarItem
    },
    created() {
      console.log(1);
      this.getId();
      this._getMore();
      // console.log(this.$route.params.id);
    },
    watch: {
      $route(){
        this.$refs.load.style.display = 'none';
        this.getId();
        this._getMore()
       }
    },
    methods: {
      click() {
        this.$store.commit('setId',this.id)
      },
      click22() {
        this.isclick = !this.isclick;
        console.log(this.isclick)
      },
      _getMore() {
        if(this.id == undefined){
          return
        }
        let url = 'https://zhihu-daily.leanapp.cn/api/v1/contents/';
        axios.get(url+this.id).then(res => {
          this.header.titleImg = res.data.CONTENTS.image,
          this.header.titleImgInfo = res.data.CONTENTS.image_source,
          this.header.titleText = res.data.CONTENTS.title
          this.textInfo =  res.data.CONTENTS.body.slice(163,length-24);
          setTimeout(() => {
            this.$refs.load.style.display = 'none';
          },20)
        })
      },
      getId(){
        this.id = this.$route.params.id
      },
      refresh(){
        this.$refs.scroller2.finishPullToRefresh();
      },
      infinite(){
        this.$refs.scroller2.finishInfinite();
      }
    }

  }
</script>

<style lang="less">
  .more {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    // width: 100%;
    // height: 100%;
    z-index: 100;
    background: #fff;
    .test {
      color: red;
    }
    .load {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      z-index: 100;
      background: #fff;
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-40%,-50%);
      }
    }
    .contents {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 110% !important;
      // 以上两条 用来解决滚动底部给不了高度的问题
      margin-bottom: -.5rem;
      font-size: 18px;
      .headerInfo {
        position: relative;
        width: 100%;
        height: 4.4rem;
        img {
          width: 100%;
          height: 100%;
        }
        h2 {
          position: absolute;
          left: 0;
          right: 0;
          padding: 0.3rem .4rem .5rem;
          bottom: 0;
          font-size: 20px;
          line-height: 25px;
          font-weight: normal;
          color: #fff;
          background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1)100%);
          background-image: linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1)100%);
          span {
            position: absolute;
            right: .4rem;
            bottom: 0rem;
            color: #ccc;
            font-size: 12px;
            line-height: 40px;

          }
        }
      }
      .textInfo {
        position: relative;
        margin: .4rem;
        .question-title {
          font-size: 18px;
          line-height: 26px;
        }
        img {
          width: 100%;
        }
        .answer>div{
          margin-top: .4rem;
        }
        .answer {
          .meta {
            position: relative;
            font-size: 16px;
            height: .6rem;
            line-height: 30px;
            padding-left: .8rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .avatar {
              position: absolute;
              top: 0;
              left: 0;
              width: .6rem;
              height: .6rem;
            }
            .author {
              font-weight: 700;
            }
            .bio {
              color: #979797;
            }
          }
          .content>p {
            margin-top: .4rem;
          }
          .content {
            p:first-child {
              margin: 0;
            }
          }
        }
      }
    }
    .weui-tabbar {
      position: absolute;
      bottom: 0;
      z-index: 100;
    }
  }
</style>
