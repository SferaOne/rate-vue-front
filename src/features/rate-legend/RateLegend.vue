<template>
<div class="rate-legend">
    <div class="rate-legend-row" v-for="item in legend" :key="item.id" :alt="item.description" :title="item.description">
        <div class="rate-legend-info">
            <div class="rate-legend-img">
                <img :src="item.img"/>
            </div>
            <div class="rate-legend-name">
                {{item.name}}
            </div>
        </div>
        <div class="rate-legend-desc">
            {{item.description}}
        </div>
    </div> 
    <div class="rate-legend-column">
        <v-icon class="title-green">mdi-check-circle</v-icon><div class="rate-legend-name">Сервис проверен</div>
    </div>
    <div class="rate-legend-column">
        <v-icon class="title-red">mdi-alert-circle</v-icon><div class="rate-legend-name">Сервис не проверен</div>
    </div>
</div>
</template>

<script>
  export default {
    name: 'RateLegend',
        props:{
            
        },
        components:{

        },
    data: () => ({
        legend:[
            {id: 0, name: "Ограничений нет", img: "blue.png", description: "Есть порожнее оборудование."},
            {id: 1, name: "Требует уточнения", img: "yellow.png", description: "Порожнее оборудование предоставляется по запросу."},
            {id: 2, name: "Порожнее оборудование отсутсвует", img: "red.png", description: "В данном порту выхода отсутсвует порожнее оборудование. Выход не возможен"},
            {id: 3, name: "Предзаказ", img: "green.png", description: "На судне есть свободные места, доступные для размещения оборудования."},
        ]
    }),
    methods: {
      
    },
  }
</script>

<style scoped>
  @import "./rate-legend.css";
</style>
