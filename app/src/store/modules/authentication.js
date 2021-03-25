import AuthenticationService from '../../services/api/authentication/authentication-service';
import router from '../../services/router/router';

const state = {
  cognitoInfo: {},
  idToken: null,
  loggedIn: false,
};
const getters = {
  cognitoInfo: state => state.cognitoInfo,
  idToken: state => state.idToken,
  loggedIn: state => state.loggedIn,
};
const mutations = {
  setCognitoInfo: (state, data) => {
    state.cognitoInfo = data;
  },
  setLoggedIn: (state, data) => {
    state.loggedIn = data;
  },
  setIdToken: (state, data) => {
    state.idToken = data;
  },
};
const actions = {
  cognitoInfo: ({ commit }) => {
    const key = 'CognitoIdentityServiceProvider';
    const idToken = localStorage.getItem(`${key}.idToken`);
    commit('setIdToken', idToken);
    const base64Url = idToken.split('.')[1];
    commit('setCognitoInfo', JSON.parse(window.atob(base64Url)));
    commit('setLoggedIn', true);
  },
  logout: ({ commit }) => {
    AuthenticationService.logout();
    commit('setLoggedIn', false);
    commit('setCognitoInfo', {});
    commit('setIdToken', null);
    router.push({ name: 'login' });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
