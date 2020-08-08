<template>
  <div class="back">
    <div class="square">
      <button type="button" class="close" @click="close" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <img src="../assets/logo.png" />
      <i class="fas fa-address-card">
        <label to="name">Nome:</label>
      </i>
      <input id="name" type="text" placeholder="Nome" v-model="name" />
      <i class="fas fa-envelope">
        <label to="login">E-Mail:</label>
      </i>
      <input id="login" type="text" placeholder="E-Mail" v-model="email" />
      <i class="fas fa-key">
        <label to="senha">Senha:</label>
      </i>
      <input id="senha" type="password" placeholder="Senha" v-model="password" />
      <button type="button" class="btn btn-primary" @click="register" value="Entrar">Entrar</button>
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
      name: null,
    };
  },
  methods: {
    register() {
      http
        .post("customers/", {
          name: this.name,
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.$root.$emit("Success");

          this.$root.$emit("SuccessAlert", {
            message: "Registrado com sucesso, faça login",
          });
        })
        .catch(() => {
          this.$root.$emit("ErrorAlert", {
            message: "Algo deu errado, tente novamente mais tarde!!",
          });
        });
    },
    close() {
      this.$root.$emit("Success");
    },
  },
};
</script>

<style scoped>
div {
  position: fixed;
  z-index: 100;
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
  width: 25vw;
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