import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    language: window.localStorage.getItem('language') || 'cn'
  },
  mutations: {
    SET_LANGUAGE: (state, language) => {
      state.language = language
      window.localStorage.setItem('language', language)
    }
  },
  actions: {
    setLanguage({
      commit
    }, language) {
      commit('SET_LANGUAGE', language)
    }
  }
})