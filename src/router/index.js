import { createRouter, createWebHistory } from "vue-router";
const routes = [
    {
        path: "/",
        redirect: "/home"
    },
    {
        path: "/home",
        component: () => import("@/pages/myHome/myHome.vue")
    },
    {
        path: "/webShow",
        name: "webShow",
        component: () => import("@/pages/webShow/webShow.vue")
    }
];
export const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router;
