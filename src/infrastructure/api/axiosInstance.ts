import axios from "axios";

// Configuration de l'instance Axios pour les requêtes HTTP

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENABLE_MSW === "false"?"http://0.0.0.0:8055":"", // URL de base de votre API
  timeout: 5000, // Timeout de 5 secondes pour les requêtes
  headers: {
    "Content-Type": "application/json",
    // Vous pouvez ajouter d'autres en-têtes si nécessaire
  },
});

export default axiosInstance;
