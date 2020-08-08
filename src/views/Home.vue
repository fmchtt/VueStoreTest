<template>
  <div id="home">
    <nav v-if="admin === 'true'" class="navbar navbar-light bg-info">
      <button class="btn btn-secondary" @click="active=true">Visualizar Produtos</button>
      <button class="btn btn-secondary" @click="active=false">Cadastro de Produtos</button>
    </nav>
    <div id="holder" v-if="active">
      <Produtos
        v-for="produto in Produtos"
        :key="produto._id"
        v-bind:title="produto.title"
        v-bind:price="produto.price"
        v-bind:description="produto.description"
        v-bind:_id="produto._id"
      />
    </div>
    <ProductMgr
      v-bind:title="title"
      v-bind:description="description"
      v-bind:price="price"
      v-bind:_id="id"
      v-if="!active"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import { http } from "../services/config";
import Produtos from "../components/Product";
import ProductMgr from "../components/ProductMgr";

export default {
  name: "Home",
  components: {
    Produtos,
    ProductMgr,
  },
  data() {
    return {
      Produtos: {},
      active: true,
      admin: "",
      title: "",
      description: "",
      price: 0,
      id: "",
    };
  },
  mounted() {
    this.atualizarProdutos();
    this.admin = localStorage.getItem("UserRoles");
    this.$root.$on("Refresh", () => {
      this.admin = localStorage.getItem("UserRoles");
      this.atualizarProdutos();
    });

    this.$root.$on("ProductEdit", (data) => {
      this.title = data.title;
      this.description = data.description;
      this.price = data.price;
      this.id = data._id
      this.active = false;
    });

    this.$root.$on('ProductEditClose', () => {
      this.active = true;
    })
  },
  methods: {
    atualizarProdutos() {
      http
        .get("/products")
        .then((response) => {
          this.Produtos = response.data;
        })
        .catch((err) => {
          if (err) {
            this.$root.$emit("Unauthorized");
          }
        });
    },
    error() {
      this.$root.$emit("SucessAlert", { message: "Produto Inserido" });
    },
  },
};
</script>

<style scoped>
nav {
  box-shadow: 0px 44px 83px -40px rgba(0, 0, 0, 0.75);
}

#holder {
  margin: 10px 10px;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

input {
  margin: 10px 0;
}
</style>
