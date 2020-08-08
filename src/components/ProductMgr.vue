<template>
  <div id="save">
    <button type="button" class="close" @click="close" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <form @submit="inserir">
      <div class="form-group">
        <label for="title">Título</label>
        <input
          v-model="title"
          type="text"
          class="form-control"
          id="title"
          aria-describedby="emailHelpId"
          placeholder="Título"
        />
        <small id="helpId" class="form-text text-muted">Dê um título ao seu produto!</small>
      </div>

      <hr />

      <div class="form-group">
        <label for="productImge">Imagem do produto</label>
        <input
          type="file"
          class="form-control-file"
          id="productImge"
          placeholder="Imagem do produto"
          aria-describedby="fileHelpId"
        />
        <small id="fileHelpId" class="form-text text-muted">Coloque uma boa foto do seu produto!!</small>
      </div>

      <hr />

      <div class="form-group">
        <label for="description">Descrição</label>
        <textarea
          v-model="description"
          placeholder="Descrição"
          class="form-control"
          id="description"
          rows="3"
        ></textarea>
        <small
          class="form-text text-muted"
        >Um produto sempre vende mais rápido com uma boa descrição!!</small>
      </div>

      <hr />

      <div class="form-group">
        <label for="preco">Preço</label>
        <input
          v-model="price"
          type="text"
          class="form-control"
          id="preco"
          aria-describedby="helpId"
          placeholder="Preço"
        />
        <small id="helpId" class="form-text text-muted">Coloque um bom preço e venda mais rápido!</small>
      </div>
      <button class="btn btn-primary">Salvar</button>
    </form>
  </div>
</template>

<script>
import { http } from "../services/config";

export default {
  props: {
    title: String,
    description: String,
    price: Number,
    _id: String,
  },
  methods: {
    inserir() {
      if (this._id) {
        http.put("/products/" + this._id, {
          title: this.title,
          description: this.description,
          price: this.price,
        });
        this.title = null;
        this.description = null;
        this.price = 0;
        this._id = null;
        this.$root.$emit("SucessAlert", { message: "Produto Atualizado!!" });
        this.$root.$emit("Refresh");
      } else {
        http
          .post("/products", {
            title: this.title,
            description: this.description,
            price: this.price,
          })
          .then(() => {
            this.title = null;
            this.description = null;
            this.price = 0;
            this._id = null;
            this.$root.$emit("SucessAlert", { message: "Produto inserido" });
            this.$root.$emit("Refresh");
          })
          .catch(() => {
            this.$root.$emit("Unauthorized");
            this.$root.$emit("ErrorAlert", {
              message: "Erro!! Impossivel inserir",
            });
          });
      }
    },
    close() {
      this.$root.$emit('ProductEditClose');
    }
  },
};
</script>

<style scoped>
#save {
  /*
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;*/
  width: 30vw;
  margin: 30px auto;
  box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.75);
  padding: 30px;
  border-radius: 15px;
}
</style>