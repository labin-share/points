import Vue from 'vue'
import lodash from 'lodash'
import Element from 'element-ui'
import App from './App'

var app =new Vue({
    el: '#app',
    components: { App },
    template: '<App/>',
    data: {
        message: 'Hello Vue!'
    }
})
  

// import Vue from 'vue';

// var app = new Vue({
//   el: '#app',
//   data: {
//     message: 'Hello Vue!'
//   }
// });