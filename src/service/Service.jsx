import Base from "antd/es/typography/Base";
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

//--------------------------------//
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
//--------------------------------//
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
//--------------------------------//
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

export const getBarcode = async (barcode) => {
  try {
    const response = await axios.get(`${baseURL}/barcode/${barcode}`);
    return response.data;
  } catch (error) {
    console.error("Axios error (PdDatas):", error);
    throw error;
  }
};
