import { createRouter, createWebHistory } from "vue-router";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import MaterialesView from "@/views/MaterialesView.vue";
import PrestamosView from "@/views/PrestamosView.vue";
import { useAuthStore } from "@/stores/auth";

// Definición de las rutas
const routes = [
  { path: "/", redirect: "/users" }, // Redirige a /users
  { path: "/users", name: "Register", component: RegisterView },
  { path: "/login", name: "Login", component: LoginView },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: DashboardView,
    meta: { requiresAuth: true }, // Ruta protegida
    children: [
      { path: "materiales", component: MaterialesView },
      { path: "prestamos", component: PrestamosView },
    ],
  },
];

// Creación del router
const router = createRouter({
  history: createWebHistory(), // Usa el modo de historial HTML5
  routes, // Pasa el array de rutas aquí
});

// Guardia de navegación
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.token) {
    next("/login"); // Redirige al login si no está autenticado
  } else {
    next(); // Continúa la navegación
  }
});

export default router;
