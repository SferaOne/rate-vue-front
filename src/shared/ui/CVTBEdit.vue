<template>
  <v-text-field
      v-model="value"
      :label="element.caption"
      :alt="element.alt"
      :title="element.alt"
      :disabled="element.disabled"
      @change="OnChange"
  ></v-text-field>
</template>

<script>
export default {
  name: "CVTBEdit.vue",
  props: {
    element:{
      type: Object
    },
    val:{
      type: String,
    }
  },
  data: () => ({
    value: '',
  }),
  watch: {
    val: {
      handler(){
        this.value = this.val
      },
      deep: true
    },
  },
  methods:{
    OnChange(){
      this.$emit("change", { element: this.element.name, value: this.value })
    }
  }
}
</script>

<style scoped>

</style>