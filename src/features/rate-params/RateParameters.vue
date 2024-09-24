<template>
  <div class="rate-parameters-container">
    <span>Параметры запроса...</span>
    <div class="rate-params">
      <v-autocomplete
          v-model="place_from"
          :disabled="isUpdating"
          :items="places_from"
          small-chips
          flat
          clearable
          label="Место отправки"
          item-text="name"
          item-value="id"
      >
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.country"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </div>
    <div class="rate-params">
      <v-autocomplete class="param-field"
                      v-model="place_to"
                      :disabled="isUpdating"
                      :items="places_to"
                      small-chips
                      flat
                      clearable
                      label="Мeсто доставки"
                      item-text="name"
                      item-value="id"
      >
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.country"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
      <v-autocomplete class="param-field"
                      v-model="unit_code"
                      :disabled="isUpdating"
                      :items="unit_codes"
                      small-chips
                      flat
                      clearable
                      label="Оборудование"
                      item-text="name"
                      item-value="id"
      >
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="data.item.descr"></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </div>
    <div class="rate-params">
      <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
              v-model="dateFormatted"
              label="Дата готовности груза"
              flat
              persistent-hint
              v-bind="attrs"
              @blur="on_date = parseDate(dateFormatted)"
              v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker
            v-model="on_date"
            no-title
            @input="menu1 = false"
        ></v-date-picker>
      </v-menu>
      <v-btn rounded large color="primary" class="rate-search-button" @click="search">
        <v-icon>
          mdi-search-web
        </v-icon>
        Найти варианты
      </v-btn>
    </div>
  </div>
</template>

<script>
//    import DatePicker from 'vue2-datepicker';
import {bus} from "@/shared/bus/bus";

export default {
  name: "RateParameters.vue",
  props:{
    cid: {
      type: Number
    }
  },
//        components: { DatePicker },
  data: vm => ({
    unit_code: [],
    autoUpdate: true,
    place_from: [],
    place_to: [],
    isUpdating: false,
    places_from: [],
    places_to: [],
    unit_codes: [],
    country_from: null,
    country_to: [],
    countryes_from: [],
    countryes_to: [],
    fltr_places_from: [],
    fltr_places_to: [],
    on_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dateFormatted: vm.formatDate((new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)),
    menu1: false,
    show_change_client: 0,
  }),
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.on_date)
    },
  },
  watch: {
    isUpdating(val) {
      if (val) {
        setTimeout(() => (this.isUpdating = false), 3000)
      }
    },
    on_date() {
      this.dateFormatted = this.formatDate(this.on_date)
    },
  },
  mounted() {
    this.show_change_client = this.$_getsetting("show_change_client");
    this.getreferencedata('countryfrom')
    this.getreferencedata('countryto')
    this.getreferencedata('placefrom')
    this.getreferencedata('placeto')
    this.getreferencedata('unitcode')
  },
  methods: {
    getreferencedata(referencename) {
      this.$getapi(this.$address + this.$getters.getReferenceData.uri + referencename)
          .then(data => {
        if (data.error == 0) {
          switch (referencename) {
            case 'placefrom':
              this.places_from = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`));
//              this.returnplacefromreference()
              break
            case 'placeto':
              this.places_to = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`));
              this.returnplacetoreference()
              break
            case 'countryto':
              this.countryes_to = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`));
              break
            case 'countryfrom':
              this.countryes_from = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`));
              break
            case 'unitcode':
              this.unit_codes = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`));
              break
            case 'clientvdrefclients':
              this.clients = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`));
              break
          }
        } else {
          bus.$emit("show_notify", {
            color: "error",
            notifytext: data.message
          });
        }
      });
    },
    remove(item, id) {
      switch (id) {
        case 0: {
          const index = this.place_from.indexOf(item.id)
          if (index >= 0) this.place_from.splice(index, 1)
        }
          break
        case 1: {
          const index = this.unit_code.indexOf(item.id)
          if (index >= 0) this.unit_code.splice(index, 1)
        }
          break
        case 2: {
          const index = this.place_to.indexOf(item.id)
          if (index >= 0) this.place_to.splice(index, 1)
        }
      }
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [day, month, year] = date.split('.')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
    search() {
      bus.$emit("getratelist", {
        place_from: this.place_from,
        place_to: this.place_to,
        unit_code: this.unit_code,
        on_date: this.on_date,
      });
    },
    returnplacefromreference(){
      this.fltr_places_from = []
      if (this.country_from != null) {
        for (let i = 0; i < this.places_from.length; i++)
          if (this.places_from[i].country_id == this.country_from) {
            this.fltr_places_from.push({id: this.places_from[i].id, name: this.places_from[i].name, country: this.places_from[i].country_name})
          }
      } else this.fltr_places_from = this.places_from
    },
    filterplacefrom(){
      this.returnplacefromreference()
    },
    returnplacetoreference(){
      this.fltr_places_to = []
      if (this.country_to != null) {
        for (let i = 0; i < this.places_to.length; i++)
          if (this.places_to[i].country_id == this.country_to) {
            this.fltr_places_to.push({id: this.places_to[i].id, name: this.places_to[i].name, country: this.places_from[i].country_name})
          }
      } else this.fltr_places_to = this.places_to
    },
    filterplaceto(){
      this.returnplacetoreference()
    },
  },
}
</script>

<style scoped>
.rate-parameters-container {
  width: 100%;
  min-height: 3vw;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #e6eae9;
  padding: 4.93%;
}

.rate-params {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
.chip-bg-color{

}
/*    .param-field:first-child{
        margin-right: 3.22%;
    }
    .rate-search-button{
        margin-left: 3.22%;
    }*/
</style>