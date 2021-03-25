<template>
  <div id="counter" class="full-size flex-column">
    Content
  </div>
</template>

<script>
import ContentService from '../services/api/content/content-service';

export default {
  name: 'Counter',
  mounted() {
    ContentService.content().then(res => console.log(res));
  },
};
</script>
