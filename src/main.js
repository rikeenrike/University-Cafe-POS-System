import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Lara from "/src/components";
import Menu from "primevue/menu";
import Sidebar from "primevue/sidebar";
import Badge from "primevue/badge";
import BadgeDirective from "primevue/badgedirective";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import SelectButton from "primevue/selectbutton";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import Tooltip from "primevue/tooltip";
import router from "./router";
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';

const app = createApp(App);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
app.use(router);
app.directive("tooltip", Tooltip);
app.component("Accordion", Accordion);
app.component("AccordionTab", AccordionTab);
app.component("SelectButton", SelectButton);
app.component("Dropdown", Dropdown);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Badge", Badge);
app.directive("badge", BadgeDirective);
app.component("Sidebar", Sidebar);
app.component("Menu", Menu);
app.component("InputNumber", InputNumber);
app.use(ToastService);
app.component('Toast', Toast);
app.mount("#app");
