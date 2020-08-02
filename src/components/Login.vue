<template>
  <div class="back">
    <div class="square">
      <img src="../assets/logo.png" />
      <label to="login">E-Mail:</label>
      <input id="login" type="text" placeholder="E-Mail" v-model="email" />
      <label to="senha">Senha:</label>
      <input id="senha" type="password" placeholder="Senha" v-model="password" />
      <button type="button" class="btn btn-primary" @click="login" value="Entrar">Entrar</button>
    </div>
  </div>
</template>

<script>
import { http } from "../services/config";

export default {
  data() {
    return {
      token: null,
      email: null,
      password: null,
    };
  },
  methods: {
    login() {
      http
        .post("customers/auth", { email: this.email, password: this.password })
        .then((response) => {
          localStorage.setItem("X-Acess-Token", response.data.token);
          if (response.data.roles.includes("admin")) {
            localStorage.setItem("UserRoles", true);
          } else {
            localStorage.setItem("UserRoles", false);
          }
          localStorage.setItem("UserName", response.data.name);
          this.$root.$emit("Login");
          this.$root.$emit("Refresh");
        })
        .catch(() => {
          this.$root.$emit("ErrorAlert", {
            message: "Erro!! verifique suas credenciais",
          });
        });
    },
  },
};
</script>

<style scoped>
div {
  position: fixed;
  z-index: 100000;
  background-color: white;
}

.back {
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.square {
  display: flex;
  flex-direction: column;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0px 0px 27px 1px rgba(0, 0, 0, 0.75);
}

img {
  display: block;
  margin: 0 auto;
}

input,
label {
  margin: 10px 0;
}
</style>