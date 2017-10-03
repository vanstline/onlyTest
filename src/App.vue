<template>
  <div id="app">
    <view-box>
      <x-header
        class="header"
        >
        <x-icon @click="sideShow" slot="overwrite-left" type="navicon" size="35" style="fill:#fff;position:relative;top:-8px;left:-3px;"></x-icon>
        <div>今日热闻</div>
      </x-header>


      <router-view></router-view>

      <transition enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft">
        <div class="aside" v-show="sideSF">
          <div class="asideCont">
            <router-link class="asideHeader" to="login">请登录</router-link>
          </div>
          <div class="asideRight" @click="sideHide"></div>
        </div>
      </transition>

    </view-box>
  </div>
</template>

<script>
  import { ViewBox, XHeader } from 'vux'
  import'animate.css/animate.css'

  export default {
    name: 'app',
    data() {
      return {
        sideSF: false
      }
    },
    components: {
      ViewBox,
      XHeader
    },
    mounted() {
      this.$store.dispatch('getFristNews');
    },
    methods: {
      sideShow() {
        console.log(this.sideSF);
        this.sideSF = true;
        console.log(12423);
        console.log(this.sideSF);

      },
      sideHide() {
        this.sideSF = false;
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
  @w: 100rem;
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
    font-family: 'Helvetica Neue',Helvetica,Arial,sans-serif;
  }
  #app {
    height: 100%;
    position: relative;
    li {
      list-style: none;
    }
    .header {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
      padding: 0;
      height: .8rem;
      width: 100%;
      background-color:rgba(0, 156, 255, .5);
    }
    .aside>div {
      float: left;
      width: 50%;
      height: 100%;
    }
    .aside {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 10;
      // transition: 1s;
      background: rgba(0, 0, 0, 0.73);
      .asideCont {
        box-sizing: border-box;
        padding: .4rem .2rem;
        border-right: 1px solid #fff;
        .asideHeader {
          display: block;
          height: .8rem;
          font-size: 18px;
          line-height: .8rem;
          color: #fff;
          text-indent: 1.2rem;
          background: url('../static/login.png') no-repeat;
        }
      }

    }
  }
</style>
