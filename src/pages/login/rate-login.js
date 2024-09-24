import { api } from "@/shared/lib/api";
import { config } from "@/shared/config/app";
import { setterlist } from "@/shared/config/endpoints";
import { auth } from "@/shared/lib/auth";
import { storage } from "@/shared/lib/storage";
import { bus } from "@/shared/bus/bus";

export const rateLogin = {
    actions: {
        auth(login, password) {
            let epoch = auth.methods.getepoch()
            api.methods.post(config.address + setterlist.auth.uri, {
                user: login,
                key: epoch,
                mixed: auth.methods.getmixed(login, password, epoch)
            }).then(data => {
                if (data.error == 0) {
                    let authorization = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`))
                    storage.methods.set('token', authorization.token)
                    bus.$emit("changeLocation", authorization)
                } else {
                    storage.methods.remove('token')
                }
            });
        },
        check() {
            api.methods.get(config.address + setterlist.check.uri + '/' + storage.methods.get('token')
            ).then(data => {
                if (data.error == 0) {
                    let authorization = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`))
                    storage.methods.set('token', authorization.token)
                    bus.$emit("changeLocation", authorization)
                } else {
                    storage.methods.remove('token')
                    storage.methods.remove('client_id')
                    storage.methods.remove('email')
                }
            });
        }
    }
}