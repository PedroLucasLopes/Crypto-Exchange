import { createApp } from "vue";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from "pinia";

import Dashboard from "./components/Dashboard.vue";
import DashboardHome from "./pages/Home.vue";

import { createVuestic } from "vuestic-ui";

import "./css/index.css";
import "vuestic-ui/css";
import "material-design-icons-iconfont/dist/material-design-icons.min.css";

const routes = [
  { path: "/", redirect: { name: "DashboardHome" } },
  {
    path: "/dashboard",
    component: Dashboard,
    children: [
      { path: "/", redirect: { name: "DashboardHome" } },
      { path: "home", name: "DashboardHome", component: DashboardHome },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(
  createVuestic({
    config: {
      colors: {
        variables: {
          primary: "#23e066",
          secondary: "#002c85",
          success: "#40e583",
          info: "#2c82e0",
          danger: "#e34b4a",
          warning: "#ffc200",
          gray: "#babfc2",
          dark: "#34495e",
          yourCustomColor: "#d0f55d",
        },
      },
    },
  })
);

app.mount("#app");
