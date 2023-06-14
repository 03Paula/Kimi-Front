import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createStore } from 'vuex'

const store = createStore({
    state: {
        usuario: null
      },
      mutations: {
        setUser(state, usuario) {
          state.usuario = usuario;
        },
        clearUser(state){
            state.usuario = null;
        }
      },
      actions: {
       login({ commit }, usuario) {
          commit('setUser', usuario);
          console.log(usuario)
        },
        logout({ commit }) {
            commit('clearUser');
       },
    },
      getters: {
        UserLogged(state){
            return state.usuario;
        }
    }
});


const app = createApp(App)

app.use(store);
app.use(router);

app.mount('#app')

