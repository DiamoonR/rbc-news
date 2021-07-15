<template>
  <v-menu
    ref="menu"
    :close-on-content-click="false"
    :return-value.sync="dates"
    transition="scale-transition"
    offset-y
    min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dates"
        label="Выберите даты"
        prepend-icon="mdi-calendar"
        readonly
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="dates" range locale="ru" no-title>
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="menu = false">
        Закрыть
      </v-btn>
      <v-btn text color="primary" @click="saveDates(dates)">
        Выбрать
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script>
export default {
  data: () => ({
    dates: []
  }),
  methods: {
    saveDates(dates) {
      this.$refs.menu.save(dates);
      this.$emit("saveDates", dates);
    }
  }
};
</script>

<style></style>
