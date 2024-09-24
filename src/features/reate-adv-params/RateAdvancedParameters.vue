<template>
  <div class="rate-adv-parameters-container">
    <div class="adv-panel-transform">
      <span class="adv-panel-header">Фильтр...</span>
      <div class="customs-price-calculator-slider">
        <div class="customs-price-slider-label">
          <div class="">
            {{ ex1.label }}
          </div>
          <div class="customs-price-slider-value">
            до {{ getnumber(ex1.val) }} &nbsp;&#8381;
          </div>
        </div>
        <v-slider
            class="adv-param-slider"
            v-model="ex1.val"
            :color="ex1.color"
            track-color="#6c8693"
            :min="ex1.min"
            :max="ex1.max"
            @change="estimation"
        ></v-slider>
      </div>
      <!--div class="customs-price-calculator-slider">
        <div class="customs-price-slider-label">
          <div class="">
            {{ex2.label}}
          </div>
          <div class="customs-price-slider-value">
            до {{getnumber(ex2.val)}} дней
          </div>
        </div>
        <v-slider
            class="adv-param-slider"
            v-model="ex2.val"
            :color="ex2.color"
            track-color="#6c8693"
            :min="ex2.min"
            :max="ex2.max"
            @change="estimation"
        ></v-slider>
      </div-->
      <div class="customs-price-calculator-slider">
        <div class="customs-price-slider-label">
          <div class="adv-checkbox-label">
            Исключить море
          </div>
          <div class="customs-price-slider-value">
            <v-checkbox
                v-model="is_not_sea"
                @click="estimation"
            ></v-checkbox>
          </div>
        </div>
      </div>
      <div class="customs-price-calculator-slider">
        <div class="customs-price-slider-label">
          <div class="adv-checkbox-label">
            Исключить прямые поезда
          </div>
          <div class="customs-price-slider-value">
            <v-checkbox
                v-model="is_direct"
                @click="estimation"
            ></v-checkbox>
          </div>
        </div>
      </div>
      <!--div class="customs-price-calculator-slider">
        <div class="customs-price-slider-label">
          <div class="adv-checkbox-label">
            Есть порожнее оборудование
          </div>
          <div class="customs-price-slider-value">
            <v-checkbox
                v-model="is_lack_of_empty_equipment_date"
                @click="estimation"
            ></v-checkbox>
          </div>
        </div>
      </div-->
      <div class="customs-price-calculator-slider">
        <div class="customs-price-slider-label">
            <v-radio-group
              v-model="coc_soc"
              row
              @change="OnRadioChange"
            >
              <v-radio
                label="Все"
                value="0"
              ></v-radio>
              <v-radio
                label="COC"
                value="1"
              ></v-radio>
              <v-radio
                label="SOC"
                value="2"
              ></v-radio>
            </v-radio-group>
        </div>
      </div>
      <!--div class="customs-price-calculator-slider">
        <div class="customs-price-calculator-slider-img">
          <img class="r-adv-params-img" src="1.png"/>
          <div class="customs-price-slider-value-autocomplete">
            <v-autocomplete
                v-model="selected_ports"
                :items="ports"
                chips
                clearable
                deletable-chips
                multiple
                small-chips
                item-text="name"
                label="Порт/Терминал прибытия"
                item-value="id"
                @change="estimation"
            ></v-autocomplete>
          </div>
        </div>
      </div>
      <div class="customs-price-calculator-slider">
        <div class="customs-price-calculator-slider-img">
          <img class="r-adv-params-img" src="2.png"/>
          <div class="customs-price-slider-value-autocomplete">
            <v-autocomplete
                v-model="selected_stations"
                :items="stations"
                chips
                clearable
                deletable-chips
                multiple
                small-chips
                label="Станция прибытия/Город"
                item-text="name"
                item-value="id"
                @change="estimation"
            ></v-autocomplete>
          </div>
        </div>
      </div>
      <div class="customs-price-calculator-slider">
        <div class="customs-price-calculator-slider-img">
          <img class="r-adv-params-img" src="contragent.png"/>
        <div class="customs-price-slider-value-autocomplete">
          <v-autocomplete
              v-model=" selected_contractors"
              :items="contractors"
              chips
              clearable
              deletable-chips
              multiple
              label="Линия"
              small-chips
              item-text="name"
              item-value="id"
              @change="estimation"
          ></v-autocomplete>
        </div>
          </div>
      </div>
      <div class="customs-price-calculator-slider">
        <div class="customs-price-calculator-slider-img">
          <img class="r-adv-params-img" src="calendar.png"/>
        <div class="customs-price-slider-value-autocomplete">
          <v-autocomplete
              v-model="selected_sea_start_weeks"
              :items="sea_start_weeks"
              chips
              clearable
              deletable-chips
              multiple
              label="Неделя выхода"
              small-chips
              item-text="name"
              item-value="id"
              @change="estimation"
          ></v-autocomplete>
        </div>
          </div>
      </div-->
    </div>
  </div>
</template>

<script>
import {bus} from "@/shared/bus/bus";

export default {
  name: "RateAdvancedParameters.vue",
  props: {
    baseparams: {
      type: Object,
    }
  },
  watch: {
    baseparams(val) {
//          this.resetselected()
      this.ex1 = {
        label: 'Стоимость',
        val: ((this.price_val == val.maxprice || this.price_val == 0) ? val.maxprice : this.price_val),
        color: '#a7c2d3',
        min: val.minprice,
        max: val.maxprice
      }
      this.ex2 = {
        label: 'Ориентировочное транзитное время',
        val: ((this.tz_val == val.maxtztime || this.tz_val == 0) ? val.maxtztime : this.tz_val),
        color: '#a7c2d3',
        min: val.mintztime,
        max: val.maxtztime
      }
      this.ports = val.ports
      this.stations = val.stations
      this.contractors = val.contractors
      this.sea_start_weeks = val.sea_start_weeks
      if (this.selected_ports.length == 0)
        this.getkeys(this.ports, this.selected_ports, this.unselected_ports, 'id')
      if (this.selected_stations.length == 0)
        this.getkeys(this.stations, this.selected_stations, this.unselected_stations, 'id')
      if (this.selected_contractors.length == 0)
        this.getkeys(this.contractors, this.selected_contractors, this.unselected_contractors, 'id')
      if (this.selected_sea_start_weeks.length == 0)
        this.getkeys(this.sea_start_weeks, this.selected_sea_start_weeks, this.unselected_contractors, 'id')
    }
  },
  data: vm => ({
    ex1: {
      label: 'Стоимость',
      val: vm.baseparams.maxprice,
      color: '#a7c2d3',
      min: vm.baseparams.minprice,
      max: vm.baseparams.maxprice
    },
    ex2: {
      label: 'Ориентировочное транзитное время',
      val: vm.baseparams.maxtztime,
      color: '#a7c2d3',
      min: vm.baseparams.mintztime,
      max: vm.baseparams.maxtztime
    },
    is_direct: false,
    is_not_sea: false,
    is_lack_of_empty_equipment_date: false,
    selected_ports: [],
    ports: [],
    selected_stations: [],
    stations: [],
    selected_contractors: [],
    contractors: [],
    price_val: 0,
    tz_val: 0,
    coc_soc: 0,
    is_soc: [0,1],
    sea_start_weeks: [],
    selected_sea_start_weeks: [],
  }),
  methods: {
    resetselected() {
      this.selected_contractors = []
      this.selected_stations = []
      this.selected_ports = []
      this.selected_ports = []
      this.selected_sea_start_weeks = []
    },
    getarrdifirence(all_arr, sel_arr) {
      let result = []
      for (let i = 0; i < all_arr.length; i++) {
        if (!sel_arr.includes(all_arr[i].id))
          result.push(all_arr[i].id)
      }
      return result
    },
    estimation() {
      this.tz_val = this.ex2.val
      this.price_val = this.ex1.val
      bus.$emit("filterratelist", {
        price_limit: this.price_val,
        tz_limit: this.tz_val,
        is_direct: this.getDirect(),
        is_not_sea: this.getNotSea(),
        selected_port: this.selected_ports,
        selected_station: this.selected_stations,
        selected_contractor: this.selected_contractors,
        selected_sea_start_weeks: this.selected_sea_start_weeks,
        is_soc: this.is_soc,
        is_lack_of_empty_equipment_date: this.getLackOfEmptyEquipment(),
      });
    },
    OnRadioChange(){
      switch(parseInt(this.coc_soc)){
        case 0: this.is_soc = [0,1]; break
        case 1: this.is_soc = [0]; break
        case 2: this.is_soc = [1]; break
      }
      this.estimation()
    },
    getLackOfEmptyEquipment(){
      return (this.is_lack_of_empty_equipment_date) ? [0, 0] : [1, 0, 1, 2];
    },
    getDirect() {
      return (this.is_direct) ? [0, 0] : [1, 0, 1];
    },
    getNotSea() {
      return (this.is_not_sea) ? [0, 0] : [ 1, 0, 1, 2];
    },
    getnumber(value) {
      return parseFloat(value).toLocaleString('ru-RU')
    },
    getkeys(source, destination, limits, key) {
      if (source != null) {
        for (let i = 0; i < source.length; i++) {
          if (source[i].is_visible == 1) {
//                if (limits.length != 0){
//                  if (!limits.includes(source[i][key]))
//                  if (!this.checkdestination(destination, key, source[i][key]))
            if (!destination.includes(source[i][key]))
              destination.push(source[i][key])
//              } else destination.push(source[i][key])
          }
        }
      }
    }
  },
}
</script>

<style scoped>
.rate-adv-parameters-container {
  width: 95%;
  min-height: 50vw;
  display: flex;
  flex-direction: column;
  margin: 1.61%;
}

.customs-price-calculator-slider {
  margin-left: 1.61%;
  margin-right: 1.61%;

}

.customs-price-slider-label {
  line-height: 20px;
  min-height: 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto;
  font-size: 11pt;
}

.adv-param-slider {
  padding-top: 0.1vw;
}

.customs-price-slider-value {
  font-size: 11pt;
  margin-left: auto;
  margin-right: 0;
}
.customs-price-slider-value-autocomplete{
  font-size: 11pt;
  margin-left: auto;
  margin-right: 0;
  width: 100%;
}
.adv-panel-header {
  margin-left: 1.61%;
}

.adv-checkbox-label {
/*  margin-top: auto;*/
  margin-bottom: auto;
}

.adv-rate-params-label {
  font-size: 11pt;
}

.chip-bg-color {
  background: #a7c2d3 !important;
  color: #6c8693 !important;
}

.r-adv-params-img {
  width: 15%;
  height: 15%;
}

.customs-price-calculator-slider-img {
  display: flex;
  flex-direction: row;
  margin: auto;
}
.v-messages{
  display: none;
}
.v-input--selection-controls{
  margin-top: 0px !important;
  padding-top: 0px !important;
}
.adv-panel-transform{
  padding-top: 3.93%;
}

</style>