<template>
  <div class="materiales-view">
    <h1>Gestión de Materiales</h1>
    <button class="btn-crear" @click="showCreateModal = true">
      <span>+</span> Crear Material
    </button>

    <!-- Lista de materiales -->
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tipo</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="material in materiales" :key="material.id">
            <td>{{ material.id }}</td>
            <td>{{ material.tipo_material }}</td>
            <td>{{ material.marca }}</td>
            <td>{{ material.modelo }}</td>
            <td>
              <span :class="`estatus ${material.estatus.toLowerCase()}`">
                {{ material.estatus }}
              </span>
            </td>
            <td>
              <button class="btn-editar" @click="editarMaterial(material)">
                ✏️
              </button>
              <button class="btn-eliminar" @click="eliminarMaterial(material.id)">
                🗑️
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para crear/editar material -->
    <div v-if="showCreateModal || materialEditado" class="modal">
      <div class="modal-content">
        <h2>{{ materialEditado ? 'Editar Material' : 'Crear Material' }}</h2>
        <form @submit.prevent="guardarMaterial">
          <div class="form-group">
            <label for="tipo_material">Tipo de Material:</label>
            <input v-model="formMaterial.tipo_material" id="tipo_material" placeholder="Tipo de Material" required />
          </div>
          <div class="form-group">
            <label for="marca">Marca:</label>
            <input v-model="formMaterial.marca" id="marca" placeholder="Marca" required />
          </div>
          <div class="form-group">
            <label for="modelo">Modelo:</label>
            <input v-model="formMaterial.modelo" id="modelo" placeholder="Modelo" required />
          </div>
          <div class="form-group">
            <label for="estatus">Estatus:</label>
            <select v-model="formMaterial.estatus" id="estatus" required>
              <option value="Disponible">Disponible</option>
              <option value="Prestado">Prestado</option>
              <option value="En Mantenimiento">En Mantenimiento</option>
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

interface Material {
  id: number;
  tipo_material: string;
  marca: string;
  modelo: string;
  estatus: string;
}

const materiales = ref<Material[]>([]);
const showCreateModal = ref(false);
const materialEditado = ref<Material | null>(null);
const formMaterial = ref({
  tipo_material: "",
  marca: "",
  modelo: "",
  estatus: "Disponible",
});
const mensaje = ref("");
const tipoMensaje = ref("");

// Obtener materiales
const obtenerMateriales = async () => {
  try {
    const response = await axios.get("https://crud-prestamos-fastapi.onrender.com/materials");
    materiales.value = response.data;
  } catch (error) {
    mostrarNotificacion("Error al obtener materiales", "error");
  }
};

// Crear o actualizar material
const guardarMaterial = async () => {
  try {
    if (materialEditado.value) {
      await axios.put(
        `https://crud-prestamos-fastapi.onrender.com/materials/${materialEditado.value.id}`,
        formMaterial.value
      );
      mostrarNotificacion("Material actualizado correctamente", "exito");
    } else {
      await axios.post("https://crud-prestamos-fastapi.onrender.com/materials", formMaterial.value);
      mostrarNotificacion("Material creado correctamente", "exito");
    }
    obtenerMateriales();
    cancelarModal();
  } catch (error) {
    mostrarNotificacion("Error al guardar material", "error");
  }
};

// Editar material
const editarMaterial = (material: Material) => {
  materialEditado.value = material;
  formMaterial.value = { ...material };
  showCreateModal.value = true;
};

// Eliminar material
const eliminarMaterial = async (id: number) => {
  try {
    await axios.delete(`https://crud-prestamos-fastapi.onrender.com/materials/${id}`);
    mostrarNotificacion("Material eliminado correctamente", "exito");
    obtenerMateriales();
  } catch (error) {
    mostrarNotificacion("Error al eliminar material", "error");
  }
};

// Cancelar modal
const cancelarModal = () => {
  showCreateModal.value = false;
  materialEditado.value = null;
  formMaterial.value = {
    tipo_material: "",
    marca: "",
    modelo: "",
    estatus: "Disponible",
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

onMounted(() => {
  obtenerMateriales();
});
</script>

<style scoped>
.materiales-view {
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

.estatus.disponible {
  background-color: #d4edda;
  color: #155724;
}

.estatus.prestado {
  background-color: #fff3cd;
  color: #856404;
}

.estatus.en-mantenimiento {
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

.form-group input,
.form-group select {
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
