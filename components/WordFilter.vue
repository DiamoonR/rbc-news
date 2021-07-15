<template>
  <div>
    <v-text-field label="Введите запрос" v-model="value"></v-text-field>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update", value);
      }
    }
  }
};
</script>

<style></style>
