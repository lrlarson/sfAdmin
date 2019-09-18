// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import en from "element-ui/lib/locale/lang/en";
import 'element-ui/lib/theme-chalk/index.css' ;
import VueGlobalVariable from "vue-global-var";
import store from './store'
import User from './model/User';


import App from './App'


Vue.config.productionTip = false
Vue.use(require('vue-moment'));
//Vue.use(ElementUI);
Vue.use(ElementUI, { locale: en });

Vue.use(VueGlobalVariable, {
  globals: {
    $user: new User('user1')
  },
});

/* eslint-disable no-new */
export const dataURL= 'https://www.sfarts.org/data/sfAdmin.cfc';
//export const dataURL= 'http://127.0.0.1:8501/SFArts_10/data/sfAdmin.cfc';
export const eventBus = new Vue ({

  methods:{
      testWasClicked(){
        this.$emit('testWasClicked');
    },
      submissionRowWasClicked:function(id) {
        this.$emit('submissionRowWasClicked',id);
      },
    newEventID:function(eventID){
        console.log('event bus heard you');
        this.$emit('newEventIDAdded',eventID);
    },
    blankEventWasClicked:function (orgID) {
        this.$emit('blankEventWasClicked',orgID);
    },
    orgWasSelected:function (orgID) {
       this.$emit('orgWasSelected', orgID);
    }

  },
  store,
  data:function(){
    return {
        currentEditor:''
    }
  }
})


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
})

function loadURL() {
  var url = document.getElementById("iframeid");
  console.log(url);
}
