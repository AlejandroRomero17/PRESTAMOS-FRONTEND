<template>
  <div class="dashboard">
    <!-- Navbar en la parte superior -->
    <Navbar />

    <!-- Contenedor principal que incluye el Sidebar y el contenido -->
    <div class="main-container">
      <!-- Sidebar a la izquierda -->
      <Sidebar />

      <!-- Contenido principal -->
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Sidebar from "@/components/Sidebar.vue";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  /* Ocupa toda la altura de la ventana */
}

.main-container {
  display: flex;
  flex: 1;
  /* Ocupa el espacio restante */
  overflow: hidden;
  /* Evita desbordamientos */
}

.content {
  flex: 1;
  /* Ocupa el espacio restante */
  padding: 20px;
  overflow-y: auto;
  /* Permite el desplazamiento vertical si el contenido es largo */
  background-color: #f8f9fa;
  /* Fondo claro para el contenido */
}
</style>
