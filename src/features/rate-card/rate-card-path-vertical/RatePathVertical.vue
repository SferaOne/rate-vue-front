<template>
  <div class="mt-order-timeline">
    <div class="timeline">
      <div
        v-for="item in rate.detail"
        :key="item.id"
      >
        <RatePathItem :service="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import {rate_22423} from "@/stab/rate";
import RatePathItem from "@/features/rate-card/rate-card-path-vertical/RatePathItem";

export default {
  name: "RatePathVertical.vue",
  props:{
    rate:{
      type: Object,
    }
  },
  components: {
    RatePathItem,
  },
  data: () => ({
    rate: rate_22423,
    steps: [],
  }),
  methods: {
    getnumber(value){
      return parseFloat(value).toLocaleString('ru-RU')
    },
    getcurrencysign(value){
      return (value == 'USD') ? "<span>&#36;</span>" : '&#8381;';
    },
    getimage(item){
      return item.icon
    },
  }
}
</script>

<style scoped>
.mt-order-timeline{
  margin-left: auto;
  margin-right: auto;
}
.timeline{
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: auto;
  background: rgba(161,21,207, 0.1);
  border-radius: 5px;
  font-size: 12px;
}
</style>