<template>
  <div id="app">
    <Login v-if="Login"/>
    <Register v-if="Register"/>
    <Navigation/>
    <router-view/>
    <SucessAlert/>
    <ErrorAlert/>
  </div>
</template>

<script>
import Login from "./components/Login";
import Register from "./components/Register";
import Navigation from "./components/Navigation";
import SucessAlert from "./components/SucessAlert";
import ErrorAlert from "./components/ErrorAlert";

export default {
  components: {
    Login,
    Register,
    Navigation,
    SucessAlert,
    ErrorAlert
  },
  data() {
    return {
      Login: false,
      Register: false,
    }
  },
  mounted () {
    this.$root.$on('Unauthorized',() => {
      this.Login = true;
    });
    
    this.$root.$on('Login',() => {
      this.Login = true;
    })

    this.$root.$on('Register',() => {
      this.Register = true;
    })

    this.$root.$on('Success',() => {
      this.Register = false;
      this.Login = false;
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
