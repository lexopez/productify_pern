import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:3000/api/v1",
  withCredentials: true, // Include cookies in the request
});

export default api;
