<template>
  <div id="app">
    <input type="text" v-model="msg">
    <h1>{{ msg }}</h1>
    <img :src="url">
  </div>
</template>

<script>

import action from './util';

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js',
      url: require('./img/boy.jpg')
    }
  },
  created() {
    this.fetchData();
    console.log('23333');
  },
  methods: {
     async fetchData() {
      const data = await action.getData();
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