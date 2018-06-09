import Vue from 'vue'
import lodash from 'lodash'
import {Row, Col, Input, Button, Table, TableColumn, Popover, ButtonGroup, Card, Dialog, Loading} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import axios from 'axios'
axios.defaults.timeout = 4000

Vue.config.devtools = true

Vue.prototype.axios = axios

Vue.use(Row)
Vue.use(Col)
Vue.use(Input)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Popover)
Vue.use(ButtonGroup)
Vue.use(Card)
Vue.use(Dialog)
Vue.use(Loading)

var app =new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
})
  