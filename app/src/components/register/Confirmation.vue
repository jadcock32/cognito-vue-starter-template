<template>
  <div class="item">
    <div class="label">Enter code here:</div>
    <input v-model="formValues.code" @keyup.enter="$emit('event')" />
  </div>
</template>

<script>
export default {
  name: 'Confirmation',
  data() {
    return {
      formValues: {
        code: '',
      },
    };
  },
};
</script>
