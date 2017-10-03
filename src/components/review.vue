<template>
  <div class="review">
    <scroller
     class="cont" v-if="newReview"
      >
      <div>
        <h3>{{newReview.length}}条评论</h3>
        <ul>
          <li v-for="i in newReview">
            <h4>{{i.author}}<i>{{i.likes}}</i></h4>
            <p>{{i.content}}</p>
            <span class="time">{{i.time}}</span>
            <img :src="i.avatar" alt="">
          </li>
        </ul>
        <div class="perch"></div>
      </div>
    </scroller>
    <Group class="bottom" v-if="newReview" gutter="0">

      <router-link class="back" v-bind:to="more">返回</router-link>
      <span class="qwr" @click='write'>写评论</span>
      <!-- <x-textarea class="textA" title="title"></x-textarea> -->
      <x-textarea  class="textA" v-model="msg" :rows="5" :max="60" placeholder="输入评论" v-show="SOH"></x-textarea>
      <div class="btn" v-show="SOH">
        <span class="cancel" @click="cancel">取消</span>
        <span class="confirm" @click="confirm">提交</span>
      </div>
    </Group>
  </div>
</template>

<script>
  // 时间日期格式转换
  function getTime(time) {
    // 这里接受的ms 而数据传递过来的是m
    return new Date(parseInt(time)*1000).toLocaleString().replace(/:\d{1,2}$/,' ').slice(5).replace(/\//g,'-');
    // 这里省略了年份
  }

  import axios from 'axios'
  import { Group,  XTextarea } from 'vux'
  export default {
    data() {
      return {
        id: null,
        newReview: null,
        more: null,
        SOH: false,
        msg: null,
        Time: null
      }
    },
    components: {
      Group,
      XTextarea
    },
    created() {
      // this.getReview();
      this.id = this.$store.state.id;
      this.more = 'more/' + this.id;
      console.log(this.id);

      this.getData()
      // console.log(this.$store.state.review);
    },
    computed: {

    },
    methods: {
      // getReview() {
      //   this.id = this.$store.state.id
      //   let api = 'https://zhihu-daily.leanapp.cn/api/v1/contents/';
      //   let reviewEnd = '/short-comments';
      //   axios.get(api+this.id+reviewEnd).then(res => {
      //     let newDate = res.data.COMMENTS.comments;
      //     for(var i in newDate) {
      //       newDate[i].time = getTime(newDate[i].time)
      //     };
      //     console.log(newDate);
      //     this.newReview = newDate;
      //     this.more = 'more/' + this.id
      //     console.log(this.more);
      //
      //   })
      // },
      getData() {
        let pro = new Promise((resolve, reject) => {
          this.$store.dispatch('getReview',this.id);
          resolve()
        })
        pro.then(() => {
          this.newReview = this.$store.state.review;
        })
      },
      write() {
        this.SOH = true;
        console.log('写店铺');
      },
      cancel() {
        console.log(999);
        this.SOH = false;
      },
      confirm() {
        let time = new Date();
        console.log(time);
        this.Time = Date.parse(time)/1000;
        console.log(this.Time);
        this.Time = getTime(this.Time)
        console.log(this.Time);

        let obj = [{
          author: 'Tao',
          avatar: 'https://b-ssl.duitang.com/uploads/item/201510/18/20151018215700_KiTvZ.png',
          likes: 0,
          content: this.msg,
          time: this.Time
        }];
        // console.log(obj);

        // this.$store.dispatch('concatView',obj, this.newReview)
        this.$store.commit('concatView',obj);
        this.newReview = this.$store.state.review;
        this.msg = '';
        this.SOH = false;
      }
    }
  }
</script>

<style lang="less">
  @bgC : rgba(60, 60, 60, 0.8);
  @CW: #fff;

  .review {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    .cont {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: auto;
      z-index: 120;
      background: @CW;
      padding-bottom: .79rem;
      h3 {
        width: 100%;
        height: .8rem;
        text-align: center;
        font-size: 20px;
        line-height: .8rem;
        color: @CW;
        font-weight: 400;
        letter-spacing: 2px;
        background: rgb(71, 157, 227);
      }
      ul {
        position: relative;
        li {
          position: relative;
          // margin: 0  0 ;
          padding: .3rem .4rem .3rem 1.5rem;
          border-bottom: 1px solid #ccc;
          font-size: 18px;
          line-height: 26px;
          h4 {
            position: relative;
            i {
              position: absolute;
              top: 0;
              right: 0;
              text-align: center;
              font-size: 14px;
              line-height: 26px;
            }
            i::after {
              content: '';
              position: absolute;
              top: 2px;
              left: -26px;
              width: 26px;
              height: 26px;
              background: url('../../static/like.png') no-repeat;
            }
          }
          p {
            font-size: 16px;
            margin: 6px 0 10px;
          }
          span {
            font-size: 14px;
            color: #ccc;
          }
          img {
            position: absolute;
            top: .3rem;
            left: .3rem;
            width: .9rem;
            height: .9rem;
            border-radius: 50%;
          }
        }
      }
      .perch {
        height: 1.6rem;
      }
    }
    .bottom {
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 121;
      width: 100%;
      height: .8rem;
      line-height: .8rem;
      text-align: center;
      .back {
        float: left;
        width: 20%;
        height: .8rem;
        line-height: .8rem;
        background: @bgC;
        color: @CW;
      }
      .qwr {
        float: left;
        width: 80%;
        line-height: .8rem;
        color: @CW;
        background: @bgC;
      }
      .textA {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background: #eee;
      }
      .btn {
        position: fixed;
        top: 3rem;
        left: 0;
        right: 0;
        width: 60%;
        margin: 0 auto;
        height: .5rem;
        line-height: .5rem;
        font-size: 16px;
        color: @CW;
        span {
          width: 45%;
          height: 100%;
          border-radius: .25rem;
          background: rgb(10, 187, 226);
        }
        .cancel {
          float: left;
        }
        .confirm {
          float: right;
        }
      }
    }
  }
</style>
