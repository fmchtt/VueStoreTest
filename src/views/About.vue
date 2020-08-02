<template>
  <div class="about">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Produtos Front</a>
      </div>
    </nav>

    <ul>
      <li v-for="erro in errors" :key="erro.path">O {{ erro.path }} não pode ficar em branco</li>
    </ul>

    <div class="container">
      <form @submit.prevent="inserir">
        <label>Nome</label>
        <input type="text" v-model="produto.title" placeholder="Nome" />
        <label>Quantidade</label>
        <input type="number" v-model="produto.quantity" placeholder="QTD" />
        <label>Valor</label>
        <input type="text" v-model="produto.price" placeholder="Valor" />

        <button class="waves-effect waves-light btn-small">
          Salvar
          <i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>NOME</th>
            <th>QTD</th>
            <th>VALOR</th>
            <th>OPÇÕES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="produto of produtos" :key="produto._id">
            <td>{{ produto.title }}</td>
            <td>{{ produto.quantity }}</td>
            <td>{{ produto.price }}</td>
            <td>
              <button @click="editar(produto)" class="waves-effect btn-small blue darken-1">
                <i class="material-icons">create</i>
              </button>
              <button @click="deletar(produto._id)" class="waves-effect btn-small red darken-1">
                <i class="material-icons">delete_sweep</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import produtos from "../services/produtos";

export default {
  data() {
    return {
      produto: {
        _id: null,
        title: null,
        quantity: null,
        price: null
      },
      produtos: [],
      errors: []
    };
  },
  mounted() {
    this.listar();
  },
  methods: {
    listar() {
      produtos.listar().then(response => {
        this.produtos = response.data;
      });
    },
    inserir() {
      if (this.produto._id) {
        produtos
          .atualizar(this.produto._id, this.produto)
          .then(resposta => {
            alert(resposta.data);
            this.produto = {};
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.data.errors;
          });
      } else {
        produtos
          .inserir(this.produto)
          .then(resposta => {
            alert(resposta.data);
            this.produto = {};
            this.listar();
            this.errors = [];
          })
          .catch(e => {
            this.errors = e.response.data.data.errors;
          });
      }
    },
    deletar(id) {
      produtos
        .deletar(id)
        .then(resposta => {
          this.listar();
          alert(resposta.data);
          this.errors = [];
        })
        .catch(e => {
          this.errors = e.response.data.data.errors;
        });
    },
    editar(produto) {
      this.produto = produto;
    }
  }
};
</script>

<style scoped>
</style>
