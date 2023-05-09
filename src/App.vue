<template>
  <v-app>
    <AppBar />

    <v-main class="grey lighten-5">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import AppBar from './components/AppBar.vue';
export default {
  components:{
    AppBar
  },
  data: () => ({
    //
  }),
};
</script>