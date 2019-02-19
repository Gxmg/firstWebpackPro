<template>
  <div id="app">
    <h1>{{ msg }}</h1>
    <img :src="url">
    <input type="text" v-model="msg">
  </div>
</template>

<script>

import getData from './util';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js',
      url: require('./img/logo.png')
    }
  },
  created() {
    this.fetchData();
    console.log('23333');
  },
  methods: {
     async fetchData() {
      const data = await getData();
      this.msg = data;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;

  h1 {
    color: green;
  }
}
</style>