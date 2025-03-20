<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/dashboard" class="navbar-logo">
        📚 Préstamos S.A.
      </router-link>
    </div>
    <div class="navbar-actions">
      <button class="btn-salir" @click="logout">
        <span>🚪</span> Salir
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #007bff;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar-brand {
  display: flex;
  align-items: center;
}

.navbar-logo {
  color: white;
  font-size: 1.5em;
  font-weight: bold;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
}

.navbar-actions {
  display: flex;
  align-items: center;
}

.btn-salir {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1em;
  transition: background-color 0.3s ease;
}

.btn-salir:hover {
  background-color: #c82333;
}

.btn-salir span {
  font-size: 1.2em;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .navbar-logo {
    font-size: 1.2em;
  }

  .btn-salir {
    padding: 6px 12px;
    font-size: 0.9em;
  }
}
</style>
