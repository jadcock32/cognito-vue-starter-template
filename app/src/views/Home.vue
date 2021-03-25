<template>
  <div id="home" class="full-size flex-column middle">
    <Nav />
    <router-view class="flex-column container middle"></router-view>
  </div>
</template>

<script>
import Nav from '../components/shared/Nav';

export default {
  name: 'Home',
  components: {
    Nav,
  },
};
</script>
