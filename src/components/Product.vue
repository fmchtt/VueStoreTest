<template>
  <div id="product">
    <h1>{{ title }}</h1>
    <img src="../assets/logo.png" />
    <p>{{ description }}</p>
    <h3>Valor: R$ {{ price }}</h3>
    <button class="btn btn-danger" v-if="admin === 'true'" @click="del">Deletar</button>
  </div>
</template>

<script>
import { http } from '../services/config'

export default {
  name: "Product",
  props: {
    title: String,
    description: String,
    price: Number,
    _id: String
  },
  data () {
    return {
      admin: false
    }
  },
  mounted () {
    this.admin = localStorage.getItem('UserRoles')
  },
  methods: {
    del() {
      http.delete('/products/'+ this._id).then(() => {
        this.$root.$emit('Refresh')
        this.$root.$emit('SucessAlert', { message: "Produto Deletado" })
      }).catch(() => {
        this.$root.$emit('ErrorAlert', { message: "Erro!! Sem permissões!" })
      })
    },
  }
};
</script>

<style scoped>
div {
  box-shadow: 0px 0px 4px 3px rgba(0, 0, 0, 0.23);
  border-radius: 15px;
}

h1 {
  font-size: 26px;
}

img {
  height: 40%;
}
</style>