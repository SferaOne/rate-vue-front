import { api } from "@/shared/lib/api";
import { config } from "@/shared/config/app";
import { setterlist } from "@/shared/config/endpoints";
import { storage } from "@/shared/lib/storage";
//import { bus } from "@/shared/bus/bus";

export const rateLoader = {
    actions: {
        getUri(type){
          switch (type) {
              case 142:
                return setterlist.rateValidate.uri;
              case 145:
                return setterlist.shipScheduleValidate.uri;
              case 146:
                return setterlist.additionalExpensesValidate.uri;
              default:
                return null;
            }
        },
        getHeaders(){
            return {
                headers: {
                    'Authorization': storage.methods.get('token')
                }
            }
        },
        send(filedata, type){
            console.log(filedata)
            api.methods.post(config.address + this.getUri(type), {
                    data: filedata
            }, this.getHeaders()).then(data => {
                if (data.error == 0) {
                    let result = JSON.parse(data.message.replace(/:"f",/gm, `:false,`).replace(/:"t",/gm, `:true,`))
                    console.log(result)
                } else {
                    console.log("Error")
                }
            });
        },
    }
}