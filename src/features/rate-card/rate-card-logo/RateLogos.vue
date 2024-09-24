<template>
    <div class="rate-logos">
        <div class="rate-item-logo" v-for="item in to_array(rate.transporter_name)" :key="item.key">
            <img :alt="item.name" :title="item.name" :src="item.logo"/>
        </div>
    </div>
</template>

<script>
    import md5 from "md5";
    export default {
        name: "RateLogos.vue",
        props:{
          rate:{
            type: Object
          }
        },
      methods:{
        to_array(value){
          let arr = []
          let re = value.split(",")
          re = re.filter(function (value, index, self) {
            return self.indexOf(value) === index;
          })
          for (let i = 0; i < re.length; i++){
            arr.push({ name: re[i], logo: md5(re[i].match(/\S+/g).join()) + ".png", key: md5(re[i].match(/\S+/g).join()) })
          }
          return arr.filter(function (value, index, self) {
            return self.indexOf(value) === index;
          })
        },
      }
    }
</script>

<style scoped>
    .rate-logos{
        display: flex;
        flex-direction: row;
        margin-left: 5%;
    }
    .rate-item-logo{
        margin-right: 3%;
    }
    .rate-item-logo img{
        height: 40px;
    }
</style>