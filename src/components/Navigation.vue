<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <img src="../assets/logo.png" />
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <p>Seja muito bem vindo(a) {{ name }}</p>
    <button class="btn btn-danger" @click="logout">Sair</button>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    logout() {
      this.$root.$emit("Unauthorized");
      localStorage.setItem("X-Acess-Token", "");
    },
  },
  mounted () {
    this.name = localStorage.getItem('UserName');
    this.$root.$on('Refresh', () => {
      this.name = localStorage.getItem('UserName');
    })
  }
};
</script>

<style scoped>
p {
  color: var(--light);
  line-height: 90px;
  padding: 0 15px;
  margin: 0;
}

nav {
  margin: 0;
  padding: 0;
  display: flex;
  height: 90px;
}

a {
  height: 100%;
  margin: 0;
  padding: 0 20px;
  border-right: 2px var(--light);
  line-height: 90px;
  color: var(--light);
}

a:hover {
  text-decoration: none;
  background-color: var(--secondary);
  color: var(--light);
}

img {
  max-height: 100%;
}

button {
  justify-self: flex-end;
}
</style>