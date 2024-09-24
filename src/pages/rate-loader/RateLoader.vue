<template>
  <div>
    <CVTRadioButton :element = "elements.choiceElement" @selected="selected"/>
    <CVTBFileInput :element="elements.fileElement" @selected="selected"/>
    <v-btn rounded large dark color="primary" @click="sendData()">Send</v-btn>
    <xlsx-read :file="files">
      <xlsx-table :sheet="selectedSheet" class="none-visible"/>
      <xlsx-json  :sheet="selectedSheet">
        <template #default="{collection}">
          <div>
            {{ jsontogrid(collection) }}
          </div>
        </template>
      </xlsx-json>
    </xlsx-read>
  </div>
</template>

<script>
import XlsxRead from "../../../node_modules/vue-xlsx/dist/components/XlsxRead";
import XlsxJson from "../../../node_modules/vue-xlsx/dist/components/XlsxJson";
import XlsxTable from "../../../node_modules/vue-xlsx/dist/components/XlsxTable";
import { rateLoader} from "@/pages/rate-loader/rate-loader";
import { formElements } from "@/pages/rate-loader/config";
import CVTBFileInput from "@/shared/ui/CVTBFileInput";
import CVTRadioButton from "@/shared/ui/CVTRadioButton";
//import CVTBAutoComplete from "@/shared/ui/CVTBAutoComplete";

export default {
  name: "RateLoader.vue",
  components: {
    XlsxRead,
    XlsxTable,
    XlsxJson,
    CVTBFileInput,
    CVTRadioButton,
//    CVTDataTable,
//    CVTBAutoComplete,
  },
  data: () => ({
    dataSource: {},
    file: null,
    files: [],
    selectedSheet: 0,
    sheets: [],
    collection: [],
    loaderType: null,
    actions: rateLoader.actions,
    elements: formElements,
  }),
  methods: {
    jsontogrid(data){
        this.dataSource = data
    },
    sendData(){
      this.actions.send(this.dataSource, this.loaderType)
    },
    selected(args){
      switch (args.element){
        case this.elements.fileElement.name: {
          this.files = args.value
          break
        }
        default: {
          this.loaderType = args.value
          break
        }
      }
    }
  }
}
</script>

<style scoped>

</style>