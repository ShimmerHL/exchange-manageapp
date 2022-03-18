import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromData:[],
    tableData:[],
    UserfromData:[],
    UsertableData:[],

  },
  getters: {
  },
  mutations: {
    formDataAlter(state,Arr){
      state.fromData = Arr
    },
    tableDataAlter(state,Arr){
      state.tableData = Arr
    },
    UserformDataAlter(state,Arr){
      state.UserfromData = Arr
    },
    UsertableDataAlter(state,Arr){
      state.UsertableData = Arr
    }
  },
  actions: {
  },
  modules: {
  }
})
