<template>
  <div>
    
    <increment></increment>

    <hr>

    <subtract></subtract>

  </div>
</template>

<script>
import increment from "./counter/increment.vue";
import subtract from "./counter/subtract.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    increment,
    subtract
  }
};
</script>

<style lang="scss" scoped>

</style>
