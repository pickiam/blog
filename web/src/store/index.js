// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import { fetchTest } from '../api/index'
function fetchBar() {
  return new Promise(function (resolve, reject) {
      resolve('bar ajax 返回数据');
  });
}

export default function createStore() {
  return new Vuex.Store({
      state: {
          bar: '',
          info: ''
      },
      actions: {
          fetchBar({commit}) {
              return fetchBar().then(msg => {
                  commit('setBar', {msg})
              })
          },
          fetchTestAnc ({dispatch, commit}) {
              return fetchTest().then(res => {
                  commit('fetchTestMut', res.data.data)
              }).then(() => {
                  dispatch('fetchBar')
              })
          }

      },
      mutations:{
          setBar(state, {msg}) {
              Vue.set(state, 'bar', msg);
          },
          fetchTestMut(state, payload) {
            Vue.set(state, 'info', payload);
          }
      }
  })
}
