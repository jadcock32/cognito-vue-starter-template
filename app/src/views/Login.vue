<template>
  <div id="login" class="full-size grid middle">
    <div class="seven-wide full-height image"></div>
    <div class="five-wide form segment">
      <h2 class="large header">Login</h2>
      <div class="item">
        <div class="label">Email:</div>
        <input type="email" v-model="formValues.email" @keyup.enter="login" />
      </div>
      <div class="item">
        <div class="label">Password:</div>
        <input type="password" v-model="formValues.password" @keyup.enter="login" />
      </div>
      <button class="primary button" @click="login">Confirm</button>
    </div>
  </div>
</template>

<script>
import AuthenticationService from '../services/api/authentication/authentication-service';

export default {
  name: 'Login',
  data() {
    return {
      formValues: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      AuthenticationService.authenticate(this.formValues)
        .then(() => {
          this.$store.dispatch('cognitoInfo');
          this.$router.push({ name: 'home' });
        })
        .catch(err => console.log(err));
    },
  },
};
</script>
