import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fromData:[],
    tableData:[],
    UserfromData:[],
    UsertableData:[],
    EnterprisefromData:[],
    EnterprisetableData:[],
    CustomQueryfromData:[],
    CustomQuerytableData:[],

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
    },
    EnterpriseformDataAlter(state,Arr){
      state.EnterprisefromData = Arr
    },
    EnterprisetableDataAlter(state,Arr){
      state.EnterprisetableData = Arr
    },
    CustomQueryformDataAlter(state,Arr){
      state.CustomQueryfromData = Arr
    },
    CustomQuerytableDataAlter(state,Arr){
      state.CustomQuerytableData = Arr
    }  
  },
  actions: {
  },
  modules: {
  }
})
