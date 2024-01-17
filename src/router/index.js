import { getAuth, onAuthStateChanged } from "firebase/auth";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: () => import("../views/Home.vue") },
        { path: "/register", component: () => import("../views/Register.vue") },
        { path: "/sign-in", component: () => import("../views/SignIn.vue") },
        { 
            path: "/feed", 
            component: () => import("../views/Feed.vue"),
            meta: {
                requiresAuth: true
            }
        },
        { path: "/player", component: () => import("../views/Player.vue"), meta: { requiresAuth: true } },
        { path: "/player/:id", component: () => import("../views/Player.vue"), meta: { requiresAuth: true } },
        { path: "/players", component: () => import("../views/Players.vue"), meta: { requiresAuth: true } },
        { path: "/game", component: () => import("../views/Game.vue"), meta: { requiresAuth: true } },
        { path: "/game/:id", component: () => import("../views/Game.vue"), meta: { requiresAuth: true } },
    ]
});

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListner = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListner();
                resolve(user);
            },
            reject
        )
    });
};

router.beforeEach(async (to, from, next) => {
    if(to.matched.some((record) => record.meta.requiresAuth)) {
        if(await getCurrentUser()) {
            next();
        } else {
            router.push('/');
        }
    } else {
        next();
    }
});

export default router;