<template>
  <div  v-if="items.length > 0">
    <h3 class="block-header">{{header}}:</h3>
    <div class="additional-items-container">
      <div v-for="item in items" :key="item.id">
        <AdditionalTableItem :item="item"/>
      </div>
    </div>
  </div>
</template>

<script>
import AdditionalTableItem from "@/features/rate_page/additional-storage-table/AdditionalTableItem";

export default {
  name: "AdditionalTable.vue",
  props:{
    items:{
      type: Array,
    },
    header:{
      type: String,
    }
  },
  components:{
    AdditionalTableItem,
  }
}
</script>

<style scoped>
  @import "./additional-table.css";
</style>