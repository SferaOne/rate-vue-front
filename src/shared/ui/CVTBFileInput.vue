<template>
  <v-file-input
      counter
      :multiple="element.multiple"
      show-size
      truncate-length="25"
      v-model="result"
      :label="element.caption"
      @change="onChange(element.name)"
  ></v-file-input>
</template>

<script>
export default {
  name: "CVTBFileInput",
  props: {
    element: {
      type: Object,
    },
  },
  data: () => ({
    result: []
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