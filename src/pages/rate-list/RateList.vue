<template>
  <div class="rate-page-container">
    <div class="rate-loader-block" v-if="showloader == 1">
      <v-progress-circular
          :size="100"
          :width="10"
          color="primary"
          indeterminate
      ></v-progress-circular>
    </div>
    <div class="">
      <!--RateFilter :parameters="params"/-->
      <!--RateParametersH :parameters="params"/-->
    </div>
    <div class="rate-worked-block">
      <div class="rate-parameters">
        <RateParameters :cid="parseInt(cid)"/>
        <!--RateLegend/-->
      </div>
      <div class="rate-card-list-container" v-if="is_not_found">
        <div class="" v-for="item in ratelist" :key="item.id">
          <RateCard :rate="item"/>
        </div>
      </div>
      <div class="rate-card-list-container" v-else>
        <RateCardNotFound :parameters="params"/>
      </div>
      <div class="rate-advanced-parameters">
        <RateAdvancedParameters :baseparams="baseparams"/>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {bus} from "../../shared/bus/bus";
import { filter_methods } from "../../shared/lib/filter";

//import RateParametersH from "@/features/rate-params-horizontal/RateParametersH";
import RateParameters from "../../features/rate-params/RateParameters";
//import RateFilter from "../../features/rate-filter/RateFilter";
import RateCard from "../../features/rate-card/RateCard";
import RateAdvancedParameters from "../../features/reate-adv-params/RateAdvancedParameters";
import RateCardNotFound from "../../features/not-found/RateCardNotFound";
//import RateLegend from "../../features/rate-legend/RateLegend.vue";

export default {
  name: "RateList.vue",
  components: {
    RateParameters,
//    RateParametersH,
//    RateFilter,
    RateCard,
    RateAdvancedParameters,
    RateCardNotFound,
//    RateLegend,
  },
  data: () => ({
    ratelist: [],
    baseparams: {},
    cid: null,
    ports: [],
    stations: [],
    contractors: [],
    sea_start_weeks: [],
    showloader: 0,
    params: undefined,
    is_not_found: true,
    checkArrCount: 0,
//    unselected_port: [],
  }),
  mounted() {
    bus.$on("sortrates", (data) => {
      this.sortrates(data.type)
    });
    bus.$on("getratelist", (data) => {
      this.getdata(data)
    });
    bus.$on("filterratelist", (data) => {
      this.filterdata(data)
    });
    this.cid = this.$_getsetting("client_id");
  },
  methods: {
    getdata(data) {
       if (this.checkParameters(data) == true){
        this.params = data
        this.showloader = 1
        let out_date = new Date(data.on_date)
        out_date.setDate(out_date.getDate() + 4);
        this.$getapi(this.$address + this.$getters.getRateList.uri
            + data.on_date + '/'
            + data.place_from + '/'
            + data.place_to + '/'
            + data.unit_code).then(data => {
          if (data.error == 0) {
            this.ratelist = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`))
            this.checkpage()
            this.sortrates(0)
            this.getstartparams()
            this.getadvpairs()
            this.showloader = 0;
          } else {
            bus.$emit("show_notify", {
              color: "error",
              notifytext: data.message
            });
          }
        });
      } else {
            bus.$emit("show_notify", {
              color: "error",
              notifytext: "Указаны не все параметры для поиска!"
            });
      }
    },
    checkParameters(data){
      return (data.on_date != null && data.place_to.length > 0 && data.place_from.length > 0 && data.unit_code.length > 0) ? true : false
    },
    sortrates(type) {
      switch (type) {
        case 0: {
          this.ratelist.sort(function (a, b) {
            return a.total - b.total;
          });
        }
          break
        case 1: {
          this.ratelist.sort(function (a, b) {
            return a.tranzit_time - b.tranzit_time;
          });
        }
          break
      }
    },
    getstartparams(data) {
      if (data != undefined) {
        this.baseparams = {
          minprice: this.getminprice(),
          maxprice: this.getmaxprice(),
          mintztime: this.getmintztime(),
          maxtztime: this.getmaxtztime(),
          ports: this.ports,
//          unselected_port: data.unselected_port,
          stations: this.stations,
          contractors: this.contractors,
          sea_start_weeks: this.sea_start_weeks
        }
      } else {
        this.baseparams = {
          minprice: this.getminprice(),
          maxprice: this.getmaxprice(),
          mintztime: this.getmintztime(),
          maxtztime: this.getmaxtztime(),
          ports: this.ports,
//          unselected_port: this.unselected_port,
          stations: this.stations,
          contractors: this.contractors,
          sea_start_weeks: this.sea_start_weeks
        }
      }
    },
    resetfilters() {
      this.ports = []
      this.stations = []
      this.contractors = []
      this.sea_start_weeks = []
    },
    getadvpairs() {
      if (this.ratelist != null) {
        for (let i = 0; i < this.ratelist.length; i++) {
          if (this.ratelist[i].is_direct != 1)
//            if (this.ratelist[i].is_visible == 1) {
            this.add(this.ports, {
              name: this.ratelist[i].terminal_name,
              id: this.ratelist[i].terminal_id,
              is_visible: this.ratelist[i].is_visible
            })
          this.add(this.stations, {
            name: this.ratelist[i].station_name,
            id: this.ratelist[i].station_id,
            is_visible: this.ratelist[i].is_visible
          })
          this.add(this.contractors, {
            name: this.ratelist[i].line_name,
            id: this.ratelist[i].line_id,
            is_visible: this.ratelist[i].is_visible
          })
          this.parseSeaStartWeeks(this.ratelist[i])
//            }
        }
      }
    },
    parseSeaStartWeeks(value){
      let items = value.sea_start_weeks.split(",")
      for (let i = 0; i < items.length; i++) {
      this.add(this.sea_start_weeks, {
        name: (parseInt(items[i]) != 0 ) ? items[i] + "-я неделя" : 'Выходы отсутсвуют',
        id: items[i],
        is_visible: value.is_visible
      })
      }
    },
    filterdata(data) {
//      this.unselected_port = data.unselected_port
      if (this.ratelist != null) {
        for (let i = 0; i < this.ratelist.length; i++) {
          this.ratelist[i].is_visible = 1
          if (this.checkvisible(data, this.ratelist[i]))
            this.ratelist[i].is_visible = 1;
          else
            this.ratelist[i].is_visible = 0;
        }
        this.resetfilters()
        this.getadvpairs()
        this.getstartparams()
        this.checkFilterResult()
      }
    },
    checkvisible(data, item) {
      return filter_methods.methods.checkAll(item, data)
    },
    getminprice() {
      let values = this.ratelist.map(function (v) {
        return v.total;
      });
      return Math.min.apply(null, values);
    },
    getmaxprice() {
      let values = this.ratelist.map(function (v) {
        return v.total;
      });
      return Math.max.apply(null, values);
    },
    getmintztime() {
      let values = this.ratelist.map(function (v) {
        return v.tranzit_time;
      });
      return Math.min.apply(null, values);
    },
    getmaxtztime() {
      let values = this.ratelist.map(function (v) {
        return v.tranzit_time;
      });
      return Math.max.apply(null, values);
    },
    add(array, value) {
      if (value != null && value.name != null) {
        if (value.name.length > 0) {
          let inx = array.findIndex(function (item) {
            return item.id === value.id
          });
          if (inx < 0)
            array.push(value)
        }
      }
    },
    checkpage() {
      this.is_not_found = (this.ratelist.length > 0 && this.params != undefined) ? true : false;
    },
    getListCount(){
      this.checkArrCount = 0
      for (let i = 0; i < this.ratelist.length; i++){
        if (this.ratelist[i].is_visible == 1){
          this.checkArrCount = 1
          break
        }
      }
    },
    checkFilterResult(){
      this.getListCount()
      this.is_not_found = !(this.checkArrCount == 0)
    }
  }
}
</script>

<style scoped>
  @import "./rate-list.css";
</style>