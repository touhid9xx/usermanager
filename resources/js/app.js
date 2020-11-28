import Vue from 'vue';
import App from './components/App';
import router from './routes';
import Vuetify from "./plugins/vuetify";
import store from './store';
import VueTheMask from 'vue-the-mask';
import axios from 'axios';
import Default from './layouts/DefaultLayout';
import Auth from './layouts/AuthLayout';
import VueMoment from 'vue-moment';


Vue.use(VueTheMask);
Vue.use(VueMoment);


Vue.component('default-layout', Default);
Vue.component('auth', Auth);



Vue.config.productionTip = false
axios.defaults.baseURL="http://localhost:8000/api";


const app = new Vue({
    el: '#app',
    router: router,
    store: store,
    vuetify: new Vuetify(),
    ...App
});
