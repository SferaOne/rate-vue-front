<template>
    <div class="mt-lcontainer">
        <div class="mt-left-container">
            <div class="mt-left-top-conteiner"></div>
            <div>
                <v-img
                        class="mt-logo"
                        src=""
                ></v-img>
            </div>
        </div>
        <div class="mt-right-container">
            <div class="mt-right-top-conteiner"></div>
            <div class="mt-right-bottom-container">
                <v-text-field
                        label="Логин"
                        clear-icon="mdi-close-circle"
                        v-model="login"
                        :rules="[rules.login_required, rules.login_match, rules.login_counter]"
                ></v-text-field>
                <v-text-field
                        label="Пароль"
                        clear-icon="mdi-close-circle"
                        v-model="password"
                        :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show_pass ? 'text' : 'password'"
                        :rules="[rules.pass_required, rules.pass_match, rules.pass_counter]"
                        @click:append="show_pass = !show_pass"
                ></v-text-field>
                <div>
                    <v-btn rounded large dark color="primary" @click="onLogin()">Войти</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { rateLogin } from "@/pages/login/rate-login";
    import { rules } from "@/pages/login/config";
    import { bus } from "@/shared/bus/bus";

    export default {
        name: "RateLogin.vue",
        data() {
            return {
                show_pass: false,
                login: "",
                password: "",
                rules: rules,
                actions: rateLogin.actions,
            };
        },
        mounted() {
          this.onCheck()
          bus.$on("changeLocation", (args) => {
            this.$router.push(args.route);
          });
        },
        methods: {
          onLogin(){
            this.actions.auth(this.login, this.password)
          },
          onCheck(){
            this.actions.check()
          }
        }
    }
</script>

<style scoped>
  @import "./rate-login.css";
</style>