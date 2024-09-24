<template>
  <div>
    <table class="rate-page-detail-table">
      <thead>
      <tr style="font-weight: bold; text-align: left">
        <td colspan="2">Этап</td>
        <td>Место отправки</td>
        <td>Место прибытия</td>
        <td class="td-right">Стоимость, вал</td>
        <td class="td-right">Стоимость, &#8381;</td>
      </tr>
      </thead>
      <tr class="rate-page-detail-service" v-for="service in items" :key="service.id">
        <td>
          <img class="rate-page-service-img" :src="actions.getImage(service)" />
        </td>
        <td>{{ service.service }}</td>
        <td>{{ actions.CreateChain(service, 0) }}</td>
        <td>{{ actions.CreateChain(service, 1) }}</td>
        <td class="td-right">
          {{ actions.getNumber(service.summa) }}&nbsp;
          <span v-if="service.cur_code == 'USD'">&#36;</span>
          <span v-else>&#8381;</span>
        </td>
        <!--td class="td-center">{{ service.tranzit_time }}</td-->
        <td class="td-right">{{ actions.getNumber(service.cost)}} &#8381;</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { methods } from "../rate-page-utils";

export default {
  name: "RatePageDetailTable.vue",
  props: {
    items:{
      type: Array,
    }
  },
  data: () => ({
    actions: methods,
  }),
}
</script>

<style scoped>
  @import "rate-page-detail-table.css";
</style>