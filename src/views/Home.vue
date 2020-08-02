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
    <div id="save" v-if="!active">
      <input type="text" placeholder="Título" v-model="title" />
      <input type="text" placeholder="Descrição" v-model="description" />
      <input type="number" placeholder="Preço" v-model="price" />
      <button class="btn btn-primary" @click="inserir">Salvar</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { http } from "../services/config";
import Produtos from "../components/Product";

export default {
  name: "Home",
  components: {
    Produtos,
  },
  data() {
    return {
      Produtos: {},
      active: true,
      title: null,
      description: null,
      price: null,
      admin: ""
    };
  },
  mounted() {
    this.atualizarProdutos();
    this.admin = localStorage.getItem('UserRoles')
    this.$root.$on("Refresh", () => {
      this.admin = localStorage.getItem('UserRoles')
      this.atualizarProdutos();
    });
  },
  methods: {
    inserir() {
      http
        .post("/products", {
          title: this.title,
          description: this.description,
          price: this.price,
        })
        .then(() => {
          this.title = null;
          this.description = null;
          this.price = null;
          this.atualizarProdutos();
          this.$root.$emit("SucessAlert", { message: "Produto inserido" });
        })
        .catch(() => {
          this.$root.$emit("Unauthorized", { message: "Erro!! Impossivel inserir" });
          this.$root.$emit("ErrorAlert", { message: "Erro!! Impossivel inserir" });
        });
    },
    atualizarProdutos () {
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
    error () {
      this.$root.$emit('SucessAlert', { message: "Produto Inserido"})
    }
  },
};
</script>

<style scoped>
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

#save {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
