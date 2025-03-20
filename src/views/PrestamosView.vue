<template>
  <div class="prestamos-view">
    <h1>Gestión de Préstamos</h1>
    <button class="btn-crear" @click="showCreateModal = true">
      <span>+</span> Crear Préstamo
    </button>

    <!-- Lista de préstamos -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Material</th>
            <th>Fecha Préstamo</th>
            <th>Fecha Devolución</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="prestamo in prestamos" :key="prestamo.id">
            <td>{{ prestamo.id }}</td>
            <td>{{ obtenerNombreUsuario(prestamo.id_usuario) }}</td>
            <td>{{ obtenerNombreMaterial(prestamo.id_material) }}</td>
            <td>{{ formatFecha(prestamo.fecha_prestamo) }}</td>
            <td>{{ prestamo.fecha_devolucion ? formatFecha(prestamo.fecha_devolucion) : "No devuelto" }}</td>
            <td>
              <span :class="`estatus ${prestamo.estatus_prestamo.toLowerCase()}`">
                {{ prestamo.estatus_prestamo }}
              </span>
            </td>
            <td>
              <button class="btn-editar" @click="editarPrestamo(prestamo)">
                ✏️
              </button>
              <button class="btn-eliminar" @click="eliminarPrestamo(prestamo.id)">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para crear/editar préstamo -->
    <div v-if="showCreateModal || prestamoEditado" class="modal">
      <div class="modal-content">
        <h2>{{ prestamoEditado ? 'Editar Préstamo' : 'Crear Préstamo' }}</h2>
        <form @submit.prevent="guardarPrestamo">
          <div class="form-group">
            <label for="usuario">Usuario:</label>
            <select v-model="formPrestamo.id_usuario" id="usuario" required>
              <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
                {{ usuario.nombre }} {{ usuario.primer_apellido }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="material">Material:</label>
            <select v-model="formPrestamo.id_material" id="material" required>
              <option v-for="material in materiales" :key="material.id" :value="material.id">
                {{ material.tipo_material }} - {{ material.marca }} {{ material.modelo }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="estatus">Estatus:</label>
            <select v-model="formPrestamo.estatus_prestamo" id="estatus" required>
              <option value="Activo">Activo</option>
              <option value="Devuelto">Devuelto</option>
              <option value="Vencido">Vencido</option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="btn-guardar">Guardar</button>
            <button type="button" class="btn-cancelar" @click="cancelarModal">
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Notificación -->
    <div v-if="mensaje" :class="`notificacion ${tipoMensaje}`">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";

interface Prestamo {
  id: number;
  id_usuario: number;
  id_material: number;
  fecha_prestamo: string;
  fecha_devolucion: string | null;
  estatus_prestamo: string;
}

interface Usuario {
  id: number;
  nombre: string;
  primer_apellido: string;
}

interface Material {
  id: number;
  tipo_material: string;
  marca: string;
  modelo: string;
}

const prestamos = ref<Prestamo[]>([]);
const usuarios = ref<Usuario[]>([]);
const materiales = ref<Material[]>([]);
const showCreateModal = ref(false);
const prestamoEditado = ref<Prestamo | null>(null);
const formPrestamo = ref({
  id_usuario: 0,
  id_material: 0,
  estatus_prestamo: "Activo",
});
const mensaje = ref("");
const tipoMensaje = ref("");

// Obtener préstamos
const obtenerPrestamos = async () => {
  try {
    const response = await axios.get("https://crud-prestamos-fastapi.onrender.com/loans");
    prestamos.value = response.data;
  } catch (error) {
    mostrarNotificacion("Error al obtener préstamos", "error");
  }
};

// Obtener usuarios
const obtenerUsuarios = async () => {
  try {
    const response = await axios.get("https://crud-prestamos-fastapi.onrender.com/users");
    usuarios.value = response.data;
  } catch (error) {
    mostrarNotificacion("Error al obtener usuarios", "error");
  }
};

// Obtener materiales
const obtenerMateriales = async () => {
  try {
    const response = await axios.get("https://crud-prestamos-fastapi.onrender.com/materials");
    materiales.value = response.data;
  } catch (error) {
    mostrarNotificacion("Error al obtener materiales", "error");
  }
};

// Crear o actualizar préstamo
const guardarPrestamo = async () => {
  try {
    if (prestamoEditado.value) {
      await axios.put(
        `https://crud-prestamos-fastapi.onrender.com/loans/${prestamoEditado.value.id}`,
        formPrestamo.value
      );
      mostrarNotificacion("Préstamo actualizado correctamente", "exito");
    } else {
      await axios.post("https://crud-prestamos-fastapi.onrender.com/loans", formPrestamo.value);
      mostrarNotificacion("Préstamo creado correctamente", "exito");
    }
    obtenerPrestamos();
    cancelarModal();
  } catch (error) {
    mostrarNotificacion("Error al guardar préstamo", "error");
  }
};

// Editar préstamo
const editarPrestamo = (prestamo: Prestamo) => {
  prestamoEditado.value = prestamo;
  formPrestamo.value = { ...prestamo };
  showCreateModal.value = true;
};

// Eliminar préstamo
const eliminarPrestamo = async (id: number) => {
  try {
    await axios.delete(`https://crud-prestamos-fastapi.onrender.com/loans/${id}`);
    mostrarNotificacion("Préstamo eliminado correctamente", "exito");
    obtenerPrestamos();
  } catch (error) {
    mostrarNotificacion("Error al eliminar préstamo", "error");
  }
};

// Cancelar modal
const cancelarModal = () => {
  showCreateModal.value = false;
  prestamoEditado.value = null;
  formPrestamo.value = {
    id_usuario: 0,
    id_material: 0,
    estatus_prestamo: "Activo",
  };
};

// Mostrar notificación
const mostrarNotificacion = (texto: string, tipo: string) => {
  mensaje.value = texto;
  tipoMensaje.value = tipo;
  setTimeout(() => {
    mensaje.value = "";
  }, 3000);
};

// Formatear fecha
const formatFecha = (fecha: string) => {
  return new Date(fecha).toLocaleDateString();
};

// Obtener nombre de usuario
const obtenerNombreUsuario = (idUsuario: number) => {
  const usuario = usuarios.value.find((u) => u.id === idUsuario);
  return usuario ? `${usuario.nombre} ${usuario.primer_apellido}` : "Desconocido";
};

// Obtener nombre de material
const obtenerNombreMaterial = (idMaterial: number) => {
  const material = materiales.value.find((m) => m.id === idMaterial);
  return material ? `${material.tipo_material} - ${material.marca} ${material.modelo}` : "Desconocido";
};

onMounted(() => {
  obtenerPrestamos();
  obtenerUsuarios();
  obtenerMateriales();
});
</script>

<style scoped>
.prestamos-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.btn-crear {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
}

.btn-crear span {
  font-size: 1.2em;
}

.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

.estatus {
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.9em;
}

.estatus.activo {
  background-color: #d4edda;
  color: #155724;
}

.estatus.devuelto {
  background-color: #fff3cd;
  color: #856404;
}

.estatus.vencido {
  background-color: #f8d7da;
  color: #721c24;
}

.btn-editar,
.btn-eliminar {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2em;
  margin: 0 5px;
}

.btn-editar {
  color: #007bff;
}

.btn-eliminar {
  color: #dc3545;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group select,
.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-guardar {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancelar {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;
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
