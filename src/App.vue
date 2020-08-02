<template>
  <div id="app">
    <Login v-if="!Token"/>
    <Navigation/>
    <router-view/>
    <SucessAlert/>
    <ErrorAlert/>
  </div>
</template>

<script>
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import SucessAlert from "./components/SucessAlert";
import ErrorAlert from "./components/ErrorAlert";

export default {
  components: {
    Login,
    Navigation,
    SucessAlert,
    ErrorAlert
  },
  data() {
    return {
      Token: null
    }
  },
  mounted () {
    this.Token = localStorage.getItem("X-Acess-Token");
    this.$root.$on('Unauthorized',() => {
      this.Token = null;
    });
    
    this.$root.$on('Login',() => {
      this.Token = localStorage.getItem('X-Acess-Token');
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
