import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post("/auth/login", { email, password }),
  register: (name, email, password) =>
    api.post("/auth/register", { name, email, password }),
};

export const productsAPI = {
  getAll: () => api.get("/products"),
  create: (productData) => api.post("/products", productData),

  // ✅ AQUI: rota de update
  update: (id, productData) => api.put(`/products/${id}`, productData),
};

export default api;
