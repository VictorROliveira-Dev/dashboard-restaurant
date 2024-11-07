import axios from "axios";

export const api = axios.create({
  baseURL: "https://bccardapiodigital.onrender.com",
  withCredentials: true,
});

// Interceptor para lidar com token expirado
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redireciona para login
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
