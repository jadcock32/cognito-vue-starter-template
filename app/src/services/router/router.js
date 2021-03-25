import Vue from 'vue';
import Router from 'vue-router';
import store from '../../store/store';
import AuthenticationService from '../api/authentication/authentication-service';

Vue.use(Router);

function requireAuth(to, from, next) {
  AuthenticationService.authenticated().then(res => {
    if (res) {
      store.dispatch('cognitoInfo');
      store.commit('setLoggedIn', true);
      to.name === 'login' ? next({ name: 'home' }) : next();
    }
    if (!res) {
      if (to.name !== 'login') {
        if (store.getters.idToken) {
          store.dispatch('logout');
        }
        if (to.name === 'home') {
          return next();
        }
        next({ name: 'login' });
      } else {
        next();
      }
    }
  });
}

export default new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home'),
      beforeEnter: requireAuth,
      children: [
        {
          path: '/content',
          name: 'content',
          component: () => import('@/views/Content'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      beforeEnter: requireAuth,
      component: () => import('@/views/Login'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register'),
    },
  ],
});
