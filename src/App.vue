<template>
    <div id="app">
        <img src="./assest/logo.png">
        <h1>{{ msg }}</h1>
        <router-link to="/bar">
            bar--2-222->
        </router-link>
        <router-link to="/foo">
            22334232
        </router-link>
        <router-link to="/list">
            list---->
        </router-link>
        <router-view></router-view>
    </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App--HELLO WORLD'
      }
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
