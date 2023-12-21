import axios from "axios";

const baseURL = "http://localhost:3009";

const publicAxios = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default publicAxios;