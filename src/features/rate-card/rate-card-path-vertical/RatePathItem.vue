<template>
  <div class="service-path-item">
    <img :alt="service.service" :title="service.service" class="rate-card-service-img" :src="service.icon"/>
    <p>{{service.place_from}} - {{service.place_to}}</p>
  </div>
</template>

<script>

export default {
  name: "RatePathItem.vue",
  props:{
    service:{
      type: Object,
    }
  },
  data: () => ({

  }),
}
</script>

<style scoped>
.rate-card-service-img{
  width: 50px;
  opacity: 100%;
}
.service-path-item{
  display: flex;
  flex-direction: row;
}
</style>