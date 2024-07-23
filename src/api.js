import axios from "axios";

const API_URL = "https://inventorymanagement-api-u16f.onrender.com";

const api = axios.create({
  baseURL: API_URL,
});

export const isTokenExpired = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const { exp } = JSON.parse(jsonPayload);
  return Date.now() >= exp * 1000;
};

const refreshToken = async () => {
  try {
    const response = await api.post("/auth/refresh-token", {
      token: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);
    return response.data.accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Clear tokens and redirect to login
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.href = "/login";
    return null;
  }
};

api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const token = await refreshToken();
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export const getItems = async () => {
  const response = await api.get("/inventory");
  return response.data;
};

export const addItem = async (item) => {
  const response = await api.post("/inventory", item);
  return response.data;
};

export const deleteItem = async (id) => {
  await api.delete(`/inventory/${id}`);
};

export const getItem = async (id) => {
  const response = await api.get(`/inventory/${id}`);
  return response.data;
};

export const updateItem = async (id, item) => {
  const response = await api.put(`/inventory/${id}`, item);
  return response.data;
};






export default api;
