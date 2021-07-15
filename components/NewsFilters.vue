<template>
  <section>
    <v-row>
      <v-col>
        <date-filter v-on:saveDates="saveDates"></date-filter>
      </v-col>
      <v-col>
        <word-filter v-on:update="updateSearchWord"></word-filter>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import WordFilter from "@/components/WordFilter.vue";
import DateFilter from "@/components/DataFilter.vue";
export default {
  components: {
    WordFilter,
    DateFilter
  },
  props: {},
  methods: {
    updateSearchWord(value) {
      this.$emit("updateSearchWord", value);
    },
    saveDates(dates) {
      this.$emit("saveDates", dates);
    }
  }
};
</script>

<style></style>
