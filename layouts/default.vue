<template>
  <v-app>
    <v-app-bar
      color="light-blue darken-4"
      flat
      dark
      shrink-on-scroll
      class="d-flex justify-center align-center"
      app
    >
      <v-toolbar-title class="align-self-center">
        <nuxt-link to="/" class="header-link">Новости</nuxt-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script></script>
<style lang="scss" scoped>
.header-link {
  color: white;
  text-decoration: none;
  &:hover {
    color: blanchedalmond;
  }
}
</style>
