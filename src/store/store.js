/**
 * Created by yzdd on 2018/5/25.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex);

export function createStore() {
  return new Vuex.Store({
    state: {
      list: []
    },
    actions: {
      //从云端获取数据
      getList({commit, state}) {
        return axios.get('https://www.easy-mock.com/mock/59e5a6b605db1179c65d9873/vue/test/data')
          .then(function (response) {
            console.log(response, "---获取到数据", state);
            commit('GET_LIST', response);
            return response;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    mutations: {
      GET_LIST: function (state, data) {
        state.list = data.data.data.goods;
      }
    }
  })
}
