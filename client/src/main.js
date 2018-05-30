import Vue from 'vue'
import lodash from 'lodash'
import Element from 'element-ui'
import App from './App'

Vue.config.devtools = true

var app =new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
  