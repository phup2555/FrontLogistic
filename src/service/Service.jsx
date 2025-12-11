import Base from "antd/es/typography/Base";
import axios, { Axios } from "axios";

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

export const getZone = async (room_id) => {
  try {
    const response = await axios.get(`${BaseURL}/room/zone/${room_id}`);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getRow = async (zone_id) => {
  try {
    const response = await axios.get(`${BaseURL}/room/row/${zone_id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const getCheckEmtrpSlot = async (room_id, zone_id, row_no) => {
  console.log({ room_id });
  console.log({ zone_id });
  try {
    const response = await axios.get(
      `${BaseURL}/room/slot/${room_id}/${zone_id}/${row_no}`
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const PdDatas = async () => {
  try {
    const response = await axios.get(`${BaseURL}/products/`);
    return response.data;
  } catch (error) {
    console.error("Axios error (PdDatas):", error);
    throw error;
  }
};
export const AddPdData = async (data) => {
  try {
    const response = await axios.post(`${BaseURL}/products/`, data);
    return response.data;
  } catch (error) {
    console.error("Axios error (AddPdData):", error);
    throw error;
  }
};

// export const PdDatasHistory = async () => {
//   try {
//     const response = await axios.get(`${baseURL}/logs/`);
//     return response.data;
//   } catch (error) {
//     console.error("Axios error (PdDatas):", error);
//     throw error;
//   }
// };
export const editProduct = async (productId, data) => {
  try {
    const response = await axios.patch(
      `${BaseURL}/products/${productId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const outStock = async (productId, docOut) => {
  try {
    const data = {
      docOut: docOut,
    };
    const response = await axios.patch(
      `${BaseURL}/products/out/${productId}`,
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${baseURL}/barcode/${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Axios error (PdDatas):", error);
    throw error;
  }
};

export const LoginWeb = async (body) => {
  try {
    const response = await axios.post(`${BaseURL}/users/login`, body);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};
