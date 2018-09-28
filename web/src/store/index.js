// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { getTagsList, getArtList, getArtDetails } from '../api/index.js'
Vue.use(Vuex)
function fetchBar() {
  return new Promise(function (resolve, reject) {
      resolve('bar ajax 返回数据');
  });
}

export default function createStore() {
  return new Vuex.Store({
      state: {
          bar: '',
          info: '',
          tagsList: [],
          artList: [],
          artDetail: ''
      },
      actions: {
          fetchBar({commit}) {
              return fetchBar().then(msg => {
                  commit('setBar', {msg})
              }, err => {
                  console.log(err)
              })
          },
          getTagsList({commit}) {
              return getTagsList().then(res => {
                  commit('getTagsList', res.data.data)
              }, err => {
                  console.log(err);  
              })
          },
          getArtList({commit}) {
              return getArtList().then(res => {
                  commit('getArtList', res.data.data)
              }, err => {
                  console.log(err);
              })
          },
          getArtDetails({commit}, payload) {
              console.log(payload);
              return getArtDetails(payload).then(res => {
                  commit('getArtDetails', res.data.data)
              }, err => {
                  console.log(err);
              }) 
          }
      },
      mutations:{
          setBar(state, {msg}) {
              Vue.set(state, 'bar', msg);
          },
          getTagsList(state, data) {
              Vue.set(state, 'tagsList', data)
          },
          getArtList(state, data) {
              Vue.set(state, 'artList', data)
          },
          getArtDetails(state, data) {
              Vue.set(state, 'artDetail', data)
          }
      }
  })
}
