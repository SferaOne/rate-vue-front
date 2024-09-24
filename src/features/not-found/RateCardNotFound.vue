<template>
  <div class="rate-not-found-page">
    <div class="rate-not-found-img">
      <v-img src="not-found-icon-24.jpg"></v-img>
    </div>
    <div class="rate-not-found-text">
      По данному запросу ничего не найдено...
    </div>
    <div>
      <v-btn rounded large color="primary" @click="createRateRequest"><v-icon dark>
          mdi-help
        </v-icon>Разместить завку на котировку</v-btn>
    </div>
  </div>
</template>

<script>
import {bus} from "@/shared/bus/bus";

export default {
  name: "RateCardNotFound.vue",
  props:{
    parameters:{
      type: Object
    }
  },
  data: () => ({

  }),
  methods:{
    createRateRequest(){
      bus.$emit("show_popup", );
    }
  }
}
</script>

<style scoped>
.rate-not-found-page{
  margin: auto;
  width: 100%;
  text-align: center;
}
.rate-not-found-img{
  width: 20%;
  margin: auto;
  padding-top: 1.61%;
  padding-bottom: 1.61%;
}
.rate-not-found-text{
  padding-top: 1.61%;
  padding-bottom: 1.61%;
}
</style>