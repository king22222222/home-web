import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("@/pages/myHome/myHome.vue")
    },
    {
        path: "/webShow",
        name: "WebShow",
        component: () => import("@/pages/webShow/webShow.vue")
    }
];
export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
