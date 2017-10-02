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
      newReview: []
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
    }
    

  }
})
