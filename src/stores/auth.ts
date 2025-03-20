import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(credentials: { username: string; password: string }) {
      try {
        const response = await axios.post(
          "https://crud-prestamos-fastapi.onrender.com/login",
          credentials
        );
        this.token = response.data.access_token;
        localStorage.setItem("token", this.token); // Guarda el token en el almacenamiento local
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.token}`; // Usa el token en todas las solicitudes
      } catch (error) {
        throw new Error("Error en login");
      }
    },
    logout() {
      this.token = null;
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
    },
  },
});
