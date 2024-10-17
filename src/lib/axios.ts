import axios from "axios";

export const api = axios.create({
  baseURL: "https://bccardapiodigital.onrender.com",
  withCredentials: true
});
