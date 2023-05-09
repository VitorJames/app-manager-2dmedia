<template>
  <v-app-bar app :color="themeColor" dark>
    <div class="d-flex align-center">
      <v-img
        alt="Vuetify Logo"
        class="shrink mr-2"
        contain
        src="http://atendimento.2dmedia.com.br/static/media/LogoHBranco.31c75d91.png"
        transition="scale-transition"
        width="120"
      />
    </div>

    <v-spacer></v-spacer>

    <v-tabs right class="ml-n9" v-if="$vuetify.breakpoint.mdAndUp">
      <v-tab v-for="link in links" :key="link" @click="gotToDiv(link)">
        {{ link }}
      </v-tab>
    </v-tabs>
    <template v-slot:extension v-if="$vuetify.breakpoint.smAndDown">
      <v-tabs align-with-title fixed-tabs show-arrows>
        <v-tab v-for="link in links" :key="link" @click="gotToDiv(link)">
          {{ link }}
        </v-tab>
      </v-tabs>
    </template>
    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      icon
      v-if="$vuetify.breakpoint.smAndDown"
    >
      <v-icon>mdi-cart</v-icon>
    </v-btn>
    <v-btn
      href="https://github.com/vuetifyjs/vuetify/releases/latest"
      target="_blank"
      icon
      title="Sair"
    >
      <v-icon>mdi-location-exit</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    links: [
      "Home",
      "Métricas",
      "Orçamentos",
      "Categorias",
      "Produtos",
      "Usuários",
    ],
  }),
};
</script>

<style>
</style>