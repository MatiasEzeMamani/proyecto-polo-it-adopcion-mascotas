// axiosInstance.ts
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4040/api" });

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => error ? prom.reject(error) : prom.resolve(token));
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // si ya está refrescando, encolamos la petición
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      return new Promise(async (resolve, reject) => {
        try {
          const { data } = await axios.post("/auth/refresh", { refreshToken });
          const newToken = data.accessToken;            // o data.accessToken si renombraste
          localStorage.setItem("accessToken", newToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
          processQueue(null, newToken);
          resolve(axiosInstance(originalRequest));
        } catch (err) {
          processQueue(err, null);
          // si falla el refresh, borramos todo y vamos al login
          localStorage.clear();
          window.location.href = "/login";
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
