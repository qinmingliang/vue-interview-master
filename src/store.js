import Vue from 'vue'
import Vuex from 'vuex'
import mockGenerator from './mock'
Vue.use(Vuex)

//导入mock数据
import mock from "./mock"

export default new Vuex.Store({
  state: {
    dataList: []
   
  },
  mutations: {
     getMockData (state , array){
       //给stete赋值
       state.dataList = array
       console.log( state.dataList);
     }
  },
  getters: {
    getAverage: state => {
      let number = 0;
      let index = 0;
      //遍历数组
      state.dataList.forEach(item => {
        number += item.data;
        index++;
      });
      //求平均值
      number = number/index;
      //去后两位小数
      return number.toFixed(2)
    },
    getData: state => state.dataList
  },
  actions: {
    getDataCall (context,data) {
      // TODO
      // mockGenerator()
     
      context.commit("getMockData",data)
    }
  }
})
