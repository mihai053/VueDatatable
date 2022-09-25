import { createApp } from "vue";
import { createPinia } from "pinia";
// data table npm library
import Vue3EasyDataTable from "vue3-easy-data-table";
import "vue3-easy-data-table/dist/style.css";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

const app = createApp(App);
app.component("EasyDataTable", Vue3EasyDataTable); //data-table library

app.use(createPinia());
app.use(router);

app.mount("#app");
