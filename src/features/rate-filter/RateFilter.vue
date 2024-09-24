<template>
    <div class="rate-filter-container">
        <div :class="getclass(sort_by == 0)" @click="setsort(0)">
            Сортировать по цене
        </div>
        <div :class="getclass(sort_by == 1)" @click="setsort(1)">
            Сортировать по скорости
        </div>
      <div :class="getclass(sort_by == 2)" @click="setsort(2)">
        Vedexx рекомендует!
      </div>
      <div class="rate-actions-block">
            <div class="rate-actions-block-button" @click="openratecards()">
              <v-icon v-if="is_collapse == true" alt="Свернуть выбранные предложения" title="Свернуть выбранные предложения">mdi-arrow-collapse-all</v-icon>
              <v-icon v-else alt="Развернуть выбранные предложения" title="Развернуть выбранные предложения">mdi-arrow-expand-all</v-icon>
            </div>
            <div class="rate-actions-block-button" @click="checkall()">
              <v-icon v-if="is_check_all == true" alt="Снять выделение" title="Снять выделение">mdi-checkbox-marked-outline</v-icon>
              <v-icon v-else alt="Выделить все" title="Выделить все">mdi-checkbox-blank-outline</v-icon>
            </div>
        </div>
    </div>
</template>

<script>
    // eslint-disable-next-line no-unused-vars
    import { bus } from "@/shared/bus/bus";

    export default {
        name: "RateFilter.vue",
        props:{
            parameters:{
                type: Object
            }
        },
        data: () => ({
            sort_by: 0,
            is_collapse: false,
            is_compare: false,
            rates_group: [],
            compare_group: [],
            is_show_buttons: true,
            is_check_all: false,
        }),
        watch:{
            sort_by(val){
                bus.$emit("sortrates", { type: val  });
            },
            parameters(val){
                console.log(val)
            }
        },
        mounted() {
          bus.$on("pushtogroup", (args) => {
            this.pushtoratesgroup(args)
          });
        },
        methods:{
            pushtoratesgroup(data){
                if (data.is_mark){
                    this.rates_group.push(data.id)
                    this.compare_group.push(data.key)
                } else {
                    this.rates_group = this.rates_group.filter(d => d != data.id);
                    this.compare_group = this.compare_group.filter(d => d != data.key);
                }
            },
            checkall(){
                this.is_check_all = !this.is_check_all
                bus.$emit("mark_card", { is_mark: this.is_check_all });
            },
            getclass(value){
                return (value) ? 'label-text label-color' : 'label-text'
            },
            setsort(val){
              this.sort_by = val
            },
            compareratecards(){
              let routeData = this.$router.resolve({ path: "/CompareRateList", query : { cid: this.$_getsetting("client_id"), keys: this.compare_group.join(), params: JSON.stringify(this.parameters) } });
              window.open(routeData.href, '_blank');  
            },
            complexratecards(){
//                bus.$emit("show_complex");
              let routeData = this.$router.resolve({ path: "/ComplexRateList", query : { cid: this.$_getsetting("client_id") } });
              window.open(routeData.href, '_blank');  
            },
            openratecards(){
                this.is_collapse = !this.is_collapse
                if (this.is_collapse)
                    for (let i = 0; i < this.rates_group.length; i++){
                        bus.$emit("collapse_card", { id: this.rates_group[i], is_group: true });
                    }
                else
                    bus.$emit("collapse_card", { id: 0, is_group: true });
            },
        }
    }
</script>

<style scoped>
    .rate-filter-container{
        width: 100%;
        min-height: 3vw;
        display: flex;
        flex-direction: row;
        line-height: 40px;
        margin: auto;
        border-radius: 10px;
        border: 1px solid #e6eae9;
    }
    .label-text{
        line-height: 40px;
        margin: auto;
        color: #92a1a6;
        cursor: pointer;
    }
    .label-color{
        color: #1976d2;
    }
.rate-actions-block{
  display: flex;
  flex-direction: row-reverse;
  margin-right: 1.61%;
}
.rate-actions-block-button{
    margin:auto;
    padding-left: 50%;
}
.rate-actions-block-button:hover{
    color:red;
}
</style>