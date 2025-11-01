// src/api.js
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000"; // change to your Django host

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Token ${token}`;
  return config;
});

// categories, products, cart wrappers
export const getCategories = () => api.get("/categories/"); // GET -> list categories
export const getProductsByCategory = (categorySlug) =>
  api.get("/products/", { params: { category: categorySlug } }); // GET -> filter by category
export const getProduct = (id) => api.get(`/products/${id}/`); // GET product detail

// Cart endpoints (Django REST style: /api/cart/)
export const getCart = () => api.get("/cart/");
export const addCartItem = (payload) => api.post("/cart/", payload); // payload: {product: id, quantity}
export const updateCartItem = (cartItemId, payload) =>
  api.put(`/cart/${cartItemId}/`, payload); // payload: {quantity}
export const deleteCartItem = (cartItemId) => api.delete(`/cart/${cartItemId}/`);

// Auth (example)
export const login = (credentials) => api.post("/auth/login/", credentials); // returns token
export const logout = () => api.post("/auth/logout/");

export default api;
