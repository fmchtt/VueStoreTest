<template>
  <div id="product">
    <h1>{{ title }}</h1>
    <img src="../assets/logo.png" />
    <p>{{ description }}</p>
    <h3>Valor: R$ {{ price }}</h3>
    <router-link :to="{ path: '/product/' + _id , params: { id: _id }}"><button class="btn btn-success">Visualizar</button></router-link>
    <button class="btn btn-primary" v-if="admin === 'true'" @click="edit">Editar</button>
    <button class="btn btn-danger" v-if="admin === 'true'" @click="del">Deletar</button>
  </div>
</template>

<script>
import { http } from "../services/config";

export default {
  name: "Product",
  props: {
    title: String,
    description: String,
    price: Number,
    _id: String,
  },
  data() {
    return {
      admin: false,
    };
  },
  mounted() {
    this.admin = localStorage.getItem("UserRoles");
    this.$root.$on("Refresh", () => {
      this.admin = localStorage.getItem("UserRoles");
    });
  },
  methods: {
    del() {
      http
        .delete("/products/" + this._id)
        .then(() => {
          this.$root.$emit("Refresh");
          this.$root.$emit("SucessAlert", { message: "Produto Deletado" });
        })
        .catch(() => {
          this.$root.$emit("ErrorAlert", { message: "Erro!! Sem permissões!" });
        });
    },
    edit() {
      this.$root.$emit("ProductEdit", {
        title: this.title,
        description: this.description,
        price: this.price,
        _id: this._id,
      });
    },
  },
};
</script>

<style scoped>
div {
  padding: 20px;
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
}

h1 {
  font-size: 26px;
}

button {
  margin: 0 10px;
}

img {
  height: 40%;
}
</style>