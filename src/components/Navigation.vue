<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <img src="../assets/logo.png" />
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <p>{{ message }}</p>
    <button class="btn btn-success" @click="login" v-if="name == 'null'">Entrar</button>
    <button class="btn btn-info" @click="registrar" v-if="name == 'null'">Registrar</button>
    <button class="btn btn-danger" @click="logout" v-if="name != 'null'">Sair</button>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      name: null,
    };
  },
  methods: {
    logout() {
      localStorage.setItem("X-Acess-Token", 'null');
      localStorage.setItem("UserName", 'null');
      localStorage.setItem("UserRoles", 'null');
      this.name = 'null';
      this.$root.$emit('Refresh');
      this.atualizaFrase();
    },
    login() {
      this.$root.$emit("Unauthorized");
    },
    atualizaFrase() {
      if (this.name == "null") {
        this.message = "Faça login e desfrute do sistema";
      } else {
        this.message = "Seja bem vindo(a) " + localStorage.getItem("UserName");
      }
    },
    registrar () {
      this.$root.$emit('Register');
    },
  },
  mounted() {
    this.name = localStorage.getItem("UserName");
    this.atualizaFrase();

    this.$root.$on("Refresh", () => {
      this.name = localStorage.getItem("UserName");
      this.atualizaFrase();
    });
  },
};
</script>

<style scoped>
p {
  color: var(--light);
  line-height: 90px;
  padding: 0 15px;
  margin: 0;
  flex-grow: 8;
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
  margin: 0 10px;
}
</style>