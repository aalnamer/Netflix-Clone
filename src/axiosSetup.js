import axios from "axios";
const BASE_URL = "https://api.themoviedb.org/3";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
