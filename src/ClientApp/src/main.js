// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import App from './App.vue';
import inputmask from './directives/inputmask';
import EventBus from './common/eventBus';

Vue.use(Vuetify);
Vue.directive('inputmask', inputmask);

function getKeyName(key) {
  switch (key) {
    case ' ': return 'space';
    case 'b': return 'b';
    default: return null;
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  created() {
    // eslint-disable-next-line no-undef
    window.addEventListener('keydown', e => {
      const keyName = getKeyName(e.key);
      if (keyName) {
        e.preventDefault();
        EventBus.$emit(`keypress-${keyName}`);
      }
    });
  },
});
