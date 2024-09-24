<template>
  <div class="additional-item-row">
    <div class="additional-item-name">{{ item.obj_name }}</div>
    <div class="additional-item-price">{{ actions.getNumber(item.price) }}&nbsp;
      <span v-if="item.currency_id == '840'">&#36;</span>
      <span v-else>&#8381;</span>
    </div>
  </div>
</template>

<script>
import { methods } from "../rate-page-utils";

export default {
  name: "AdditionalTableItem.vue",
  props: {
    item: {
      type: Object,
    },
  },
  data: () => ({
    actions: methods,
  }),
}
</script>

<style scoped>
  @import "./additional-table-item.css";
</style>