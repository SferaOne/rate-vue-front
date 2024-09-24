<template>
    <div class="rate-path-container">
      <div class="rate-tranzit-header text-left">
        Ставка действительна до {{getdate(rate.date_to)}}
      </div>
        <div class="rate-tranzit-header">
            {{formattztime(rate.tranzit_time)}}
        </div>
        <div class="rate-tranzit-header text-left">
            Средний срок постановки на ж/д составляет: {{rate.average_loading_time}} дней.
        </div>
        <div class="rate-tranzit-header text-left tomato">
            Автодоставка в стоимость не включена!
        </div>
      <div class="rate-tranzit-header text-left tomato">
        Место пересечения границы {{rate.place_across_name}}
      </div>
    <div class="mt-order-timeline">
        <div class="timeline">
            <div class="tm-item" v-for="item in steps" :key="item.id">
              <div class="tm-item-text">
                  <span class="tm-item-header">&nbsp;</span>
                <!--span class="tm-item-header">{{getdate(rate.on_date)}}</span-->
              </div>
                <div class="tm-item-point">&#8226;</div>
                <div class="tm-item-text">
                    <span class="tm-item-header">{{item.place}}</span>
                    <span class="tm-item-ext">{{item.ext}}</span>
                </div>
            </div>
        </div>
        <hr :class="getWidthClass()"/>
    </div>

    </div>
</template>

<script>
    export default {
        name: "RatePath.vue",
        props:{
            rate:{
                type: Object,
            }
        },
        data: () => ({
          steps: [],
        }),
        mounted(){
            if (this.rate != undefined)
                this.steps = this.getsteps(this.rate.detail)
        },
        watch: {
            rate: function(value){
                this.steps = this.getsteps(value.detail)
            }
        },
        methods:{
            getWidthClass(){
                return (this.steps.length == 3) ? 'hr-width-75': 'hr-width-50';
            },
            showitem(value){
                return ([1,2,3]).includes(value)
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
            getsteps(value){
                if (value != undefined){
                    value.sort(function (a, b) {
                        return a.service_id - b.service_id;
                    });
                    let res = []
                    for (var i = 0; i < value.length; i++){
                        if (this.showitem(value[i].service_id)) {
                            if (i == 0) {
                                res.push({place: value[i].place_from, type_id: value[i].type_id, ext: value[i].ext_place_from})
                                res.push({place: value[i].place_to, type_id: value[i].type_id, ext: value[i].ext_place_to})
                            }
                            else {
                                res.push({place: value[i].place_to, type_id: value[i].type_id, ext: value[i].ext_place_to})
                            }
                        }
                    }
                    return res
                } else return []
            },
            case_num(titles){
                var cases = [2, 0, 1, 1, 1, 2];
                    return function(number){
                        number = Math.abs(number);
                        let c = 
                        (number%100>4 && number%100<20)? 2 :
                    cases[(number%10<5) ? number%10 : 5];
                    return  titles[c];
                }
            },
            formattztime(value){
                const f = this.case_num(['день', 'дня', 'дней']);
                return (value != 0) ? 'Ориентировочное транзитное время ' + value + ' ' + f(value) : '';
            }
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
        flex-direction: row;
        width: 100%;
        margin: auto;
    }
    hr {
        border-bottom: 0.05208vw solid #6c8693;
        background: #6c8693;
        margin-top: -2.16vh;
        margin-right: auto;
        margin-left: auto;
    }
    .hr-width-50{
        width: 50%;
    }
    .hr-width-75{
        width: 66%;
    }
    .tm-item{
        /*        display: inline-block;    */
        margin: auto;
        text-align: center;
        display: flex;
        flex-direction: column;
        height: 2.6vw;
        width: 30%;
    }
    .tm-item-header{
        font-size: 10pt;
        margin-bottom: 0px;
    }
    .tm-item-img{
        width: 3.125vw;
        height: 3.125vw;
        line-height: 3.125vw;
        background-color: #f5f8fd;
        border-radius: 50%;
    }
    .tm-item-img-gs{
        filter: grayscale(100%);
    }
    .tm-item-point{
        line-height: 25px;
        font-size: 40pt;
        font-weight: bold;
        color: #1976d2;
    }
    /*
    .tm-item:first-child > .tm-item-point{
        color: red;
    }
    .tm-item:last-child > .tm-item-point{
        color: green;
    }
    */
    .rate-tranzit-header{
        font-size: 10pt;
        margin-top: 0.85%;
    }
    .rate-path-container{
        width: 90%;
        margin: auto;
    }
    .tm-item-text{
        display: flex;
        flex-direction: column;
    }
    .tm-item-ext{
        margin: auto;
        font-size: 9pt;
        width: 80%;
        text-overflow: ellipsis;
        line-height: 10px;
        white-space: nowrap; /* Запрещаем перенос строк */
        overflow: hidden;
    }
    .rate-tranzit-footer{
      font-size: 10pt;
      width: 100%;
      margin-top: 11.2%;
      margin-bottom: 3.2%;
    }
    .tomato{
      color: tomato;
    }
    .text-left{
        text-align: left;
    }
    .text-center{
        text-align: center;
    }
    .text-right{
        text-align: right;
    }
</style>
