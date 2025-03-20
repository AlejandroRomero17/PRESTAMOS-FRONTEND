<template>
  <div class="register-container">
    <div class="card">
      <h1>📝 Registrarse</h1>
      <form @submit.prevent="handleRegister">
        <div class="form-grid">
          <div class="form-group">
            <label for="nombre">
              <span>👤</span> Nombre:
            </label>
            <input type="text" v-model="nombre" id="nombre" placeholder="Ej: Alejandro" required />
          </div>
          <div class="form-group">
            <label for="primerApellido">
              <span>👤</span> Primer Apellido:
            </label>
            <input type="text" v-model="primerApellido" id="primerApellido" placeholder="Ej: Romero" required />
          </div>
          <div class="form-group">
            <label for="segundoApellido">
              <span>👤</span> Segundo Apellido:
            </label>
            <input type="text" v-model="segundoApellido" id="segundoApellido" placeholder="Ej: Romero (opcional)" />
          </div>
          <div class="form-group">
            <label for="nombreUsuario">
              <span>👤</span> Nombre de Usuario:
            </label>
            <input type="text" v-model="nombreUsuario" id="nombreUsuario" placeholder="Ej: AlejandroRomero" required />
          </div>
          <div class="form-group">
            <label for="correoElectronico">
              <span>📧</span> Correo Electrónico:
            </label>
            <input type="email" v-model="correoElectronico" id="correoElectronico"
              placeholder="Ej: Alejandro.Romero@example.com" required />
          </div>
          <div class="form-group">
            <label for="contrasena">
              <span>🔒</span> Contraseña:
            </label>
            <input type="password" v-model="contrasena" id="contrasena" placeholder="Elige una contraseña segura"
              required autocomplete="new-password" />
          </div>
          <div class="form-group">
            <label for="numeroTelefono">
              <span>📞</span> Número de Teléfono:
            </label>
            <input type="text" v-model="numeroTelefono" id="numeroTelefono" placeholder="Ej: 2215778176 (opcional)" />
          </div>
          <div class="form-group">
            <label for="tipoUsuario">
              <span>👔</span> Tipo de Usuario:
            </label>
            <select v-model="tipoUsuario" id="tipoUsuario" required>
              <option value="Alumno">Alumno</option>
              <option value="Profesor">Profesor</option>
              <option value="Secretaria">Secretaria</option>
              <option value="Laboratorista">Laboratorista</option>
              <option value="Directivo">Directivo</option>
              <option value="Administrativo">Administrativo</option>
            </select>
          </div>
          <div class="form-group">
            <label for="estatus">
              <span>📊</span> Estatus:
            </label>
            <select v-model="estatus" id="estatus" required>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
              <option value="Bloqueado">Bloqueado</option>
              <option value="Suspendido">Suspendido</option>
            </select>
          </div>
        </div>
        <button type="submit" class="btn-registrar">
          <span>✅</span> Crear cuenta
        </button>
      </form>

      <!-- Enlace para ir al login -->
      <div class="login-link">
        ¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión aquí</router-link>.
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
import axios from "axios";
import { useRouter } from "vue-router";

const nombre = ref("");
const primerApellido = ref("");
const segundoApellido = ref("");
const nombreUsuario = ref("");
const correoElectronico = ref("");
const contrasena = ref("");
const numeroTelefono = ref("");
const tipoUsuario = ref("Alumno");
const estatus = ref("Activo");
const router = useRouter();
const mensaje = ref("");
const tipoMensaje = ref("");

const handleRegister = async () => {
  try {
    const userData = {
      nombre: nombre.value,
      primer_apellido: primerApellido.value,
      segundo_apellido: segundoApellido.value,
      tipo_usuario: tipoUsuario.value,
      nombre_usuario: nombreUsuario.value,
      correo_electronico: correoElectronico.value,
      contrasena: contrasena.value,
      numero_telefono: numeroTelefono.value,
      estatus: estatus.value,
    };

    await axios.post("https://crud-prestamos-fastapi.onrender.com/users", userData);
    mostrarNotificacion("Usuario registrado. Ahora inicia sesión.", "exito");
    router.push("/login");
  } catch (error) {
    mostrarNotificacion("Error al registrar usuario", "error");
    console.error(error);
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
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
}

.card {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  font-size: 1.8em;
  color: #333;
  font-weight: 600;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #444;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1em;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #007bff;
  box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
  outline: none;
}

.btn-registrar {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-registrar:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.login-link {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9em;
  color: #555;
}

.login-link a {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.login-link a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.notificacion {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.5s ease;
}

.notificacion.exito {
  background-color: #28a745;
}

.notificacion.error {
  background-color: #dc3545;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 20px;
  }

  h1 {
    font-size: 1.5em;
  }

  .btn-registrar {
    font-size: 0.9em;
    padding: 10px;
  }

  .login-link {
    font-size: 0.85em;
  }
}
</style>
