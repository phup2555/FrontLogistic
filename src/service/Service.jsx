import axios, { Axios } from "axios";
import { AiFillFileText } from "react-icons/ai";

const baseURL = "http://localhost:4000/api";
const BaseURL = "http://localhost:3000/api";

export const fetchAllPdLength = async () => {
  try {
    const response = await axios.get(`${BaseURL}/products/`);
    return response.data;
  } catch (error) {
    console.error("Axios error (fetchAllPdLength):", error);
    throw error;
  }
};

export const fetchPdIn = async () => {
  try {
    const response = await axios.get(`${BaseURL}/products/Location`);
    return response.data;
  } catch (error) {
    console.error("Axios error (fetchPdIn):", error);
    throw error;
  }
};

// export const fetchPdOut = async () => {
//   try {
//     const response = await axios.get(`${baseURL}/products/pdOutlength`);
//     return response.data;
//   } catch (error) {
//     console.error("Axios error (fetchPdOut):", error);
//     throw error;
//   }
// };
//--------------------------------//
export const PdDatas = async () => {
  try {
    const response = await axios.get(`${baseURL}/products/`);
    return response.data;
  } catch (error) {
    console.error("Axios error (PdDatas):", error);
    throw error;
  }
};
export const AddPdData = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/products/`, data);
    return response.data;
  } catch (error) {
    console.error("Axios error (AddPdData):", error);
    throw error;
  }
};
export const PdDatasHistory = async () => {
  try {
    const response = await axios.get(`${baseURL}/logs/`);
    return response.data;
  } catch (error) {
    console.error("Axios error (PdDatas):", error);
    throw error;
  }
};
export const editProduct = async (id, data) => {
  try {
    const response = await axios.patch(`${baseURL}/products/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const outStock = async (id, data, docOut) => {
  try {
    const body = { ...data, docOut };
    const response = await axios.patch(`${baseURL}/products/out/${id}`, body);
    return response.data;
  } catch (error) {
    throw error;
  }
};
