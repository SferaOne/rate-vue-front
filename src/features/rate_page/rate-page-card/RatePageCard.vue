<template>
  <div class="rate-page-card-conteiner" id="rate.id">
    <div class="rate-page-card-block">
      <div class="rate-page-card-infoblock">
        <div class="rate-page-card-title">
          {{ rate.title }}
        </div>
        <div class="rate-page-card-short-title-sub">
          <div class="rate-page-card-short-title-sub-info">
            <div>
              Перевозчик:&nbsp;{{rate.line_name}}&nbsp;
            </div>
            <div>
              Терминал:&nbsp;{{(rate.is_direct == 0) ? rate.terminal_name : (rate.is_ete == 1) ? rate.across_place_name_ext : "" }}&nbsp;
            </div>
            <div>
              Порт отправки:&nbsp;{{ (rate.base_place_from_name_ext.length > 0) ? rate.base_place_from_name_ext : rate.base_place_from_name }}&nbsp;
            </div>
            <div>
              &nbsp;{{ (rate.is_ete == 1) ? "Сквозной сервис" : "" }}&nbsp;
            </div>
          </div>
        </div>
        <RatePageDetailTable :items="rate.detail"/>
        <div class="rate-path-info">
          <div class="rate-path-container">
            <div class="rate-path-left-conteiner">
              <div class="rate-tranzit-header text-left">
                Ставка действительна до {{ actions.getDate(rate.date_to)}}
              </div>
              <!--div class="rate-tranzit-header">
                Ориентировочное транзитное время {{rate.tranzit_time}} дней
              </div-->
              <div class="rate-tranzit-header text-left tomato">
                Автодоставка в стоимость не включена!
              </div>
              <div class="rate-tranzit-header text-left tomato">
                Место пересечения границы {{rate.place_across_name}} ({{(rate.is_direct == 0) ? rate.terminal_name : (rate.is_ete == 1) ? rate.across_place_name_ext : "" }}&nbsp;)
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="rate-card-cost">
        <div class="rate-card-cost-container">
          <div class="rate-card-unit">
            {{ rate.delivery_term_code }}
          </div>
          <div class="rate-card-unit">
            {{ rate.unit_code }}
          </div>
          <div class="rate-card-cost-total">
            {{ actions.getNumber(rate.total) }}&nbsp;&#8381;
          </div>
          <div class="rate-card-usd-cost-total" v-if="rate.total != rate.usd_total">
            {{ actions.getNumber(rate.usd_total) }}&nbsp;&#36;
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { methods } from "../rate-page-utils";
import RatePageDetailTable from "@/features/rate_page/rate-page-detail/RatePageDetailTable";

export default {
  name: "RatePageCard.vue",
  props: {
    rate: {
      type: Object,
    }
  },
  components: {
    RatePageDetailTable,
  },
  data: () => ({
    actions: methods,
  }),
  methods: {
  }
}
</script>

<style scoped>
  @import "rate-page-card.css";
</style>