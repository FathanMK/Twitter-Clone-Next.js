import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8008/api/v1",
});

export default axiosInstance;
