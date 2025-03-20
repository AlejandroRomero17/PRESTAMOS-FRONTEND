<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <h2>📊 Dashboard</h2>
    </div>
    <ul class="sidebar-menu">
      <li>
        <router-link to="/dashboard/materiales" class="sidebar-link">
          <span>📦</span> Materiales
        </router-link>
      </li>
      <li>
        <router-link to="/dashboard/prestamos" class="sidebar-link">
          <span>📅</span> Préstamos
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.sidebar-header {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #34495e;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar-menu {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-menu li {
  margin: 10px 0;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #34495e;
  color: #1abc9c;
}

.sidebar-link.router-link-active {
  background-color: #1abc9c;
  color: white;
}

/* Estilos responsivos */
@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    height: auto;
    padding: 10px;
  }

  .sidebar-header h2 {
    font-size: 1.2em;
  }

  .sidebar-link {
    padding: 8px;
  }
}
</style>
