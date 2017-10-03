// 时间日期格式转换
function getTime(time) {
  // 这里接受的ms 而数据传递过来的是m
  return new Date(parseInt(time)*1000).toLocaleString().replace(/:\d{1,2}$/,' ').slice(5).replace(/\//g,'-');
  // 这里省略了年份
}

import Vue from 'vue';
import Vuex from 'vuex';
// import getAxios from '@/api/index'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      id:null,
      bannerList: [],
      newList: [],
      oldList: null,
      initLoaded: null,
      review: []
  },
  getters: {
    retBanner: state => state.bannerList,
    retNewList: state => state.newList,
    retOldList: state => state.oldList,
    retId: state => state.id
  },
  mutations: {
    setId(state,data) {
      state.id = data;
    },
    setBannerList(state,data) {
      return state.bannerList = data
    },
    setNewList(state,data) {
      state.newList = data
    },
    setOldList(state,data) {
      state.oldList = data
    },
    set(state,data) {
      console.log(data);
      state.initLoaded = data
    },
    setReview(state, data) {
      state.review = data
    },
    concatView(state, obj) {
      console.log(obj);
      console.log(state.review);
      state.review = obj.concat(state.review)
      console.log(state.review);
    }
  },
  actions: {
    getFristNews({commit,store}) {
      let url = 'api'
      let data = '/news/latest'
      axios(url+data).then(res => {
        console.log(res.data.top_stories);
        let Banner = res.data.top_stories.map( item => {
          return {
            id: item.id,
            url: `/more/${item.id}`,
            img: item.image,
            title: item.title
          }
        })
        let retNewList = res.data.stories.map( item => {
          return {
            id: item.id,
            url: `/more/${item.id}`,
            src: item.images[0],
            title: item.title
          }

        });
        commit('set',true)
        commit('setBannerList', Banner);
        commit('setNewList', retNewList);
      })
    },
    getReview({commit,store},id) {

      let api = 'https://zhihu-daily.leanapp.cn/api/v1/contents/';
      let reviewEnd = '/short-comments';
      axios.get(api+id+reviewEnd).then(res => {
        let newDate = res.data.COMMENTS.comments;
        for(var i in newDate) {
          newDate[i].time = getTime(newDate[i].time)
        };
        console.log(newDate);
        commit('setReview',newDate)

      })
    }
    // ,
    // concatView({commit,store},obj, oldReview) {
    //   console.log(obj);
    //   console.log(oldReview);
    // }


  }
})
