<template>
  <div class="items">
    <div class="two items">
      <div class="item">
        <div class="label">First Name</div>
        <input type="text" v-model="formValues.firstName" @keyup.enter="$emit('event')" />
      </div>
      <div class="item">
        <div class="label">Last Name</div>
        <input type="text" v-model="formValues.lastName" @keyup.enter="$emit('event')" />
      </div>
    </div>
    <div class="item">
      <div class="label">Email</div>
      <input type="email" v-model="formValues.email" @keyup.enter="$emit('event')" />
    </div>
    <div class="item">
      <div class="label">Password</div>
      <input type="password" v-model="formValues.password" @keyup.enter="$emit('event')" />
    </div>
    <div class="item">
      <div class="label">Confirm Password</div>
      <input type="password" v-model="formValues.confirm" @keyup.enter="$emit('event')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      formValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirm: '',
      },
    };
  },
};
</script>
