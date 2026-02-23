import axios, { AxiosResponse } from "axios";
// import { LocalStorageService } from "../services/LocalStorageService";

// export const baseURL = "http://192.168.1.4:8502/";
export const baseURL = "http://192.168.1.4:8502";
// export const baseURL = "http://192.168.1.4:8802";
// export const baseURL = "http://192.168.1.4:8402";
// export const baseURL = "http://localhost:8200";
// export const baseURL = "https://swv3.taxslips.com/"; //for live build
// "homepage": "https://v3.taxslips.com/",      //this will paste on package.json file 

const http = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
    "Access-Control-Allow-Headers":
      "Context-Type, X-Auth-Token, Origin, Authorization",
  },
});

export default http;
