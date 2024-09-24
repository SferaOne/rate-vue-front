<template>
    <div class="rate-card-conteiner" :id="rate.id" v-if="rate.is_visible == 1"
         :class="{rate_active: active_id == rate.id}">
        <div class="rate-card-short-title">
          <div class="rate-card-short-title-main">
            <div class="rate-card-short-caption">
              {{ rate.title}}
            </div>
            <div class="rate-card-short-cost-total">
              {{getnumber(rate.total)}}&nbsp;&#8381;
            </div> 
          </div>
          <div class="rate-card-short-title-sub">
            <div class="rate-card-short-title-sub-info">
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
            <div class="rate-card-short-cost-total-sub">
              {{getnumber(rate.usd_total)}}&nbsp;&#36;
            </div> 
          </div>
        </div>
          <div class="rate-card-block">
            <div class="rate-card-infoblock">
              <RateCardDetail :rate="rate"/>
            </div>
            <div class="rate-card-cost">
              <div class="rate-card-cost-raiting">
                <img :src="'stars/' + rate.raiting + '.png'"/>
              </div>
                <div class="rate-card-lack-of-empty-equipment">
                    <img :src="getlackimg(rate)" :alt="getLackDescription()" :title="getLackDescription()"/>
                    <img v-if="rate.is_prebook == 1" src="green.png" alt="Есть места на судне. Подробности по расписанию..." title="Есть места на судне. Подробности по расписанию..."/>
                </div>
                 <div class="rate-card-cost-container">
                   <div class="rate-card-unit">
                     {{rate.delivery_term_code}}
                   </div>
                    <div class="rate-card-unit">
                        {{rate.unit_code}}
                    </div>

                </div>
            </div>
        </div>
        <div class="rate-card-actions">
          <div class="toggle-button-right" @click="openSchedule(rate)">
            Расписание
          </div>
          <div :class="getToggleButtonClass(false)" @click="openrateview(rate.key_orig, rate.on_date)">
            Подробности
          </div>
        </div>
        <!--div class="rate-card-detail"
             :class="{display_none: (active_id != rate.id)}">
            <RateCardDetail :rate="rate"/>
        </div-->
    </div>
</template>

<script>
//    import RatePath from "./RatePath";
//    import RatePathVertical from "./RatePathVertical";
//    import RateLogos from "./RateLogos";
    import RateCardDetail from "./rate-card-detail/RateCardDetail";
    import {bus} from "@/shared/bus/bus";

    export default {
        name: "RateCard.vue",
        props:{
            rate:{
                type: Object,
            }
        },
        components:{
//            RatePath,
//            RatePathVertical,
//            RateLogos,
            RateCardDetail,
        },
        data: () => ({
           active_id: 0,
           active_short_id: 0,
           is_mark: false,
        }),
        mounted() {
          bus.$on("collapse_card", (args) => {
            if (args.is_group && this.rate.id == args.id)
              this.active_short_id = args.id
            if (args.is_group && args.id == 0)
              this.active_short_id = 0
          });
          bus.$on("mark_card", (args) => {
            if (this.rate.is_visible && args.is_mark){
              this.is_mark = args.is_mark
              this.pushtoarray(this.rate)
            } else {
              this.is_mark = false
              this.pushtoarray(this.rate)
            }
          })
        },
        methods: {
            pushtoarray(item){
              bus.$emit("pushtogroup", { id: item.id, key: item.key_orig, is_mark: this.is_mark  });
            },
            opencard(id) {
                this.active_id = (this.active_id == id) ? 0 : id;
            },
            openshortcardview(id){
              this.active_id = 0
              this.active_short_id = (this.active_short_id == id) ? 0 : id;
            },
            baycard(item){
              bus.$emit("show_send_request", { rate: item});
            },
            getnumber(value){
//                if (this.isFloat(parseFloat(value))) {
                    return parseFloat(value).toLocaleString('ru-RU')
//                } else {
//                    return 0
//                }
            },
            isFloat(n){
                return n === +n && n !== (n|0);
            },
            createchain(item, block){
                if (block == 0){
                    return item.place_from + ((item.ext_place_from.length > 0) ? "(" + item.ext_place_from + ")" : "")
                }
                else {
                    return item.place_to + ((item.ext_place_to.length > 0) ? "(" + item.ext_place_to + ")" : "")
                }
            },
            getimage(item){
                switch (item.type_id) {
                    case 215: return "1.png";
                    case 519:
                    case 952:
                    case 214: return "2.png";
                    case 259: return "3.png";
                    case 213: return "4.png"
                }
            },
            getspeedimage(value){
                return (value) ? "speed.png" : "";
            },
            getmoneyimage(value){
                return (value) ? "money.png" : "";
            },
            openrateview(v_key, v_on_date){
//              this.$router.push({ path: "/RateCardByID", query : { id : v_id } })
              let routeData = this.$router.resolve({ path: "/RateCardByID", query : { key : v_key, on_date : v_on_date } });
              window.open(routeData.href, '_blank');          
            },
          crop(key){
            return key.slice(0, 7) + "..."
          },
          getraitingImage(value){
            return value + '.png'
          },
          getlackimg(rate){
            return (rate.lack_of_empty_equipment_type != 0) ? '/' + rate.lack_of_empty_equipment_img : 'blue.png'
          },
          openSchedule(rate){
            bus.$emit("show_schedule", rate)
          },
          getScheduleButtonClass(value){
            return (value == 1) ? 'schedule-button margin-left-20' : 'schedule-button margin-left-20'
          },
          getToggleButtonClass(value){
            return (value == 1) ? 'toggle-button margin-left-20' : 'toggle-button margin-left-60'
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
          getLackDescription(){
            switch(this.rate.lack_of_empty_equipment_type){
              case 0: return this.rate.is_lack_of_empty_equipment_date_desc
              case 1: return this.rate.is_lack_of_empty_equipment_date_desc + '\r\n' + 'Ориентировочный срок появления ' + this.getdate(this.rate.lack_of_empty_equipment_date)
              case 2: return this.rate.is_lack_of_empty_equipment_date_desc + '\r\n' + 'Информация отстутсвует с ' + this.getdate(this.rate.lack_of_empty_equipment_date)
            }
          },
          getColoredClass(item){
            switch(item.lack_of_empty_equipment_type){
              case 0: return (item.is_prebook != 1) ? 'background-no-limits' : 'background-no-limits-prebook'
              case 1: return (item.is_prebook != 1) ? 'background-not-equipment' : 'background-not-equipment-prebook'
              case 2: return (item.is_prebook != 1) ? 'background-need-info' : 'background-need-info-prebook'
            }
          },
          getTitleClass(value){
            return (value != 0) ? 'title-red' : '';
          },
          getTitleIconClass(value){
            return (value != 0) ? 'title-red' : 'title-green';
          }
        },
    }
</script>

<style scoped>
    .title-red{
      color: red;
    }
    .title-green{
      color: #2ea700;
    }
    .rate-card-conteiner{
        color: #1d1c1a;
        width: 95%;
        margin: 2.5% 2.5% 2.5% 2.5%;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid #e6eae9;
    }
    .rate-card-conteiner:hover{
      box-shadow: 0vw 0.15625vw 0.05208vw -0.1041666vw rgba(96, 97, 99, 0.2),
      0vw 0.1041666vw 0.1041666vw 0vw rgba(96, 97, 99, 0.14),
      0vw 0.05208vw 5px 0vw rgba(96, 97, 99, 0.12);
      border: 1px solid #e9eaea;
    }
    .rate_active{
        min-height: 30vw;
    }
    .rate-card-actions{
        min-height: 2vw;
        border-top: #e6eae9 2px solid;
        color: #92a1a6;
        display: flex;
        flex-direction: row;
        width: 100%;
        line-height: 2vw;
        background-color: #fff;
    }
    .rate-card-block{
        display: flex;
        flex-direction: row;
        min-height: 13vw;
        border-radius: 10px;
    }
    .rate-card-infoblock{
        display: flex;
        flex-direction: column;
        width: 70%;
    }
    .rate-card-cost{
        width: 30%;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .rate-card-cost-raiting{
      width: 100%;
      margin: 1.61%;
    }
    .rate-card-cost-raiting img{
      width: 45%;
      margin: 3%;
      display: none;
    }
    .rate-card-marks{
        line-height: 40px;
    }
    .rate-card-cost-total{
        font-size: 20pt;
        font-weight: bold;
        padding-top: 15%;
        margin-bottom: 10%;
    }
    .rate-card-usd-cost-total{
      font-size: 16pt;
      font-weight: bold;
/*      padding-top: 15%;*/
      margin-bottom: 15%;
    }
    .rate-card-detail{
        overflow: hidden;
        margin-bottom: 3.2%;
    }
    .display_none{
        display: none;
    }
    .rate-card-title{
        margin: 1.61%;
        font-size: 14pt;
        font-weight: bold;
        border-bottom: 1px solid #d3d3d3;
      cursor: pointer;
    }
    .rate-card-info{
        font-size: 12pt;
        margin: 2%;
        display: flex;
        flex-direction: column;
    }
    .rate-info-text{
        width: 100%;
        line-height: 25px;
    }
    .rate-card-unit{
        margin-top: 5%;
        font-weight: bold;
        font-size: 16pt;
    }
    .rate-card-cost-container{
        width: 80%;
        margin: auto;
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
    }
    .rate-card-service-img{
        width: 50px;
    }
    .rate-path-info{
        width: 100%;
        min-height: 80px;
    }
    .toggle-button{
        background-color: #1976d2;
        width: 20%;
        min-width: 20%;
        height: 40px;
        margin-top: -20px;
        text-align: center;
        float: right;
        border-bottom-left-radius: 20px;
        border-top-left-radius: 20px;
        background-color: #ffffff;
        border: solid 1px #e6eae9;
    }
    .toggle-button:hover{
        border-bottom: solid 1px #a7c2d3;
        border-top: solid 1px #a7c2d3;
        border-left: solid 1px #a7c2d3;
        color: #000;
        background-color: #a7c2d3;
    }
    .toggle-button-right{
      background-color: #1976d2;
      width: 20%;
      min-width: 20%;
      height: 40px;
      margin-top: -20px;
      text-align: center;
      float: right;
      border-bottom-right-radius: 20px;
      border-top-right-radius: 20px;
      background-color: #ffffff;
      border: solid 1px #e6eae9;
    }
    .toggle-button-right:hover{
      border-bottom: solid 1px #6c8693;
      border-top: solid 1px #6c8693;
      border-right: solid 1px #6c8693;
      color: #fff;
      background-color: #6c8693;
    }
    .r-card-id{
      font-size: 11pt;
      font-weight: normal;
      cursor: pointer;
    }
    .rate-card-title:hover{
        color:#1976d2;
    }
    .rate-card-marks{
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: auto;
    }
    .rate-card-lack-of-empty-equipment{
      width: 100%;
    }
    .rate-card-lack-of-empty-equipment img{
      width: 20%;
      top: 0;
    }
    .schedule-button{
        background-color: #1976d2;
        width: 20%;
        height: 40px;
        margin-top: -20px;
        text-align: center;
        border-radius: 20px;
        background-color: #ffffff;
        border: solid 1px #e6eae9; 
    }
    .schedule-button:hover{
        border-bottom: solid 1px #a7c2d3;
        border-top: solid 1px #a7c2d3;
        border-left: solid 1px #a7c2d3;
        color: #000;
        background-color: #a7c2d3;
    }
    .margin-left-20{
        margin-left: 20%;
    }
    .margin-left-60{
        margin-left: 60%;
    }
    .rate-card-short-title{
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-left: 2.5%;
      padding-top: 1%;
    }
    .rate-card-short-title-main{
      display: flex;
      flex-direction: row;
      width: 100%;
      margin: auto;
    }
    .rate-card-short-title-sub{
      font-size: 10pt;
      font-style: italic;
      margin-bottom: 0.425%;
      width: 98.39%;
      color:#6c8693;
      display: flex;
      flex-direction: row;
    }
    .rate-card-short-collapse-action{
      right: 0px;
      float:right;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      text-align: center;
      padding-top: 8px;
      margin: auto;
    }
    .rate-card-short-unverified{
      right: 0px;
      float:right;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      text-align: center;
      padding-top: 8px;
      margin: auto;
    }
    .rate-card-short-collapse-action:hover{
      background-color: #d3d3d3;
    }
    .rate-card-short-caption{
      width: 70%;
      font-size: 12pt;
      font-weight: bold;
      border-bottom: solid 1px #a7c2d3;
    }
    .rate-card-short-cost-total{
      width: 15%;
      margin: auto;
      font-size: 14pt;
      font-weight: bold;
      border-bottom: solid 1px #a7c2d3;
      text-align: center;
    }
    .rate-card-short-checkbox{
      margin: auto;
    }
    .v-input--selection-controls{
      margin-top: 0px !important;
      padding-top: 0px !important;
    }
    .rate_hide_price{
      color: #fff;
      border: none;
    }
    .rate-card-short-title-sub-info{
      width: 71%;
      display: flex;
      flex-direction: row;
    }
    .rate-card-short-title-sub-colored{
      width: 2.5%;
      border-radius: 50%;
      margin-right: 1.2%;
    }
    .background-no-limits{
      background: linear-gradient(to top left, #1976d2 50%, #1976d2 50%);
    }
    .background-need-info{
      background: linear-gradient(to top left, #959312 50%, #959312 50%);
    }
    .background-not-equipment{
      background: linear-gradient(to top left, #a70060 50%, #a70060 50%);
    }
    .background-no-limits-prebook{
      background: linear-gradient(to top left, #2ea700 50%, #1976d2 50%);
    }
    .background-need-info-prebook{
      background: linear-gradient(to top left, #2ea700 50%, #959312 50%);
    }
    .background-not-equipment-prebook{
      background: linear-gradient(to top left, #2ea700 50%, #a70060 50%);
    }
    .rate-card-short-cost-total-sub{
      font-style: normal;
      margin: auto;
    }
 </style>