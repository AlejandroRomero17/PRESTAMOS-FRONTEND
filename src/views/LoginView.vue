<template>
  <div class="login-container">
    <div class="card">
      <h1>🔑 Iniciar Sesión</h1>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">
            <span>👤</span> Usuario:
          </label>
          <input type="text" v-model="username" id="username" placeholder="Ej: romero" required />
        </div>
        <div class="form-group">
          <label for="password">
            <span>🔒</span> Contraseña:
          </label>
          <input type="password" v-model="password" id="password" placeholder="Ingresa tu contraseña" required />
        </div>
        <button type="submit" class="btn-ingresar">
          <span>🚪</span> Ingresar
        </button>
      </form>

      <!-- Enlace para ir al registro -->
      <div class="auth-links">
        <p>¿No tienes una cuenta?
          <router-link to="/users" class="auth-link">
            ¡Regístrate aquí!
          </router-link>
        </p>
      </div>

      <!-- Notificación -->
      <div v-if="mensaje" :class="`notificacion ${tipoMensaje}`">
        {{ mensaje }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const authStore = useAuthStore();
const router = useRouter();
const mensaje = ref("");
const tipoMensaje = ref("");

const handleLogin = async () => {
  try {
    await authStore.login({ username: username.value, password: password.value });
    mostrarNotificacion("Inicio de sesión exitoso", "exito");
    router.push("/dashboard");
  } catch (error) {
    mostrarNotificacion("Error al iniciar sesión", "error");
  }
};

const mostrarNotificacion = (texto: string, tipo: string) => {
  mensaje.value = texto;
  tipoMensaje.value = tipo;
  setTimeout(() => {
    mensaje.value = "";
  }, 3000);
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.card {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.5em;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
  font-weight: bold;
  color: #555;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  color: #333;
}

.btn-ingresar {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease;
}

.btn-ingresar:hover {
  background-color: #0056b3;
}

.auth-links {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.auth-link {
  color: #2563eb;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.auth-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.auth-link::before {
  content: "👉";
  font-size: 1.1rem;
}

.notificacion {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}

.notificacion.exito {
  background-color: #28a745;
}

.notificacion.error {
  background-color: #dc3545;
}
</style>
