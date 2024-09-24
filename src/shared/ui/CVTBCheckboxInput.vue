<template>
      <v-checkbox
          v-model="value"
          :label="element.caption"
          :alt="element.alt"
          :title="element.alt"
          @change="OnChange"
      ></v-checkbox>
</template>

<script>
export default {
  name: "CVTBCheckboxInput.vue",
  props: {
    element: {
      type: Object
    },
    val:{
      type: Boolean,
    }
  },
  data: () => ({
    value: false,
  }),
  watch: {
    val: function () {
      this.value = this.val
    },
  },
  methods: {
    OnChange() {
      this.$emit("selected", {element: this.element.name, value: this.value})
    }
  },
}
</script>

<style scoped>
.cvtb-check-box{
  display: flex;
  flex-direction: row;
  width: 100%;
}
.adv-checkbox-label{
  margin-bottom: auto;
  margin-top: auto;
}
</style>