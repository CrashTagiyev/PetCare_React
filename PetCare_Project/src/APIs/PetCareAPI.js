import axios from "axios";
import { redirect } from "react-router-dom";
export const BASE_URL = `http://localhost:5067/api`;

export const PetCareAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});


export default PetCareAPI;
