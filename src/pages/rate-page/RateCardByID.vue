<template>
  <div class="page-container">
    <RatePageCard :rate="rate"/>
    <ShipScheduleTable :items="schedule"/>
    <AdditionalStorageTable :items="additional.detention" :header="'Сверхнормативное использование контейнера'"/>
    <AdditionalStorageTable :items="additional.port_storage" :header="'Хранение в порту прибытия'"/>
    <AdditionalServiceTable :items="additional.port_additional" :header="'Дополнительные услуги в порту прибытия'"/>
    <AdditionalStorageTable :items="additional.station_storage" :header="'Хранение на станции прибытия'"/>
    <AdditionalServiceTable :items="additional.station_additional" :header="'Дополнительные услуги на станции прибытия'"/>
  </div>
</template>

<script>
import { bus } from "@/shared/bus/bus";
import RatePageCard from "@/features/rate_page/rate-page-card/RatePageCard";
import ShipScheduleTable from "@/features/rate_page/ship-schedule-table/ShipScheduleTable";
import AdditionalStorageTable from "@/features/rate_page/additional-storage-table/AdditionalTable";
import AdditionalServiceTable from "@/features/rate_page/additional-service-table/AdditionalTable";

export default {
  name: "RateCardByID",
  components: {
    AdditionalStorageTable,
    AdditionalServiceTable,
    ShipScheduleTable,
    RatePageCard,
},
  data: () => ({
    key: 0,
    on_date: "",
    cid: -1,
    rate: {},
    additional: {
      detention: [],
      port_storage: [],
      port_additional: [],
      station_storage: [],
      station_additional: [],
    },
    settingsFormShow: false,
    detention_comment: '',
    port_storage_comment: '',
    station_storage_comment:'',
    schedule: [],
  }),
  created() {
    this.key = this.$route.query.key;
    this.on_date = this.$route.query.on_date;
    this.getratebyid();
  },
  methods: {
    getratebyid() {
      this.$getapi(this.$address + this.$getters.getRateByKey.uri +
          this.key + '/' +
          this.on_date
      ).then((data) => {
        if (data.error == 0) {
          this.rate = JSON.parse(
              data.message
                  .replace(/:"f",/gm, `:false,`)
                  .replace(/:"t",/gm, `:true,`)
          )[0];
          this.getAdditionalExpensesRate()
          this.getShipScheduleByKey()
        } else {
          bus.$emit("show_notify", {
            color: "error",
            notifytext: data.message,
          });
        }
      });
    },
    getAdditionalExpensesRate() {
      this.$getapi(this.$address + this.$getters.getAdditionalExpensesByKey.uri +
          this.key + '/' +
          this.on_date
      ).then((data) => {
        if (data.error == 0) {
          this.additional = JSON.parse(
              data.message
                  .replace(/:"f",/gm, `:false,`)
                  .replace(/:"t",/gm, `:true,`)
          );
          this.getAdditionalHeaders(this.additional.detention)
          this.getAdditionalHeaders(this.additional.port_storage)
          this.getAdditionalHeaders(this.additional.station_storage)
        } else {
          bus.$emit("show_notify", {
            color: "error",
            notifytext: data.message,
          });
        }
      });
    },
    getAdditionalHeaders(arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].comment.length != 0) {
          switch (arr[i].service_id) {
            case 1039:
              this.detention_comment = arr[i].comment.toLowerCase();
              break
            case 1040:
              this.port_storage_comment = arr[i].comment.toLowerCase();
              break
            case 1041:
              this.station_storage_comment = arr[i].comment.toLowerCase();
              break
            default:
              break
          }
          if (arr[i].comment != 0) break
        }
      }
    },
    getShipScheduleByKey() {
      this.$getapi(this.$address + this.$getters.getShipScheduleByKey.uri +
          this.key + '/' +
          this.on_date
      ).then((data) => {
        if (data.error == 0) {
          this.schedule = JSON.parse(
              data.message
                  .replace(/:"f",/gm, `:false,`)
                  .replace(/:"t",/gm, `:true,`)
          );
        } else {
          bus.$emit("show_notify", {
            color: "error",
            notifytext: data.message,
          });
        }
      });
    },
  }
};
</script>

<style scoped>
  @import "./rate-page.css";
</style>
