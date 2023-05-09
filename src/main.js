import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'

axios.defaults.baseURL = 'http://gestao.2dmedia.com.br/logica/controllers/ControllerCategoria.php';

Vue.prototype.axios = axios
Vue.config.productionTip = false
Vue.prototype.themeColor = '#2f0c61'

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: h => h(App)
}).$mount('#app')
