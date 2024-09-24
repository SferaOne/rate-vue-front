<template>
  <v-app>
    <v-main>
      <notifications position="top right" class="mt-notify"
                     width="25%"/>
      <v-dialog class="mt-editor-form"
                v-model="showshipschedule"
                persistent
                hide-overlay transition="dialog-bottom-transition"
                width="60%" height="60%"
                @click:outside="showshipschedule = false"
      >
        <RateCardShipSchedule :rate="current_rate" @close="showshipschedule = false" @save="OnSave"/>
      </v-dialog>
      <router-view/>
    </v-main>
    <div class="help-button" v-if="is_show_request_button">
      <v-btn
          class="mx-2"
          rounded
          dark
          large
          color="primary"
          @click="help"
      >
        <v-icon dark>
          mdi-help
        </v-icon>Запрос ставки
      </v-btn>
    </div>
    <div class="exit-button" v-if="is_show_exit_button">
      <v-btn
          class="mx-2"
          rounded
          dark
          large
          color="primary"
          @click="exit"
      >
        <v-icon dark>
          mdi-logout
        </v-icon>Выход
      </v-btn>
    </div>
  </v-app>
</template>

<script>

//import RateList from "./components/RateList";
import RateCardShipSchedule from "./features/rate-card/rate-card-schedule/RateCardShipSchedule";
import {bus} from "@/shared/bus/bus";
import {config} from "@/shared/config/app";
import {setterlist} from "@/shared/config/endpoints";

export default {
  name: 'App',

  components: {
//    RateList,
    RateCardShipSchedule,
  },

  data: () => ({
    goto: undefined,
    authData: {},
    popupVisible: false,
    showshipschedule: false,
    current_rate: {},
    is_show_request_button: false,
    is_show_exit_button: false,
  }),
  mounted() {
    this.$_config =  {
      headers: {
        "Access-Control-Allow-Origin": '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': '*',
        'Authorization': this.$_getsetting('token')
      }
    }
    this.is_show_exit_button = (this.$_getsetting("show_exit_button") == 1)
    bus.$on("show_notify", (args) => {
      this.show_notify(args)
    });
    bus.$on("show_exit_button", () => {
      this.is_show_exit_button = (this.$_getsetting("show_exit_button") == 1)
    });
    bus.$on("show_popup", () => {
      alert("Show popup")
    });
    bus.$on("show_schedule", (args) => {
      this.current_rate = args
      this.openSchedule()
    });
    if (this.goto != undefined)
      this.$router.push((this.goto != undefined) ? this.goto : this.check())
    else {
      if (this.$route.name != 'RateCardByID' && this.$route.name != 'RateLoader')
        this.check()
    }
  },
  methods: {
    check() {
      this.$getapi(config.address + setterlist.check.uri + '/' + this.$_getsetting('token')
      ).then(data => {
        if (data.error == 0) {
          let authorization = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`))
          this.$_setsetting('token', authorization.token)
          this.$router.push(authorization.route);
        } else {
          this.exit()
        }
      });
    },
    help() {
      this.popupVisible = true
    },
    exit(){
      this.$_removesetting('token')
      this.$_removesetting('show_exit_button')
      this.$router.push("/")
      this.is_show_exit_button = false
    },
    openSchedule(){
      this.showshipschedule = true
    },
    show_notify(args) {
      this.$notify({
        title: '<p class="mt-notify-title">Внимание</p>',
        text: '<p class="mt-notify-text">' + args.notifytext + '</p>',
        type: args.color,
        ignoreDuplicates: true
      });
    },
    OnSave(value) {
      this.$postapi(this.$address + this.$setters[value.values.method].uri, value.values).then(data => {
        if (data.error == 0) {
          bus.$emit("show_notify", {
            color: "success",
            notifytext: "Создано обращение с номером " + data.message
          });
        } else {
          bus.$emit("show_notify", {
            color: "error",
            notifytext: data.message
          });
        }
        this.popupVisible = false
        this.showsendraterequestform = false
      });
    },
  }
};
</script>

<style>
.help-button {
  z-index: 99;
  position: fixed;
  right: 0.1%;
  bottom: 10%;
}
.exit-button {
  z-index: 99;
  position: fixed;
  right: 0.1%;
  bottom: 4%;
  width: 11%;
}
.v-text-field__details{
  display: none !important;
}
.v-messages{
  display: none !important;
}
</style>
