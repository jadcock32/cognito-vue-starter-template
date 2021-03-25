<template>
  <div id="nav" class="full-size flex-row centered">
    <div class="full-size flex-row space-between middle">
      <div>Logo</div>
      <div v-if="loggedIn" class="links">
        <router-link :to="{ name: 'counter' }">Calorie Counter</router-link>
        <router-link :to="{ name: 'diary' }">Food Diary</router-link>
        <router-link to="#">Meal Planner</router-link>
        <router-link to="#">Weight Tracker</router-link>
        <a @click="logout">Log Out</a>
      </div>
      <div v-else class="links">
        <router-link :to="{ name: 'login' }">Login</router-link>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Nav',
  data() {
    return {
      isAuthenticated: false,
    };
  },
  computed: {
    ...mapGetters(['loggedIn']),
  },
  methods: {
    logout() {
      return this.$store.dispatch('logout');
    },
  },
};
</script>
