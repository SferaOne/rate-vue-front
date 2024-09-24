<template>
  <v-radio-group
      :inline="element.inline"
      v-model="result"
      @change="onChange(element.name)">
    <v-radio v-for="item in element.items" :key="item.value"
             :label="item.caption"
             :value="item.value">
    </v-radio>
  </v-radio-group>
</template>

<script>
export default {
  name: "CVTRadioButton.vue",
  props: {
    element: {
      type: Object,
    },
  },
  data: () => ({
    result: 0
  }),
  methods: {
    onChange(name) {
      this.$emit("selected", { element: name, value: this.result})
    },
  },
}
</script>

<style scoped>

</style>