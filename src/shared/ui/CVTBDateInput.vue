<template>
  <v-menu
      v-model="menu2"
      :close-on-content-click="false"
      :nudge-right="40"
      :alt="element.alt"
      :title="element.alt"
      transition="scale-transition"
      offset-y
      min-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-model="dateFormatted"
          :label="element.caption"
          readonly
          v-bind="attrs"
          v-on="on"
          @blur="date = parseDate(dateFormatted)"
      ></v-text-field>
    </template>
    <v-date-picker
        no-title
        v-model="date"
        @input="menu2 = false"
        @change="OnChange(element.name)"
    ></v-date-picker>
  </v-menu>
</template>

<script>
export default {
  name: "CVTBDateInput",
  props: {
    element: {
      type: Object,
    },
  },
  data: vm => ({
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu2: false,
  }),
  watch: {
    date () {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  methods:{
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate (date) {
      if (!date) return null

      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    OnChange(name){
      this.$emit("selected", { element: name, value: this.date })
    }
  },
}
</script>

<style scoped>

</style>