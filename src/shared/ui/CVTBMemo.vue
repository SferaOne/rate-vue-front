<template>
  <v-textarea
      :name="element.name"
      :label="element.caption"
      :alt="element.alt"
      :title="element.alt"
      :rows="(element.rows == undefined) ? 5: element.rows"
      v-model="value"
      @change="OnChange"
  ></v-textarea>
</template>

<script>
export default {
  name: "CVTBMemo.vue",
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
    val: function () {
      this.value = this.val
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