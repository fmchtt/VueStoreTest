<template>
  <div v-if="opacity" id="alert" class="alert alert-danger" role="alert">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      opacity: false,
      message: ''
    };
  },
  mounted() {
    this.$root.$on("ErrorAlert", (response) => {
      this.message = response.message
      this.opacity = true;
      setTimeout(() => {
        this.opacity = false;
      }, 2000);
    });
  },
};
</script>

<style scoped>
div {
  z-index: 20000;
  transition-duration: 2s;
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>