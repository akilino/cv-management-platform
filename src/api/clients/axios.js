import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8081/api";
const AUTH_API_URL =
  import.meta.env.VITE_AUTH_API_URL ||
  "https://auth-service-spring-star-4898.fly.dev";
const TOKEN_NAME = import.meta.env.VITE_TOKEN_NAME || "access_token";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const authApi = axios.create({
  baseURL: AUTH_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 1. Single Unified Request Interceptor
const injectToken = (config) => {
  const isAuthRoute =
    config.url?.includes("login") || config.url?.includes("refresh");
  if (isAuthRoute) {
    return config;
  }

  const token = localStorage.getItem(TOKEN_NAME);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// 2. Single Unified Response Error Interceptor (Stops Cascade Renders)
const handleResponseError = (error) => {
  const requestUrl = error.config?.url || "";
  const isAuthRequest = requestUrl.includes("/auth/");
  const isAlreadyOnLoginPage = window.location.pathname === "/login";

  if (error.response) {
    if (
      error.response.status === 401 &&
      !isAuthRequest &&
      !isAlreadyOnLoginPage
    ) {
      console.warn("Unauthorized! Wiping local authentication states...");
      localStorage.removeItem(TOKEN_NAME);
      window.location.href = "/login";
    }
  }
  return Promise.reject(error);
};

apiClient.interceptors.request.use(injectToken, (err) => Promise.reject(err));
authApi.interceptors.request.use(injectToken, (err) => Promise.reject(err));

apiClient.interceptors.response.use((res) => res,handleResponseError);
authApi.interceptors.response.use((res) => res,handleResponseError);

export { apiClient, authApi };
