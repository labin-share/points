import Vue from 'vue'
import lodash from 'lodash'
import {Row, Col, Input, Button, Table, TableColumn} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import axios from 'axios'

Vue.config.devtools = true

Vue.prototype.axios = axios

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)

var app =new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
  