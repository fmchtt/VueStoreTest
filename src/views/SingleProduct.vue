<template>
  <main>
    <h1> {{ produto.title }} </h1>
    <img src="../assets/logo.png">
    <h3> Valor: R${{ produto.price }} </h3>
    <p> {{ produto.description }} </p>
    
  </main>
</template>

<script>
import { http } from "../services/config";
export default {
  data() {
    return {
      id: null,
      produto: {}
    };
  },
  mounted() {
    this.id = this.$route.params.id;

    http
        .get("/products/" + this.id)
        .then((response) => {
          this.produto = response.data;
        })
        .catch((err) => {
          if (err) {
            this.$root.$emit("Unauthorized");
          }
        });
  },
};
</script>

<style scoped>
  main {
    width: 80vw;
    box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.23);
    border-radius: 10px;
    margin: 10px auto;
  }

</style>