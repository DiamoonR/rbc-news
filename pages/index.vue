<template>
  <section>
    <h1>Все новости</h1>
    <my-news :news="news"></my-news>
  </section>
</template>

<script>
import News from "@/components/News.vue";
export default {
  components: {
    "my-news": News
  },
  async fetch({ store }) {
    if (store.getters["news/news"].length === 0) {
      await store.dispatch("news/fetch");
    }
  },
  computed: {
    news() {
      return this.$store.getters["news/news"];
    }
  }
};
</script>

<style></style>
