import { createApp, ref, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import "animate.css";

const app = createApp(App);
let globalVal = reactive({
    clientWidth: ref(document.body.clientWidth).value
});

app.provide("globalVal", globalVal);
app.use(router);
app.mount("#app");
