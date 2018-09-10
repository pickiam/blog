// store.js
import Vue from 'vue'
import Vuex from 'vuex'
import { getTagsList } from '../api/index.js'
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
          tagsList: []
      },
      actions: {
          fetchBar({commit}) {
              return fetchBar().then(msg => {
                  commit('setBar', {msg})
              })
          },
          getTagsList({commit}) {
              return getTagsList().then(res => {
                  commit('getTagsList', res.data.data)
              })
          }
      },
      mutations:{
          setBar(state, {msg}) {
              Vue.set(state, 'bar', msg);
          },
          getTagsList(state, data) {
              Vue.set(state, 'tagsList', data)
          }
      }
  })
}
