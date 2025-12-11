import Base from "antd/es/typography/Base";
import axios, { Axios } from "axios";
import { checkAdmin } from "../utils/roleHelper";
const BaseURL = "http://localhost:3000/api";
const api = axios.create({
  baseURL: BaseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);
export const fetchAllPdLength = async () => {
  try {
    const response = await api.get(`/products/`);
    return response.data;
  } catch (error) {
    console.error("Axios error (fetchAllPdLength):", error);
    throw error;
  }
};

export const fetchPdIn = async () => {
  try {
    const response = await api.get(`/products/Location`);
    return response.data;
  } catch (error) {
    console.error("Axios error (fetchPdIn):", error);
    throw error;
  }
};

export const getZone = async (room_id) => {
  try {
    const response = await api.get(`/room/zone/${room_id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getRow = async (zone_id) => {
  try {
    const response = await api.get(`/room/row/${zone_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCheckEmtrpSlot = async (room_id, zone_id, row_no) => {
  console.log({ room_id });
  console.log({ zone_id });
  try {
    const response = await api.get(
      `/room/slot/${room_id}/${zone_id}/${row_no}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const PdDatas = async () => {
  try {
    const response = await api.get(`/products/`);
    return response.data;
  } catch (error) {
    console.error("Axios error (PdDatas):", error);
    throw error;
  }
};
export const AddPdData = async (data) => {
  try {
    if (!checkAdmin()) {
      throw new Error("ທ່ານບໍ່ມີສິດໃນການດຳເນີນການນີ້");
    }
    const response = await api.post(`/products/`, data);
    return response.data;
  } catch (error) {
    console.error("Axios error (AddPdData):", error);
    throw error;
  }
};

// export const PdDatasHistory = async () => {
//   try {
//     const response = await axios.get(`/logs/`);
//     return response.data;
//   } catch (error) {
//     console.error("Axios error (PdDatas):", error);
//     throw error;
//   }
// };
export const editProduct = async (productId, data) => {
  try {
    if (!checkAdmin()) {
      throw new Error("ທ່ານບໍ່ມີສິດໃນການດຳເນີນການນີ້");
    }
    const response = await api.patch(`/products/${productId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const outStock = async (productId, docOut) => {
  try {
    if (!checkAdmin()) {
      throw new Error("ທ່ານບໍ່ມີສິດໃນການດຳເນີນການນີ້");
    }
    const data = {
      docOut: docOut,
    };
    const response = await api.patch(`/products/out/${productId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// export const getBarcode = async (barcode) => {
//   try {
//     const response = await axios.get(`/barcode/${barcode}`);
//     return response.data;
//   } catch (error) {
//     console.error("Axios error (PdDatas):", error);
//     throw error;
//   }
// };

export const LoginWeb = async (body) => {
  try {
    const response = await api.post(`/users/login`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
