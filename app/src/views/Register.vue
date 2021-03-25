<template>
  <div id="register" class="full-size grid middle">
    <div class="seven-wide full-height image"></div>
    <div class="five-wide form segment">
      <h2 class="large header">{{ title }}</h2>
        <Form ref="form" v-show="!hasRegistered" @event="event" />
        <Confirmation ref="confirmation" v-if="hasRegistered" @event="event" />
      <button class="primary button" @click="event">Confirm</button>
    </div>
  </div>
</template>

<script>
import Form from '../components/register/Form';
import Confirmation from '../components/register/Confirmation';
import AuthenticationService from '../services/api/authentication/authentication-service';

export default {
  name: 'Register',
  components: {
    Form,
    Confirmation,
  },
  data() {
    return {
      hasRegistered: false,
    };
  },
  computed: {
    title() {
      return this.hasRegistered ? 'Confirm Registration' : 'Sign Up';
    },
    event() {
      return this.hasRegistered ? this.confirm : this.register;
    },
  },
  methods: {
    register() {
      const body = {
        firstName: this.$refs.form.formValues.firstName,
        lastName: this.$refs.form.formValues.lastName,
        email: this.$refs.form.formValues.email,
        password: this.$refs.form.formValues.password,
        confirm: this.$refs.form.formValues.confirm,
      };

      AuthenticationService.register(body)
        .then(() => {
          this.hasRegistered = true;
        })
        .catch(err => console.log(err));
    },
    confirm() {
      let body = {
        email: this.$refs.form.formValues.email,
        code: this.$refs.confirmation.formValues.code,
      };

      AuthenticationService.confirmRegistration(body)
        .then(() => {
          body = {
            email: this.$refs.form.formValues.email,
            password: this.$refs.form.formValues.password,
          };

          AuthenticationService.authenticate(body)
            .then(() => {
              this.$store.dispatch('cognitoInfo');
              this.$router.push({ name: 'home' });
            })
            .catch(err => console.log(err));
          }
        )
        .catch(err => console.log(err.message));
    },
  },
};
</script>
