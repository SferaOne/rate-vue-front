<template>
<div class="mt-editor-form">
    <h3 class="block-header">Расписание судов: {{rate.title}}</h3>
    <table class="schedule-table">
        <thead class="schedule-table-head">
            <tr>
                <td class="td-center">Место отправки</td>
                <td class="td-center">Место доставки</td>
                <td class="td-center">Перевозчик/линия</td>
                <td class="td-center">Наименование судна</td>
                <td class="td-center">Дата выхода в море</td>
                <td class="td-center">Дата прихода в порт</td>
                <td class="td-center">Количество мест</td>
            </tr>
        </thead>
        <tr class="rate-card-detail-service" v-for="item in schedule" :key="item.id">
            <td class="td-center">{{item.place_from_name}}({{item.point_from_name}})</td>
            <td class="td-center">{{item.place_to_name}}({{item.point_to_name}})</td>
            <td class="td-center">{{item.transporter_name}}</td>
            <td class="td-right">{{item.vassel_name}}</td>
            <td class="td-center">{{getdate(item.sea_start_date)}}</td>
            <td class="td-center">{{getdate(item.sea_end_date)}}</td>
            <td class="td-right">{{item.empty_place_count}}<span v-if="item.empty_place_count > 0">&nbsp;мест</span></td>
        </tr>
    </table>
</div>
</template>

<script>
import { bus } from "../../../shared/bus/bus";
  export default {
    name: 'RateCardSchedule',
        props:{
          rate: {
            type: Object
          }  
        },
        components:{

        },
    data: () => ({
        schedule: []
    }),
    mounted(){
        this.getShipScheduleByKey()
    },
    watch:{
        rate: {
            handler(){
                this.getShipScheduleByKey()
            },
            deep: true
        }
    },
    methods: {
        getShipScheduleByKey() {
            this.$postapi(this.$address + this.$getters.getShipScheduleByKey.uri, {
            method: this.$getters.getShipScheduleByKey.name,
            key: this.rate.key_orig,
            on_date: this.rate.on_date,
            unit_type: this.rate.unit_type
        }).then((data) => {
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
        getdate(value) {
            if (value != null)
              return (new Date(value)).toLocaleString("ru", {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                timezone: 'UTC'
              });
            else
              return ' '
          },
    },
  }
</script>

<style scoped>
.mt-editor-form{
  background-color: #fff;
  overflow: hidden;
  padding-bottom: 1.61%;
}
.schedule-table{
  width: 95%;
  font-size: 10pt;
  padding-left: 2.5%;
  padding-right: 2.5%;
  margin: auto;
  border-collapse: collapse;
}
tr{
    border-bottom: #d3d3d3 1px solid;
}
.td-right {
  text-align: right;
  padding-right: 1%;
}
.td-center {
  text-align: center;
}
.block-header{
  width: 95%;
  margin-left: 2.5%;
  margin-bottom: 1.61%;
  margin-top: 1.61%;
}
.rate-card-detail-service {
  line-height: 40px;
}
.schedule-table-head{
    font-size: 11pt;
    font-weight: bold;
}
</style>
