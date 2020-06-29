import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import errorLog from "./modules/errorLog";
import user from "./modules/user";
import tip from "./modules/tip";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    errorLog,
    user,
    tip
  },
  getters
});

export default store;
