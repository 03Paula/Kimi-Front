import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usuario: null
  },
  mutations: {
    setUser(state, usuario) {
      state.usuario = usuario;
    }
  },
  actions: {
    guardarUser({ commit }, usuario) {
      commit('setUser', usuario);
    }
  },
  getters: {
    getUser(state) {
      return state.usuario;
    }
  }
});