import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [{
        path: "/",
        component: () =>
            import ( /* webpackChunkName: "home" */ "./views/home"),
        redirect: "/app/dashboards",
    }
];

const router = new VueRouter({
    linkActiveClass: "active",
    mode: "history"
});

export default router;