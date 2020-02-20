import Vue from 'vue';
import VueRouter from 'vue-router';
import Routers from './router';
import Store from './store.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './app.vue';
import {getRequest} from './libs/api';
import {postRequest} from './libs/api';
import {deleteRequest} from './libs/api';
import {putRequest} from './libs/api';
import 'font-awesome/css/font-awesome.min.css';
import VideoPlayer from 'vue-video-player';
require('video.js/dist/video-js.css');
require('vue-video-player/src/custom-theme.css');


Vue.use(VideoPlayer)

Vue.use(VueRouter);
Vue.use(ElementUI)

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;

// 路由配置
const RouterConfig = {
    // 使用 HTML5 的 History 路由模式
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    window.document.title = to.meta.title;
    next();
});

router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    router: router,
    store: Store,
    render: h => {
        return h(App)
    }
});