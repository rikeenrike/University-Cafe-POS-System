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

const app = createApp(App);
app.use(PrimeVue, {
  unstyled: true,
  pt: Lara,
});
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
app.mount("#app");
