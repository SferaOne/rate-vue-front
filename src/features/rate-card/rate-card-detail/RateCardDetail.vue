<template>
  <div class="card-detail-data">
        <table class="rate-card-detail-table">
          <thead>
          <tr style="font-weight: bold; text-align: left">
            <td class="td-center">Этап</td>
            <td>Место отправки</td>
            <td>Место прибытия</td>
            <td class="td-center">Стоимость, вал</td>
            <!--td class="td-center">Транзитное время</td-->
            <td class="td-center">Стоимость, &#8381;</td>
          </tr>
          </thead>
          <tr class="rate-card-detail-service"
              v-for="service in rate.detail" :key="service.id">
            <td><img :alt="service.service" :title="service.service" class="rate-card-service-img" :src="getimage(service)"/></td>
            <!--td>{{service.service}}</td-->
            <td>{{createchain(service, 0)}}</td>
            <td>{{createchain(service, 1)}}</td>
            <td class="td-center">{{getnumber(service.summa)}}&nbsp;
              <span v-if="service.cur_code == 'USD'">&#36;</span>
              <span v-else>&#8381;</span>
            </td>
            <!--td class="td-center">{{service.tranzit_time}}</td-->
            <td class="td-center">{{getnumber(service.cost)}} &#8381;</td>
          </tr>
        </table>
  </div>
</template>

<script>
export default {
  name: "RateCardDetail.vue",
  props:{
    rate:{
      type: Object,
    }
  },
  data: () => ({
    active: null
  }),
  methods:{
    getnumber(value){
//                if (this.isFloat(parseFloat(value))) {
      return parseFloat(value).toLocaleString('ru-RU')
//                } else {
//                    return 0
//                }
    },
    getcurrencysign(value){
      return (value == 'USD') ? "<span>&#36;</span>" : '&#8381;';
    },
    isFloat(n){
      return n === +n && n !== (n|0);
    },
    createchain(item, block){
      if (item.type_id == 259)
        return item.place_from
      else {
        if (block == 0) {
          return item.place_from + ((item.ext_place_from.length > 0) ? " (" + item.ext_place_from + ")" : "")
        } else {
          return item.place_to + ((item.ext_place_to.length > 0) ? " (" + item.ext_place_to + ")" : "")
        }
      }
    },
    getimage(item){
      return item.icon
    },
  }
}
</script>

<style scoped>
.rate-card-detail-service{
  line-height: 25px;
}
.rate-card-detail-table{
  width: 100%;
  margin: auto;
  font-size: 9pt;
  padding-top: 1.61%;
}
.td-right{
  text-align: right;
  padding-right: 1%;
}
.td-center{
  text-align: center;
}
.tr-total{
  background-color: #fff;
  font-weight: bold;
  font-size: 11pt;
}
.rate-card-service-img{
  width: 50px;
}
.card-statistic-diagram{
  width: 98%;
  margin: auto;
  text-align: center;
}
.card-detail-data{
  width: 98%;
}
.statistic-diagram{
  height: 9.5vw;
  width: 98%;
}
</style>
