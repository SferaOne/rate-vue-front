<template>
  <div class="cvtb-autocomplete">
    <v-autocomplete
        v-model="ids"
        :label="element.caption"
        :item-text="element.listfield"
        :item-value="element.keyfield"
        :items="list"
        :chips="element.chips"
        :clearable="element.chips"
        :deletable-chips="element.chips"
        :small-chips="element.chips"
        :multiple="element.multiple"
        @change="onChange(element.name)"
        :alt="element.alt"
        :title="element.alt"
    ></v-autocomplete>
  </div>
</template>

<script>
export default {
  name: "CVTBAutoComplete",
  props: {
    element: {
      type: Object,
    },
    val:{
      type: Array,
    }
  },
  components: {},
  data: () => ({
    el: {},
    ids: [],
    items: [],
    result: {},
    list: [],
  }),
  watch: {
    val: {
      handler(){
        if (this.element.multiple){
          for (let i = 0; i < this.val.length; i++) {
            this.ids.push(this.val[i])
          }
        } else  {
          this.ids = this.val[0]
        }
      },
      deep: true
    }
  },
  mounted() {
    this.getReferenceList(this.element.reference)
  },
  methods: {
    getReferenceList(refName) {
      this.$postapi(this.$address + this.$getters.getReferenceData.uri, {
        method: this.$getters.getReferenceData.name,
        reference_name: this.$references[refName].name
      }).then(data => {
        if (data.error == 0) {
          this.list = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`))
        } else {
          return []
        }
      });
    },
    onChange(name) {
      this.getResultItems()
      this.result = {element: name, value: this.items}
      this.$emit("selected", this.result)
    },
    getResultItems() {
      this.items = []
      for (let i = 0; i < this.list.length; i++) {
        if (this.element.multiple){
          if (this.ids.includes(this.list[i][this.element.keyfield]))
            this.items.push(this.list[i])
        } else {
          if (this.ids == this.list[i][this.element.keyfield])
            this.items.push(this.list[i])
        }
      } 
    }
  },
};
</script>

<style scoped>
.cvtb-autocomplete {
  display: flex;
  flex-direction: row;
}
</style>
