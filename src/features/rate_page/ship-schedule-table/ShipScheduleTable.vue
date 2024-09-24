<template>
  <div v-if="items.length > 0">
    <h3 class="block-header">Расписание судов:</h3>
    <table class="ship-schedule-table">
      <thead class="schedule-table-head">
      <tr style="font-weight: bold;">
        <td class="td-center">Место отправки</td>
        <td class="td-center">Место доставки</td>
        <td class="td-center">Подрядчик</td>
        <td class="td-right">Наименование судна</td>
        <td class="td-center">Дата выхода в море</td>
        <td class="td-center">Дата прихода в порт</td>
      </tr>
      </thead>
      <tr class="rate-card-detail-service" v-for="item in items" :key="item.id">
        <td class="td-center">{{item.place_from_name}}({{item.point_from_name}})</td>
        <td class="td-center">{{item.place_to_name}}({{item.point_to_name}})</td>
        <td class="td-center">{{item.transporter_name}}</td>
        <td class="td-right">{{item.vassel_name}}</td>
        <td class="td-center">{{actions.getDate(item.sea_start_date)}}</td>
        <td class="td-center">{{actions.getDate(item.sea_end_date)}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { methods } from "@/features/rate_page/ship-schedule-table/ship-schedule-table";

export default {
  name: "ShipScheduleTable.vue",
  props: {
    items: {
      type: Array,
    },
  },
  data: () => ({
    actions: methods,
  }),
}
</script>

<style scoped>
  @import "ship-schedule-table.css";
</style>