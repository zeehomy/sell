// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Resource from 'vue-resource';

import '@/common/stylus/index.styl';

var fundebug = require('fundebug-javascript');
fundebug.apikey = 'API-KEY';

Vue.config.productionTip = false;

function formatComponentName(vm) {
  if (vm.$root === vm) return 'root';

  var name = vm._isVue ? (vm.$options && vm.$options.name) || (vm.$options && vm.$options._componentTag) : vm.name;
  return (name ? 'component <' + name + '>' : 'anonymous component') + (vm._isVue && vm.$options && vm.$options.__file ? ' at ' + (vm.$options && vm.$options.__file) : '');
}

Vue.config.errorHandler = function (err, vm, info) {
  var componentName = formatComponentName(vm);
  var propsData = vm.$options && vm.$options.propsData;

  fundebug.notifyError(err,
    {
      metaData:
        {
          componentName: componentName,
          propsData: propsData,
          info: info
        }
    });
};

Vue.use(Resource);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

router.push('/goods');
