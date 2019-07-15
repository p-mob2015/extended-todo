import Vue from 'vue'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'

import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/vuetify'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
