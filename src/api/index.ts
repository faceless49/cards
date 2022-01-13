import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://neko-back.herokuapp.com/2.0/",
  headers: {},
});
